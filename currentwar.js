const CLAN_TAG = "#VJ8GGLR8";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");

  const token = process.env.CLASH_API_TOKEN;

  if (!token) {
    return res.status(500).json({
      message: "CLASH_API_TOKEN não foi configurado na Vercel."
    });
  }

  try {
    const tag = encodeURIComponent(CLAN_TAG);

    const resposta = await fetch(
      `https://api.clashofclans.com/v1/clans/${tag}/currentwar`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      }
    );

    const dados = await resposta.json();

    if (!resposta.ok) {
      return res.status(resposta.status).json({
        message: dados?.message || "Erro ao consultar a guerra atual.",
        reason: dados?.reason || null
      });
    }

    return res.status(200).json(dados);
  } catch (erro) {
    return res.status(500).json({
      message: "Erro interno ao consultar a guerra atual."
    });
  }
}
