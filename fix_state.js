const fs = require('fs');

let content = fs.readFileSync('src/app/[domain]/members/MembersClient.tsx', 'utf-8');

const stateStr = `  const [searchQuery, setSearchQuery] = useState("");
  const [showStats, setShowStats] = useState(true);
  const [activeRoleFilter, setActiveRoleFilter] = useState<string | null>(null);

  const filteredMembers = initialMembers.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = activeRoleFilter ? m.role === activeRoleFilter : true;
    return matchesSearch && matchesRole;
  });`;

content = content.replace(
  /const \[searchQuery[\s\S]*?m\.name\.toLowerCase\(\)\.includes\(searchQuery\.toLowerCase\(\)\)\r?\n\s*\);/,
  stateStr
);

fs.writeFileSync('src/app/[domain]/members/MembersClient.tsx', content);
console.log('Fixed state injection');
