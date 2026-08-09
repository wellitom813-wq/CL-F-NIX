const BACKEND = "http://140.82.29.131:3000";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");

  try {
    const response = await fetch(`${BACKEND}/clan`, {
      signal: AbortSignal.timeout(10000)
    });

    const text = await response.text();

    res.status(response.status);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.send(text);
  } catch (error) {
    return res.status(502).json({
      error: true,
      message: "Não foi possível conectar ao servidor Fênix.",
      detail: error.message
    });
  }
}
