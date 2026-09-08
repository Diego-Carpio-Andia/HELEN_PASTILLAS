"""Validate and package the static site without external dependencies."""
from pathlib import Path
from html.parser import HTMLParser
import json
import shutil

ROOT = Path(__file__).resolve().parent
OUT = ROOT / 'dist'
PUBLIC_FILES = ['index.html', 'styles.css', 'script.js', 'catalog-data.js', 'favicon.svg']

class CheckPage(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.anchors, self.assets = [], [], []
    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if 'id' in values:
            self.ids.append(values['id'])
        for key in ('src', 'href'):
            value = values.get(key, '')
            if value.startswith('#'):
                self.anchors.append(value[1:])
            elif value and not value.startswith(('https:', 'http:', 'data:', 'mailto:', 'tel:')):
                self.assets.append(value)

page = CheckPage()
page.feed((ROOT / 'index.html').read_text(encoding='utf-8'))
assert len(page.ids) == len(set(page.ids)), 'Duplicate page IDs'
assert all(anchor in page.ids for anchor in page.anchors), 'Broken internal link'
assert all((ROOT / asset).is_file() for asset in page.assets), 'Missing page asset'
images = sorted((ROOT / 'img').glob('*.webp'))
assert len(images) == 21, 'Expected 18 product images and 3 editorial images'
hosting = json.loads((ROOT / '.openai' / 'hosting.json').read_text(encoding='utf-8-sig'))
assert hosting.get('static', {}).get('directory') == 'dist'
OUT.mkdir(exist_ok=True)
(OUT / 'img').mkdir(exist_ok=True)
for filename in PUBLIC_FILES:
    shutil.copy2(ROOT / filename, OUT / filename)
for image in images:
    shutil.copy2(image, OUT / 'img' / image.name)
print(f'Static site ready: {len(PUBLIC_FILES)} files, {len(images)} images, internal links verified.')
