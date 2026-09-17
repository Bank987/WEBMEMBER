const fs = require('fs');

const file = 'src/components/AddMemberButton.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  /<Link href="\/admin\/vip"/g,
  '<a href="https://bydseal.xcsxs.xyz" target="_blank" rel="noreferrer"'
);
code = code.replace(
  /<\/Link>/g,
  '</a>'
);

fs.writeFileSync(file, code);
console.log("Updated AddMemberButton.tsx");