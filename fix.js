
const fs = require("fs");
const path = "src/app/[domain]/layout.tsx";
let content = fs.readFileSync(path, "utf8");
content = content.replace(/fetch\(.*?\);/g, "fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`);");
fs.writeFileSync(path, content);

