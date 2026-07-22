interface Ticket {
    id: number;
    titulo: string;
    estado: 'Abierto' | 'Cerrado';
}

class GestorTicket {
    private tickets: Ticket[] = [];

    agregar(ticket: Ticket): void {
        this.tickets.push(ticket);
    }

    cerrarPorId(id: number): boolean{
        const ticketEncontrado = this.tickets.find(ticket => ticket.id === id);

        if(ticketEncontrado){
            ticketEncontrado.estado = 'Cerrado';
            return true;
        }
        return false;
    }

    buscarTodosDisponibles(): Ticket[] {
        return this.tickets.filter(tic => tic.estado === 'Abierto');
    }

    contarPorEstado(): { Abiertos: number; Cerrados: number;}{ 

        const Abiertos = this.tickets.filter(t => t.estado === 'Abierto').length;
        const Cerrados = this.tickets.filter(t => t.estado === 'Cerrado').length;

        return { Abiertos, Cerrados };
    }
}