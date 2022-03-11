const axios = require('axios');
const express = require('express');
const { ethers } = require('hardhat');
const { BigNumber } = ethers;
const app = express();

app.get("/:network/quote", async (req, resp) => {
    let {buyToken, sellToken, sellAmount} = req.query;
    console.log(buyToken, sellToken, sellAmount);
    let sellAmount_0x = BigNumber.from(sellAmount).mul(BigNumber.from("99")).div(BigNumber.from("100"));
    let data;
    if(req.params.network == "eth") {
        const response = await axios.get("https://api.0x.org/swap/v1/quote", {params: {
            buyToken, sellToken, sellAmount: sellAmount_0x.toString()
        }});
        data = response.data;
    }
    else if(req.params.network == "bsc")
    {
        const response = await axios.get("https://bsc.api.0x.org/swap/v1/quote", {params: {
            buyToken, sellToken, sellAmount: sellAmount_0x.toString()
        }});
        data = response.data;
    }
    data = {...data, sellAmount}
    if(data.value != "0") data.value = sellAmount;
    resp.send(data);
})

app.listen(80, () => {
    console.log("server listening in 80")
})

