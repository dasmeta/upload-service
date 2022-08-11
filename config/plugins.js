module.exports = ({ env }) => {

    const provider = env('PROVIDER', 'local'); 

    if(provider === 'minio') {
        return {
            upload: {
                provider: 'minio-ce',
                providerOptions: {
                    accessKey: env('MINIO_ACCESS_KEY', ''),
                    secretKey: env('MINIO_SECRET_KEY', ''),
                    bucket: env('MINIO_BUCKET', 'upload-service-bucket'),
                    endPoint: env('MINIO_ENDPOINT', '127.0.0.1'),
                    port: env('MINIO_PORT', '9000'),
                    useSSL: env('MINIO_USE_SSL', 'true'),
                    host: env('MINIO_HOST', '127.0.0.1:9000'),
                    folder: env('MINIO_FOLDER', ''),
                }
            }
        }
    }

    if(env('PROVIDER', '') === 'gcs') {
        return {
            upload: {
                provider: 'google-cloud-storage',
                providerOptions: {
                    serviceAccount: JSON.parse(Buffer.from(env('GCS_SERVICE_ACCOUNT', ''), 'base64').toString('utf-8') || '{}'),
                    bucketName: env('GCS_BUCKET_NAME', 'upload-service-bucket'),
                    basePath: env('GCS_BASE_PATH', ''),
                    baseUrl: env('GCS_BASE_URL', 'https://storage.googleapis.com/upload-service-bucket'),
                    publicFiles: env('GCS_PUBLIC_FILES', true),
                    uniform: env('GCS_UNIFORM', false),
                }
            }
        }
    }
    
    return {
        upload: {
            providerOptions: {
              localServer: {
                    maxage: env('MAX_AGE', 300000)
                }
            }
        }
    }
};
  