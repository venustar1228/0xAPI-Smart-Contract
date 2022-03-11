const { expect, assert } = require("chai");
const util = require('util');
const qs = require('qs');
const { ethers } = require("hardhat");
const axios = require('axios');
const { BigNumber } = ethers;

// getDefaultQuote()

const buyToken = "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d";
const sellToken = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
const sellAmount = "1000000000000000000";

// Fee 1%

describe("0x API", function () {
  it("Should take fee from 0x exchange", async function () {

    const [owner, fee_wallet1, fee_wallet2, user] = await ethers.getSigners();

    const Zero = await ethers.getContractFactory("Zero");
    const zero = await Zero.deploy();
    //eth
    //const USDC = await ethers.getContractAt("IERC20TokenV06", "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48");
    //bsc
    const USDC = await ethers.getContractAt("IERC20", buyToken);
    const { data: response } = await axios.get("http://localhost/bsc/quote", {
      params: {
        buyToken, sellToken, sellAmount
      }
    })
    
    // console.log(fee_wallet1.address, fee_wallet2.address);
    // Clear wallets
    await USDC.transfer(user.address, await USDC.balanceOf(owner.address));
    
    const balance_fee_wallet1 = await ethers.provider.getBalance(fee_wallet1.address);
    const balance_fee_wallet2 = await ethers.provider.getBalance(fee_wallet2.address);
    // console.log(ethers.utils.formatUnits(await USDC.balanceOf(owner.address), 6));

    const tx = await zero.swap(
      response.sellTokenAddress, 
      response.buyTokenAddress, 
      response.sellAmount, 
      response.to, 
      response.data,
    {
      value: response.value
    });
    const eth_decimal = 6;
    const bsc_decial = 18;
    console.log("Swap 1 ETH to USDC, fee: 1%");
    console.log("BuyAmount", Number(ethers.utils.formatUnits(response.buyAmount, bsc_decial)));
    console.log("OutputAmount", ethers.utils.formatUnits(await USDC.balanceOf(owner.address), bsc_decial));
    const buyAmount = Number(ethers.utils.formatUnits(response.buyAmount, bsc_decial));
    expect(Number(ethers.utils.formatUnits(await USDC.balanceOf(owner.address), bsc_decial)), 
        "Output amount should be around buyAmount from api")
      .to.approximately(buyAmount, buyAmount * 0.1);
    expect(BigNumber.from(await ethers.provider.getBalance(fee_wallet1.address)).sub(BigNumber.from(balance_fee_wallet1)).toString(), 
      "Fee wallet1 should take 0.5%")
      .to.equal(BigNumber.from(response.value).mul("5").div("1000").toString())
    expect(BigNumber.from(await ethers.provider.getBalance(fee_wallet2.address)).sub(BigNumber.from(balance_fee_wallet2)).toString(), 
    "Fee wallet2 should take 0.5%")
    .to.equal(BigNumber.from(response.value).mul("10").div("1000").sub(BigNumber.from(response.value).mul("5").div("1000")).toString())
  });
});
