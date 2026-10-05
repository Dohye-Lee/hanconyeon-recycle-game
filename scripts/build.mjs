import fs from 'node:fs';
fs.rmSync('dist',{recursive:true,force:true});fs.mkdirSync('dist/server',{recursive:true});fs.mkdirSync('dist/.openai',{recursive:true});
const page=fs.readFileSync('public/index.html','utf8'),avatar=fs.readFileSync('public/assets/heyi-avatar.png').toString('base64');
const catalog=Function(page.split('const ITEMS = [')[1].split('];')[0].replace(/^/, 'return [')+'];')().map(i=>({a:i.a,h:!!i.h}));const sounds=Object.fromEntries(['start','correct','wrong','finish'].map(k=>['/sounds/'+k+'.wav',fs.readFileSync('public/sounds/'+k+'.wav').toString('base64')]));
fs.writeFileSync('dist/server/index.js','const CATALOG='+JSON.stringify(catalog)+';\nconst SOUNDS='+JSON.stringify(sounds)+';\nconst PAGE='+JSON.stringify(page)+';\nconst AVATAR='+JSON.stringify(avatar)+';\n'+fs.readFileSync('worker/index.js','utf8'));fs.copyFileSync('.openai/hosting.json','dist/.openai/hosting.json');
