class MaterialBiblioteca {
  constructor(titulo, autor, anioPublicacion, disponible) {
    this.titulo = titulo;
    this.autor = autor;
    this.anioPublicacion = anioPublicacion;
    this.disponible = disponible;
  }

  mostrarInfo() {
    return `Titulo ${this.titulo} de ${this.autor} del año ${this.anioPublicacion} se encuentra ${this.disponible}`;
  }

  prestar() {
    if (this.disponible) {
      this.disponible = false;
      return "El libro ha sido prestado";
    } else {
      return "El libro ya esta prestado";
    }
  }

  devolver() {
    if (!this.disponible) {
      this.disponible = true;
      return "El libro ha sido devuelto";
    } else {
      return "El libro ya esta disponible";
    }
  }
}

//HERENCIAS DE MATERIALBIBLIOTECA
class Libro extends MaterialBiblioteca {
  constructor(titulo, autor, anioPublicacion, disponible, numeroPaginas) {
    super(titulo, autor, anioPublicacion, disponible);
    this.numeroPaginas = numeroPaginas;
  }

  resumen() {
    return `Titulo ${this.titulo} de ${this.autor} del año ${this.anioPublicacion} que tiene ${this.numeroPaginas} paginas`;
  }
}

class Revista extends MaterialBiblioteca {
  constructor(titulo, autor, anioPublicacion, disponible, numeroEdicion) {
    super(titulo, autor, anioPublicacion, disponible);
    this.numeroEdicion = numeroEdicion;
  }

  mostrarEdicion() {
    return `Numero de edicion ${this.numeroEdicion} del año ${this.anioPublicacion}`;
  }
}

class VideoEducativo extends MaterialBiblioteca {
  constructor(titulo, autor, anioPublicacion, disponible, duracion, tema) {
    super(titulo, autor, anioPublicacion, disponible);
    this.duracion = duracion;
    this.tema = tema;
  }

  reproducir() {
    if (this.disponible) {
      this.disponible = false;
      return "El video se esta reproduciendo";
    } else {
      this.disponible = true;
      return "El video se ha pausado";
    }
  }
}

//FIN HERENCIAS

class Usuario {
  constructor(nombre, idUsuario, materialPrestado = []) {
    this.nombre = nombre;
    this.idUsuario = idUsuario;
    this.materialPrestado = materialPrestado;
  }

  prestarMaterial(material) {
    if (material.disponible) {
      this.materialPrestado.push(material);
      material.disponible = false;
      alert("El material ha sido prestado");
    } else {
      alert("El material no esta disponible");
    }
  }

  devolverMaterial(material) {
    let posicion = this.materialPrestado.indexOf(material);
    if (posicion != -1) {
      this.materialPrestado.splice(posicion, 1);
      material.disponible = true;
      alert("El material ha sido devuelto");
    } else {
      alert("El material no estaba prestado");
    }

  }

}



//EXTRA: CLASE BIBLIOTECA

class Biblioteca {
  constructor() {
    this.usuarios = [];
    this.materiales = [];
    this.grid = null;
    this.gridMateriales = null;


  }

  inicializarTabla(divId) {
    const tablaDiv = document.getElementById(divId);
    this.grid = new gridjs.Grid({
      columns: ["ID", "Nombre"],
      data: [],
      pagination: { enabled: true, limit: 5 },
      search: true,
      sort: true,
      language: {
        search: { placeholder: "Buscar..." },
        pagination: {
          previous: "Anterior",
          next: "Siguiente",
          showing: "Mostrando",
          results: () => "registros"
        }
      }
    }).render(tablaDiv);
  }

  añadir() {
    let cantidad = this.usuarios.length;

    const nombre = document.getElementById("alta").value;

    if (nombre == "") {
      alert("El nombre debe estar relleno.");
    } else {
      cantidad++;
      let usuario = { cantidad, nombre };
      this.usuarios.push(usuario);

      if (this.grid) {
        this.grid.updateConfig({
          data: this.usuarios.map(u => [u.cantidad, u.nombre])
        }).forceRender();
      }

      document.getElementById("alta").value = "";
    }
  }

  inicializarTablaMateriales(divId) {
    const tablaDiv = document.getElementById(divId);
    this.gridMateriales = new gridjs.Grid({
      columns: ["Titulo", "Autor", "Año", "Tipo Material", "Disponibilidad"],
      data: [],
      pagination: { enabled: true, limit: 5 },
      search: true,
      sort: true,
      language: {
        search: { placeholder: "Buscar..." },
        pagination: {
          previous: "Anterior",
          next: "Siguiente",
          showing: "Mostrando",
          results: () => "registros"
        }
      }
    }).render(tablaDiv);
  }

  añadirMateriales() {
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const anio = document.getElementById("anio").value;
    const tipoMaterial = document.getElementById("tipoMaterial").value;

    if (titulo == "" || autor == "" || anio == "") {
      alert("Los campos deben estar llenos");
    } else {
      let material = { titulo, autor, anio, tipoMaterial };

      if (tipoMaterial === "Libro") {
        const numeroPaginas = document.getElementById("numeroPaginas")?.value;
        if (!numeroPaginas) { alert("Debes indicar el número de páginas"); return; }
        material = new Libro(titulo, autor, anio, true, parseInt(numeroPaginas));
      } else if (tipoMaterial=== "Revista") {
        const numeroEdicion = document.getElementById("numeroEdicion")?.value;
        if (!numeroEdicion) { alert("Debes indicar el número de edición"); return; }
        material = new Revista(titulo, autor, anio, true, parseInt(numeroEdicion));
      } else if (tipoMaterial === "VideoEducativo") {
        const duracion = document.getElementById("duracion")?.value;
        const tema = document.getElementById("tema")?.value;
        if (!duracion || !tema) { alert("Debes indicar duración y tema"); return; }
        material = new VideoEducativo(titulo, autor, anio, true, parseInt(duracion), tema);
      }
      this.materiales.push(material);
      //console.log(this.materiales);

      if (this.gridMateriales) {
        this.gridMateriales.updateConfig({
          data: this.materiales.map(m => {
            let extra = "";
            if (m instanceof Libro) extra = `${m.numeroPaginas} páginas`;
            if (m instanceof Revista) extra = `Edición ${m.numeroEdicion}`;
            if (m instanceof VideoEducativo) extra = `${m.duracion} min / ${m.tema}`;
            return [m.titulo, m.autor, m.anioPublicacion, m.constructor.name + " (" + extra + ")"];
          })
        }).forceRender();
      }

      document.getElementById("titulo").value = "";
      document.getElementById("autor").value = "";
      document.getElementById("anio").value = "";
      document.getElementById("numeroPaginas")?.remove();
      document.getElementById("numeroEdicion")?.remove();
      document.getElementById("duracion")?.remove();
      document.getElementById("tema")?.remove();


    }

  }

}


const miBiblioteca = new Biblioteca();

miBiblioteca.inicializarTabla("tablaUsuarios");
miBiblioteca.inicializarTablaMateriales("tablaMateriales");


function añadir() {
  miBiblioteca.añadir();
}

function añadirMateriales() {
  miBiblioteca.añadirMateriales();
}

document.addEventListener("DOMContentLoaded", () => {
  const tipoSelect = document.getElementById("tipoMaterial");
  const camposEspecificos = document.getElementById("camposEspecificos");

  tipoSelect.addEventListener("change", function() {
    let html = "";
    if (this.value === "Libro") {
      html = `<label class="label">Número de Páginas</label>
              <div class="control">
                <input class="input is-primary mb-3" id="numeroPaginas" type="number" placeholder="Número de páginas">
              </div>`;
    } else if (this.value === "Revista") {
      html = `<label class="label">Número de Edición</label>
              <div class="control">
                <input class="input is-primary mb-3" id="numeroEdicion" type="number" placeholder="Número de edición">
              </div>`;
    } else if (this.value === "VideoEducativo") {
      html = `<label class="label">Duración (min)</label>
              <div class="control">
                <input class="input is-primary mb-3" id="duracion" type="number" placeholder="Duración en minutos">
              </div>
              <label class="label">Tema</label>
              <div class="control">
                <input class="input is-primary mb-3" id="tema" type="text" placeholder="Tema del video">
              </div>`;
    }
    camposEspecificos.innerHTML = html;
  });
});




