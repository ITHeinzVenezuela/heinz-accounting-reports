Al ejecutar el siguiente comando se iniciar un procesivo interactivo para configurar el servicio
 
  $ npx qckwinsvc

  prompt: Service name: mi-servicio
  prompt: Service description: este es un ejemplo de prueba
  prompt: Node script path: C:\Users\CXK8279\Desktop\webs\heinz-accounting-reports\src\server.js
  prompt: Service name: "mi-servicio"

=============================================================
Eliminar Servicio de Windows

- Buscar el Servicio de Windows en la lista de servicios
- Click Derecho en Propiedades
- Identificar el "Nombre del Servicio"
- Abrir cmd como administrador (Tiene que abrir en "C:\Windows\system32>")
- Ejecutar el Siguiente Comando junto con el nombre del servicio a crear

  $ sc delete <service-name>

  OUTPUT:
  [SC] DeleteService CORRECTO: