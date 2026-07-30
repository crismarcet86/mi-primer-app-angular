# Gestor de Tickets y Catálogo de Productos — Proyecto Full-Stack

Proyecto integrador construido durante un plan de estudio autodidacta de Angular (12 semanas)
y C#/ASP.NET Core (8 semanas), partiendo de experiencia previa en PHP/Zend Framework.

## Arquitectura

```
Angular (Vercel)  →  API ASP.NET Core (Railway)  →  PostgreSQL (Railway)
     Frontend              Backend                     Base de datos
```

- **Frontend**: https://mi-primer-app-angular-three.vercel.app/
- **Backend / API**: https://ticketapi-dotnet-production.up.railway.app/swagger

Ambos servicios están conectados con integración continua: cada push a la rama principal
de cada repositorio dispara un redeploy automático (Vercel para el frontend, Railway para el backend).

## Funcionalidades

- Dashboard de tickets con tabla (Angular Material), filtros y estado reactivo (signals / NgRx Signal Store)
- Creación de tickets con formularios reactivos y validaciones
- Confirmación de cierre de ticket con `MatDialog` + notificación con `MatSnackBar`
- Catálogo de productos consumiendo la Fake Store API, con búsqueda con debounce
- Detalle de ticket y de producto con rutas dinámicas y lazy loading
- Autenticación (DummyJSON) con guards de ruta y persistencia de sesión
- Interceptor HTTP que agrega el token a cada petición saliente
- Pipe y directiva personalizados
- Pruebas unitarias de servicios, store y pipes (Jasmine/Karma)
- Pruebas E2E de los flujos principales (Playwright)

## Stack técnico

### Frontend
- Angular 21 (standalone components, signals, control flow moderno, SSR)
- Angular Material
- `@ngrx/signals` (Signal Store)
- TypeScript / RxJS
- Jasmine/Karma (testing unitario)
- Playwright (testing E2E)

### Backend
- C# / ASP.NET Core Web API (.NET 10)
- Entity Framework Core + PostgreSQL (Npgsql)
- Autenticación con JWT (tokens propios, contraseñas hasheadas con BCrypt)
- Swashbuckle (Swagger UI)
- xUnit + `WebApplicationFactory` (testing de integración con base de datos en memoria)

## Cómo correr el proyecto

```bash
npm install
ng serve
```
Abre http://localhost:4200

## Cómo correr los tests unitarios

```bash
ng test
```

## Cómo correr los tests E2E

Los tests E2E viven en la carpeta `tests/` (fuera de `src/`), separados de los tests unitarios de Angular.

```bash
npx playwright test
```

Recomendado para el primer intento: levanta `ng serve` manualmente en una terminal y espera a que termine de compilar antes de correr los tests en otra terminal — así evitas timeouts por arranque en frío del servidor (especialmente por el SSR):

```bash
# Terminal 1
ng serve

# Terminal 2, una vez que compiló
npx playwright test
```

Otros comandos útiles:
```bash
npx playwright test --ui       # interfaz visual, ideal para depurar paso a paso
npx playwright show-report     # reporte HTML de la última corrida
```

### Cobertura actual de tests E2E
- Navegación básica del dashboard
- Login exitoso y acceso a ruta protegida (`/nuevo-ticket`)
- Cerrar un ticket (tabla → diálogo de confirmación → snackbar)
- Botón "Cerrar ticket" oculto sin sesión activa
- Redirección a `/login` al intentar acceder a una ruta protegida sin sesión

## Estructura del proyecto

```
src/app/
├── core/
│   ├── services/       # Servicios compartidos (producto, auth)
│   ├── stores/          # Estado global con @ngrx/signals (tickets)
│   ├── guards/           # Guards de ruta (autenticación)
│   └── interceptors/     # Interceptores HTTP (token de sesión)
├── shared/
│   ├── pipes/            # Pipes reutilizables
│   └── directives/       # Directivas reutilizables
└── features/             # Componentes organizados por dominio (tickets, productos, login)

tests/                    # Tests E2E con Playwright (fuera de src/, no se compilan con la app)
├── helpers/
├── pages/                 # Page Objects
└── *.spec.ts
```

## Aprendizajes clave

- Los signals son suficientes y perfectamente idiomáticos para estado compartido de tamaño medio;
  una librería como NgRx Signal Store solo se justifica cuando el proyecto alcanza un nivel crítico
  de complejidad, concurrencia entre equipos, o necesidad de auditoría del estado.
- El SSR (Server-Side Rendering) introduce condiciones de carrera sutiles entre servidor y cliente
  (por ejemplo, guards de ruta o lectura de `localStorage`) que no aparecen en un desarrollo puramente
  client-side, y requieren chequear explícitamente en qué "lado" se está ejecutando el código
  (`isPlatformBrowser`).
- Los tests E2E viven fuera del árbol de la aplicación (`tests/`, no `src/app/`) porque prueban la app
  desde afuera, como lo haría un usuario real, y nunca deben mezclarse con los tests unitarios de Angular.
- En ASP.NET Core, los parámetros de tipos simples (`int`, `enum`, `string`) se leen por defecto de la
  query string o la ruta, no del cuerpo de la petición — hace falta `[FromBody]` explícito para que
  coincidan con lo que envía un cliente como Angular vía `HttpClient`.
- Los tests de integración (`WebApplicationFactory`) nunca deben tocar la base de datos real: se
  reemplaza el proveedor de EF Core por uno en memoria (o se activa un entorno `"Testing"` dedicado)
  para que cada corrida empiece con datos limpios y aislados.
- CORS se configura por **origen** (protocolo + dominio + puerto de quien consume la API), nunca por
  la URL de la propia API ni con rutas incluidas — y hay que distinguir entre URLs de *preview* y de
  *producción* al autorizar un frontend desplegado.

## Despliegue

- **Frontend**: conectado a Vercel con integración continua desde GitHub — cada push a la rama
  principal dispara un redeploy automático.
- **Backend**: conectado a Railway con integración continua desde GitHub — cada push redespliega la
  API y aplica las migraciones de base de datos automáticamente al arrancar (`db.Database.Migrate()`
  en `Program.cs`).
- Variables sensibles (cadena de conexión a PostgreSQL, clave JWT) se gestionan como variables de
  entorno en Railway, nunca committeadas al repositorio.