import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

interface Usuario {
  email: string;
  token: string;
}

@Injectable({ providedIn: 'root' })

export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  // Inyectamos el ID de la plataforma de forma moderna
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  // Inicializa con los datos del navegador o null si está en el servidor
  private usuario = signal<Usuario | null>(this.cargarSesionGuardada());

  usuarioActual = this.usuario.asReadonly();
  estaAutenticado = computed(() => this.usuario() !== null);

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${environment.apiUrl}/auth/login`, { email, password });
  }

  guardarSesion(email: string, token: string) {
    const usuario = { email, token };
    this.usuario.set(usuario);
    
    // Protegemos la escritura
    if (this.isBrowser) {
      localStorage.setItem('sesion', JSON.stringify(usuario));
    }
  }

  logout() {
    this.usuario.set(null);
    
    // Protegemos el borrado
    if (this.isBrowser) {
      localStorage.removeItem('sesion');
    }
    this.router.navigate(['/login']);
  }

  private cargarSesionGuardada(): Usuario | null {
    // Si no es el navegador, detenemos la lectura para evitar el crash
    if (!this.isBrowser) {
      return null;
    }

    const guardado = localStorage.getItem('sesion');
    return guardado ? JSON.parse(guardado) : null;
  }
}
