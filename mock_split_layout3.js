const fs = require('fs');
const file = 'src/app/[domain]/GateClient.tsx';
let content = fs.readFileSync(file, 'utf-8');

const wrapperRegex = /\{\/\*\s*Content\s*\*\/\}\s*<div className="relative z-\[10\] text-center px-4 max-w-4xl mx-auto flex flex-col items-center w-full">([\s\S]*?)<p className="text-\[8px\] sm:text-\[9px\] tracking-\[0\.3em\] font-medium uppercase"/;

const match = content.match(wrapperRegex);
if (!match) process.exit(1);

let innerContent = match[1];

let logoMatch = innerContent.match(/(\{settings\.logoUrl && \([\s\S]*?<\/div>\s*\)\})/);
let logoCode = logoMatch ? logoMatch[1] : '';

let titlesMatch = innerContent.match(/<div className="mb-12">([\s\S]*?)<\/div>/);
let titlesCode = titlesMatch ? titlesMatch[0] : '';

let actionsMatch = innerContent.match(/<motion\.div\s*initial=\{\{\s*opacity:\s*0[\s\S]*?className="flex flex-col items-center justify-center gap-\[18px\] mt-\[24px\] w-full"[\s\S]*?<\/motion\.div>/);
let actionsCode = actionsMatch ? actionsMatch[0] : '';

let modifiedActions = actionsCode
  .replace('items-center justify-center gap-[18px]', 'items-center md:items-start justify-center md:justify-start gap-[18px]')
  .replace('justify-center w-full max-w-[400px]', 'justify-center md:justify-start w-full max-w-[400px]')
  .replace('justify-center gap-[16px]', 'justify-center md:justify-start gap-[16px]')
  .replace('justify-center gap-[18px] mt-[18px]', 'justify-center md:justify-start gap-[18px] mt-[18px]');

let modifiedLogo = logoCode.replace('mx-auto', 'md:ml-auto md:mr-0 mx-auto');
let modifiedTitles = titlesCode.replace('<div className="mb-12">', '').replace(/<\/div>[\s]*$/, '');

const newWrapper = `
      {/* Content */}
      <div className="relative z-[10] px-8 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-24 w-full mb-20 md:mb-0">
        
        {/* Left Side: Actions */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2">
          ACTION_MARKER
        </div>

        {/* Right Side: Logo & Titles */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right w-full md:w-1/2">
          LOGO_MARKER
          
          <div className="mt-8 mb-4 flex flex-col items-center md:items-end">
            TITLE_MARKER
          </div>
        </div>
      </div>

      {/* Subtle Branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1.5, delay: 2.5 }}
        className="absolute bottom-6 left-0 right-0 text-center pointer-events-none"
      >
        <p className="text-[8px] sm:text-[9px] tracking-[0.3em] font-medium uppercase"
`;

let replacement = newWrapper
  .replace('ACTION_MARKER', () => modifiedActions)
  .replace('LOGO_MARKER', () => modifiedLogo)
  .replace('TITLE_MARKER', () => modifiedTitles);

content = content.replace(wrapperRegex, replacement);

fs.writeFileSync(file, content);
console.log('Successfully restructured layout for mock');
