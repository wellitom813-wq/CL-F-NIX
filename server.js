require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;
const CLAN_TAG = process.env.COC_CLAN_TAG || "#VJ8GGLR8";
const TOKEN = process.env.COC_API_TOKEN;

const allowedOrigins = [
  "https://cl-f-nix.vercel.app",
  "http://localhost:3000",
  "http://127.0.0.1:3000"
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origem não permitida pelo CORS"));
    }
  })
);

app.use(express.json());

async function clashRequest(path) {
  if (!TOKEN) {
    const err = new Error("COC_API_TOKEN não configurado");
    err.status = 503;
    throw err;
  }

  const response = await fetch(`https://api.clashofclans.com/v1${path}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/json"
    }
  });

  const text = await response.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { message: text || "Resposta inválida da API" };
  }

  if (!response.ok) {
    const err = new Error(
      data.message ||
      data.reason ||
      `Erro ${response.status} na API do Clash of Clans`
    );
    err.status = response.status;
    err.reason = data.reason;
    throw err;
  }

  return data;
}

app.get("/", (req, res) => {
  res.json({
    status: "online",
    name: "Fenix API",
    clanTag: CLAN_TAG
  });
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/clan", async (req, res) => {
  try {
    const tag = encodeURIComponent(CLAN_TAG);
    const data = await clashRequest(`/clans/${tag}`);
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({
      error: true,
      message: err.message,
      reason: err.reason || null
    });
  }
});

app.get("/war", async (req, res) => {
  try {
    const tag = encodeURIComponent(CLAN_TAG);
    const data = await clashRequest(`/clans/${tag}/currentwar`);
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({
      error: true,
      message: err.message,
      reason: err.reason || null
    });
  }
});

app.use((err, req, res, next) => {
  if (err && err.message === "Origem não permitida pelo CORS") {
    return res.status(403).json({
      error: true,
      message: "Origem não permitida"
    });
  }

  console.error(err);
  res.status(500).json({
    error: true,
    message: "Erro interno do servidor"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Fenix API rodando na porta ${PORT}`);
});
