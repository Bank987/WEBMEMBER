const fs = require('fs');

let content = fs.readFileSync('src/app/admin/settings/page.tsx', 'utf-8');

const regex = /<div className="sm:col-span-2 pt-4 border-t border-white\/5 mt-2 mb-4">[\s\S]*?รูปแบบหน้าสมาชิกแบบเดิม<\/p>\s*<\/div>\s*<\/label>\s*<label[\s\S]*?กล่อง Popup สไตล์กระจกเงา Ultra Premium<\/p>\s*<\/div>\s*<\/label>\s*<\/div>\s*<\/div>/;

content = content.replace(regex, '');

fs.writeFileSync('src/app/admin/settings/page.tsx', content);
console.log('Removed from settings');
