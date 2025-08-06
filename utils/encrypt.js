// utils/encrypt.js
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const algorithm = "aes-256-cbc";

// Encrypts file and returns { encryptedPath, key, iv }
function encryptFile(filePath) {
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const input = fs.createReadStream(filePath);
  const encryptedPath = filePath + ".enc";
  const output = fs.createWriteStream(encryptedPath);

  input.pipe(cipher).pipe(output);

  return new Promise((resolve, reject) => {
    output.on("finish", () => {
      resolve({ encryptedPath, key: key.toString("hex"), iv: iv.toString("hex") });
    });
    output.on("error", reject);
  });
}

module.exports = {
  encryptFile
};
