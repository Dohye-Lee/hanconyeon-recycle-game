// Vercel uses the published game's shared ranking and room storage.
const upstream = 'https://hanconyeon-recycle-game.leedohye.chatgpt.site';
export default async function handler(req, res) {
  const path = typeof req.query.path === 'string' ? req.query.path : '';
  if (!/^(ranking|rooms(?:\/[A-Z0-9]{6}(?:\/ranking)?)?)$/.test(path)) {
    return res.status(404).json({error:'요청한 기능을 찾을 수 없어요.'});
  }
  if (!['GET','POST'].includes(req.method)) {
    res.setHeader('Allow','GET, POST');
    return res.status(405).end();
  }
  const origin = req.headers.origin;
  if (req.method === 'POST' && origin && origin !== `https://${req.headers.host}`) {
    return res.status(403).json({error:'다른 사이트의 요청은 허용하지 않아요.'});
  }
  const target = new URL('/api/' + path, upstream);
  for (const key of ['total']) {
    if (typeof req.query[key] === 'string') target.searchParams.set(key, req.query[key]);
  }
  const body = req.method === 'POST' ? (typeof req.body === 'string' ? req.body : JSON.stringify(req.body ?? {})) : undefined;
  if (body && Buffer.byteLength(body) > 16384) return res.status(413).json({error:'요청이 너무 커요.'});
  try {
    const response = await fetch(target, {
      method:req.method,
      headers:{'Content-Type':'application/json',Origin:upstream},
      body,
      signal:AbortSignal.timeout(10000)
    });
    res.setHeader('Content-Type','application/json; charset=utf-8');
    res.setHeader('Cache-Control','no-store');
    return res.status(response.status).send(await response.text());
  } catch {
    return res.status(503).json({error:'잠시 연결할 수 없어요. 다시 시도해주세요.'});
  }
}
