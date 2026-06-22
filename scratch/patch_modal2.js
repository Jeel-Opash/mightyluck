const fs = require('fs');
const path = 'd:\\New folder\\mightyluck\\src\\components\\DepositModal.tsx';

let content = fs.readFileSync(path, 'utf8');

// Replace Exp. placeholder
const targetExp = 'placeholder="Exp. (MM/YY)"';
const replacementExp = 'placeholder="Exp."';

if (content.includes(targetExp)) {
  content = content.replace(targetExp, replacementExp);
  console.log('Successfully replaced Exp. placeholder.');
} else {
  console.log('Error: targetExp not found.');
}

// Replace warning note text
const targetNote = 'Your transaction will be processed instantly and safely.';
const replacementNote = 'Warning message about fees or anything else relevant at this stage.';

if (content.includes(targetNote)) {
  content = content.replace(targetNote, replacementNote);
  console.log('Successfully replaced warning note.');
} else {
  console.log('Error: targetNote not found.');
}

fs.writeFileSync(path, content, 'utf8');
