# CineAI

Este es un proyecto genera recomendaciones de películas y series de acuerdo a tus gustos utilizando inteligencia artificial.

## ¿Cómo funciona?

Este proyecto utiliza el API de ChatGPT de [OpenAI](https://openai.com/) y [Next.js](https://nextjs.org) como _frontend_. Construye un _prompt_ basado en la selección de películas y series que el usuario hace y lo envía a la API de OpenAI. La API devuelve un texto que es procesado y se muestra al usuario. La búsqueda de películas y series se hace utilizando la API de [The Movie Database](https://www.themoviedb.org/), así como para obtener la información de las películas y series sugeridas por ChatGPT.

## ¿Cómo puedo probarlo?

Clona el repositorio, ve a [OpenAI](https://openai.com/) y crea una cuenta. Una vez creada la cuenta, crea una API key y copia el valor de la API key en el archivo `.env`.

Crea una cuenta en [The Movie Database](https://www.themoviedb.org/) y copia el valor de la API key en el archivo `.env`.

Ahora, ejecuta el siguiente comando para instalar las dependencias:

```bash
npm install
```

y para iniciar la aplicación:

```bash
npm run dev
```
