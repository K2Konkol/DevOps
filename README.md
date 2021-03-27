Run containers

```sh
docker run --rm --name myredis --net mynet redis:alpine
docker run --rm --name mypg --net mynet -v C:\Users\kkonkol\Documents\UG\DevOps\docker\pgdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=mysecretpass -e PGDATA=/var/lib/postgresql/data/pgdata postgres
docker run --rm --net mynet -p 80:5000 --name myapi kkonkol/mybackend
```