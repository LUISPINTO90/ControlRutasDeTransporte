export default class BusBase {
  constructor(name, duration) {
    this.name = name;
    this.duration = Number(duration);

    this.next = null;
    this.previous = null;
  }

  getDetails() {
    return `
        <section class="busCard">
          <p>
            <b>🚌 Base</b>: ${this.name}<br /><br />
            <b>🕑 Duraci&oacute;n</b>: ${this.duration} minutos
          </p>
        </section>
      `;
  }
}
