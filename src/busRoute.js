export default class BusRoute {
  constructor() {
    this.head = null;
  }

  search(name) {
    let current = this.head;

    while (current != null) {
      if (current.name == name) {
        return current;
      }

      current = current.next;
      if (current == this.head) break;
    }

    return null;
  }

  add(bus) {
    if (this.search(bus.name)) {
      return false;
    } else {
      if (this.head == null) {
        this.head = bus;
        bus.next = bus;
        bus.previous = bus;
      } else {
        let current = this.head;

        while (current.next != this.head) {
          current = current.next;
        }

        current.next = bus;
        bus.previous = current;
        bus.next = this.head;
        this.head.previous = bus;
      }

      return true;
    }
  }

  delete(bus) {
    if (this.search(bus)) {
      if (this.head == this.head.next) {
        this.head = null;
      } else {
        let current = this.head;
        while (current.name != bus) {
          current = current.next;
        }
        current.previous.next = current.next;
        current.next.previous = current.previous;
        if (current == this.head) {
          this.head = current.next;
        }
      }
      return true;
    } else {
      return false;
    }
  }

  showNormalList() {
    let current = this.head;
    let busList = "";

    while (current != null) {
      busList += current.getDetails();
      current = current.next;
      if (current == this.head) break;
    }

    return busList;
  }

  createRoute(
    initialBase,
    initialHour,
    initialMinutes,
    finalHour,
    finalMinutes
  ) {
    let initialHourDate = new Date();
    initialHourDate.setHours(initialHour);
    initialHourDate.setMinutes(initialMinutes);

    let finalHourDate = new Date();
    finalHourDate.setHours(finalHour);
    finalHourDate.setMinutes(finalMinutes);

    let current = this.search(initialBase);
    let route = `
    <b>Hora de inicio</b>: ${initialHourDate.getHours()}:${initialHourDate.getMinutes()}<br />
    <b>Hora de finalización</b>: ${finalHourDate.getHours()}:${finalHourDate.getMinutes()}<br /><br />
    `;

    if (current == null) {
      return false;
    }

    do {
      route += `
      Base ${
        current.name
      } - ${initialHourDate.getHours()}:${initialHourDate.getMinutes()}<br />\n
      `;

      initialHourDate.setMinutes(
        initialHourDate.getMinutes() + current.next.duration
      );

      current = current.next;
    } while (
      initialHourDate.getHours() < finalHourDate.getHours() ||
      (initialHourDate.getHours() == finalHourDate.getHours() &&
        initialHourDate.getMinutes() <= finalHourDate.getMinutes())
    );

    return route;
  }
}
