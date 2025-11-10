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

  prestar(){
    if(this.disponible){
        this.disponible=false;
    } else {
        return "El libro ya esta prestado";
    }
  }

  devolver(){
    if(!this.disponible){
        this.disponible=true;
    } else {
        return "El libro ya esta disponible";
    }
  }
}


//HERENCIAS DE MATERIALBIBLIOTECA
class Libro extends MaterialBiblioteca{
    constructor(titulo, autor, anioPublicacion,disponible,numeroPaginas){
        super(titulo,autor,anioPublicacion,disponible);
        this.numeroPaginas=numeroPaginas;
    }

    resumen(){
        return `Titulo ${this.titulo} de ${this.autor} del año ${this.anioPublicacion} que tiene ${this.numeroPaginas} paginas`;
    }
}

class Revista extends MaterialBiblioteca{
    constructor(titulo,autor, anioPublicacion,disponible,numeroEdicion){
        super(titulo,autor,anioPublicacion,disponible);
        this.numeroEdicion=numeroEdicion;
    }

    mostrarEdicion(){
        return `Numero de edicion ${this.numeroEdicion} del año ${this.anioPublicacion}`;
    }
}

class VideoEducativo extends MaterialBiblioteca{
    constructor(titulo,autor,anioPublicacion,disponible,duracion,tema){
        super(titulo,autor,anioPublicacion,disponible);
        this.duracion=duracion;
        this.tema=tema;
    }

    reproducir(){
        if(this.disponible){
            this.disponible=false;
            return "El video se esta reproduciendo";
        } else {
            this.disponible=true;
            return "El video se ha pausado";
        }
    }
}

//FIN HERENCIAS

class Usuario{
    constructor(nombre,idUsuario,materialPrestado){
        this.nombre=nombre;
        this.idUsuario=idUsuario;
        this.materialPrestado=materialPrestado;
    }

    prestarMaterial(material){
        if(material){

        } else {

        }
    }
}


