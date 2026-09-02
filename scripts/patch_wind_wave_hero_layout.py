from pathlib import Path
import re

path = Path('wind-wave/index.html')
html = path.read_text(encoding='utf-8')

html = html.replace(
    'content="width=device-width, initial-scale=1"',
    'content="width=device-width, initial-scale=1, viewport-fit=cover"',
    1,
)

def matching_div_end(text, start):
    token_re = re.compile(r'<div\b[^>]*>|</div>', re.I)
    depth = 0
    for m in token_re.finditer(text, start):
        token = m.group(0).lower()
        if token.startswith('<div'):
            depth += 1
        else:
            depth -= 1
            if depth == 0:
                return m.end()
    raise RuntimeError('Could not find matching div')

overlay_marker = '<div aria-label="Hero actions" class="hero-overlay-v33">'
trust_marker = '<div aria-label="Why choose Wind &amp; Wave" class="hero-trust-strip-v33">'

if 'class="ww-clean-hero-stage"' not in html:
    hero_start = html.find('<header class="hero" id="home">')
    overlay_start = html.find(overlay_marker, hero_start)
    trust_start = html.find(trust_marker, overlay_start)
    if min(hero_start, overlay_start, trust_start) < 0:
        raise RuntimeError('Hero structure markers not found')

    overlay_end = matching_div_end(html, overlay_start)
    trust_end = matching_div_end(html, trust_start)
    overlay_html = html[overlay_start:overlay_end]
    trust_html = html[trust_start:trust_end]

    stage = f'''\n<div class="ww-clean-hero-stage">\n  <img class="ww-clean-hero-image" src="assets/asset-fdf0bb84e597a671.webp" alt="" aria-hidden="true"/>\n  <div class="ww-clean-hero-transition" aria-hidden="true"></div>\n  {overlay_html}\n  {trust_html}\n</div>\n'''
    html = html[:overlay_start] + stage + html[trust_end:]

css = r'''
<style id="github-clean-mobile-hero-layout">
/* Layout/layering only — typography intentionally inherited from the existing site. */
.ww-clean-hero-stage { position: static; }
.ww-clean-hero-image,
.ww-clean-hero-transition { display: none; }

@media (max-width: 820px) and (orientation: portrait) {
  header.hero {
    position: relative !important;
    display: block !important;
    width: 100% !important;
    height: auto !important;
    min-height: 0 !important;
    max-height: none !important;
    aspect-ratio: auto !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: visible !important;
    background: #346f77 !important;
    border-top: 0 !important;
  }

  header.hero::before,
  header.hero::after {
    content: none !important;
    display: none !important;
  }

  .ww-clean-hero-stage {
    position: relative !important;
    display: block !important;
    width: 100% !important;
    aspect-ratio: 9 / 16 !important;
    height: auto !important;
    min-height: 0 !important;
    overflow: visible !important;
    isolation: isolate !important;
    background: #346f77 !important;
  }

  .ww-clean-hero-image {
    display: block !important;
    position: absolute !important;
    inset: 0 !important;
    z-index: 0 !important;
    width: 100% !important;
    height: 100% !important;
    max-width: none !important;
    object-fit: cover !important;
    object-position: center top !important;
    pointer-events: none !important;
  }

  .ww-clean-hero-transition {
    display: block !important;
    position: absolute !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    z-index: 1 !important;
    height: 15% !important;
    pointer-events: none !important;
    background: linear-gradient(180deg,
      rgba(52,111,119,0) 0%,
      rgba(52,111,119,0) 34%,
      rgba(52,111,119,.08) 54%,
      rgba(52,111,119,.28) 72%,
      rgba(52,111,119,.66) 90%,
      #346f77 100%) !important;
  }

  .site-header--rebrand {
    position: absolute !important;
    inset: 0 0 auto 0 !important;
    z-index: 40 !important;
    padding-top: max(16px, env(safe-area-inset-top)) !important;
  }

  .ww-clean-hero-stage .hero-overlay-v33 {
    position: absolute !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 74px !important;
    z-index: 20 !important;
    width: 100% !important;
    pointer-events: none !important;
  }

  .ww-clean-hero-stage .hero-overlay-shell-v33 {
    width: 100% !important;
    max-width: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .ww-clean-hero-stage .hero-actions-v33 {
    position: relative !important;
    z-index: 21 !important;
    width: calc(100% - 20px) !important;
    max-width: 540px !important;
    margin: 0 auto !important;
    display: grid !important;
    grid-template-columns: minmax(0,1fr) minmax(0,1fr) !important;
    gap: 9px !important;
    align-items: center !important;
    pointer-events: auto !important;
  }

  .ww-clean-hero-stage .hero-btn-v33 {
    position: relative !important;
    z-index: 21 !important;
    opacity: 1 !important;
    filter: none !important;
  }

  .ww-clean-hero-stage .hero-trust-strip-v33 {
    position: absolute !important;
    left: 50% !important;
    bottom: -128px !important;
    z-index: 30 !important;
    width: calc(100% - 18px) !important;
    max-width: 540px !important;
    transform: translateX(-50%) !important;
    margin: 0 !important;
  }

  .ww-clean-hero-stage .hero-trust-card-v33,
  .ww-clean-hero-stage .hero-trust-logo-v33,
  .ww-clean-hero-stage .hero-trust-copy-v33 {
    position: relative !important;
    z-index: 31 !important;
    opacity: 1 !important;
    filter: none !important;
  }

  .ww-clean-hero-stage .hero-trust-grid-v33 {
    display: grid !important;
    grid-template-columns: repeat(2,minmax(0,1fr)) !important;
    gap: 8px !important;
  }

  .ww-clean-hero-stage .hero-trust-grid-v33 > .hero-trust-card-v33:first-child {
    grid-column: 1 / -1 !important;
  }

  .liked {
    position: relative !important;
    margin-top: 0 !important;
    padding-top: 162px !important;
    border-top: 0 !important;
    background:
      radial-gradient(72vw 50vw at -10% 4%, rgba(206,230,241,.07), transparent 48%),
      linear-gradient(180deg, #346f77 0%, #327981 14%, #2e747b 34%, #286b72 100%) !important;
  }

  .liked::after {
    display: none !important;
    content: none !important;
  }

  .depth-anchor-18-v62 { top: 124px !important; }
}

@media (max-width: 430px) and (orientation: portrait) {
  .ww-clean-hero-stage .hero-overlay-v33 { bottom: 70px !important; }
  .ww-clean-hero-stage .hero-actions-v33 {
    width: calc(100% - 16px) !important;
    gap: 8px !important;
  }
  .ww-clean-hero-stage .hero-trust-strip-v33 {
    bottom: -128px !important;
    width: calc(100% - 14px) !important;
  }
}
</style>
'''

if 'id="github-clean-mobile-hero-layout"' not in html:
    html = html.replace('</head>', css + '\n</head>', 1)

path.write_text(html, encoding='utf-8')
