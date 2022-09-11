
# Next.js Teslo Shop App

For run this app you need a data base
```
    docker-compose up -d
```

* The -d, means __detached__

* MongoDB URL Local:

```
    mongodb://localhost:27017/teslodb
```

## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__

## Fill the database with test data:
 Call to:
 ```
    http://localhost:3000/api/seed
 ```