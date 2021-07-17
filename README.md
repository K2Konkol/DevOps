This project was a part of Master's Thesis on Microservices.

The purpose was to build working solution applying microservices approach using Docker and Kubernetes.

It consists of:
* MyFrontend application (React + NGINX)
* MyContentDelivery REST API writing text content into Postgres db + Redis cache (Node.js)
* MyImageUploader RESP API writing images to shared volume (Node.js)
* BrightnessVerifier - event-based image processing component (Scala)
* RabbitMQ broker

Deployment using docker-compose or k8s: 
```sh
deploy.bat
```
