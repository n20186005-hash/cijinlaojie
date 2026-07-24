#!/usr/bin/env python3
"""Fetch real, freely-licensed Cijin photos from Wikimedia Commons.

Writes files to public/images/ and an attribution manifest to
src/data/image-credits.json. Only Public Domain / CC licences are kept.
"""
import json, os, time, urllib.parse, urllib.request, sys

UA = "CijinLaojieSiteBuilder/1.0 (https://cijinlaojie.com; contact jsiwano@gmail.com)"
API = "https://commons.wikimedia.org/w/api.php"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_DIR = os.path.join(ROOT, "public", "images")
CREDITS = os.path.join(ROOT, "src", "data", "image-credits.json")

# slug -> list of candidate search terms (first hit that qualifies wins)
WANT = {
    "cijin-old-street":      ["Cijin Island Kaohsiung street", "旗津老街", "Cijin Island, Kaohsiung"],
    "cijin-ferry":           ["Cijin ferry", "Gushan Ferry Kaohsiung", "旗津渡輪"],
    "cijin-tianhou-temple":  ["Cijin Tianhou Temple", "旗津天后宮", "Cihou Tianhou Temple"],
    "cihou-lighthouse":      ["Cihou Lighthouse", "Kaohsiung Lighthouse", "旗後燈塔"],
    "cihou-fort":            ["Cihou Fort", "Cihou Battery", "旗後砲台"],
    "star-tunnel":           ["Cijin Star Tunnel", "Qijin Star Tunnel", "星空隧道 旗津"],
    "cijin-beach":           ["Cijin Beach", "Cijin seaside", "旗津海水浴場"],
    "rainbow-church":        ["Cijin Rainbow Church", "彩虹教堂 旗津"],
    "windmill-park":         ["Cijin Wind Turbine Park", "旗津風車公園"],
    "cijin-seaside-park":    ["Cijin Seaside Park", "旗津海岸公園"],
    "cijin-sunset":          ["Cijin sunset Kaohsiung", "Kaohsiung harbour sunset", "旗津夕陽"],
    "cijin-view":            ["Cijin District view from Mt QiHou", "Cijin Island aerial"],
    "kaohsiung-harbour":     ["Kaohsiung Harbor Cijin", "Port of Kaohsiung entrance"],
    "seafood":               ["grilled squid Taiwan street food", "Taiwanese seafood night market"],
}

PINNED = {
    # 搜尋「Cijin old street」容易誤抓到旗后山上的城市遠景。
    "cijin-old-street": "File:高雄市旗津區 廟前路 - panoramio.jpg",
}

OK_LICENCE_HINTS = ("public domain", "cc0", "cc by", "cc-by", "attribution", "pd")

def api(params):
    params = dict(params, format="json")
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)

def qualifies(lic):
    l = (lic or "").lower()
    if "no known" in l or "gfdl" == l:
        return True
    return any(h in l for h in OK_LICENCE_HINTS)

def search(term):
    try:
        d = api({
            "action": "query", "generator": "search",
            "gsrsearch": term, "gsrnamespace": 6, "gsrlimit": 8,
            "prop": "imageinfo",
            "iiprop": "url|extmetadata|mime",
            "iiurlwidth": 1600,
        })
    except Exception as e:
        print("  ! search error", e); return []
    pages = d.get("query", {}).get("pages", {})
    out = []
    for p in sorted(pages.values(), key=lambda x: x.get("index", 99)):
        ii = (p.get("imageinfo") or [{}])[0]
        if "image" not in ii.get("mime", ""):
            continue
        em = ii.get("extmetadata", {})
        lic = em.get("LicenseShortName", {}).get("value", "")
        if not qualifies(lic):
            continue
        artist = em.get("Artist", {}).get("value", "")
        # strip html tags crudely
        import re
        artist = re.sub("<[^>]+>", "", artist).strip()
        out.append({
            "title": p.get("title", ""),
            "thumb": ii.get("thumburl", ""),
            "descurl": ii.get("descriptionurl", ""),
            "licence": lic,
            "artist": artist or "Unknown",
        })
    return out

def get_file(title):
    try:
        d = api({
            "action": "query", "titles": title,
            "prop": "imageinfo",
            "iiprop": "url|extmetadata|mime",
            "iiurlwidth": 1600,
        })
    except Exception as e:
        print("  ! file lookup error", e); return None
    p = next(iter(d.get("query", {}).get("pages", {}).values()), {})
    ii = (p.get("imageinfo") or [{}])[0]
    em = ii.get("extmetadata", {})
    lic = em.get("LicenseShortName", {}).get("value", "")
    if "image" not in ii.get("mime", "") or not qualifies(lic):
        return None
    import re
    artist = re.sub("<[^>]+>", "", em.get("Artist", {}).get("value", "")).strip()
    return {
        "title": p.get("title", title),
        "thumb": ii.get("thumburl", ""),
        "descurl": ii.get("descriptionurl", ""),
        "licence": lic,
        "artist": artist or "Unknown",
    }

def download(url, dest):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read()
    with open(dest, "wb") as f:
        f.write(data)
    return len(data)

def main():
    os.makedirs(IMG_DIR, exist_ok=True)
    try:
        with open(CREDITS, encoding="utf-8") as f:
            credits = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        credits = {}
    for slug, terms in WANT.items():
        got = get_file(PINNED[slug]) if slug in PINNED else None
        if got:
            print(f"[{slug}] pinned: {PINNED[slug]}")
        for t in terms:
            if got:
                break
            print(f"[{slug}] search: {t}")
            hits = search(t)
            time.sleep(1.0)
            if hits:
                got = hits[0]
                break
        if not got:
            print(f"  !! no image for {slug}")
            continue
        ext = ".jpg"
        dest = os.path.join(IMG_DIR, slug + ext)
        try:
            n = download(got["thumb"], dest)
            print(f"  -> {slug}{ext} ({n//1024} KB) [{got['licence']}]")
            credits[slug] = {
                "file": f"/images/{slug}{ext}",
                "title": got["title"],
                "licence": got["licence"],
                "author": got["artist"],
                "source": got["descurl"],
            }
            time.sleep(0.6)
        except Exception as e:
            print("  ! download error", e)
    with open(CREDITS, "w", encoding="utf-8") as f:
        json.dump(credits, f, ensure_ascii=False, indent=2)
    print(f"\nSaved {len(credits)} images. Credits -> {CREDITS}")

if __name__ == "__main__":
    main()
