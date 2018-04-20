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
    this.notes = Object.keys(notes).sort(compareNotes);

    let html = '';
    for (let note of this.notes) {
      let date = new Date(notes[note].time);
      let dateStr = `${date.getDate()} ${date.getMonth()} ${date.getFullYear()}`;
      html += `<li class = "Note"><p>${notes[note].text}</p><datetime>${dateStr}</datetime><button data-note-id="${note}">Удалить заметку</button></li>`; 
    }

    this.elem.innerHTML = html;

    function compareNotes(note1, note2) {
      return notes[note2].time - notes[note1].time;
    }
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