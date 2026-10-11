import re,urllib.request,pathlib,concurrent.futures
root=pathlib.Path(__file__).resolve().parents[1]
paths={'/assets/images/conduit-logo.png','/assets/images/conduit-bg.png','/assets/videos/conduit-bg.mp4','/fonts/NeueMontreal-Regular.otf','/fonts/NeueMontreal-Medium.otf','/favicon.ico'}
for f in (root/'research/raw').glob('*.html'):
 paths.update(re.findall(r'<img[^>]+src="(/[^"?#]+)"',f.read_text()))
def get(p):
 dest=root/'public'/p.lstrip('/');dest.parent.mkdir(parents=True,exist_ok=True)
 data=urllib.request.urlopen('https://condu.it'+p).read();dest.write_bytes(data);return p,len(data)
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as ex:
 for result in ex.map(get,sorted(paths)):print(*result)
