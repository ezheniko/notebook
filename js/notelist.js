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
    this.elem.addEventListener('mousedown', event => this.mouseDown(event));
    this.elem.addEventListener('touchstart', event => this.swipe(event));
  }

  showNotes(notes) {
    this.notes = Object.keys(notes).sort(compareNotes);

    let html = '';
    for (let note of this.notes) {
      let date = new Date(notes[note].time);
      let dateStr = `${fixDate(date.getDate())} ${fixDate(date.getMonth())} ${date.getFullYear()}`;
      html += `<li class = "Note">
        <p>${notes[note].text}<time datetime="dateStr">${dateStr}</time></p>
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

  mouseDown(event) {
    if (window.innerWidth > 576) return;
    let target = event.target.closest('li');
    if (!target) return;

    let startX = event.pageX;
    let firstElem = this.elem.firstElementChild;
    let firstElemPosX = firstElem.getBoundingClientRect().left;
    let margin = 0;
    let marginMax = 0;
    let marginMin = firstElemPosX - this.elem.lastElementChild.getBoundingClientRect().left;
    let isDrag = false;
    let self = this;
    document.addEventListener('mousemove', moveAt);
    document.addEventListener('mouseup', stopDrag);

    function moveAt(event) {
      if (!isDrag) {
        let moveX = event.pageX - startX;
        if (Math.abs(moveX) < 5) return;
      }
      isDrag = true;

      let shiftX = event.pageX - startX;
      margin = firstElemPosX + shiftX;
      if (margin > 0) margin = 0;
      if (margin < marginMin) margin = marginMin;
      firstElem.style.marginLeft = margin + 'px';
    }

    function stopDrag() {
      if (isDrag) {
        firstElem.style.marginLeft = Math.round((margin / marginMin) * 100 / (100 / (self.elem.children.length - 1))) * -100 + '%';
      }
      document.removeEventListener('mousemove', moveAt);
      document.removeEventListener('mouseup', stopDrag);
    }
  }

  swipe(event) {
    if (window.innerWidth > 576) return;
    let target = event.target.closest('li');
    if (!target) return;

    let startX = event.touches[0].clientX;
    let firstElem = this.elem.firstElementChild;
    let firstElemPosX = firstElem.getBoundingClientRect().left;
    let margin = 0;
    let marginMax = 0;
    let marginMin = firstElemPosX - this.elem.lastElementChild.getBoundingClientRect().left;
    let isMove = false;
    let self = this;
    document.addEventListener('touchmove', move);
    document.addEventListener('touchend', stopSwipe);
    
    function move(event) {
      if (!isMove) {
        let moveX = event.touches[0].clientX - startX;
        if (Math.abs(moveX) < 10) return;
      }
      isMove = true;
      let shiftX = event.touches[0].clientX - startX;
      margin = firstElemPosX + shiftX;
      if (margin > 0) margin = 0;
      if (margin < marginMin) margin = marginMin;
      firstElem.style.marginLeft = margin + 'px';
    }

    function stopSwipe() {
      if (isMove) {
        firstElem.style.marginLeft = Math.round((margin / marginMin) * 100 / (100 / (self.elem.children.length - 1))) * -100 + '%';
      }
      document.removeEventListener('touchmove', move);
      document.removeEventListener('touchend', stopSwipe);
    }
  }

}