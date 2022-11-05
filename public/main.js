import BusBase from "../src/busBase.js";
import BusRoute from "../src/busRoute.js";

let busRoute = new BusRoute();

// ! DOM EVENTS

// * Add Bus Base
document.getElementById("btnAddBus").addEventListener("click", () => {
  let busName = document.getElementById("busName").value;
  let busDuration = document.getElementById("busDuration").value;

  let bus = new BusBase(busName, busDuration);

  if (busName == "" || busDuration == "") {
    Swal.fire({
      customClass: {
        confirmButton: "swalBtnColor",
      },
      title: "COMPLETE LOS CAMPOS CORRECTAMENTE",
      icon: "warning",
    });

    document.getElementById("formAdd").reset();
  } else {
    if (busRoute.add(bus)) {
      Swal.fire({
        customClass: {
          confirmButton: "swalBtnColor",
        },
        title: "Se ha AGREGADO la BASE correctamente",
        icon: "success",
      });
      console.log(busRoute);

      document.getElementById("formAdd").reset();
    } else {
      Swal.fire({
        customClass: {
          confirmButton: "swalBtnColor",
        },
        title: "La BASE ya existe",
        icon: "error",
      });

      document.getElementById("formAdd").reset();
    }
  }
});

// * Delete Bus Base
document.getElementById("btnDelBus").addEventListener("click", () => {
  let busNameToDelete = document.getElementById("busNameToDelete").value;

  if (busNameToDelete == "") {
    Swal.fire({
      customClass: {
        confirmButton: "swalBtnColor",
      },
      title: "COMPLETE LOS CAMPOS CORRECTAMENTE",
      icon: "warning",
    });
    document.getElementById("formDelete").reset();
  } else {
    if (busRoute.delete(busNameToDelete)) {
      Swal.fire({
        customClass: {
          confirmButton: "swalBtnColor",
        },
        title: "Se ha ELIMINADO la BASE correctamente",
        icon: "success",
      });
      console.log(busRoute);

      document.getElementById("formDelete").reset();
    } else {
      Swal.fire({
        customClass: {
          confirmButton: "swalBtnColor",
        },
        title: "La BASE no existe",
        icon: "error",
      });
      document.getElementById("formDelete").reset();
    }
  }
});

// * Search Bus Base
document.getElementById("btnSearchBus").addEventListener("click", () => {
  let busNameToSearch = document.getElementById("busNameToSearch").value;

  let bus = busRoute.search(busNameToSearch);

  if (bus) {
    Swal.fire({
      customClass: {
        confirmButton: "swalBtnColor",
      },
      title: "BASE ENCONTRADA",
      html: `${bus.getDetails()}`,
      icon: "info",
    });

    document.getElementById("formSearch").reset();
  } else {
    Swal.fire({
      customClass: {
        confirmButton: "swalBtnColor",
      },
      title: "La BASE no existe",
      icon: "warning",
    });

    document.getElementById("formSearch").reset();
  }
});

// * Show Normal List of Buses
document.getElementById("btnNormalList").addEventListener("click", () => {
  let busList = document.getElementById("busList");

  if (busRoute.showNormalList()) {
    busList.innerHTML = busRoute.showNormalList();
  } else {
    busList.innerHTML = "";
  }
});

// * Create Buses Route
document.getElementById("btnBusesRoute").addEventListener("click", () => {
  let initialBusBase = document.getElementById("initialBusBase").value;
  let initialBusHour = document.getElementById("initialBusHour").value;
  let initialBusMinutes = document.getElementById("initialBusMinutes").value;
  let finalBusHour = document.getElementById("finalBusHour").value;
  let finalBusMinutes = document.getElementById("finalBusMinutes").value;

  let route = busRoute.createRoute(
    initialBusBase,
    initialBusHour,
    initialBusMinutes,
    finalBusHour,
    finalBusMinutes
  );

  if (
    (initialBusBase =
      "" ||
      initialBusHour == "" ||
      initialBusMinutes == "" ||
      finalBusHour == "" ||
      finalBusMinutes == "")
  ) {
    Swal.fire({
      customClass: {
        confirmButton: "swalBtnColor",
      },
      title: "COMPLETE LOS CAMPOS CORRECTAMENTE",
      icon: "warning",
    });

    document.getElementById("formRoute").reset();
  } else {
    if (route) {
      function getCurrentDate() {
        let currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();

        return `${day}/${month}/${year} A LAS ${hours}:${minutes}`;
      }

      Swal.fire({
        customClass: {
          confirmButton: "swalBtnColor",
        },
        title: `RECORRIDO CONSULTADO EL ${getCurrentDate()}`,
        html: `${route}`,
        icon: "info",
      });

      console.log(route);

      document.getElementById("formRoute").reset();
    } else {
      Swal.fire({
        customClass: {
          confirmButton: "swalBtnColor",
        },
        title: "La BASE no existe",
        icon: "warning",
      });

      document.getElementById("formRoute").reset();
    }
  }

  /* */
});
