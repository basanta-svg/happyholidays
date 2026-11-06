// *word* -> red, _word_ -> blue, ~word~ -> yellow (colours set in global.css)
export const accent = (t: string) =>
  t.replace(/\*(.+?)\*/g, '<span class="ac-r">$1</span>').replace(/_(.+?)_/g, '<span class="ac-b">$1</span>')
    .replace(/~(.+?)~/g, '<span class="ac-y">$1</span>');
