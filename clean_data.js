const fs = require('fs');
let content = fs.readFileSync('/src/data.ts', 'utf8');
// Replace " (N hours)" with ""
content = content.replace(/ \((?:[\d]+|1|2|3|4|5|6|7|8|9) hours\)/g, '');
fs.writeFileSync('/src/data.ts', content);
console.log('Cleaned up hours from subjects in data.ts');
