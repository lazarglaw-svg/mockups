const RAW_INDEX = 'https://raw.githubusercontent.com/lazarglaw-svg/mockups/main/wind-wave/index.html';

const PATCH = `
<style id="v67-iphone-hero-visible-handoff">
/* V67: keep the photo visible to the real bottom of the mobile hero.
   The transition now happens mostly BELOW the hero instead of covering it. */
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
      linear-gradient(
        180deg,
        rgba(3,10,14,.08) 0%,
        rgba(3,10,14,0) 58%,
        rgba(52,111,119,0) 82%,
        rgba(52,111,119,.10) 94%,
        rgba(52,111,119,.20) 100%
      ),
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

  /* At the actual hero bottom this layer is still transparent.
     It only becomes teal underneath the image. */
  .hero::after {
    content: "" !important;
    display: block !important;
    position: absolute !important;
    left: 0 !important;
    right: 0 !important;
    bottom: -170px !important;
    height: 220px !important;
    z-index: 34 !important;
    pointer-events: none !important;
    background: linear-gradient(
      180deg,
      rgba(52,111,119,0) 0%,
      rgba(52,111,119,0) 34%,
      rgba(52,111,119,.10) 50%,
      rgba(52,111,119,.36) 68%,
      rgba(52,111,119,.72) 86%,
      #346f77 100%
    ) !important;
  }

  /* Clearly on the photograph, not in the transition area. */
  .hero-overlay-v33 {
    position: absolute !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 56px !important;
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

  /* USP block starts just below the photo and floats on the handoff. */
  .hero-trust-strip-v33 {
    position: absolute !important;
    left: 50% !important;
    bottom: -126px !important;
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
    top: 98px !important;
  }
}

@supports (-webkit-touch-callout: none) {
  @media (max-width: 820px) and (orientation: portrait) {
    .hero {
      min-height: 0 !important;
      max-height: none !important;
      height: 177.7777778vw !important;
      background-size: 100% 100%, 100% 100% !important;
    }
  }
}
</style>`;

const IOS_SCRIPT = `
<script id="v67-ios-runtime-fix">
(function () {
  var ua = navigator.userAgent || '';
  var isiOS = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (!isiOS) return;

  function applyIOSHeroFix() {
    if (window.innerWidth > 820 || window.innerWidth > window.innerHeight) return;

    var hero = document.querySelector('.hero');
    var overlay = document.querySelector('.hero-overlay-v33');
    var trust = document.querySelector('.hero-trust-strip-v33');
    var liked = document.querySelector('.liked');
    if (!hero) return;

    var w = document.documentElement.clientWidth || window.innerWidth;
    var h = Math.round(w * 16 / 9);

    hero.style.setProperty('height', h + 'px', 'important');
    hero.style.setProperty('min-height', '0px', 'important');
    hero.style.setProperty('max-height', 'none', 'important');
    hero.style.setProperty('margin-bottom', '0px', 'important');
    hero.style.setProperty('background-size', '100% 100%, 100% 100%', 'important');
    hero.style.setProperty('background-position', 'center top, center top', 'important');

    if (overlay) {
      overlay.style.setProperty('bottom', '56px', 'important');
      overlay.style.setProperty('z-index', '52', 'important');
    }

    if (trust) {
      trust.style.setProperty('bottom', '-126px', 'important');
      trust.style.setProperty('z-index', '56', 'important');
    }

    if (liked) {
      liked.style.setProperty('padding-top', '154px', 'important');
      liked.style.setProperty('margin-top', '0px', 'important');
    }
  }

  applyIOSHeroFix();
  window.addEventListener('load', applyIOSHeroFix, { once: true });
  window.addEventListener('orientationchange', function () { setTimeout(applyIOSHeroFix, 220); });
  window.addEventListener('resize', function () {
    clearTimeout(window.__wwIOSFix67);
    window.__wwIOSFix67 = setTimeout(applyIOSHeroFix, 100);
  });
})();
</script>`;

export default async function handler(req, res) {
  try {
    const response = await fetch(`${RAW_INDEX}?v=${Date.now()}`, {
      headers: { 'User-Agent': 'wind-wave-preview-v67' },
      cache: 'no-store'
    });

    if (!response.ok) {
      res.status(response.status).send('Unable to load preview');
      return;
    }

    let html = await response.text();
    html = html.replace('</head>', `${PATCH}\n</head>`);
    html = html.replace('</body>', `${IOS_SCRIPT}\n</body>`);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    res.setHeader('Surrogate-Control', 'no-store');
    res.setHeader('X-Wind-Wave-Version', 'v67-visible-hero');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).send('Unable to load preview');
  }
}
