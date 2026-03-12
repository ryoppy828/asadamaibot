import * as fs from 'fs';
import * as path from 'path';

const files = ['mytem', 'equipment', 'technique'];
for (const file of files) {
  const content = fs.readFileSync(path.join(__dirname, `${file}.txt`), 'utf-8');
  fs.writeFileSync(
    path.join(__dirname, `${file}.ts`),
    `export const ${file}Prompt = \`${content.replace(/`/g, '\\`')}\`;\n`
  );
  fs.unlinkSync(path.join(__dirname, `${file}.txt`));
}
console.log('Successfully converted txt to ts');
