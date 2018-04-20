function createElementFromHtml(html) {
  let tmp = document.createElement('div');
  tmp.innerHTML = html.trim();
  return tmp.firstChild;
}