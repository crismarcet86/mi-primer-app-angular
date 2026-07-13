// confirmar-dialog.ts
import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmar-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Confirmar</h2>
    <mat-dialog-content>¿Seguro que quieres cerrar este ticket?</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="dialogRef.close(false)">Cancelar</button>
      <button mat-raised-button color="warn" (click)="dialogRef.close(true)">Cerrar Ticket</button>
    </mat-dialog-actions>
  `
})
export class ConfirmarDialog {
  dialogRef = inject(MatDialogRef<ConfirmarDialog>);
}