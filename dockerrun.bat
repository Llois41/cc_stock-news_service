docker kill News-Service
docker build --tag {DEIN_DOCKER_NAME}/{DEIN_DOCKER_REPOSITORY}:cc_stock-news-service .
docker run -it -d --rm -p 3000:3000 --name News-Service {DEIN_DOCKER_NAME}/{DEIN_DOCKER_REPOSITORY}:cc_stock-news-service