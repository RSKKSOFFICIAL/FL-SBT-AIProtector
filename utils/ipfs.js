const { create } = require("ipfs-http-client");
const fs = require("fs");

const ipfs = create({ url: "http://127.0.0.1:5001" });

async function uploadFile(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const { cid } = await ipfs.add(fileStream);
  return `ipfs://${cid.toString()}`;
}

module.exports = {
  uploadFile
};
