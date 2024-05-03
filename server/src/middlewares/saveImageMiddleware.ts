import { type RequestHandler } from "express";
import { Multer } from "multer";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

const saveImages = (modelName: string, path: string): RequestHandler => {
  return async (req, res, next) => {
    req.body.images = [];
    if (Array.isArray(req.files)) {
      await Promise.all(
        req.files.map(async (file: Express.Multer.File) => {
          const fileName = `${modelName}-${uuidv4()}-${Date.now()}.jpg`;

          await sharp(file.buffer)
            .toFormat("jpg")
            .jpeg({ quality: 95 })
            .toFile(`uploads/${modelName}/${fileName}`);

          req.body.images.push(fileName);
        }),
      );
      console.log(req.body.images);
    }
    next();
  };
};

export default saveImages;
