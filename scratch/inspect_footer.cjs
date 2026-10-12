const fs = require('fs');
const path = require('path');

const cleanHtml = fs.readFileSync(path.join(__dirname, 'preview_clean.html'), 'utf8');

// Find modals and footer
const footerIdx = cleanHtml.indexOf('<footer');
if (footerIdx !== -1) {
  console.log('FOOTER AND SCRIPT:\n', cleanHtml.substring(footerIdx));
} else {
  console.log('Footer not found');
}
