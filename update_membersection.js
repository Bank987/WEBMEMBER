const fs = require('fs');
let content = fs.readFileSync('src/app/[domain]/members/MembersClient.tsx', 'utf-8');

// 1. Pass membersLayout to all MemberSections in the main component.
content = content.replace(/onMemberClick=\{setSelectedMember\}/g, "onMemberClick={membersLayout === 'premium' ? setSelectedMember : undefined}\n              membersLayout={membersLayout}");

// 2. Add membersLayout prop to MemberSection declaration
content = content.replace(
  'onMemberClick\n}: {',
  'onMemberClick,\n  membersLayout\n}: {'
);
content = content.replace(
  'onMemberClick?: (member: Member) => void\n}) {',
  'onMemberClick?: (member: Member) => void,\n  membersLayout?: string\n}) {'
);

// 3. Re-add the inline Facebook link inside MemberSection if classic
const oldNameLine = '<h3 className="text-[12px] font-[700] text-text-inverse tracking-normal leading-[15px] mb-[3px] truncate">{member.name}</h3>';
const newNameLine = oldNameLine + `
              {membersLayout !== 'premium' && member.facebookUrl && (
                <a 
                  href={member.facebookUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[9px] text-text-secondary font-[400] hover:underline tracking-[1.8px] uppercase truncate"
                  onClick={(e) => e.stopPropagation()}
                >
                  Facebook
                </a>
              )}`;

content = content.replace(oldNameLine, newNameLine);

fs.writeFileSync('src/app/[domain]/members/MembersClient.tsx', content);
console.log('MemberSection updated');
