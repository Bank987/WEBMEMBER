const fs = require('fs');
let content = fs.readFileSync('src/app/[domain]/members/MembersClient.tsx', 'utf-8');

const regex = /\{\/\* The Quote \*\/\}\s*<div className="relative w-full px-4 py-4 mb-6 bg-white\/\[0\.02\] border border-white\/\[0\.05\] rounded-2xl text-center">[\s\S]*?<\/div>/;

if (regex.test(content)) {
  content = content.replace(regex, '');
  fs.writeFileSync('src/app/[domain]/members/MembersClient.tsx', content);
  console.log('Removed quote');
} else {
  console.log('Quote block not found');
}
