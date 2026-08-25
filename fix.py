
with open(r'src\app\[domain]\layout.tsx', 'r', encoding='utf-8') as f:
    content = f.read()
import re
content = re.sub(r'fetch\(.*?\);', 'fetch(`https://www.youtube.com/oembed?url=&format=json`);'.replace('`', ''), content)
with open(r'src\app\[domain]\layout.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

