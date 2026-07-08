interface Libro {
    titulo: string;
    autor: string;
    anio: number;
    disponible: boolean;
}

class Biblioteca {
    private libros: Libro[] = [];

    agregar(libro: Libro): void {
        this.libros.push(libro);
    }

    disponibles(): Libro[] {
        return this.libros.filter(l => l.disponible);
    }

    buscarPorAutor(autor: string): Libro[]{
        return this.libros.filter(lib => lib.autor.includes(autor));
    }
}