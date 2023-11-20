const TIPO_GESTION = [
  {
    id: 1,
    nombre_gestion: "Gestión interna",
    color: "danger",
    texto: "white",
    icono: "fas fa-house-user",
  },
  {
    id: 2,
    nombre_gestion: "Gestión judicial",
    color: "danger",
    texto: "white",
    icono: "fas fa-balance-scale",
  },
  {
    id: 3,
    nombre_gestion: "Gestión extrajudicial",
    color: "danger",
    texto: "white",
    icono: "fas fa-balance-scale",
  },
  {
    id: 4,
    nombre_gestion: "Atención telefónica",
    color: "success",
    texto: "white",
    icono: "fas fa-phone",
  },
  {
    id: 5,
    nombre_gestion: "Atención por correo",
    color: "success",
    texto: "white",
    icono: "far fa-envelope",
  },
  {
    id: 6,
    nombre_gestion: "Reunión / Videoconferencia",
    color: "dark",
    texto: "white",
    icono: "fas fa-video",
  },
  {
    id: 7,
    nombre_gestion: "Elaboración reportes/informes/documentos",
    color: "secondary",
    texto: "white",
    icono: "far fa-file-alt",
  },
  {
    id: 8,
    nombre_gestion: "Coordinación interna",
    color: "warning",
    texto: "dark",
    icono: "fas fa-users",
  },
  {
    id: 9,
    nombre_gestion: "Coordinación con equipos externos",
    color: "warning",
    texto: "dark",
    icono: "fas fa-users",
  },
  {
    id: 10,
    nombre_gestion: "Soporte en terreno",
    color: "info",
    texto: "light",
    icono: "fas fa-user-cog",
  },
  {
    id: 11,
    nombre_gestion: "Soporte remoto",
    color: "info",
    texto: "light",
    icono: "fas fa-user-cog",
  },
  {
    id: 12,
    nombre_gestion: "Trabajo en terreno",
    color: "info",
    texto: "light",
    icono: "fas fa-laptop-house",
  },
  {
    id: 13,
    nombre_gestion: "Otro tipo de gestión",
    color: "info",
    texto: "light",
    icono: "fas fa-globe-americas",
  },
];

const form = document.getElementById("form_gestion");
const select = document.getElementById("select_gestiones");
const historial = document.getElementById("historial_gestiones");

/**
 * FUNCIONES DE VALIDACION DE LOS CAMPOS POR TIPO
 */
const valida_obligatorio = (campo) => {
  return campo === "" || campo.length === 0;
};

const valida_select = (campo) => {
  !TIPO_GESTION.some((gestion) => gestion.id === parseInt(campo));
};

const valida_min = (campo, valor) => {
  return campo.length < valor;
};

const valida_max = (campo, valor) => {
  return campo.length > valor;
};

const validacion_campos = (campo1, campo2, campo3) => {
  let errores = [];

  if (valida_obligatorio(campo1)) {
    errores.push(mensaje_error("obligatorio", "Tipo de gestion"));
  } else if (valida_select(campo1)) {
    errores.push(mensaje_error("select", "Tipo de gestion"));
  }

  if (valida_obligatorio(campo2)) {
    errores.push(mensaje_error("obligatorio", "Detalle de gestión"));
  } else if (valida_min(campo2, 3)) {
    errores.push(mensaje_error("min", "Detalle de gestion"));
  } else if (valida_max(campo2, 1000)) {
    errores.push(mensaje_error("max", "Detalle de gestion"));
  }

  if (valida_obligatorio(campo3)) {
    errores.push(mensaje_error("obligatorio", "Titulo gestión"));
  } else if (valida_min(campo3, 3)) {
    errores.push(mensaje_error("min", "Titulo gestion"));
  } else if (valida_max(campo3, 150)) {
    errores.push(mensaje_error("max", "Titulo gestion"));
  }

  return errores;
};

const mensaje_error = (regla, nombre) => {
  switch (regla) {
    case "obligatorio":
      return `<span class='fw-bold'>${nombre}</span> es un campo obligatorio.`;
      break;
    case "select":
      return `El valor seleccionado no existe en la lista de <span class='fw-bold'>${nombre}.</span>`;
      break;
    case "min":
      return `El <span class='fw-bold'>${nombre}</span> debe tener al menos 3 caracteres.`;
      break;
    case "max":
      return `El <span class='fw-bold'>${nombre}</span> no puede tener más de 10000 caracteres.`;
      break;
  }
};

/**
 * LLENA EL CAMPO SELECT CON LOS DATOS DE TIPO DE GESTION EXISTENTES.
 */
TIPO_GESTION.forEach((gestion) => {
  const option = document.createElement("option");

  option.value = gestion.id;
  option.text = gestion.nombre_gestion;

  select.appendChild(option);
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let tipo_gestion = document.getElementById("select_gestiones").value;
  let titulo_gestion = document.getElementById("titulo_gestion").value;
  let detalle_gestion = document.getElementById("detalle_gestion").value;
  let errors = [];

  errors = validacion_campos(tipo_gestion, detalle_gestion, titulo_gestion);

  if (errors.length > 0) {
    sessionStorage.setItem("errors", JSON.stringify(errors));
    document.getElementById("errors").innerHTML = errors.join("<br>");
  } else {
    let data_obj_selected = TIPO_GESTION.find(
      (tg) => tg.id === parseInt(tipo_gestion)
    );

    let data_gestion = {
      tipo_gestion: tipo_gestion,
      titulo_gestion: titulo_gestion,
      detalle_gestion: detalle_gestion,
      fecha_gestion: new Date(),
      color: data_obj_selected.color,
      icono: data_obj_selected.icono,
      texto: data_obj_selected.texto,
    };

    let gestion = JSON.parse(localStorage.getItem("gestion")) || [];

    gestion.push(data_gestion);
    localStorage.setItem("gestion", JSON.stringify(gestion));

    alert("La gestión se ha registrado correctamente");

    return window.location.reload();
  }
});

form.addEventListener("submit", function (event) {
  let savedErrors = sessionStorage.getItem("errors");
  if (savedErrors) {
    let parsedErrors = JSON.parse(savedErrors);
    let errors = document.getElementById("alert");

    errors.classList.add("alert");
    errors.classList.add("alert-danger");
    errors.classList.add("mb-4");
    errors.innerHTML = parsedErrors.join("<br>");
  }
  sessionStorage.clear();
});

addEventListener("load", function (event) {
  const storedItems = JSON.parse(localStorage.getItem("gestion"));

  if (storedItems) {
    storedItems.forEach((item, index) => {
      let itemLi = document.createElement("li");
      itemLi.classList.add("timeline-item");
      itemLi.classList.add("mb-5");

      let fecha = new Date(item.fecha_gestion);

      itemLi.innerHTML = `
        <span class="timeline-icon bg-${item.color}">
            <i class="${item.icono} text-${item.texto} fa-sm fa-fw"></i>
        </span>

        <h5 class="fw-bold">${item.titulo_gestion}</h5>
        <p class="text-muted" id="texto">${item.detalle_gestion}</p>
        <p class="text-muted mb-2 fw-bold" id="fecha">
        Publicado el: 
        ${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()} 
      ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}
        </p>
      `;
      historial.appendChild(itemLi);
    });
  } else {
    document.getElementById(
      "mensaje_incial"
    ).innerHTML = `<p>No se registran gestiones.</p>`;
  }
});
