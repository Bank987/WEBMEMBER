const fs = require('fs');

const file = 'src/app/admin/vip/page.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(/\n\s*\);\n\}/, '\n    </div>\n  );\n}');

fs.writeFileSync(file, code);