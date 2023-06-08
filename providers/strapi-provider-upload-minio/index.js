const Minio = require('minio');

module.exports = {
  init(providerOptions) {
    const { port, useSSL, endPoint, accessKey, secretKey, bucket, host, folder } = providerOptions;

    const MINIO = new Minio.Client({
      endPoint,
      port: parseInt(port, 10) || 9000,
      useSSL: useSSL === "true",
      accessKey,
      secretKey,
    });
    const getUploadPath = (file) => {
      const pathChunk = file.path ? `${file.path}/` : '';
      const path = folder ? `${folder}/${pathChunk}` : pathChunk;

      return `${path}${file.hash}${file.ext}`;
    };
    const getDeletePath = (file) => {
      const hostPart = host.includes('http') ? `${host}/${bucket}/` : ((useSSL === 'true' ? 'https://' : 'http://') + `${host}/${bucket}/`);
      const path = file.url.replace(hostPart, '');

      return path;
    };
    return {
      upload(file) {

        return new Promise((resolve, reject) => {
          // upload file to a bucket
          const path = getUploadPath(file);
          
          const metaData = {
            'Content-Type': file.mime ? file.mime : 'application/octet-stream',
          }

          MINIO.putObject(
            bucket,
            path,
            Buffer.from(file.buffer, 'binary'),
            metaData,
            (err, _etag) => {
              if (err) {
                return reject(err);
              }

              const hostPart = host.includes('http') ? `${host}/` : ((useSSL === 'true' ? 'https://' : 'http://') + `${host}/`)
              const filePath = `${bucket}/${path}`;
              file.url = `${hostPart}${filePath}`;

              resolve();
            }
          );
        });
      },
      delete(file) {
        return new Promise((resolve, reject) => {
          const path = getDeletePath(file);

          MINIO.removeObject(bucket, path, err => {
            if (err) {
              return reject(err);
            }

            resolve();
          });
        });
      },
    };
  },
};
