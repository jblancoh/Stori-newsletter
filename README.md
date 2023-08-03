# README - Proyecto Stori Newsletter

Este proyecto es una aplicación web que consta de un frontend y un backend, y se puede ejecutar utilizando docker-compose para facilitar la configuración del entorno.

## Requisitos previos

- Docker: Asegúrate de tener Docker instalado en tu sistema. Puedes descargarlo desde https://www.docker.com/get-started

## Instrucciones de configuración

1. Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/jblancoh/Stori-newsletter.git
cd Stori-newsletter
```

2. Crea los archivos .env necesarios para la configuración del proyecto. Puedes encontrar los archivos de ejemplo en la carpeta `env_examples/`. Copia los archivos de ejemplo y renómbralos como `.env` en el directorio raíz del proyecto:

```
cp ./backend/example.env .env
cp ./frontend/example.env frontend/.env
```

3. Rellena los archivos .env con la configuración necesaria, como claves secretas, credenciales de bases de datos, etc.

## Levantar el proyecto

Para ejecutar la aplicación, utiliza docker-compose para levantar los servicios del frontend y backend:

```
docker-compose up -d
```

Esto creará y ejecutará los contenedores de Docker para el frontend y backend, y podrás acceder a la aplicación a través de tu navegador en `http://localhost:3000`.

## Detener el proyecto

Para detener y eliminar los contenedores, ejecuta:

```
docker-compose down
```


## Notas adicionales

- El servicio frontend estará disponible en `http://localhost:3000`.
- El servicio backend estará disponible en `http://localhost:8000`.
- Asegúrate de que los puertos 3000 y 8000 no estén ocupados por otros servicios en tu sistema.
- Si deseas acceder a la aplicación desde otra máquina en la red, asegúrate de configurar adecuadamente las reglas de firewall y abrir los puertos necesarios.
