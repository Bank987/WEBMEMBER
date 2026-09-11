const fs = require('fs');
let content = fs.readFileSync('src/app/[domain]/members/MembersClient.tsx', 'utf-8');

const danglingQuote = `                    
                      <p className="text-[12px] font-medium text-white/50 italic leading-relaxed">
                        Loyalty is a two-way street. If I'm asking for it from you, then you're getting it from me.
                      </p>
                      <div className="absolute bottom-0 right-4 translate-y-1/2 text-2xl font-serif" style={{ color: \`\${rColor}4D\` }}>"</div>
                    </div>`;

content = content.replace(danglingQuote, '');
fs.writeFileSync('src/app/[domain]/members/MembersClient.tsx', content);
console.log('Fixed dangling quote');
