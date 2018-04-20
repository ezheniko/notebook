class Notebook {
  constructor() {
    this.noteForm = new NoteForm();
    this.noteList = new NoteList();
    this.render();
  }

  render () {
    let html = '<a href="#" class="Button">Добавить заметку</a>';
    this.button = createElementFromHtml(html);
    document.body.append(this.button);
    document.body.append(this.noteForm.getElem());
    document.body.append(this.noteList.getElem());
    
    this.load();
    this.noteList.getElem().addEventListener('note-delete', this.onNoteDelete.bind(this));
    this.noteForm.getElem().addEventListener('note-add', this.onNoteAdd.bind(this));
  }

  onNoteAdd(event) {
    this.notes[Date.now()] = {
      'text': this.noteForm.getElem().text.value,
      'time': this.noteForm.getElem().date.valueAsNumber
    };
    this.save();
  }

  onNoteDelete(event) {
    delete this.notes[event.detail];
    this.save();
  }

  load() {
    this.notes = JSON.parse(localStorage.getItem('notes'));
    if (!this.notes) return;
    this.noteList.showNotes(this.notes);
  }

  save() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }
}