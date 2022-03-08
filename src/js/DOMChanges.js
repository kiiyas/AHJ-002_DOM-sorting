export default class DOMChange {
  constructor(receivedData) {
    this.data = receivedData;
    this.options = ['id', 'title', 'year', 'imdb'];
  }

  dataMixer(arr) {
    let direction = true;

    let i = 4;
    setInterval(() => {
      if (i >= this.options.length) {
        i = 0;
      }
      const name = this.options[i];
      if (direction === true) {
        arr.sort((a, b) => {
          if (a[name] > b[name]) {
            return 1;
          }
          if (a[name] < b[name]) {
            return -1;
          }
          return 0;
        });
        this.removeTable();
        this.createTable(arr);
        direction = false;
      }
      // else
      arr.sort((a, b) => {
        if (a[name] < b[name]) {
          return 1;
        }
        if (a[name] > b[name]) {
          return -1;
        }
        return 0;
      });
      this.removeTable();
      this.createTable(arr);
      direction = true;
      i += 1;
    }, 2000);
  }

  createTable(moviesData) {
    const field = document.getElementsByClassName('field');
    const table = document.createElement('table');
    table.classList.add('table');
    field[0].insertAdjacentElement('afterBegin', table);

    // create header
    const trHead = document.createElement('tr');
    table.insertAdjacentElement('afterBegin', trHead);
    for (let i = 0; i < this.options.length; i += 1) {
      const th = document.createElement('th');
      th.textContent = this.options[i];
      trHead.insertAdjacentElement('beforeEnd', th);
    }

    // create and fill rows
    for (const obj of moviesData) {
      const trBody = document.createElement('tr');
      for (const i in this.options) {
        if (this.options) {
          const td = document.createElement('td');
          td.textContent = obj[this.options[i]];
          trBody.insertAdjacentElement('beforeEnd', td);
        }
      }

      // adding created in table
      table.insertAdjacentElement('beforeEnd', trBody);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  removeTable() {
    const field = document.getElementsByClassName('field');
    field[0].firstChild.remove();
  }

  show() {
    // TODO generation recieved JSON to Array, return new data for dataMixer()
    this.dataMixer(this.data);
  }
}
