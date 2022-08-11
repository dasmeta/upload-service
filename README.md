# Strapi application

Strapi application for uploading files.


ENV list
```
PORT=2357 
HOST=0.0.0.0
PROVIDER=gcs // 'gsc', 'minio' or 'local'

GSC_SERVICE_ACCOUNT=base64encodedjson // base64 encoded json
GCS_BUCKET_NAME=upload-service-bucket
GCS_BASE_PATH=""
GCS_BASE_URL=https://storage.googleapis.com/upload-service-bucket
GCS_PUBLIC_FILES=true
GCS_UNIFORM=false

MINIO_ACCESS_KEY=miniousername
MINIO_SECRET_KEY=miniopassword
MINIO_BUCKET=upload-service-bucket
MINIO_ENDPOINT=127.0.0.1
MINIO_PORT=9000
MINIO_USE_SSL=true
MINIO_HOST=127.0.0.1:9000
MINIO_FOLDER=""
```

### API KEY generation

Open strapi admin panel 
1. create user and assign role authenticated
2. create token and assign to user
3. from settings go to USERS & PERMISSIONS PLUGIN section open authenticated role settings
4. from upload section enable permissions for apis you need
