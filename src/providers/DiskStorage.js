const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/upload");

class DiskStorage {
  async saveFile(file) {
    // move file
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file), 
      path.resolve(uploadConfig.UPLOADS_FOLDER, file) 
    )
    return file;
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

    try {
      // file status, show if the file can be removed
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    // remove file
    await fs.promises.unlink(filePath);
  }
}

module.exports = DiskStorage;