class NoteList {
  constructor() {}

  getElem() {
    if (!this.elem) this.render();
    return this.elem;
  }

  render() {
    let html = `<ul class="Note-List">У вас нет заметок</ul>`;
    this.elem = createElementFromHtml(html);
    this.elem.addEventListener('click', this);
  }

  showNotes(notes) {

    let html = '';
    for (let note in notes) {
      let date = new Date(notes[note].time);
      let dateStr = `${date.getDate()} ${date.getMonth()} ${date.getFullYear()}`;
      html += `<li class = "Note"><p>${notes[note].text}</p><datetime>${dateStr}</datetime><button data-note-id="${note}">Удалить заметку</button></li>`;
    }

    this.elem.innerHTML = html;
  }

  handleEvent(event) {
    this['on' + event.type[0].toUpperCase() + event.type.slice(1)](event);
  }

  onClick(event) {

    if (event.target.dataset.noteId) {
      this.elem.dispatchEvent(new CustomEvent('note-delete', {
        bubbles: true,
        detail: event.target.dataset.noteId
      }));

      event.preventDefault();
    }
  }
}