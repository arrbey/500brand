const fs = require('fs');
const path = require('path');

const cleanHtml = fs.readFileSync(path.join(__dirname, 'preview_clean.html'), 'utf8');

// Print main sections
const sections = cleanHtml.match(/<section[^>]*>[\s\S]*?<\/section>/gi);
sections.forEach((s, idx) => {
  const idMatch = s.match(/id="([^"]+)"/);
  const id = idMatch ? idMatch[1] : `section-${idx}`;
  console.log(`\n================ SECTION ${idx} [${id}] ================`);
  // Remove any remaining large base64 or inline styles if any, print readable html
  const textSummary = s.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                       .replace(/data:image\/[^;]+;base64,[^\"]+/g, '[IMG]');
  console.log(textSummary.substring(0, 1500));
});
