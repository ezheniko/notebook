class Notebook {
  constructor() {
    this.noteList = new NoteList();
    this.render();
  }

  render () {
    let html = '<a href="#" class="Button">Добавить заметку</a>';
    this.button = createElementFromHtml(html);
    document.body.append(this.button);
    document.body.append(this.noteList.getElem());
    
    this.load();
    this.noteList.getElem().addEventListener('note-delete', this.onNoteDelete.bind(this));
    this.button.addEventListener('click', () => {
      if (!this.noteForm) {
        this.noteForm = new NoteForm();
        document.body.append(this.noteForm.getElem());
        this.noteForm.getElem().addEventListener('note-add', this.onNoteAdd.bind(this));
      }
      this.noteForm.show();
    });
    
  }

  onNoteAdd(event) {
    if (!this.notes) this.notes = {};
    this.notes[Date.now()] = this.noteForm.getData();
    this.noteForm.hide();
    this.save();
    this.load();
  }

  onNoteDelete(event) {
    delete this.notes[event.detail];
    this.save();
    this.load();
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