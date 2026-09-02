from pathlib import Path
from bs4 import BeautifulSoup

root = Path(__file__).resolve().parents[1]
path = root / 'index.html'
raw = path.read_text(encoding='utf-8')
soup = BeautifulSoup(raw, 'html.parser')
section = soup.find('section', id='experiences')

# Final Most Liked copy + kitesurf-style information hierarchy
if section:
    p = section.select_one('.section-copy')
    if p:
        p.string = "Our customers’ favorite dive experiences — with the right option for beginners and experienced divers."

    card_data = [
        {'duration':'4 days','type':'PADI course','tags':['Beginner friendly','Certification'],'note':'Best for first-time divers'},
        {'duration':'2 days','type':'Certified divers','tags':['Isla Mujeres','Reef diving'],'note':'For certified divers'},
        {'duration':'Guided dive','type':'Experienced divers','tags':['Shark dive','Advanced'],'note':'For experienced divers'},
    ]
    for card, data in zip(section.select('.dive-card'), card_data):
        body = card.select_one('.card-body')
        if not body:
            continue
        for sel in ('.scuba-meta-row-v59', '.scuba-tags-v59', '.scuba-card-footer-v59'):
            old = body.select_one(sel)
            if old:
                old.decompose()
        title = body.select_one('.card-title')
        text = body.select_one('.card-text')
        arrow = body.select_one('.card-go')
        if not title or not text:
            continue

        meta = soup.new_tag('div', attrs={'class':'scuba-meta-row-v59'})
        duration = soup.new_tag('span', attrs={'class':'scuba-duration-v59'})
        duration.string = data['duration']
        typ = soup.new_tag('span', attrs={'class':'scuba-type-v59'})
        typ.string = data['type']
        meta.extend([duration, typ])
        title.insert_before(meta)

        tags = soup.new_tag('div', attrs={'class':'scuba-tags-v59'})
        for label in data['tags']:
            tag = soup.new_tag('span')
            tag.string = label
            tags.append(tag)
        text.insert_after(tags)

        footer = soup.new_tag('div', attrs={'class':'scuba-card-footer-v59'})
        note = soup.new_tag('span', attrs={'class':'scuba-note-v59'})
        note.string = data['note']
        footer.append(note)
        if arrow:
            arrow.extract()
            arrow['class'] = ['card-go', 'scuba-arrow-v59']
            footer.append(arrow)
        tags.insert_after(footer)

    ghost = section.select_one('.ghost-link')
    if ghost:
        svg = ghost.find('svg')
        if svg:
            svg.decompose()

# Footer: centered logo and club identity
footer = soup.find('footer', id='contact')
if footer:
    footer_main = footer.select_one('.footer-main-v17')
    if footer_main:
        old = footer_main.select_one('.footer-brand-v17')
        if old:
            old.decompose()
    old_center = footer.select_one('.footer-brand-center-v62')
    if old_center:
        old_center.decompose()
    header_logo = soup.find('img', alt='Site logo')
    if header_logo and footer_main:
        center = soup.new_tag('div', attrs={'class':'footer-brand-center-v62'})
        img = soup.new_tag('img', attrs={'src':header_logo.get('src'), 'alt':'Wind & Wave logo', 'class':'footer-logo-v62'})
        title = soup.new_tag('p', attrs={'class':'footer-club-name-v62'})
        title.string = 'Wind & Wave Watersport Club Cancún'
        services = soup.new_tag('p', attrs={'class':'footer-services-v62'})
        services.string = 'Kitesurfing · Diving · Watersports'
        center.extend([img, title, services])
        footer_main.insert_before(center)
    spans = footer.select('.footer-bottom-v17 > span')
    if spans:
        spans[0].string = '© 2026 Wind & Wave Watersport Club Cancún'

# 18 m marker anchor in the quiet gap above Most Liked
if section:
    old = section.select_one('.depth-anchor-18-v62')
    if old:
        old.decompose()
    anchor = soup.new_tag('div', attrs={'class':'depth-anchor-18-v62', 'aria-hidden':'true'})
    section.insert(0, anchor)

# Replace the depth-rail behavior with the approved final version
script_html = (Path(__file__).parent / 'depth_script.html').read_text(encoding='utf-8')
new_script = BeautifulSoup(script_html, 'html.parser').find('script')
old_script = soup.find('script', id='v47-depth-rail-script')
if old_script and new_script:
    old_script.replace_with(new_script)

# Append final V57–V63 style layers in order
styles_html = (Path(__file__).parent / 'styles.html').read_text(encoding='utf-8')
frag = BeautifulSoup(styles_html, 'html.parser')
for style in list(frag.find_all('style')):
    old = soup.find('style', id=style.get('id'))
    if old:
        old.decompose()
    soup.head.append(style)

path.write_text(str(soup), encoding='utf-8')
print('Updated', path)
