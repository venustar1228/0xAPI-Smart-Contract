// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const [owner, account1, account2] = await hre.ethers.getSigners();
  const marketPlaceBoilerPlate = await hre.ethers.getContractFactory("marketPlaceBoilerPlate");
  const transformERC20Feature = await TransformERC20Feature.deploy('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', '0x1f98431c8ad98523631ae4a59f267346ea31f984', '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54');
  await transformERC20Feature.deployed();
  // await transformERC20Feature.migrate();
  console.log("TestCCRyan deployed to:", transformERC20Feature.address);
} 

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
