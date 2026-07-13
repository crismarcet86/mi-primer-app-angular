import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr'; // Ambas funciones vienen de @angular/ssr en v18
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    // Se pasa la configuración de rutas del servidor usando un helper interno
    provideServerRendering(withRoutes(serverRoutes)) 
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
