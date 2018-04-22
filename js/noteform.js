class NoteForm {
  constructor() {}
  
  getElem() {
    if (!this.elem) this.render();
    return this.elem;
  }

  render() {
    let html = `<div class="Form-Wrap">
      <form class="col-12 col-sm-10	col-md-8 col-lg-6	col-xl-4 Form">
        <p class="form-group Textarea-Group">
          <label for="note-text-field">New note</label>
          <textarea name="text" class="form-control" id="note-text-field" required></textarea>
        </p>
        <p class="form-group">
          <label for="date-field">Дата</label>
          <input type="date" name="date" id="date-field class="form-control" required>
        </p>
        <p class="form-group"><input type="submit" value="Добавить" class="btn btn-primary"></p>
        <button type="button" class="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </form>
    </div>`;
    this.elem = createElementFromHtml(html);
    this.form = this.elem.querySelector('form');
    this.form.addEventListener('submit', this);
    this.form.querySelector('button').addEventListener('click', (event) => {
      event.preventDefault();
      this.hide();
    });
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 27) {
        if (this.elem.classList.contains('Form-Show')) this.hide();
      }
    });
  }

  handleEvent(event) {
    this['on' + event.type[0].toUpperCase() + event.type.slice(1)](event);
  }

  onSubmit(event) {
    this.form.dispatchEvent(new CustomEvent('note-add', {
      bubbles: true
    }));

    event.preventDefault();
  }

  refresh() {
    this.form.text.value = '';
    this.form.date.valueAsDate = new Date();
  }

  show() {
    this.refresh();
    this.elem.classList.add('Form-Show');
    this.form.text.focus();
  }

  hide() {
    this.elem.classList.remove('Form-Show');
  }

  getData() {
    return {
      'text': this.form.text.value,
      'time': this.form.date.valueAsNumber
    };
  }
}