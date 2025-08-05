const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  console.log(`🧠 Deploying contracts with: ${deployerAddress}`);

  // 1. Deploy SBT with owner
  const SBT = await hre.ethers.getContractFactory("SBT");
  const sbt = await SBT.deploy(deployerAddress);
  await sbt.waitForDeployment(); // 👈 FIXED
  console.log(`✅ SBT deployed to: ${await sbt.getAddress()}`);

  // 2. Deploy AccessControlFL with owner
  const AccessControl = await hre.ethers.getContractFactory("AccessControlFL");
  const accessControl = await AccessControl.deploy(deployerAddress);
  await accessControl.waitForDeployment(); // 👈 FIXED
  console.log(`✅ AccessControlFL deployed to: ${await accessControl.getAddress()}`);

  // 3. Deploy Mock ERC20 token (for rewards)
  const ERC20 = await hre.ethers.getContractFactory("MyToken");
  const token = await ERC20.deploy("RewardToken", "RWD", 18, hre.ethers.parseEther("1000000"));
  await token.waitForDeployment(); // 👈 FIXED
  console.log(`✅ ERC20 Token deployed to: ${await token.getAddress()}`);

  // 4. Deploy RewardLogger with token, sbt, and owner
  const RewardLogger = await hre.ethers.getContractFactory("RewardLogger");
  const rewardLogger = await RewardLogger.deploy(
    await token.getAddress(),
    await sbt.getAddress(),
    deployerAddress
  );
  await rewardLogger.waitForDeployment(); // 👈 FIXED
  console.log(`✅ RewardLogger deployed to: ${await rewardLogger.getAddress()}`);

  // 5. Save addresses to a local JSON file
  const contracts = {
    SBT: await sbt.getAddress(),
    AccessControlFL: await accessControl.getAddress(),
    RewardToken: await token.getAddress(),
    RewardLogger: await rewardLogger.getAddress()
  };

  fs.writeFileSync("deployed.json", JSON.stringify(contracts, null, 2));
  console.log("📁 Contract addresses saved to deployed.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
