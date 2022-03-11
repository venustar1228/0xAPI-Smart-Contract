// SPDX-License-Identifier: Apache-2.0
/*

  Copyright 2020 ZeroEx Intl.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.

*/

pragma solidity ^0.6.5;
pragma experimental ABIEncoderV2;


import "@0x/contracts-erc20/contracts/src/v06/IERC20TokenV06.sol";

contract Zero {

    uint constant fee_rate = 1e6;
    address constant fee_wallet1 = 0x0ee5c5e4f3848328dc2e2C57D5FD619041c5e56a;
    address constant fee_wallet2 = 0xD00cc2379d287e22Db96DBa675F25277F2f527Ba;

    function swap(IERC20TokenV06 inputToken, IERC20TokenV06 outputToken, uint amountIn, address exchangeProxy, bytes calldata data) external payable{
        if(address(inputToken) == 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE) {
            uint fee_amount = msg.value * fee_rate / 1e8;
            payable(fee_wallet1).transfer(fee_amount / 2);
            payable(fee_wallet2).transfer(fee_amount - (fee_amount / 2));
            (bool success, bytes memory results) = exchangeProxy.call{value: msg.value - fee_amount}(
                data    
            );
            require(success, "failed");
            outputToken.transfer(msg.sender, outputToken.balanceOf(address(this)));
        }
        else {
            uint fee_amount = amountIn * fee_rate / 1e8;
            inputToken.transferFrom(msg.sender, address(this), amountIn - fee_amount);
            inputToken.transferFrom(msg.sender, fee_wallet1, fee_amount / 2);
            inputToken.transferFrom(msg.sender, fee_wallet2, fee_amount - fee_amount / 2);
            (bool success, ) = exchangeProxy.call(
                data
            );
            require(success, "failed");
            outputToken.transfer(msg.sender, outputToken.balanceOf(address(this)));
        }   
    }
}
