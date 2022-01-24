# Setup
$ docker-compose run frontend yarn

$ docker-compose run backend bin/rails db:create db:migrate

$ docker-compose exec -it backend rails c -> DataGenerator.call

# Start
$ docker-compose up -d

# Open frontend
$ open http://localhost:80 # You'll see yaichi page, then click any app

# Check backend API
$ backend.localhost/graphiql

# Run backend tests
$ docker-compose run  backend rspec spec

### Backend

The combination, Rails + PostgreSQL + Docker Compose, is just a result I followed [Docker Compose's official instruction](https://docs.docker.com/compose/rails/).

### Frontend

It consist of very thin webpack settings, TypeScript config, and Jest.
