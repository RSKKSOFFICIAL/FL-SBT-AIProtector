// scripts/mintSBT.js

const hre = require("hardhat");
const fs = require("fs");
const path = require("path");
const { encryptFile } = require("../utils/encrypt");
const { uploadFile } = require("../utils/ipfs");

require("dotenv").config();

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const deployerAddress = await deployer.getAddress();

  // 1. Load contract addresses
  const deployed = JSON.parse(fs.readFileSync("deployed.json", "utf8"));
  const SBT = await hre.ethers.getContractAt("SBT", deployed.SBT);

  // 2. Get the image
  const imageName = "test-image.jpg"; // Replace this with your image file name
  const imagePath = path.join(__dirname, "..", "images", imageName);
  if (!fs.existsSync(imagePath)) {
    console.error(`❌ Image not found: ${imagePath}`);
    return;
  }

  // 3. Encrypt the image
  console.log("🔐 Encrypting image...");
  const { encryptedPath, key, iv } = await encryptFile(imagePath);
  console.log(`✅ Encrypted: ${encryptedPath}`);
  console.log(`🗝️  Key: ${key}`);
  console.log(`🧪 IV: ${iv}`);

  // 4. Upload to IPFS
  console.log("🚀 Uploading encrypted image to IPFS...");
  const ipfsUri = await uploadFile(encryptedPath);
  console.log(`✅ Uploaded: ${ipfsUri}`);

  // 5. Mint SBT
  console.log("🪙 Minting SBT...");
  const tx = await SBT.mintSBT(deployerAddress, ipfsUri);
  const receipt = await tx.wait();
  const tokenId = receipt.logs[0]?.topics[3]
    ? parseInt(receipt.logs[0].topics[3], 16)
    : "unknown";

  console.log(`✅ SBT minted! Token ID: ${tokenId}`);
  console.log("📦 Metadata:");
  console.log({ ipfsUri, key, iv });

  // 6. Store metadata for reference
  const metadataStorePath = path.join(__dirname, "..", "minted", `token-${tokenId}.json`);
  fs.mkdirSync(path.dirname(metadataStorePath), { recursive: true });
  fs.writeFileSync(metadataStorePath, JSON.stringify({ tokenId, ipfsUri, key, iv }, null, 2));
  console.log(`💾 Saved to ${metadataStorePath}`);
}

main().catch((err) => {
  console.error("❌ Error minting SBT:", err);
  process.exit(1);
});
