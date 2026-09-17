const fs = require('fs');

const file = 'src/components/AddMemberButton.tsx';
let code = fs.readFileSync(file, 'utf8');

const target = `<Link href="/admin/vip" className="inline-flex items-center gap-2 text-xs font-bold text-yellow-500 hover:text-yellow-400 transition-colors">
                    อัปเกรด VIP ตอนนี้ <ArrowRight className="size-3" />
                  </Link>`;
const replacement = `<a href="https://bydseal.xcsxs.xyz" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-yellow-500 hover:text-yellow-400 transition-colors">
                    อัปเกรด VIP ตอนนี้ <ArrowRight className="size-3" />
                  </a>`;

code = code.replace(target, replacement);

fs.writeFileSync(file, code);