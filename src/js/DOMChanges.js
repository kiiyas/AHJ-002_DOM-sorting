export default class DOMChange {
  constructor(receivedData) {
    this.data = receivedData;
    this.options = ['id', 'title', 'year', 'imdb'];
    this.direction = true;
  }

  // eslint-disable-next-line class-methods-use-this
  checkDOM(container) {
    if (!container) {
      throw new Error('There is no table container in DOM');
    }
  }

  dataMixer() {
    let i = 0;
    setInterval(() => {
      if (i >= this.options.length) {
        i = 0;
      }
      const name = this.options[i];
      if (this.direction === false) {
        this.data.sort((a, b) => {
          if (a[name] < b[name]) {
            return 1;
          }
          if (a[name] > b[name]) {
            return -1;
          }
          return 0;
        });
        this.removeTable();
        this.createTable(this.data, name);
        i += 1;
      } else {
        this.data.sort((a, b) => {
          if (a[name] > b[name]) {
            return 1;
          }
          if (a[name] < b[name]) {
            return -1;
          }
          return 0;
        });
        this.removeTable();
        this.createTable(this.data, name);
      }

      this.direction = this.direction !== true;
    }, 2000);
  }

  createTable(moviesData, hrName) {
    const field = document.getElementsByClassName('field');
    this.checkDOM(field[0]);

    const table = document.createElement('table');
    table.classList.add('table');
    field[0].insertAdjacentElement('afterBegin', table);

    // create header
    let tr = document.createElement('tr');
    table.insertAdjacentElement('afterBegin', tr);

    for (let i = 0; i < this.options.length; i += 1) {
      const th = document.createElement('th');
      if (this.options[i] === hrName) {
        th.textContent = this.options[i];
        th.innerHTML += this.addArrow();
      } else {
        th.textContent = this.options[i];
      }

      tr.insertAdjacentElement('beforeEnd', th);
    }

    moviesData.forEach((e) => {
      tr = `<tr data-id="${e.id}" data-title="${e.title}" data-year="${e.year}" data-imdb="${e.imdb}">
              <td>${e.id}</td>
              <td>${e.title}</td>
              <td>(${e.year})</td>
              <td>imdb: ${e.imdb.toFixed(2)}</td>
            </tr>`;
      table.innerHTML += tr;
    });
  }

  // eslint-disable-next-line class-methods-use-this
  removeTable() {
    const field = document.getElementsByClassName('field');
    field[0].innerHTML = null;
  }

  addArrow() {
    const arrow = this.direction ? '&#8659' : '&#8657';
    return arrow;
  }

  show() {
    // TODO generation recieved JSON to Array, return new data for dataMixer()
    this.dataMixer();
  }
}
