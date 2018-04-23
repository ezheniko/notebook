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

  mouseDown(event) {
    if (window.innerWidth > 576) return;
    let target = event.target.closest('li');
    if (!target) return;
    this.dragObject = {
      downX: event.pageX,
      downY: event.pageY
    };
    let isDrag = false;
    let self = this;
    document.addEventListener('mousemove', moveAt);
    document.addEventListener('mouseup', stopDrag);

    function moveAt(event) {
      // убрать лишние self
      if (!self.isDrag) {
        let moveX = event.pageX - self.dragObject.downX;
        let moveY = event.pageY - self.dragObject.downY;
        if (Math.abs(moveX) < 5 && Math.abs(moveY) < 5) return;
      }

      self.shift = event.pageX - self.dragObject.downX;

    }
    function stopDrag() {
      document.removeEventListener('mousemove', moveAt);
      document.removeEventListener('mouseup', stopDrag);
    }
  }

  swipe(event) {
    console.log(event.touches[0]);
    let startX = event.touches[0].clientX;
    let firstElem = this.elem.firstElementChild;
    let firstElemPosX = firstElem.getBoundingClientRect().left;
    let shiftX = 0;
    let margin = 0;
    let marginMax = 0;
    let marginMin = firstElemPosX - this.elem.lastElementChild.getBoundingClientRect().left;
    let isMove = false;
    let finishMargin = 0;
    let self = this;
    document.addEventListener('touchmove', move);
    document.addEventListener('touchend', stopSwipe);
    
    function move(event) {
      if (!isMove) {
        let moveX = event.touches[0].clientX - startX;
        if (Math.abs(moveX) < 5) return;
      }
      isMove = true;
      shiftX = event.touches[0].clientX - startX;
      margin = firstElemPosX + shiftX;
      if (margin > 0) margin = 0;
      if (margin < marginMin) margin = marginMin;
      firstElem.style.marginLeft = margin + 'px';
    }

    function stopSwipe(event) {
      
      document.removeEventListener('touchmove', move);
      document.removeEventListener('touchend', stopSwipe);
    }
  }

}