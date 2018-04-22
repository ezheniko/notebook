class NoteList {
  constructor() {}

  getElem() {
    if (!this.elem) this.render();
    return this.elem;
  }

  render() {
    let html = `<ul class="Note-List container"></ul>`;
    this.elem = createElementFromHtml(html);
    this.elem.addEventListener('click', this);
    this.elem.addEventListener('mousedown', (event) => this.moveAt(event));
  }

  showNotes(notes) {
    this.notes = Object.keys(notes).sort(compareNotes);

    let html = '';
    for (let note of this.notes) {
      let date = new Date(notes[note].time);
      let dateStr = `${date.getDate()} ${date.getMonth()} ${date.getFullYear()}`;
      html += `<li class = "Note">
        <div class="Note-Wrap">
          <p>${notes[note].text}</p>
          <datetime>${dateStr}</datetime>
        </div>
        <button data-note-id="${note}" type="button" class="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </li>`; 
    }

    this.elem.innerHTML = html;

    function compareNotes(note1, note2) {
      return notes[note2].time - notes[note1].time;
    }
  }

  empty() {
    this.elem.innerHTML = `<div style="text-align: center">Заметок про вашего мальчика здесь нет</div>`;
  }

  handleEvent(event) {
    this['on' + event.type[0].toUpperCase() + event.type.slice(1)](event);
  }

  onClick(event) {
    let target = event.target.closest('button');
    if (!target) return;

    if (target.dataset.noteId) {
      this.elem.dispatchEvent(new CustomEvent('note-delete', {
        bubbles: true,
        detail: target.dataset.noteId
      }));

      event.preventDefault();
    }
  }

  onMousedown(event) {
    if (window.innerWidth > 576) return;
    let target = event.target.closest('li');
    if (!target) return;

    this.elem.dispatchEvent(new CustomEvent('note-swipe', {
      bubbles: true,
      detail: event.pageX
    }));
  }

  moveAt(event) {
    if (window.innerWidth > 576) return;
    let target = event.target.closest('li');
    if (!target) return;
    console.log(event.pageX);
  }
}