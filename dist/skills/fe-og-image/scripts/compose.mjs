#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const escape = (value = '') => String(value).replace(/[&<>'\x22]/g, c => `&#${c.charCodeAt(0)};`);
const mime = {'.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.ttf':'font/ttf','.otf':'font/otf','.woff':'font/woff','.woff2':'font/woff2'};
async function data(file, stretch = false) {
  const type = mime[extname(file).toLowerCase()];
  if (!type) throw new Error(`Unsupported asset type: ${extname(file)}`);
  let bytes = await readFile(file);
  if (stretch && type === 'image/svg+xml') bytes = Buffer.from(bytes.toString('utf8').replace('<svg ', '<svg preserveAspectRatio=\'none\' '));
  return `data:${type};base64,${bytes.toString('base64')}`;
}

export async function compose(brief, base) {
  if (!brief.headline?.trim()) throw new Error('headline is required');
  if (brief.image && !brief.imageAlt?.trim()) throw new Error('imageAlt is required for a supplied image');
  if (!brief.image && brief.visualSubject !== 'pottery') throw new Error('image is required unless visualSubject is pottery');
  if (brief.cta !== undefined && !brief.cta?.trim()) throw new Error('cta must contain a label');
  if (brief.cta && !brief.support?.trim()) throw new Error('support is required with cta');
  for (const key of ['fontRegular', 'fontBold', 'tokens']) if (!brief[key]) throw new Error(`${key} is required`);
  const position = brief.imagePosition ?? '50% 50%';
  if (brief.headlineSize && !['display', 'compact'].includes(brief.headlineSize)) throw new Error('headlineSize must be display or compact');
  const compact = brief.headlineSize === 'compact';
  if (!/^\d{1,3}(?:\.\d+)?% \d{1,3}(?:\.\d+)?%$/.test(position) || position.split(' ').some(p => Number.parseFloat(p) > 100)) throw new Error('imagePosition must be two percentages from 0 to 100');
  const tokenFile = JSON.parse(await readFile(resolve(base, brief.tokens), 'utf8'));
  const tokens = tokenFile.tokens.filter(t => t.surface === 'digital');
  const token = name => {
    const found = tokens.find(t => t.css === name);
    if (!found) throw new Error(`Missing digital token ${name}`);
    return found.value;
  };
  const family = token('--font-family-heading').split(',')[0].trim().replaceAll(String.fromCharCode(39), '').replaceAll(String.fromCharCode(34), '');
  const [regular, bold, logo, underline, visual] = await Promise.all([
    data(resolve(base, brief.fontRegular)), data(resolve(base, brief.fontBold)),
    data(resolve(here, '../assets/foreveryone-horizontal.png')),
    data(resolve(here, '../assets/doodle-underline.svg'), true),
    data(brief.image ? resolve(base, brief.image) : resolve(here, '../assets/pottery-line.svg')),
  ]);
  const cssVars = tokens.map(t => `${t.css}:${t.value};`).join('\n');
  return `<!doctype html>
<html lang='${escape(brief.language ?? 'en-GB')}'><head><meta charset='utf-8'><meta name='viewport' content='width=1200'><title>${escape(brief.headline)}</title>
<style>
@font-face{font-family:'${escape(family)}';font-weight:400;src:url('${regular}')}
@font-face{font-family:'${escape(family)}';font-weight:700;src:url('${bold}')}
:root{${cssVars}
--og-width:1200px;--og-height:630px;--og-inset:var(--spacing-16);--og-copy-width:600px;--og-visual-width:404px;--og-visual-height:${brief.cta ? '360px' : '388px'};--og-visual-top:var(${brief.cta ? '--spacing-24' : '--spacing-32'});--og-title-leading:1.05;--og-title-size:var(${compact ? '--font-size-3xl' : '--font-size-4xl'});--og-support-size:${brief.cta ? 'calc(var(--font-size-2xl) * 1.333333)' : 'var(--font-size-2xl)'};--og-logo-width:200px;--og-logo-bottom:${brief.cta ? '76px' : 'var(--og-inset)'};--og-cta-height:64px;--og-arrow-size:24px;--og-zero:0px;}
*{box-sizing:border-box}html,body{margin:var(--og-zero);width:var(--og-width);height:var(--og-height);background:var(--color-background-default)}
.card{position:relative;width:var(--og-width);height:var(--og-height);overflow:hidden;color:var(--color-brand-dark);font-family:var(--font-family-body);letter-spacing:var(--letter-spacing-normal)}
.copy{position:absolute;left:var(--og-inset);top:var(--spacing-32);width:var(--og-copy-width)}
.label{position:absolute;left:var(--og-inset);top:var(--og-inset);margin:var(--og-zero);font-size:var(--font-size-xl);line-height:var(--line-height-normal)}
h1{margin:var(--og-zero);font-family:var(--font-family-heading);font-size:var(--og-title-size);font-weight:var(--font-weight-bold);line-height:var(--og-title-leading);overflow-wrap:normal}
.underline{height:var(--spacing-4);width:100%;margin-block:var(--spacing-4);background:var(--color-brand-primary);mask:url('${underline}') center/100% 100% no-repeat}
.support{margin:var(--og-zero);font-size:var(--og-support-size);line-height:var(--line-height-normal)}
.visual{position:absolute;right:var(--og-inset);top:var(--og-visual-top);width:var(--og-visual-width);height:var(--og-visual-height);object-fit:cover;object-position:${position};border-radius:43% 57% 51% 49% / 39% 43% 57% 61%}
.illustration{object-fit:contain;border-radius:var(--og-zero);padding:var(--spacing-8)}
.logo{position:absolute;left:var(--og-inset);bottom:var(--og-logo-bottom);width:var(--og-logo-width);height:auto}
.cta{position:absolute;right:var(--og-inset);bottom:var(--og-inset);height:var(--og-cta-height);display:flex;align-items:center;gap:var(--spacing-4);padding-inline:var(--spacing-8);border-radius:var(--radius-pill);background:var(--color-brand-secondary);color:var(--color-base-white);font-size:var(--font-size-2xl);font-weight:var(--font-weight-bold);line-height:var(--line-height-normal);white-space:nowrap}
.cta svg{width:var(--og-arrow-size);height:var(--og-arrow-size);flex:none}
</style></head><body><main class='card' aria-label='${escape(brief.headline)}'>
${brief.label ? `<p class='label'>${escape(brief.label)}</p>` : ''}
<div class='copy'><h1>${escape(brief.headline)}</h1><div class='underline' aria-hidden='true'></div>${brief.support ? `<p class='support'>${escape(brief.support)}</p>` : ''}</div>
<img class='visual${brief.image ? '' : ' illustration'}' src='${visual}' alt='${escape(brief.imageAlt ?? (brief.image ? '' : 'Pottery illustration'))}'>
<img class='logo' src='${logo}' alt='ForEveryone'>
${brief.cta ? `<span class='cta'>${escape(brief.cta)}<svg viewBox='0 0 24 24' aria-hidden='true'><path d='M4 12h15m-6-6 6 6-6 6' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg></span>` : ''}
</main><script>
window.feOgValidate=async()=>{
 const issues=[];
 try{await Promise.all([document.fonts.load('400 16px '+${JSON.stringify(family)}),document.fonts.load('700 16px '+${JSON.stringify(family)})])}catch{issues.push('Required font failed to load')}
 await document.fonts.ready;
 for(const img of document.images)try{await img.decode()}catch{issues.push('Image failed to decode')}
 const family=${JSON.stringify(family)};
 const faces=Array.from(document.fonts);
 for(const weight of ['400','700'])if(!faces.some(f=>f.family.replaceAll(String.fromCharCode(34),'').replaceAll(String.fromCharCode(39),'')===family&&f.weight===weight&&f.status==='loaded'))issues.push('Required font failed: '+weight);
 const box=s=>document.querySelector(s).getBoundingClientRect();
 const title=box('h1'),copy=box('.copy'),logo=box('.logo'),visual=box('.visual');
 if(title.height>${compact ? 4 : 3}*parseFloat(getComputedStyle(document.querySelector('h1')).lineHeight)+1)issues.push('Headline exceeds line budget; use compact size for exact long copy, or obtain approved shorter copy');
 if(document.querySelector('h1').scrollWidth>title.width+1)issues.push('Headline overflows horizontally');
 if(copy.bottom>logo.top-24)issues.push('Shorten copy: logo clear space collision');
 if(copy.right>visual.left-24)issues.push('Copy and visual clear space collision');
 if(copy.top<64||copy.bottom>566||visual.bottom>566)issues.push('Content exceeds safe inset');
 if(document.querySelector('.cta')){
  const cta=box('.cta');
  if(cta.left<logo.right+24||cta.top<visual.bottom+24)issues.push('CTA clear space collision');
  if(cta.right>1136||cta.bottom>566||cta.left<64||cta.top<64)issues.push('CTA exceeds safe inset');
 }
 return {ok:issues.length===0,issues,width:1200,height:630};
};
</script></body></html>`;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const [input, output] = process.argv.slice(2);
    if (!input || !output) throw new Error('Usage: node compose.mjs brief.json card.html');
    const brief = JSON.parse(await readFile(resolve(input), 'utf8'));
    const html = await compose(brief, dirname(resolve(input)));
    await writeFile(resolve(output), html, {flag:'wx'});
    console.log(resolve(output));
  } catch (error) { console.error(error.message); process.exitCode=1; }
}
