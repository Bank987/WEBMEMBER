const fs = require('fs');
const file = 'src/app/[domain]/GateClient.tsx';
let content = fs.readFileSync(file, 'utf-8');

// Find the start of the content wrapper
const startStr = '{/* Content */}\n      <div className="relative z-[10] text-center px-4 max-w-4xl mx-auto flex flex-col items-center w-full">';

if (!content.includes(startStr)) {
  console.log("Could not find start wrapper");
  process.exit(1);
}

// Split the file into Before, Content, After
const beforeSplit = content.split(startStr);
const before = beforeSplit[0];
let rest = beforeSplit[1];

// We need to find the end of this div.
// It ends just before "{/* Subtle Branding */}"
const endMarker = '{/* Subtle Branding */}';
if (!rest.includes(endMarker)) {
    console.log("Could not find end marker");
    process.exit(1);
}

const restSplit = rest.split(endMarker);
let innerContent = restSplit[0];
const after = endMarker + restSplit[1];

// Extract pieces from innerContent
// 1. Logo
let logoMatch = innerContent.match(/(\{settings\.logoUrl && \([\s\S]*?<\/div>\s*\)\})/);
let logoCode = logoMatch ? logoMatch[1] : '';

// 2. Titles
let titlesMatch = innerContent.match(/<div className="mb-12">([\s\S]*?)<\/div>/);
let titlesCode = titlesMatch ? titlesMatch[0] : '';

// 3. Actions (Button, Partners, Socials)
let actionsMatch = innerContent.match(/\{?\/\* Action Button \*\/\}?[\s\S]*?(<motion\.div[\s\S]*?className="flex flex-col items-center justify-center gap-\[18px\] mt-\[24px\] w-full"[\s\S]*?<\/motion\.div>)/);
let actionsCode = actionsMatch ? actionsMatch[1] : '';

if (!logoCode || !titlesCode || !actionsCode) {
    console.log("Could not extract components");
    process.exit(1);
}

// Rebuild the layout
// Button on Left, Logo + Titles on Right
// We will use flex-col-reverse on mobile so Logo is still on top on mobile, but Left/Right on desktop
const newLayout = `{/* Content */}
      <div className="relative z-[10] px-8 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-24 w-full">
        
        {/* Left Side: Actions */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2">
          {/* Action Button */}
          \${actionsCode.replace('items-center justify-center', 'items-center md:items-start justify-center md:justify-start').replace('text-center', 'text-center md:text-left').replace('justify-center w-full max-w-[400px]', 'justify-center md:justify-start w-full max-w-[400px]')}
        </div>

        {/* Right Side: Logo & Titles */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right w-full md:w-1/2">
          \${logoCode.replace('mx-auto', 'md:ml-auto md:mr-0')}
          
          <div className="mt-8 mb-4 flex flex-col items-center md:items-end">
            \${titlesCode.replace('<div className="mb-12">', '').replace(/<\\/div>$/, '')}
          </div>
        </div>

      </div>

      `;

// Need to do this properly instead of direct template literal since actionCode contains ${...} which is JS string interpolation if not careful.
// We will use string concatenation.

let finalInnerContent = `
      {/* Content */}
      <div className="relative z-[10] px-8 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-24 w-full">
        
        {/* Left Side: Actions */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2">
          <!--ACTION_MARKER-->
        </div>

        {/* Right Side: Logo & Titles */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right w-full md:w-1/2">
          <!--LOGO_MARKER-->
          
          <div className="mt-8 mb-4 flex flex-col items-center md:items-end">
            <!--TITLE_MARKER-->
          </div>
        </div>
      </div>
`;

// Modify action code styling to align left on desktop
let modifiedActions = actionsCode
  .replace('items-center justify-center', 'items-center md:items-start justify-center md:justify-start')
  .replace('flex flex-row justify-center', 'flex flex-row justify-center md:justify-start');

let modifiedLogo = logoCode.replace('mx-auto', 'md:ml-auto md:mr-0 mx-auto');
let modifiedTitles = titlesCode.replace('<div className="mb-12">', '').replace(/<\/div>[\s]*$/, '');

finalInnerContent = finalInnerContent.replace('<!--ACTION_MARKER-->', modifiedActions);
finalInnerContent = finalInnerContent.replace('<!--LOGO_MARKER-->', modifiedLogo);
finalInnerContent = finalInnerContent.replace('<!--TITLE_MARKER-->', modifiedTitles);

fs.writeFileSync(file, before + finalInnerContent + '\n      ' + after);
console.log('Successfully restructured layout for mock');
