# Mi Primer App Angular — Gestor de Tickets y Catálogo de Productos

Proyecto integrador construido durante un plan de estudio autodidacta de Angular (8 semanas), 
partiendo de experiencia previa en PHP/Zend Framework.

## Funcionalidades
- Dashboard de tickets con filtros y estado reactivo (signals)
- Creación de tickets con formularios reactivos y validaciones
- Catálogo de productos consumiendo la Fake Store API
- Búsqueda de productos con debounce
- Detalle de ticket y de producto con rutas dinámicas y lazy loading
- Pipe y directiva personalizados
- Pruebas unitarias de servicios y pipes

## Stack técnico
- Angular 21 (standalone components, signals, control flow moderno)
- TypeScript
- RxJS
- Jasmine/Karma para testing

## Cómo correr el proyecto
\`\`\`bash
npm install
ng serve
\`\`\`
Abre http://localhost:4200

## Cómo correr los tests
\`\`\`bash
ng test
\`\`\`

## Estructura del proyecto
\`\`\`
src/app/
├── core/services/       # Servicios compartidos (estado global)
├── shared/               # Pipes y directivas reutilizables
└── features/             # Componentes organizados por dominio
\`\`\`

## Aprendizajes clave
cuando la aplicación alcanza un nivel crítico de complejidad, concurrencia y auditoría
los Signals son perfectos para flujos locales, reactividad directa y estados compartidos de tamaño medio, un enfoque basado puramente en servicios con Signals se vuelve insostenible en escenarios de sincronizacion masiva o multiples equipos