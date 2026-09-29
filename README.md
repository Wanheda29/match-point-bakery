# Match Point Bakery

[Abrir la aplicación](https://wanheda29.github.io/match-point-bakery/).

MVP web responsive para calcular costos, registrar compras, crear recetas y guardar ventas de una pastelería por encargo.

## Ejecutar localmente

Requiere Node.js 20 o posterior.

```bash
npm run serve
```

Abrir `http://localhost:4173`. Las pruebas se ejecutan con `npm test`.

## Publicación en GitHub Pages

La aplicación no necesita compilación: se puede publicar la raíz del repositorio desde **Settings → Pages → Deploy from a branch**. La interfaz es estática; los datos de la cuenta se guardan en Supabase y pueden exportarse como JSON. En GitHub Free, Pages requiere un repositorio público: no subir secretos, archivos `.env` ni respaldos. `cloud-config.js` contiene únicamente la clave pública prevista para el navegador; la protección de los datos depende de la autenticación y las políticas RLS de Supabase.

## Alcance de esta primera versión

- Insumos con unidades base en gramos, mililitros o unidades.
- Compras y costo promedio ponderado. Las compras pueden corregirse o eliminarse con ajuste de stock e historial; si el stock o su valor quedarían negativos, la corrección se rechaza.
- Ajustes manuales de stock con motivo e historial; aportes de insumos del hogar al registrar producciones sin stock suficiente.
- Productos, recetas, rendimiento y precio de venta.
- Edición segura de insumos, productos y recetas. Los insumos sin stock ni movimientos o referencias pueden eliminarse.
- Registro de producciones por tanda con validación y descuento de materias primas.
- Gastos opcionales: envases, mano de obra, gas, electricidad, reparto y otros.
- Ventas con una fotografía del costo al momento de registrarlas.
- Pedidos con cliente, teléfono opcional, fecha de entrega, seña, saldo, notas y estado. Se muestran del más reciente al más antiguo; al eliminarlos salen de la vista y la agenda, pero sus ventas vinculadas permanecen.
- Filtros de pedidos por cliente y estado, con un máximo de 8 pedidos por página.
- Fichero de clientes reutilizable, con opción de eliminación sin borrar los pedidos registrados, y agenda de entregas agrupada por fecha.
- Producciones mostradas del registro más reciente al más antiguo.
- Anulación auditable de producciones con devolución exacta de insumos.
- Eliminación de producciones: desaparecen de la lista, revierten el stock si estaban activas y permanecen en el respaldo para auditoría. Cada producción muestra un desglose de sus costos históricos; las nuevas también guardan el detalle de gastos adicionales.
- Respaldos versionados, restauración validada y compatibilidad con exportaciones anteriores.
- Integración opcional con Supabase para login, sincronización y control del estado comercial.
- Conversión automática y única de un pedido entregado en una venta.
- Informe mensual y exportación de respaldo.
- Informe mensual filtrable por cliente; las ventas directas pueden registrar un cliente opcional, y las anteriores sin ese dato se muestran como «Sin cliente».
- PWA instalable. La cuenta y la sincronización requieren conexión a Internet.

## Conexión con Supabase

Esta copia usa exclusivamente el proyecto Supabase `hrcbprhmwqmymobxumao`. La URL y la clave pública están configuradas en `cloud-config.js`. El almacenamiento local y la caché tienen un identificador propio. No se copiaron datos ni usuarios del negocio original.

Estado de la instalación (29/09/2026):

- Esquema aplicado: tablas `businesses`, `memberships` y `business_data`, con RLS habilitado, funciones de sincronización y políticas de acceso del original.
- Negocio `Match Point Bakery` creado y activo, sin datos comerciales. ID: `ced686f3-9c12-4930-afca-161c1b565809`.
- Cuenta de la persona administradora creada, confirmada y asociada a Match Point Bakery.
- Sitio publicado en GitHub Pages y URL configurada en Supabase. Clave pública verificada (HTTP 200); acceso anónimo a datos rechazado (HTTP 401).
- Guardado y lectura verificados con el rol authenticated y la identidad de la cuenta en una transacción revertida. La base mantiene cero registros comerciales.
- Pendiente únicamente la comprobación de inicio de sesión por la persona usuaria con su contraseña.

`supabase/schema.sql` es para una instalación nueva: no volver a ejecutarlo en este proyecto, donde ya se aplicó.
Origen del código: `Wanheda29/dulce-gestion`, commit `86f8b4e12e5aa97137e70b6600f288ec6d6bd2c7`.
