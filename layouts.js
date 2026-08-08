const BASE = "https://clashofclans-layouts.com";

const UA =
  "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36";

function decodeHtml(text = "") {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .trim();
}

function absoluteUrl(url) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("//")) return "https:" + url;
  if (url.startsWith("/")) return BASE + url;
  return BASE + "/" + url;
}

function firstMatch(html, regex) {
  const m = html.match(regex);
  return m ? decodeHtml(m[1]) : "";
}

function extractMaxPage(html) {
  const nums = [...html.matchAll(/\/page_(\d+)\//g)]
    .map(m => Number(m[1]))
    .filter(Number.isFinite);

  return nums.length ? Math.max(1, ...nums) : 1;
}

function extractDetailPaths(html, cv) {
  const re = new RegExp(
    `href=["']([^"']*\\/pt\\/plans\\/th_${cv}\\/(?:war|farm|defence|troll|hybrid|anti[^/"']*)_[0-9]+\\.html)["']`,
    "gi"
  );

  const result = [];
  const seen = new Set();

  for (const m of html.matchAll(re)) {
    let path = m[1];

    if (path.startsWith("http")) {
      try {
        path = new URL(path).pathname;
      } catch {}
    }

    if (!seen.has(path)) {
      seen.add(path);
      result.push(path);
    }
  }

  // Fallback mais amplo caso o site altere as categorias/estrutura.
  if (!result.length) {
    const broad = new RegExp(
      `href=["']([^"']*\\/pt\\/plans\\/th_${cv}\\/[^"'?#]+_[0-9]+\\.html)["']`,
      "gi"
    );

    for (const m of html.matchAll(broad)) {
      let path = m[1];

      if (path.startsWith("http")) {
        try {
          path = new URL(path).pathname;
        } catch {}
      }

      if (!seen.has(path)) {
        seen.add(path);
        result.push(path);
      }
    }
  }

  return result;
}

function inferType(path, title) {
  const text = `${path} ${title}`.toLowerCase();

  if (text.includes("/war_") || text.includes("guerra")) return "guerra";
  if (text.includes("/farm_") || text.includes("farm")) return "farm";
  if (text.includes("/defence_") || text.includes("defesa")) return "defesa";
  if (text.includes("/troll_") || text.includes("troll") || text.includes("funny")) return "troll";
  if (text.includes("hybrid") || text.includes("híbrido")) return "hibrido";
  return "outros";
}

async function fetchHtml(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": UA,
      "Accept":
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.7"
    },
    redirect: "follow"
  });

  if (!response.ok) {
    throw new Error(`Fonte respondeu ${response.status}`);
  }

  return response.text();
}

async function parseDetail(path, cv) {
  const sourceUrl = absoluteUrl(path);

  try {
    const html = await fetchHtml(sourceUrl);

    const h1 =
      firstMatch(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i)
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const pageTitle =
      firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i)
        .replace(/\s+/g, " ")
        .trim();

    const title = h1 || pageTitle || `Layout CV${cv}`;

    const authorPatterns = [
      /Base criada por:\s*<\/[^>]+>\s*<[^>]+>([^<]+)/i,
      /Base criada por:\s*([^<\n]+)/i,
      /Base criada por[^>]*>\s*([^<]+)/i,
      /created by:\s*([^<\n]+)/i
    ];

    let author = "";
    for (const p of authorPatterns) {
      author = firstMatch(html, p);
      if (author) break;
    }

    const clashLink =
      firstMatch(
        html,
        /href=["'](https:\/\/link\.clashofclans\.com\/[^"']+)["'][^>]*>/i
      );

    const ogImage =
      firstMatch(
        html,
        /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i
      ) ||
      firstMatch(
        html,
        /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i
      );

    const twitterImage =
      firstMatch(
        html,
        /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i
      );

    // Primeiro <img> que pareça base/layout, como fallback.
    let image = ogImage || twitterImage;
    if (!image) {
      const imgCandidates = [...html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)]
        .map(m => m[1])
        .filter(src => /plan|base|layout|th_|town/i.test(src));

      image = imgCandidates[0] || "";
    }

    const id =
      firstMatch(title, /\(#?(\d+)\)/i) ||
      firstMatch(path, /_(\d+)\.html$/i);

    return {
      cv: Number(cv),
      id: id ? `#${id}` : "",
      title,
      author: author || "Comunidade",
      type: inferType(path, title),
      sourceUrl,
      clashLink: clashLink ? decodeHtml(clashLink) : sourceUrl,
      image: absoluteUrl(decodeHtml(image))
    };
  } catch (error) {
    const id = firstMatch(path, /_(\d+)\.html$/i);

    return {
      cv: Number(cv),
      id: id ? `#${id}` : "",
      title: `Layout CV${cv} ${id ? "#" + id : ""}`.trim(),
      author: "Comunidade",
      type: inferType(path, ""),
      sourceUrl,
      clashLink: sourceUrl,
      image: "",
      partial: true
    };
  }
}

export default async function handler(req, res) {
  try {
    const cv = Number(req.query.cv || 18);
    const page = Math.max(1, Number(req.query.page || 1));

    if (!Number.isInteger(cv) || cv < 12 || cv > 18) {
      return res.status(400).json({
        error: "CV inválido. Use um número entre 12 e 18."
      });
    }

    const listingUrl =
      page === 1
        ? `${BASE}/pt/plans/th_${cv}/`
        : `${BASE}/pt/plans/th_${cv}/page_${page}/`;

    const listingHtml = await fetchHtml(listingUrl);
    const maxPage = extractMaxPage(listingHtml);
    const paths = extractDetailPaths(listingHtml, cv);

    // Normalmente há cerca de 12 layouts por página.
    const items = await Promise.all(
      paths.slice(0, 20).map(path => parseDetail(path, cv))
    );

    res.setHeader(
      "Cache-Control",
      "s-maxage=1800, stale-while-revalidate=86400"
    );

    return res.status(200).json({
      cv,
      page,
      maxPage,
      count: items.length,
      source: listingUrl,
      items
    });
  } catch (error) {
    console.error(error);

    return res.status(502).json({
      error:
        "Não foi possível carregar os layouts da fonte pública neste momento.",
      details: error.message
    });
  }
}
