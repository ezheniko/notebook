function createElementFromHtml(html) {
  let tmp = document.createElement('div');
  tmp.innerHTML = html.trim();
  return tmp.firstChild;
}

function fixDate(datePart) {
  if (datePart < 10) return `0${datePart}`;
  return datePart;
}