const RAW_INDEX = 'https://raw.githubusercontent.com/lazarglaw-svg/mockups/main/wind-wave/index.html';

const PATCH = `
<style id="v68-hero-structure-fix">
@media (max-width: 820px) and (orientation: portrait) {
  .hero {
    position: relative !important;
    width: 100% !important;
    height: 177.7777778vw !important;
    min-height: 0 !important;
    max-height: none !important;
    aspect-ratio: 9 / 16 !important;
    margin: 0 !important;
    overflow: visible !important;
    background-image:
      linear-gradient(180deg, rgba(3,10,14,.08) 0%, rgba(3,10,14,0) 76%, rgba(52,111,119,.08) 94%, rgba(52,111,119,.16) 100%),
      url("assets/asset-fdf0bb84e597a671.webp") !important;
    background-size: 100% 100%, 100% 100% !important;
    background-position: center top, center top !important;
    background-repeat: no-repeat, no-repeat !important;
    background-color: #346f77 !important;
  }

  .hero::before {
    content: none !important;
    display: none !important;
  }

  .hero::after {
    content: "" !important;
    display: block !important;
    position: absolute !important;
    left: 0 !important;
    right: 0 !important;
    bottom: -150px !important;
    height: 190px !important;
    z-index: 34 !important;
    pointer-events: none !important;
    background: linear-gradient(180deg,
      rgba(52,111,119,0) 0%,
      rgba(52,111,119,.05) 30%,
      rgba(52,111,119,.28) 56%,
      rgba(52,111,119,.64) 78%,
      #346f77 100%) !important;
  }

  .hero-overlay-v33 {
    position: absolute !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 82px !important;
    z-index: 52 !important;
  }

  .hero-overlay-shell-v33 {
    width: 100% !important;
  }

  .hero-actions-v33 {
    width: calc(100% - 20px) !important;
    max-width: 520px !important;
    margin-inline: auto !important;
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 9px !important;
  }

  .hero-btn-v33 {
    min-width: 0 !important;
    min-height: 48px !important;
    padding-inline: 12px !important;
    font-size: 16px !important;
  }

  .hero-trust-strip-v33 {
    position: absolute !important;
    left: 50% !important;
    bottom: -124px !important;
    width: calc(100% - 18px) !important;
    max-width: 540px !important;
    transform: translateX(-50%) !important;
    z-index: 56 !important;
  }

  .hero-trust-grid-v33 {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 8px !important;
  }

  .hero-trust-grid-v33 > .hero-trust-card-v33:first-child {
    grid-column: 1 / -1 !important;
  }

  .liked {
    position: relative !important;
    margin-top: 0 !important;
    padding-top: 154px !important;
    border-top: 0 !important;
    background:
      radial-gradient(72vw 50vw at -10% 4%, rgba(206,230,241,.07), transparent 48%),
      linear-gradient(180deg, #346f77 0%, #327981 12%, #2e747b 32%, #286b72 100%) !important;
  }

  .liked::after {
    display: none !important;
    content: none !important;
  }

  .depth-anchor-18-v62 {
    top: 100px !important;
  }
}
</style>`;

const STRUCTURE_SCRIPT = `
<script id="v68-hero-structure-runtime">
(function () {
  function fixHeroStructure() {
    if (window.innerWidth > 820 || window.innerWidth > window.innerHeight) return;

    var hero = document.querySelector('.hero');
    var overlay = document.querySelector('.hero-overlay-v33');
    var trust = document.querySelector('.hero-trust-strip-v33');
    var liked = document.querySelector('.liked');
    if (!hero) return;

    /* Critical fix: make the CTA and USP blocks actual children of the hero.
       Then absolute positioning is guaranteed to use the hero image as containing block. */
    if (overlay && overlay.parentElement !== hero) hero.appendChild(overlay);
    if (trust && trust.parentElement !== hero) hero.appendChild(trust);

    var w = document.documentElement.clientWidth || window.innerWidth;
    var h = Math.round(w * 16 / 9);

    hero.style.setProperty('height', h + 'px', 'important');
    hero.style.setProperty('min-height', '0px', 'important');
    hero.style.setProperty('max-height', 'none', 'important');
    hero.style.setProperty('margin', '0px', 'important');
    hero.style.setProperty('background-size', '100% 100%, 100% 100%', 'important');
    hero.style.setProperty('background-position', 'center top, center top', 'important');

    if (overlay) {
      overlay.style.setProperty('position', 'absolute', 'important');
      overlay.style.setProperty('left', '0px', 'important');
      overlay.style.setProperty('right', '0px', 'important');
      overlay.style.setProperty('bottom', '82px', 'important');
      overlay.style.setProperty('z-index', '52', 'important');
    }

    if (trust) {
      trust.style.setProperty('position', 'absolute', 'important');
      trust.style.setProperty('left', '50%', 'important');
      trust.style.setProperty('bottom', '-124px', 'important');
      trust.style.setProperty('transform', 'translateX(-50%)', 'important');
      trust.style.setProperty('z-index', '56', 'important');
    }

    if (liked) {
      liked.style.setProperty('padding-top', '154px', 'important');
      liked.style.setProperty('margin-top', '0px', 'important');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixHeroStructure, { once: true });
  } else {
    fixHeroStructure();
  }
  window.addEventListener('load', fixHeroStructure, { once: true });
  window.addEventListener('orientationchange', function () { setTimeout(fixHeroStructure, 220); });
  window.addEventListener('resize', function () {
    clearTimeout(window.__wwHeroStructure68);
    window.__wwHeroStructure68 = setTimeout(fixHeroStructure, 100);
  });
})();
</script>`;

export default async function handler(req, res) {
  try {
    const response = await fetch(`${RAW_INDEX}?v=${Date.now()}`, {
      headers: { 'User-Agent': 'wind-wave-preview-v68' },
      cache: 'no-store'
    });

    if (!response.ok) {
      res.status(response.status).send('Unable to load preview');
      return;
    }

    let html = await response.text();
    html = html.replace('</head>', `${PATCH}\n</head>`);
    html = html.replace('</body>', `${STRUCTURE_SCRIPT}\n</body>`);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    res.setHeader('Surrogate-Control', 'no-store');
    res.setHeader('X-Wind-Wave-Version', 'v68-hero-structure');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).send('Unable to load preview');
  }
}
