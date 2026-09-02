const RAW_INDEX = 'https://raw.githubusercontent.com/lazarglaw-svg/mockups/main/wind-wave/index.html';

const PATCH = `
<style id="v65-definitive-mobile-hero-handoff">
/* Final override: removes the artificial mobile hero continuation created by
   older 100svh rules and reconnects Hero -> CTA -> USPs -> Most Liked. */
@media (max-width: 560px) {
  .hero {
    position: relative !important;
    width: 100% !important;
    height: 177.7777778vw !important;
    min-height: 0 !important;
    max-height: none !important;
    aspect-ratio: 9 / 16 !important;
    margin-bottom: 0 !important;
    overflow: visible !important;
    background-position: center top !important;
    background-size: 100% 100%, 100% auto !important;
    background-repeat: no-repeat !important;
    background-color: #346f77 !important;
  }

  /* Remove older continuation layer. */
  .hero::before {
    content: none !important;
    display: none !important;
  }

  /* One clean fade beginning inside the artwork and ending in the first section. */
  .hero::after {
    content: "" !important;
    display: block !important;
    position: absolute !important;
    left: 0 !important;
    right: 0 !important;
    bottom: -118px !important;
    height: 330px !important;
    z-index: 30 !important;
    pointer-events: none !important;
    background: linear-gradient(
      180deg,
      rgba(52,111,119,0) 0%,
      rgba(52,111,119,.06) 16%,
      rgba(52,111,119,.22) 34%,
      rgba(52,111,119,.48) 54%,
      rgba(52,111,119,.78) 73%,
      #346f77 100%
    ) !important;
  }

  /* Buttons are visibly inside the lower part of the hero image. */
  .hero-overlay-v33 {
    position: absolute !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 145px !important;
    z-index: 46 !important;
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

  /* USP block straddles the artwork edge instead of living in a separate block. */
  .hero-trust-strip-v33 {
    position: absolute !important;
    left: 50% !important;
    bottom: -118px !important;
    width: calc(100% - 18px) !important;
    max-width: 540px !important;
    transform: translateX(-50%) !important;
    z-index: 50 !important;
  }

  .hero-trust-grid-v33 {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 8px !important;
  }

  .hero-trust-grid-v33 > .hero-trust-card-v33:first-child {
    grid-column: 1 / -1 !important;
  }

  /* Most Liked starts in the exact same ocean color and then continues darker. */
  .liked {
    position: relative !important;
    margin-top: 0 !important;
    padding-top: 132px !important;
    border-top: 0 !important;
    background:
      radial-gradient(72vw 50vw at -10% 4%, rgba(206,230,241,.07), transparent 48%),
      linear-gradient(
        180deg,
        #346f77 0%,
        #327981 12%,
        #2e747b 32%,
        #286b72 100%
      ) !important;
  }

  .liked::after {
    display: none !important;
    content: none !important;
  }

  /* Keep 18 m in the quiet gap between USPs and the section heading. */
  .depth-anchor-18-v62 {
    top: 78px !important;
  }
}

@media (max-width: 390px) {
  .hero-overlay-v33 {
    bottom: 138px !important;
  }

  .hero-trust-strip-v33 {
    bottom: -116px !important;
  }

  .liked {
    padding-top: 128px !important;
  }

  .depth-anchor-18-v62 {
    top: 74px !important;
  }
}
</style>`;

export default async function handler(req, res) {
  try {
    const response = await fetch(`${RAW_INDEX}?v=${Date.now()}`, {
      headers: { 'User-Agent': 'wind-wave-preview-v65' },
      cache: 'no-store'
    });

    if (!response.ok) {
      res.status(response.status).send('Unable to load preview');
      return;
    }

    let html = await response.text();
    html = html.replace('</head>', `${PATCH}\n</head>`);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    res.setHeader('Surrogate-Control', 'no-store');
    res.setHeader('X-Wind-Wave-Version', 'v65');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).send('Unable to load preview');
  }
}
