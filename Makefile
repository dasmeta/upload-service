start:
	docker-compose up
	
start-with-minio:
	docker-compose -f docker-compose.yml -f docker-compose.minio.yml up 