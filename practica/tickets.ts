interface Ticket {
    id: number;
    titulo: string;
    estado: 'abierto' | 'cerrado';
}

class GestorTicket {
    private tickets: Ticket[] = [];

    agregar(ticket: Ticket): void {
        this.tickets.push(ticket);
    }

    cerrarPorId(id: number): boolean{
        const ticketEncontrado = this.tickets.find(ticket => ticket.id === id);

        if(ticketEncontrado){
            ticketEncontrado.estado = 'cerrado';
            return true;
        }
        return false;
    }

    buscarTodosDisponibles(): Ticket[] {
        return this.tickets.filter(tic => tic.estado === 'abierto');
    }

    contarPorEstado(): { abiertos: number; cerrados: number;}{ 

        const abiertos = this.tickets.filter(t => t.estado === 'abierto').length;
        const cerrados = this.tickets.filter(t => t.estado === 'cerrado').length;

        return { abiertos, cerrados };
    }
}