import crypto from 'crypto';
import multer from 'multer';
import path from 'path';

const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tempFolder,

  storage: multer.diskStorage({
    destination: tempFolder,
    filename(request, file, callback) {
      // const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${file.originalname}`;
      return callback(null, fileName);
    },
  }),
};
