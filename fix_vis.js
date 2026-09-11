const fs = require('fs');
let content = fs.readFileSync('src/app/[domain]/members/MembersClient.tsx', 'utf-8');
content = content.replace(
  'className="absolute top-6 right-6 z-40 flex flex-col items-end gap-2 hidden sm:flex"', 
  'className="absolute top-4 right-4 sm:top-6 sm:right-6 z-40 flex flex-col items-end gap-1.5 sm:gap-2 scale-90 sm:scale-100 origin-top-right"'
);
fs.writeFileSync('src/app/[domain]/members/MembersClient.tsx', content);
console.log('Fixed visibility');
