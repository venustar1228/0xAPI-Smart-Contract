require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('@openzeppelin/hardhat-upgrades');
require('hardhat-contract-sizer');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    // version: "0.6.5",
    version:  "0.6.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000000,
      },
      evmVersion: "istanbul"
    }
  },
  defaultNetwork: "testnet",
  networks: {
    testnet: {
      url: "http://127.0.0.1:8545/",
      id: 1,
      accounts:  {mnemonic: "vacuum seed other cheese enforce love quiz embark torch master trip front"}
    },
    bsctestnet:{
        url: "https://data-seed-prebsc-2-s2.binance.org:8545/",
        id: 97,
        accounts: {mnemonic: "vacuum seed other cheese enforce love quiz embark torch master trip front"}
    },
    matic_testnet: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: {mnemonic: "vacuum seed other cheese enforce love quiz embark torch master trip front"}
    },
    hardhat: {
      forking: {
        id: 56,
        //url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        url: "https://speedy-nodes-nyc.moralis.io/63021305c6423bed5d079c57/bsc/mainnet"
      },
      chainId: 56,
      accounts: {mnemonic: "vacuum seed other cheese enforce love quiz embark torch master trip front"}
    },
    goerli: {
      url: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161/",
      id:5,
      accounts: {mnemonic: "vacuum seed other cheese enforce love quiz embark torch master trip front"}
    },
    rinkeby: {
      url: "https://rinkey.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      id:4,
      accounts: {mnemonic: "vacuum seed other cheese enforce love quiz embark torch master trip front"}
    },
    mumbai: {
      url: "https://speedy-nodes-nyc.moralis.io/63021305c6423bed5d079c57/polygon/mumbai",
      id: 80001,
      accounts: {mnemonic: "vacuum seed other cheese enforce love quiz embark torch master trip front"}
    }
  },
  etherscan: {
    apiKey: "7SF79Z6UJMH8WIA6KFCF9ENRZ8VQ9WI93R"
    //apiKey: "https://eth-mainnet.alchemyapi.io/v2/91y6whoxidpnaaGuE5Fn-rYQl8cUXQMq"
    //apiKey: "CI5UJGX6XEQGUSDJU9JI16PD6UCH4YCCD3"
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: false,
    strict: false
  },
  mocha: {
    enableTimeouts: false,
    timeout: 60000,
    before_timeout: 60000 // Here is 2min but can be whatever timeout is suitable for you.
  }
};

