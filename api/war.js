const API="https://api.clashofclans.com/v1";
const TAG=process.env.COC_CLAN_TAG || "#VJ8GGLR8";

export default async function handler(req,res){
  res.setHeader("Cache-Control","s-maxage=30, stale-while-revalidate=60");
  const token=process.env.COC_API_TOKEN;
  if(!token) return res.status(503).json({message:"COC_API_TOKEN não configurado na Vercel."});
  try{
    const url=`${API}/clans/${encodeURIComponent(TAG)}/currentwar`;
    const r=await fetch(url,{headers:{Authorization:`Bearer ${token}`,Accept:"application/json"}});
    const text=await r.text();
    let data;try{data=JSON.parse(text)}catch{data={message:text}}
    if(!r.ok) return res.status(r.status).json({message:data.message||"Erro na API do Clash of Clans",reason:data.reason||null,status:r.status});
    return res.status(200).json(data);
  }catch(e){return res.status(500).json({message:"Erro interno ao consultar a guerra.",detail:e.message})}
}