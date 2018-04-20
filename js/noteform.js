class NoteForm {
  constructor() {}
  
  getElem() {
    if (!this.elem) this.render();
    return this.elem;
  }

  render() {
    let html = '<form class="form"><p class="Form-Group"><label for="note-text-field">New note</label><textarea name="text" class="Note-Text" id="note-text-field" required></textarea></p><p><label for="date-field">Дата</label><input type="date" name="date" id="date-field" required></p><p><input type="submit" value="Добавить"></p></form>';
    this.elem = createElementFromHtml(html);
    this.elem.date.valueAsDate = new Date();
    this.elem.addEventListener('submit', this);
  }

  handleEvent(event) {
    this['on' + event.type[0].toUpperCase() + event.type.slice(1)](event);
  }

  onSubmit(event) {
    this.elem.dispatchEvent(new CustomEvent('note-add', {
      bubbles: true
    }));

    event.preventDefault();
  }
}