const fs = require('fs');
const file = 'src/app/[domain]/GateClient.tsx';
let content = fs.readFileSync(file, 'utf-8');

// Replace the end of the file
content = content.replace(/<\/div>\s*<\/div>\s*\);\s*\}/, '</div>\n  );\n}');

fs.writeFileSync(file, content);
console.log('Fixed closing tags');
