docker kill News-Service
docker build --tag amansingh91/cc_stock_app_asc:cc_stock-news-service .
docker run -it -d --rm -p 3000:3000 --name News-Service amansingh91/cc_stock_app_asc:cc_stock-news-service