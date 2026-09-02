const STYLE_PATHS = [
  '/wind-wave/_patch_v63/01_v57-mobile-hero-usp-mostliked-redesign.html',
  '/wind-wave/_patch_v63/02_v58-mostliked-copy-depth-boundaries.html',
  '/wind-wave/_patch_v63/03_v59-mostliked-kitesurf-layout.html',
  '/wind-wave/_patch_v63/04_v60-mobile-mostliked-final-polish.html',
  '/wind-wave/_patch_v63/05_v61-mostliked-copy-mini-fix.html',
  '/wind-wave/_patch_v63/06_v62-footer-depth-polish.html',
  '/wind-wave/_patch_v63/07_v63-depth-team-frame.html'
];
const DEPTH_PATH = '/wind-wave/_patch_v63/depth_script.html';

function replaceCard(html, title, desc, duration, type, tags, note) {
  const marker = `<h3 class="card-title">${title}</h3>\n            <p class="card-text">${desc}</p>`;
  if (!html.includes(marker)) return html;

  const tagHtml = tags.map(t => `<span>${t}</span>`).join('');
  const replacement = `<div class="scuba-meta-row-v59"><span class="scuba-duration-v59">${duration}</span><span class="scuba-type-v59">${type}</span></div>\n            <h3 class="card-title">${title}</h3>\n            <p class="card-text">${desc}</p>\n            <div class="scuba-tags-v59">${tagHtml}</div>\n            <div class="scuba-card-footer-v59"><span class="scuba-note-v59">${note}</span>`;

  html = html.replace(marker, replacement);

  const start = html.indexOf(replacement);
  if (start === -1) return html;
  const arrowStart = html.indexOf('<span class="card-go" aria-hidden="true">', start + replacement.length);
  if (arrowStart === -1) return html;
  const arrowEnd = html.indexOf('</span>', arrowStart);
  if (arrowEnd === -1) return html;
  const arrow = html.slice(arrowStart, arrowEnd + 7)
    .replace('class="card-go"', 'class="card-go scuba-arrow-v59"');
  html = html.slice(0, arrowStart) + arrow + '</div>' + html.slice(arrowEnd + 7);
  return html;
}

function transform(html, styles, depthScript) {
  html = html.replace(
    '<p class="section-copy">Our customers’ favorite dive experiences.</p>',
    '<p class="section-copy">Our customers’ favorite dive experiences — with the right option for beginners and experienced divers.</p>'
  );

  html = html.replace(
    '<section class="liked" id="experiences">',
    '<section class="liked" id="experiences"><div class="depth-anchor-18-v62" aria-hidden="true"></div>'
  );

  html = replaceCard(
    html,
    'Starter',
    'Complete your PADI certification with an intensive four-day starter course.',
    '4 days',
    'PADI course',
    ['Beginner friendly', 'Certification'],
    'Best for first-time divers'
  );
  html = replaceCard(
    html,
    'Isla Mujeres',
    'Two days of diving around Isla Mujeres for certified divers.',
    '2 days',
    'Certified divers',
    ['Isla Mujeres', 'Reef diving'],
    'For certified divers'
  );
  html = replaceCard(
    html,
    'Shark Dive',
    'A guided shark dive for experienced divers looking for something unforgettable.',
    'Guided dive',
    'Experienced divers',
    ['Shark dive', 'Advanced'],
    'For experienced divers'
  );

  html = html.replace(
    /(<a class="ghost-link" href="#reviews">\s*See all options)\s*<svg[\s\S]*?<\/svg>\s*(<\/a>)/,
    '$1$2'
  );

  html = html.replace(
    /<div class="footer-brand-v17">[\s\S]*?<\/div>\s*(?=<nav class="footer-col-v17" aria-label="Explore">)/,
    ''
  );
  html = html.replace(
    '<div class="footer-main-v17">',
    '<div class="footer-brand-center-v62"><img src="assets/asset-a4b4a1fa470a7e73.webp" alt="Wind & Wave logo" class="footer-logo-v62"><p class="footer-club-name-v62">Wind & Wave Watersport Club Cancún</p><p class="footer-services-v62">Kitesurfing · Diving · Watersports</p></div><div class="footer-main-v17">'
  );
  html = html.replace('© 2026 WIND&amp;WAVE', '© 2026 Wind &amp; Wave Watersport Club Cancún');
  html = html.replace('© 2026 WIND&WAVE', '© 2026 Wind &amp; Wave Watersport Club Cancún');

  html = html.replace(/<script id="v47-depth-rail-script">[\s\S]*?<\/script>/, depthScript);
  html = html.replace('</head>', `${styles}\n</head>`);
  return html;
}

module.exports = async function handler(req, res) {
  try {
    const proto = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const origin = `${proto}://${host}`;

    const [baseRes, depthRes, ...styleResponses] = await Promise.all([
      fetch(`${origin}/wind-wave/index.html?v63base=1`),
      fetch(`${origin}${DEPTH_PATH}`),
      ...STYLE_PATHS.map(p => fetch(`${origin}${p}`))
    ]);

    if (!baseRes.ok) throw new Error(`Base HTML fetch failed: ${baseRes.status}`);
    if (!depthRes.ok) throw new Error(`Depth script fetch failed: ${depthRes.status}`);
    for (const r of styleResponses) {
      if (!r.ok) throw new Error(`Style fetch failed: ${r.status}`);
    }

    const base = await baseRes.text();
    const depth = await depthRes.text();
    const styleParts = await Promise.all(styleResponses.map(r => r.text()));
    const output = transform(base, styleParts.join('\n'), depth);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).send(output);
  } catch (err) {
    res.status(500).send(`Wind & Wave preview error: ${err.message}`);
  }
};

module.exports.transform = transform;
