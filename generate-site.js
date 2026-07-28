#!/usr/bin/env node
/**
 * 精选账号商城 · 高端复古独立站生成器
 * 风格：Art Deco · 暖金 · 衬线 · 质感纸纹
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const DIST_DIR = path.join(__dirname, 'dist');

function loadJSON(name) {
    const fp = path.join(DATA_DIR, name);
    if (!fs.existsSync(fp)) return null;
    return JSON.parse(fs.readFileSync(fp, 'utf8'));
}

function esc(s) { return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function fixImg(url, base) {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    if (url.startsWith('/')) return base + url;
    return url;
}

// ── SEO 配置 ──
function loadRootJSON(name) {
    const fp = path.join(__dirname, name);
    if (!fs.existsSync(fp)) return null;
    return JSON.parse(fs.readFileSync(fp, 'utf8'));
}
const SEO = loadRootJSON('seo.json') || {};
const SEO_KEYWORDS = SEO.keywords || '';
const SEO_DESC = SEO.description || '';
const SITE_TITLE = SEO.title || '精选账号商城';
const SEO_TITLE_SUFFIX = SEO.titleSuffix || '';
const SEO_AUTHOR = SEO.author || SITE_TITLE;
const SEO_ROBOTS = SEO.robots || 'index, follow';
const SEO_CANONICAL = SEO.canonical || '';
const SEO_OG = SEO.og || {};
const SEO_TWITTER = SEO.twitter || {};
const SEO_JSON_LD = SEO.jsonLd || {};
const SEO_FAVICON = SEO.favicon || '';

// ── CSS (Art Deco Retro Style) ──
const CSS = `
:root {
  --bg-deep:#0c0a08;--bg-page:#110f0b;--bg-card:rgba(26,22,16,0.85);--bg-card-hover:rgba(36,30,20,0.95);
  --gold-1:#d4af69;--gold-2:#c9a84c;--gold-3:#e8d5a3;--gold-4:#f5e6c0;
  --cream:#f0e6d3;--cream-soft:#d8ccb5;--parchment:#c4b89a;
  --burgundy:#8b2f3a;
  --text-primary:#f0e6d3;--text-secondary:#b8a88a;--text-muted:#7a6d58;
  --border:rgba(212,175,105,0.12);--border-hover:rgba(212,175,105,0.35);--border-deco:rgba(212,175,105,0.2);
  --font-display:'Playfair Display','Noto Serif SC','STSong','SimSun',serif;
  --font-body:'Cormorant Garamond','Noto Serif SC','STSong',serif;
  --font-cn:'Noto Serif SC','STSong','SimSun',serif;
  --radius:4px;--radius-lg:8px;
  --shadow-card:0 2px 20px rgba(0,0,0,0.4),inset 0 1px 0 rgba(212,175,105,0.06);
  --shadow-gold:0 0 40px rgba(212,175,105,0.08);
  --max-w:1200px;--ease-out:cubic-bezier(0.22,1,0.36,1);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:var(--font-body);background:var(--bg-deep);color:var(--text-primary);line-height:1.8;min-height:100vh;overflow-x:hidden;-webkit-font-smoothing:antialiased;font-size:17px;letter-spacing:0.01em}
.paper-texture{position:fixed;inset:0;pointer-events:none;z-index:0;background:url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E") repeat,radial-gradient(ellipse at 30% 20%,rgba(212,175,105,0.04) 0%,transparent 60%),radial-gradient(ellipse at 70% 80%,rgba(139,47,58,0.03) 0%,transparent 60%)}
.hero-glow{position:absolute;top:-120px;left:50%;transform:translateX(-50%);width:1000px;height:500px;pointer-events:none;background:radial-gradient(ellipse,rgba(212,175,105,0.08) 0%,transparent 70%);z-index:0}
a{color:var(--gold-2);text-decoration:none;transition:color .3s var(--ease-out)}a:hover{color:var(--gold-4)}
img{max-width:100%;height:auto;display:block}
.container{max-width:var(--max-w);margin:0 auto;padding:0 32px;position:relative;z-index:1}
.header{position:sticky;top:0;z-index:1000;height:76px;background:rgba(12,10,8,0.92);backdrop-filter:blur(24px) saturate(1.2);-webkit-backdrop-filter:blur(24px) saturate(1.2);border-bottom:1px solid var(--border);transition:background .4s}
.header.scrolled{background:rgba(12,10,8,0.98)}
.header-inner{max-width:var(--max-w);margin:0 auto;padding:0 32px;height:100%;display:flex;align-items:center;justify-content:space-between}
.logo-area{display:flex;align-items:center;gap:16px}
.logo-mark{height:44px;border-radius:6px;overflow:hidden;border:1.5px solid var(--border-deco);box-shadow:0 0 20px rgba(212,175,105,0.1);flex-shrink:0}
.logo-mark img{height:100%;width:auto;border-radius:4px;display:block}
.logo-text-group{display:flex;flex-direction:column;gap:2px}
.logo-text{font-family:var(--font-display);font-size:1.2rem;font-weight:700;letter-spacing:0.08em;color:var(--gold-1);text-shadow:0 0 20px rgba(212,175,105,0.2)}
.logo-sub{font-size:.7rem;color:var(--text-muted);letter-spacing:.3px}
.logo-sub a{color:var(--text-muted)}.logo-sub a:hover{color:var(--gold-2)}
.header-actions{display:flex;align-items:center;gap:14px}
.header-badge-sm{display:flex;align-items:center;gap:7px;padding:6px 16px;border-radius:2px;border:1px solid rgba(212,175,105,0.15);font-size:.72rem;color:var(--gold-2);font-weight:500;letter-spacing:0.08em}
.pulse-dot{width:6px;height:6px;border-radius:50%;background:var(--gold-2);box-shadow:0 0 8px rgba(212,175,105,0.4);animation:pulse 2.5s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.4)}}
.header-pill{padding:10px 28px;border-radius:2px;font-family:var(--font-display);font-size:.78rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;background:transparent;color:var(--gold-1);border:1.5px solid var(--gold-2);transition:all .4s var(--ease-out);position:relative;overflow:hidden}
.header-pill::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,var(--gold-1),var(--gold-2));opacity:0;transition:opacity .4s}
.header-pill:hover{color:var(--bg-deep);border-color:var(--gold-1);transform:translateY(-1px);box-shadow:0 4px 20px rgba(212,175,105,0.25)}
.header-pill:hover::before{opacity:1}
.header-pill span{position:relative;z-index:1}
.hero{position:relative;padding:100px 32px 60px;text-align:center;overflow:hidden}
.deco-line{display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:32px}
.deco-line .line{width:60px;height:1px;background:linear-gradient(90deg,transparent,var(--gold-2),transparent)}
.deco-line .diamond{width:8px;height:8px;transform:rotate(45deg);border:1.5px solid var(--gold-2);opacity:0.7}
.hero-badge{display:inline-flex;align-items:center;gap:10px;padding:10px 28px;border-radius:2px;margin-bottom:36px;border:1px solid var(--border-deco);font-family:var(--font-display);font-size:.78rem;color:var(--gold-2);font-weight:500;letter-spacing:0.2em;text-transform:uppercase;backdrop-filter:blur(10px)}
.hero-badge .badge-dot{width:8px;height:8px;border-radius:50%;background:var(--gold-2);box-shadow:0 0 12px rgba(212,175,105,0.4)}
.hero h1{font-family:var(--font-display);font-size:clamp(2.4rem,6vw,4.2rem);font-weight:700;letter-spacing:0.04em;line-height:1.2;margin-bottom:24px;color:var(--cream)}
.hero h1 .gold-text{color:var(--gold-1);text-shadow:0 0 40px rgba(212,175,105,0.2)}
.hero h1 .italic{font-style:italic;font-weight:400;color:var(--gold-3)}
.hero-desc{font-family:var(--font-body);font-size:1.15rem;color:var(--text-secondary);max-width:520px;margin:0 auto 56px;font-weight:400;line-height:2;font-style:italic}
.stats-row{display:flex;justify-content:center;gap:2px;flex-wrap:wrap;max-width:720px;margin:0 auto}
.stat-chip{display:flex;flex-direction:column;align-items:center;padding:24px 36px;border:1px solid var(--border);background:var(--bg-card);backdrop-filter:blur(10px);transition:all .4s var(--ease-out);position:relative}
.stat-chip::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:30px;height:1.5px;background:var(--gold-2);opacity:0.5}
.stat-chip:hover{border-color:var(--border-hover);background:var(--bg-card-hover);transform:translateY(-2px);box-shadow:var(--shadow-gold)}
.stat-chip .stat-num{font-family:var(--font-display);font-size:2rem;font-weight:700;color:var(--gold-1);letter-spacing:0.02em;line-height:1.2}
.stat-chip .stat-label{font-family:var(--font-display);font-size:.7rem;color:var(--text-muted);font-weight:500;letter-spacing:0.2em;text-transform:uppercase;margin-top:4px}
.filter-section{padding:0 0 24px}
.filter-bar{display:flex;flex-wrap:wrap;justify-content:center;gap:6px}
.filter-btn{padding:11px 28px;border-radius:2px;cursor:pointer;font-family:var(--font-display);font-size:.78rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;transition:all .35s var(--ease-out);background:transparent;color:var(--text-muted);border:1px solid var(--border);user-select:none}
.filter-btn:hover{color:var(--gold-2);border-color:var(--border-hover);background:rgba(212,175,105,0.04)}
.filter-btn.active{color:var(--bg-deep);background:linear-gradient(135deg,var(--gold-1),var(--gold-2));border-color:var(--gold-1);box-shadow:0 2px 16px rgba(212,175,105,0.2)}
.products-section{padding:24px 0 80px}
.products-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px}
.product-card{position:relative;display:block;background:var(--bg-card);border:1px solid var(--border);overflow:hidden;transition:all .5s var(--ease-out);cursor:pointer;text-decoration:none;color:inherit;backdrop-filter:blur(8px)}
.product-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold-2),transparent);opacity:0;transition:opacity .4s;z-index:3}
.product-card:hover{transform:translateY(-6px);border-color:var(--border-hover);box-shadow:0 12px 40px rgba(0,0,0,0.4),0 0 30px rgba(212,175,105,0.06)}
.product-card:hover::before{opacity:1}
.card-img-wrap{position:relative;overflow:hidden;height:200px;background:#1a1610}
.card-img-wrap img{width:100%;height:100%;object-fit:cover;transition:transform .7s var(--ease-out);filter:sepia(0.1) saturate(0.9)}
.product-card:hover .card-img-wrap img{transform:scale(1.06);filter:sepia(0) saturate(1)}
.card-img-wrap::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(12,10,8,0.7) 100%)}
.card-tag{position:absolute;top:16px;left:16px;z-index:2;padding:5px 16px;font-family:var(--font-display);font-size:.68rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;background:rgba(12,10,8,0.8);color:var(--gold-1);border:1px solid var(--border-deco);backdrop-filter:blur(8px)}
.card-body{position:relative;padding:22px 24px;z-index:1}
.card-cat{font-family:var(--font-display);font-size:.65rem;color:var(--gold-2);font-weight:600;text-transform:uppercase;letter-spacing:0.2em;margin-bottom:10px}
.card-title{font-family:var(--font-cn);font-size:.92rem;font-weight:500;line-height:1.7;margin-bottom:18px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;color:var(--cream-soft);min-height:3em}
.card-footer{display:flex;align-items:center;justify-content:space-between;padding-top:16px;border-top:1px solid var(--border)}
.card-price{font-family:var(--font-display);font-size:1.3rem;font-weight:700}
.card-price .from{font-size:.65rem;font-weight:400;color:var(--text-muted);margin-right:3px;font-family:var(--font-cn);letter-spacing:0.05em}
.card-price .amount{color:var(--gold-1);text-shadow:0 0 16px rgba(212,175,105,0.15)}
.card-cta{width:36px;height:36px;display:flex;align-items:center;justify-content:center;color:var(--gold-2);font-size:.9rem;border:1px solid var(--border);transition:all .35s var(--ease-out)}
.product-card:hover .card-cta{background:linear-gradient(135deg,var(--gold-1),var(--gold-2));color:var(--bg-deep);border-color:var(--gold-1);box-shadow:0 0 16px rgba(212,175,105,0.2);transform:translateX(3px)}
.features-section{padding:40px 0 80px}
.features-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}
.feature-card{background:var(--bg-card);border:1px solid var(--border);padding:36px 28px;text-align:center;transition:all .45s var(--ease-out);position:relative}
.feature-card::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:40px;height:1.5px;background:var(--gold-2);opacity:0.4;transition:width .4s var(--ease-out)}
.feature-card:hover{border-color:var(--border-hover);transform:translateY(-4px);box-shadow:var(--shadow-card)}
.feature-card:hover::before{width:80px}
.feature-icon{width:60px;height:60px;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;font-size:1.6rem;border:1.5px solid var(--border-deco);background:rgba(212,175,105,0.03);transition:all .3s}
.feature-card:hover .feature-icon{border-color:var(--border-hover);box-shadow:0 0 20px rgba(212,175,105,0.1)}
.feature-card h3{font-family:var(--font-display);font-size:1rem;font-weight:600;margin-bottom:10px;color:var(--cream);letter-spacing:0.06em}
.feature-card p{font-family:var(--font-body);font-size:.88rem;color:var(--text-secondary);font-weight:400;line-height:1.8;font-style:italic}
.cta-section{padding:0 0 80px}
.cta-banner{position:relative;overflow:hidden;padding:72px 48px;background:linear-gradient(135deg,rgba(212,175,105,0.06),rgba(139,47,58,0.04));border:1px solid var(--border-deco);text-align:center}
.cta-banner::before,.cta-banner::after{content:'';position:absolute;width:120px;height:1px;background:linear-gradient(90deg,transparent,var(--gold-2),transparent);left:50%;transform:translateX(-50%)}
.cta-banner::before{top:24px}
.cta-banner::after{bottom:24px}
.cta-banner h2{font-family:var(--font-display);font-size:clamp(1.5rem,3vw,2.2rem);font-weight:600;margin-bottom:14px;letter-spacing:0.04em;color:var(--cream)}
.cta-banner p{color:var(--text-secondary);font-size:1rem;margin-bottom:32px;font-style:italic;font-family:var(--font-body)}
.cta-btn{display:inline-flex;align-items:center;gap:10px;padding:16px 44px;border-radius:2px;font-family:var(--font-display);font-size:.85rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;background:linear-gradient(135deg,var(--gold-1),var(--gold-2));color:var(--bg-deep);transition:all .4s var(--ease-out);box-shadow:0 4px 24px rgba(212,175,105,0.2);position:relative}
.cta-btn:hover{transform:translateY(-2px);box-shadow:0 8px 40px rgba(212,175,105,0.35);color:var(--bg-deep)}
.footer{position:relative;text-align:center;padding:56px 32px 48px;border-top:1px solid var(--border)}
.footer-deco{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:28px}
.footer-deco .line{width:50px;height:1px;background:linear-gradient(90deg,transparent,var(--gold-2),transparent)}
.footer-deco .diamond{width:6px;height:6px;transform:rotate(45deg);background:var(--gold-2);opacity:0.5}
.footer p{color:var(--text-muted);font-size:.78rem;line-height:1.8;font-family:var(--font-body)}
.footer a{color:var(--text-muted);transition:color .3s}.footer a:hover{color:var(--gold-2)}
.footer-links{margin-bottom:16px}
.footer-links a{display:inline-flex;align-items:center;gap:8px;padding:10px 28px;border-radius:2px;background:transparent;border:1px solid var(--border);color:var(--text-secondary);font-family:var(--font-display);font-size:.78rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;transition:all .35s}
.footer-links a:hover{border-color:var(--border-hover);color:var(--gold-2);transform:translateY(-1px);box-shadow:0 4px 16px rgba(0,0,0,0.3)}
@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
.anim{opacity:0;animation:fadeUp .7s var(--ease-out) forwards}
.anim-d1{animation-delay:.08s}.anim-d2{animation-delay:.16s}.anim-d3{animation-delay:.24s}
.anim-d4{animation-delay:.32s}.anim-d5{animation-delay:.4s}.anim-d6{animation-delay:.48s}
.reveal{opacity:0;transform:translateY(28px);transition:all .7s var(--ease-out)}
.reveal.visible{opacity:1;transform:translateY(0)}
@media(max-width:768px){
  .hero{padding:60px 16px 40px}.hero h1{font-size:2rem}
  .hero-desc{font-size:1rem;margin-bottom:40px}
  .stats-row{gap:2px}.stat-chip{padding:18px 24px}.stat-chip .stat-num{font-size:1.5rem}
  .products-grid{grid-template-columns:repeat(2,1fr);gap:12px}
  .card-img-wrap{height:150px}.card-body{padding:16px}.card-title{font-size:.84rem;min-height:auto}
  .card-price{font-size:1.1rem}.header-badge-sm{display:none}.container{padding:0 16px}
  .features-grid{grid-template-columns:repeat(2,1fr);gap:12px}.feature-card{padding:24px 16px}
  .cta-banner{padding:48px 24px}.filter-bar{gap:6px}.filter-btn{padding:9px 18px;font-size:.72rem}
  .header-pill{padding:8px 20px;font-size:.72rem}
}
@media(max-width:480px){
  .products-grid{grid-template-columns:repeat(2,1fr);gap:10px}
  .card-img-wrap{height:130px}.card-body{padding:12px}
  .card-tag{font-size:.6rem;padding:4px 10px;top:8px;left:8px}
  .card-cta{width:30px;height:30px;font-size:.75rem}
  .stat-chip{padding:14px 18px}.stat-chip .stat-num{font-size:1.2rem}.stat-chip .stat-label{font-size:.6rem}
  .logo-sub{display:none}
}
`;

const JS = `
function filterCategory(id, el) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
  document.querySelectorAll('.product-card').forEach((c, i) => {
    if (id === 'all' || c.dataset.cat == id) {
      c.style.display = '';
      c.style.opacity = '0'; c.style.transform = 'translateY(20px)';
      setTimeout(() => { c.style.transition = 'all .5s cubic-bezier(0.22,1,0.36,1)'; c.style.opacity = '1'; c.style.transform = 'translateY(0)'; }, i * 50);
    } else { c.style.display = 'none'; }
  });
}
window.addEventListener('scroll', () => { document.getElementById('header').classList.toggle('scrolled', window.scrollY > 20); });
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => { if (entry.isIntersecting) { setTimeout(() => entry.target.classList.add('visible'), i * 80); observer.unobserve(entry.target); } });
  }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
`;

function main() {
    const config = loadJSON('config.json') || {};
    const categories = loadJSON('categories.json') || [];
    const products = loadJSON('products.json') || [];
    const meta = loadJSON('meta.json') || {};

    if (!products.length) { console.error('❌ 没有商品数据'); process.exit(1); }

    const siteUrl = meta.siteUrl || process.env.SITE_URL;
    const siteName = SITE_TITLE;
    const GITHUB_PAGES_URL = process.env.GITHUB_PAGES_URL;

    if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true });

    function shortCatName(name) {
        return name
            .replace(/谷歌美国电话\/?/i, '')
            .replace(/GoogleVoice\s*\/?\s*GV靓号/i, 'GV靓号')
            .replace(/谷歌邮箱\s*\/?\s*油管\s*\/?\s*Google\s*\/?\s*Gmail/i, '谷歌邮箱')
            .replace(/苹果id\s*\/?\s*Apple\s*id\s*\/?\s*AppStore/i, '苹果ID')
            .replace(/服务类/i, '服务类')
            .trim() || name;
    }

    const activeCats = categories.filter(c => products.some(p => p.category_id === c.id));
    const catBtns = activeCats
        .sort((a, b) => (b.sort || 0) - (a.sort || 0))
        .map(c => `<div class="filter-btn" onclick="filterCategory(${c.id}, this)">${esc(shortCatName(c.name))}</div>`)
        .join('\n            ');

    const cards = products.filter(p => p.active !== 0).sort((a, b) => (b.sort||0) - (a.sort||0)).map((p, i) => {
        const cat = categories.find(c => c.id === p.category_id);
        const catName = cat ? shortCatName(cat.name) : '';
        const img = p.image_url ? fixImg(p.image_url, siteUrl) : '';
        const variants = p.variants || [];
        const minPrice = variants.length ? Math.min(...variants.map(v => v.price)) : 0;
        const tags = (p.tags || '').split(',').map(t => t.trim()).filter(Boolean);
        const cleanTag = t => t.replace(/b[12]#[0-9a-fA-F]{3,6}/g, '').replace(/#[0-9a-fA-F]{3,6}$/g, '').replace(/\s+/g, ' ').trim();
        const tagLabel = cleanTag(tags[0] || '');

        return `
            <a class="product-card reveal" href="${siteUrl}/product?id=${p.id}" target="_blank" rel="noopener" data-cat="${p.category_id}">
                <div class="card-img-wrap">
                    ${img ? `<img src="${esc(img)}" alt="${esc(p.name)}" loading="lazy">` : ''}
                    ${tagLabel ? `<div class="card-tag">${esc(tagLabel)}</div>` : ''}
                </div>
                <div class="card-body">
                    <div class="card-cat">${esc(catName)}</div>
                    <div class="card-title">${esc(p.name)}</div>
                    <div class="card-footer">
                        <div class="card-price"><span class="from">起</span><span class="amount">¥${minPrice.toFixed(2)}</span></div>
                        <div class="card-cta">→</div>
                    </div>
                </div>
            </a>`;
    }).join('\n');

    const ogImage = products[0]?.image_url ? fixImg(products[0].image_url, siteUrl) : (meta.siteLogo ? fixImg(meta.siteLogo, siteUrl) : '');

    const jsonLd = { "@context": "https://schema.org", "@type": "WebSite", "name": siteName, "description": SEO_DESC, "url": GITHUB_PAGES_URL, "potentialAction": { "@type": "SearchAction", "target": `${siteUrl}/product?id={search_term_string}`, "query-input": "required name=search_term_string" } };
    const itemListLd = { "@context": "https://schema.org", "@type": "ItemList", "itemListElement": products.filter(p => p.active !== 0).map((p, i) => ({ "@type": "ListItem", "position": i + 1, "item": { "@type": "Product", "name": p.name, "url": `${siteUrl}/product?id=${p.id}`, "image": p.image_url ? fixImg(p.image_url, siteUrl) : '', "offers": { "@type": "Offer", "price": p.variants?.length ? Math.min(...p.variants.map(v => v.price)) : 0, "priceCurrency": "CNY" } } })) };

    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(siteName)}${SEO_TITLE_SUFFIX ? ' - ' + esc(SEO_TITLE_SUFFIX) : ''}</title>
    <meta name="description" content="${esc(SEO_DESC)}">
    <meta name="keywords" content="${esc(SEO_KEYWORDS)}">
    <meta name="author" content="${esc(SEO_AUTHOR)}">
    <meta name="robots" content="${esc(SEO_ROBOTS)}">
    <meta name="googlebot" content="${esc(SEO_ROBOTS)}">
    ${SEO_CANONICAL ? `<link rel="canonical" href="${esc(SEO_CANONICAL)}">` : ''}
    <meta property="og:type" content="${esc(SEO_OG.type || 'website')}">
    <meta property="og:url" content="${esc(SEO_OG.url || GITHUB_PAGES_URL)}">
    <meta property="og:title" content="${esc(siteName)}">
    <meta property="og:description" content="${esc(SEO_DESC)}">
    ${ogImage ? `<meta property="og:image" content="${esc(ogImage)}">` : ''}
    <meta property="og:locale" content="${esc(SEO_OG.locale || 'zh_CN')}">
    <meta property="og:site_name" content="${esc(SEO_OG.siteName || siteName)}">
    <meta name="twitter:card" content="${esc(SEO_TWITTER.card || 'summary_large_image')}">
    <meta name="twitter:title" content="${esc(siteName)}">
    <meta name="twitter:description" content="${esc(SEO_DESC)}">
    ${ogImage ? `<meta name="twitter:image" content="${esc(ogImage)}">` : ''}
    <script type="application/ld+json">${JSON.stringify({...SEO_JSON_LD, ...jsonLd})}</script>
    <script type="application/ld+json">${JSON.stringify(itemListLd)}</script>
    ${SEO_FAVICON ? `<link rel="icon" href="${esc(SEO_FAVICON)}">` : ''}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500&family=Noto+Serif+SC:wght@200;300;400;500;600;700;900&display=swap" rel="stylesheet">
    <style>${CSS}</style>
</head>
<body>
<div class="paper-texture"></div>
<div class="hero-glow"></div>

<header class="header" id="header">
    <div class="header-inner">
        <div class="logo-area">
            <div class="logo-mark">
                <img src="${esc(fixImg(meta.siteLogo || '', siteUrl))}" alt="${esc(siteName)}">
            </div>
            <div class="logo-text-group">
                <div class="logo-text">${esc(siteName)}</div>
                <div class="logo-sub">商城原址：<a href="${siteUrl}" target="_blank" rel="noopener">${esc(siteUrl)}</a></div>
            </div>
        </div>
        <div class="header-actions">
            <div class="header-badge-sm"><div class="pulse-dot"></div>自动发货中</div>
            <a href="${siteUrl}" target="_blank" rel="noopener" class="header-pill"><span>进入商城</span></a>
        </div>
    </div>
</header>

<section class="hero">
    <div class="container">
        <div class="deco-line anim">
            <span class="line"></span>
            <span class="diamond"></span>
            <span class="line"></span>
        </div>
        <div class="hero-badge anim anim-d1"><div class="badge-dot"></div>全场自动发货 · 安全可靠</div>
        <h1 class="anim anim-d2">精选优质<br><span class="gold-text">数字账号</span> <span class="italic">资源</span></h1>
        <p class="hero-desc anim anim-d3">一站式解决账号与网站需求，稳定可靠，支持长期使用</p>
        <div class="stats-row">
            <div class="stat-chip anim anim-d3"><span class="stat-num">${categories.length}</span><span class="stat-label">分类</span></div>
            <div class="stat-chip anim anim-d4"><span class="stat-num">${products.filter(p=>p.active!==0).length}</span><span class="stat-label">商品</span></div>
            <div class="stat-chip anim anim-d5"><span class="stat-num">${products.reduce((s,p) => s + (p.variants?.length||0), 0)}</span><span class="stat-label">规格</span></div>
            <div class="stat-chip anim anim-d6"><span class="stat-num">24h</span><span class="stat-label">发货</span></div>
        </div>
    </div>
</section>

<div class="container filter-section">
    <div class="filter-bar">
        <div class="filter-btn active" onclick="filterCategory('all', this)">全部商品</div>
        ${catBtns}
    </div>
</div>

<section class="products-section">
    <div class="container">
        <div class="products-grid">
            ${cards}
        </div>
    </div>
</section>

<section class="features-section">
    <div class="container">
        <div class="features-grid">
            <div class="feature-card reveal"><div class="feature-icon">⚡</div><h3>即时发货</h3><p>付款后自动发货，无需等待人工处理</p></div>
            <div class="feature-card reveal"><div class="feature-icon">🛡️</div><h3>品质保障</h3><p>质保期内首登有问题免费更换</p></div>
            <div class="feature-card reveal"><div class="feature-icon">💎</div><h3>源头价格</h3><p>一手资源，拒绝中间商差价</p></div>
            <div class="feature-card reveal"><div class="feature-icon">🎯</div><h3>可选靓号</h3><p>支持自选号码，精准匹配需求</p></div>
        </div>
    </div>
</section>

<section class="cta-section">
    <div class="container">
        <div class="cta-banner reveal">
            <h2>找到你需要的账号了吗？</h2>
            <p>全场自动发货，安全可靠，支持长期使用</p>
            <a href="${siteUrl}" target="_blank" rel="noopener" class="cta-btn">立即前往商城</a>
        </div>
    </div>
</section>

<footer class="footer">
    <div class="container">
        <div class="footer-deco">
            <span class="line"></span>
            <span class="diamond"></span>
            <span class="line"></span>
        </div>
        <div class="footer-links"><a href="${siteUrl}" target="_blank" rel="noopener">✦ 进入商城</a></div>
        <p style="margin-bottom:6px">© ${new Date().getFullYear()} ${esc(siteName)} · 所有商品均为虚拟数字商品</p>
        <p>商城原址：<a href="${siteUrl}" target="_blank" rel="noopener">${esc(siteUrl)}</a></p>
    </div>
</footer>

<script>${JS}</script>
</body>
</html>`;

    fs.writeFileSync(path.join(DIST_DIR, 'index.html'), html);
    console.log(`✅ dist/index.html (${(Buffer.byteLength(html)/1024).toFixed(1)}KB)`);
    console.log(`   商品: ${products.filter(p=>p.active!==0).length} 个`);
    console.log(`   分类: ${activeCats.length} 个`);
    console.log(`   风格: Art Deco · 暖金 · 衬线 · 质感纸纹`);
    console.log(`   链接: 全部指向 ${siteUrl}/product?id=xxx`);
}

main();