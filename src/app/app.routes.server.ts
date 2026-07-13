import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { 
    path: 'tickets/:id', 
    renderMode: RenderMode.Server 
  },
  { 
    path: 'productos/:id', 
    renderMode: RenderMode.Server 
  },
  { 
    path: '**', 
    renderMode: RenderMode.Prerender 
  }
];
