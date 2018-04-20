class NoteForm {
  constructor() {}
  
  getElem() {
    if (!this.elem) this.render();
    return this.elem;
  }

  render() {
    let html = '<form class="form"><p class="Form-Group"><label for="note-text-field">New note</label><textarea name="text" class="Note-Text" id="note-text-field" required></textarea></p><p><label for="date-field">Дата</label><input type="date" name="date" id="date-field" required></p><p><input type="submit" value="Добавить"></p><button>Закрыть</button></form>';
    this.elem = createElementFromHtml(html);
    this.elem.addEventListener('submit', this);
    this.elem.querySelector('button').addEventListener('click', (event) => {
      event.preventDefault();
      this.hide();
    });
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

  refresh() {
    this.elem.text.value = '';
    this.elem.date.valueAsDate = new Date();
  }

  show() {
    this.refresh();
    this.elem.classList.add('Form-Show');
    this.elem.text.focus();
  }

  hide() {
    this.elem.classList.remove('Form-Show');
  }

  getData() {
    return {
      'text': this.elem.text.value,
      'time': this.elem.date.valueAsNumber
    };
  }
}