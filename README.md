# ShelfMate Fontend - Web

## Equipo 1 - CEM
Integrantes: 
* A01751655 Cortés Olvera Gabriela 
* A01745865 García Gómez José Ángel 
* A01745096 González de la Parra Pablo 
* A01751580 Islas Montiel Zaide
* A01745371 Sánchez Bahnsen Elisa
* A01382889 Ana Martínez Barbosa
* A01706870 José María Ibarra Pérez
* A01745158 García Sánchez Erika Marlene

## Tecnologías utilizadas
* [React JS](https://es.react.dev/) 
* [Evergreen UI](https://evergreen.segment.com/)
* [Ant Design](https://ant.design/)
* [React Toastify](https://fkhadra.github.io/react-toastify/introduction)

## Requisitos del sistema
* [Node JS](https://nodejs.org/es/)  - v18.15.0
* [NPM](https://www.npmjs.com/) - v10.1.0
* [Git](https://git-scm.com/)
* [ShelfMate Node Backend](https://github.com/Mavericks-2/backend)
* [ShelfMate Flask Backend](https://github.com/Mavericks-2/model)
* Variables de entorno:
  * REACT_APP_API_BASE_URL
  * REACT_APP_FLASK_BASE_URL

## Instalación
1. Clonar el repositorio
```bash
git clone git@github.com:Mavericks-2/frontend-web.git
```
2. Instalar las dependencias
```bash
npm install
```
3. Correr el proyecto
```bash
npm start
```
4. Abrir el navegador en la dirección [http://localhost:3000](http://localhost:3000)

## Manual de usuario
### Diseño de pantallas
* [Figma](https://www.figma.com/file/bJpg3JYQHDTPZkiMOW6znI/MockUp-Oxxo-Web?type=design&mode=design&t=5w8aNJTOACNotlYN-1)

### Funcionalidades
* Registro de usuario 
* Inicio de sesión
* Visualización de gráficos
* Configuración de planograma

### Registro de usuario

#### Para ubicar la pantalla de registro:
* En la barra de navegación, se debe de dar click en el botón de "Iniciar sesión".
* Posteriormente, dentro de la pantalla de inicio de sesión, se debe de dar click en el botón de "Registrarse".

#### Para registrarse:
* Se debe de ingresar un correo electrónico válido.
* Se debe de ingresar una contraseña de mínimo 8 caracteres, 1 caracter especial, 1 número y 1 letra mayúscula.
* Se deberá ingresar un nombre.
* Se deberá ingresar un apellido.
* Una vez registrados, se deberá de confirmar el correo electrónico ingresando un código el cual se enviará al correo electrónico previamente ingresado.
* Si el código es correcto, se mostrará un mensaje de confirmación y se redirigirá a la pantalla principal.
* Si el código es incorrecto, se mostrará un mensaje de error y se mantendrá en la misma pantalla de registro.

#### Para salir de la pantalla de registro:
* Se deberá de dar click en el botón de "Iniciar Sesión" para regresar a la pantalla de inicio de 
sesión.
* Se deberá de dar click en el logo ubicado en la parte superior izquierda para regresar a la pantalla principal.


### Inicio de sesión

#### Para ubicar la pantalla de inicio de sesión:
* En la barra de navegación, se debe de dar click en el botón de "Iniciar sesión".

#### Para iniciar sesión:
* Se debe de ingresar un correo electrónico válido.
* Se debe de ingresar una contraseña de mínimo 8 caracteres, 1 caracter especial, 1 número y 1 letra mayúscula.
* En caso de que el correo electrónico o la contraseña sean incorrectos, se mostrará un mensaje de error y se mantendrá en la misma pantalla de inicio de sesión.
* En caso de que el correo electrónico o la contraseña sean correctos, se mostrará un mensaje de confirmación y se redirigirá a la pantalla principal.

#### Para salir de la pantalla de inicio de sesión:
* Se deberá de dar click en el botón de "Registrarse" para ir a la pantalla de registro.
* Se deberá de dar click en el logo ubicado en la parte superior izquierda para regresar a la pantalla principal.


### Visualización de gráficos

#### Para ubicar la pantalla de visualización de gráficos:
* Para poder ingresar a la pantalla de visualización de gráficos, se deberá tener una sesión activa dentro de la plataforma.
* En la barra de navegación, se deberá de dar click en el logo ubicado a la derecha de el titulo de la página.

#### Para visualizar los gráficos:
* Se desplegrarán 6 gráficos, los cuales son:
  * Gráfico de número de intentos incorrectos
  * Gráfico de número de productos fallidos
  * Gráfico de productos fallidos
  * Gráfico de minutos entre el primer intento y el acomodo correcto
  * Gráfico de porcentaje de acomodos a la primera
  * Gráfico de colaboradores y sus errores
* Dependiendo de el tamaño de la pantalla, serán los gráficos mostrados por fila, en caso de querer ver los gráficos que no se encuentran en la pantalla, se deberá dar scroll hacia arriba o hacia abajo.
* Para cada gráfico, se podrá interactuar con el para poder ver los datos de cada barra o pieza de información colocando el cursor sobre el gráfico.

#### Para salir de la pantalla de visualización de gráficos:
* Se deberá de dar click en el logo ubicado en la parte superior izquierda para regresar a la pantalla principal.

### Configuración de planograma

#### Para ubicar la pantalla de configuración de planograma:
* En caso de no estar en la pantalla principal, se deberá de dar click en el logo ubicado en la parte superior izquierda para regresar a la pantalla principal.

#### Para configurar el planograma:
* Para poder configurar el planograma, se deberá de tener una sesión activa dentro de la plataforma.
* Se deberá de dar click en el botón de "Browse or drage files here" para seleccionar el archivo de planograma.
    * El archivo de planograma deberá de ser un archivo .jpg o .jpeg.
    * El archivo de planograma deberá de tener un tamaño máximo de 50MB.
* Se deberá de dar click en el botón "Guardar" para continuar con la configuración del planograma.
* Se deberá de dar click en el botón "Comenzar" para continuar con la configuración del planograma. 
* Se deberán ingresar los números de estantes en los que se encuentran los productos dentro del planograma.
* Al momento que se ingresen los números de estantes, se desplegará sobre la imagen mostrada unas líneas de color rojo, las cuales se deberán de ajustar verticalmente para que coincidan con los estantes del planograma.
* Cuando se hayan ajustado las líneas, se deberá de dar click en el botón "Acomodar estantes para continuar" para continuar con la configuración del planograma.
    * Es importante mencionar que se desplegarán 2 líneas adicionales las cuales se deberán ajustar a la altura de la parte superior e inferior del planograma.
* Se deberán ingresar los números de los productos que se encuentran en cada estante.
* Al momento que se ingresen los números de los productos, se desplegará sobre la imagen mostrada unas líneas de color azul, las cuales se deberán de ajustar horizontalmente para que coincidan con los productos del planograma.
    * Es importante mencionar que se desplegará una línea adicional debido a que las líneas de color azul se deberán de ajustar para que los productos se encuentren en el centro de cada par de líneas.
* Cuando se hayan ajustado las líneas, se deberá de dar click en el botón "Continuar" para concluir con la configuración del planograma.
* Cuando se haya registrado correctamente el planograma, se mostrará un mensaje de confirmación.

#### Para salir de la pantalla de configuración de planograma:
* Se deberá de dar click en el logo ubicado en la parte superior izquierda para regresar a la pantalla principal.
* En caso de haber terminado de configurar el planograma, se deberá de dar click en el botón de "Volver" para regresar a la pantalla principal.