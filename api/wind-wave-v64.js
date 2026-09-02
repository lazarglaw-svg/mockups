const RAW_INDEX = 'https://raw.githubusercontent.com/lazarglaw-svg/mockups/main/wind-wave/index.html';

const PATCH = `
<style id="v64-mobile-hero-transition-fix">
@media (max-width: 760px) {
  /* Match the hero box to the 9:16 mobile artwork so there is no solid-color
     extension below the image. The artwork itself keeps its current crop. */
  .hero {
    aspect-ratio: 9 / 16 !important;
    min-height: 0 !important;
    height: auto !important;
    max-height: none !important;
    margin-bottom: 0 !important;
    background-size: 100% auto !important;
    background-position: center top !important;
    background-repeat: no-repeat !important;
    background-color: #346f77 !important;
    overflow: visible !important;
  }

  /* Put the CTAs back INSIDE the image, near its lower edge. */
  .hero-overlay-v33 {
    position: absolute !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 24px !important;
    z-index: 46 !important;
  }

  .hero-actions-v33 {
    width: calc(100% - 24px) !important;
    max-width: 520px !important;
    margin-inline: auto !important;
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 9px !important;
  }

  /* Smooth ocean handoff at the bottom of the artwork. */
  .hero::before {
    content: "" !important;
    display: block !important;
    position: absolute !important;
    left: 0 !important;
    right: 0 !important;
    top: auto !important;
    bottom: -1px !important;
    height: 190px !important;
    pointer-events: none !important;
    z-index: 4 !important;
    background: linear-gradient(
      180deg,
      rgba(52,111,119,0) 0%,
      rgba(52,111,119,.06) 18%,
      rgba(52,111,119,.18) 38%,
      rgba(52,111,119,.42) 60%,
      rgba(52,111,119,.72) 80%,
      #346f77 100%
    ) !important;
  }

  .hero::after {
    display: none !important;
    content: none !important;
  }

  /* USPs remain below the hero, on the same transition color. */
  .hero-trust-strip-v33 {
    bottom: -132px !important;
    z-index: 48 !important;
  }

  .liked {
    padding-top: 184px !important;
    background: linear-gradient(
      180deg,
      #346f77 0%,
      #31767e 14%,
      #2b737a 38%,
      #286b72 100%
    ) !important;
  }
}

@media (max-width: 420px) {
  .hero-overlay-v33 {
    bottom: 20px !important;
  }

  .hero-trust-strip-v33 {
    bottom: -128px !important;
  }

  .liked {
    padding-top: 180px !important;
  }
}
</style>`;

export default async function handler(req, res) {
  try {
    const response = await fetch(`${RAW_INDEX}?v=${Date.now()}`, {
      headers: { 'User-Agent': 'wind-wave-preview' },
      cache: 'no-store'
    });

    if (!response.ok) {
      res.status(response.status).send('Unable to load preview');
      return;
    }

    let html = await response.text();
    html = html.replace('</head>', `${PATCH}\n</head>`);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, max-age=0, must-revalidate');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).send('Unable to load preview');
  }
}
