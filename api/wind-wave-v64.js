const RAW_INDEX = 'https://raw.githubusercontent.com/lazarglaw-svg/mockups/main/wind-wave/index.html';

const PATCH = `
<style id="v64-mobile-hero-transition-fix">
@media (max-width: 760px) {
  /* Keep the current mobile hero image exactly as it is, but move the actions
     back over the image instead of into the solid-color continuation. */
  .hero-overlay-v33 {
    bottom: clamp(158px, 20svh, 190px) !important;
    z-index: 44 !important;
  }

  /* The trust cards once again straddle the hero/Most-Liked handoff. */
  .hero-trust-strip-v33 {
    bottom: -92px !important;
    z-index: 48 !important;
  }

  /* Restore a soft ocean fade across the hero boundary without changing
     the mobile artwork sizing/crop that is already correct. */
  .hero::after {
    content: "" !important;
    display: block !important;
    position: absolute !important;
    left: 0 !important;
    right: 0 !important;
    bottom: -90px !important;
    height: 370px !important;
    pointer-events: none !important;
    z-index: 30 !important;
    background: linear-gradient(
      180deg,
      rgba(52,111,119,0) 0%,
      rgba(52,111,119,.07) 18%,
      rgba(52,111,119,.22) 38%,
      rgba(52,111,119,.52) 60%,
      rgba(52,111,119,.86) 78%,
      #346f77 100%
    ) !important;
  }

  /* Keep enough room for the cards, while letting the transition itself
     provide the visual handoff rather than a hard block. */
  .liked {
    padding-top: 188px !important;
  }
}

@media (max-width: 420px) {
  .hero-overlay-v33 {
    bottom: clamp(150px, 19svh, 174px) !important;
  }

  .hero-trust-strip-v33 {
    bottom: -88px !important;
  }

  .hero::after {
    bottom: -86px !important;
    height: 350px !important;
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
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).send('Unable to load preview');
  }
}
