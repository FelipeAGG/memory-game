# Juego de Memoria (Memorize) en React

Este es un juego de memoria (Memorize) simple creado en React utilizando Create React App. El juego consiste en emparejar cartas y se puede configurar para mostrar diferentes opciones(cantidad de cartas).

![Captura de pantalla del juego](images/IOP.jpg)
![Captura de pantalla del juego](images/first.png)
![Captura de pantalla del juego](images/second.png)
![Captura de pantalla del juego](images/third.png)

## Funcionalidades

- **Juego de Memoria**: Encuentra todas las parejas de cartas en el menor número de intentos posible.
- **Configuración de Opciones**: Puedes modificar la cantidad de opciones para el juego.
- **Registro de Intentos**: El juego registra el número total de intentos, aciertos y errores.
- **Reinicio del Juego**: Puedes reiniciar el juego en cualquier momento.
- **Salida del Juego**: Puedes salir del juego en cualquier momento.

## Cómo Iniciar el Juego

1. Abre la aplicación en tu navegador.
2. Introduce tu nombre para comenzar.
3. Ajusta la cantidad de opciones según tus preferencias.
4. Haz clic en "Iniciar Juego" para comenzar a jugar.
5. Encuentra todas las parejas de cartas.

## API de Opciones

Las opciones para el juego se obtienen de la siguiente API:
GET: https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20

Asegúrate de tener una conexión a Internet activa para cargar las opciones.

## Tecnologías Utilizadas

- React
- Create React App
- Bootstrap (para estilos)
- Axios (para realizar solicitudes a la API)

## Ejecución Local

1. Clona este repositorio:

git clone https://github.com/FelipeAGG/memory-game.git

2. Navega al directorio del proyecto:

cd /memory-game

3. Instala las dependencias:

npm install

4. Inicia la aplicación:

npm start

5. Abre tu navegador y visita `http://localhost:3000` para jugar.

## Personalización

Puedes personalizar el juego y agregar nuevas características según tus necesidades. Siéntete libre de explorar el código fuente y hacer las modificaciones que desees.

## Créditos

Este juego fue creado por Felipe Gallardo.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para obtener más detalles.
