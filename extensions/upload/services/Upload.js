const path = require('path');
const slugify = require('@sindresorhus/slugify');
const crypto = require('crypto');

const nameToSlug = (name, options = { separator: '-' }) => slugify(name, options);

const randomSuffix = () => crypto.randomBytes(5).toString('hex');

const generateFileName = name => {
    const baseName = nameToSlug(name, { separator: '_', lowercase: false });
  
    return `${baseName}_${randomSuffix()}`;
};

const bytesToKbytes = bytes => Math.round((bytes / 1000) * 100) / 100;

module.exports = {
    formatFileInfo({ filename, type, size }, fileInfo = {}, metas = {}) {

        const ext = path.extname(filename);
        const basename = path.basename(fileInfo.name || filename, ext);
    
        const usedName = fileInfo.name || filename;
    
        const entity = {
          name: usedName,
          alternativeText: fileInfo.alternativeText,
          caption: fileInfo.caption,
          hash: metas.forceName && metas.forceName === '1' ? basename : generateFileName(basename),
          ext,
          mime: type,
          size: bytesToKbytes(size),
        };
    
        const { refId, ref, source, field } = metas;
    
        if (refId && ref && field) {
          entity.related = [
            {
              refId,
              ref,
              source,
              field,
            },
          ];
        }
    
        if (metas.path) {
          entity.path = metas.path;
        }
    
        return entity;
    }
}