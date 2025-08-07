// scripts/approveNode.js

const hre = require("hardhat");
const fs = require("fs");

require("dotenv").config();

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const deployed = JSON.parse(fs.readFileSync("deployed.json", "utf8"));

  const AccessControl = await hre.ethers.getContractAt(
    "AccessControlFL",
    deployed.AccessControlFL
  );

  // ⚠️ Replace this address with the node you want to approve
  const nodeAddress = "0x1234567890abcdef1234567890abcdef12345678";

  console.log(`🔐 Approving node: ${nodeAddress}...`);
  const tx = await AccessControl.approveNode(nodeAddress);
  await tx.wait();

  console.log(`✅ Node approved: ${nodeAddress}`);
}

main().catch((err) => {
  console.error("❌ Failed to approve node:", err);
  process.exit(1);
});
