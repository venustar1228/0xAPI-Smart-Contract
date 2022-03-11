const { default: axios } = require('axios')
const qs = require('qs')
const URL = 'https://api.0x.org/swap/v1/quote?'
const params = {
  buyToken: 'DAI',
  sellToken: 'ETH',
  sellAmount: 0.05 * Math.pow(10, 18).toString(), // Always denominated in wei
}
const { expect, assert } = require("chai");
const { ethers } = require("ethers");
const { BlockList } = require("net");
const { hrtime } = require("process");
const util = require('util');
const qs = require('qs');

getDefaultQuote()

describe("Stress", function () {
  it("Should return the new greeting once it's changed", async function () {

    const [owner, candidates, ...users] = await hre.ethers.getSigners();
    console.log(owner.address);

    const TransformERC20Feature = await hre.ethers.getContractFactory("TransformERC20Feature");
    const transformERC20Feature = await TransformERC20Feature.deploy("TransformERC20Feature", "ETS", 8, 1000);

    const { default: axios } = require('axios')
    
    const params = {
      buyToken: 'DAI',
      sellToken: 'ETH',
      sellAmount: 0.05 * Math.pow(10, 18).toString(), // Always denominated in wei
    }
    const URL = 'https://api.0x.org/swap/v1/quote?'

    const getDefaultQuote = async () => {
      let response
      try {
        response = await axios.get(`${URL}${qs.stringify(params)}`)
      } catch (err) {
        console.error(err)
      }
      console.log(response.data.sources);
      const newSwap = response.data.sources.filter((element, index) => (response.data.sources.proportion != 0));
      console.log(response.data.sources[newSwap]);
    }

    // electiontoken.transfer(users[0].address, 100);
    // electiontoken.transfer(users[1].address, 300);
    // electiontoken.transfer(users[2].address, 200);
    // electiontoken.transfer(users[3].address, 400);

    // const Election = await hre.ethers.getContractFactory("Election");
    // const election = await Election.deploy(electiontoken.address);
    // console.log(candidates.address);
    // await election.connect(users[0]).vote(candidates.address);
    // await election.connect(users[1]).vote(candidates.address);
    // await election.connect(users[2]).vote(candidates.address);
    // await election.connect(users[3]).vote(candidates.address);
    // console.log(candidates.address);
    
    // await election.elect();
    // console.log(await election.governor());
    // expect(await election.governor()).to.equal(candidates.address);
  });
});
