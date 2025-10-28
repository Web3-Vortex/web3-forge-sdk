import { ethers } from "hardhat";
import { expect } from "chai";
import { parseUnits } from "ethers";
import type { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { WETH9, ERC20 } from "@web3-vortex/web3-forge-sdk";
import { BASE_NETWORK } from "../dex/constants/network";
import { ACCOUNTS_PK } from "../constants";



describe("WETH9", function () {
    let owner: HardhatEthersSigner;
    let weth: WETH9;


    beforeEach(async function () {
        const signers = await ethers.getSigners();
        owner = signers[0] as HardhatEthersSigner;

        weth = new WETH9({
            network: BASE_NETWORK,
            privateKey: ACCOUNTS_PK[0],
        });
    });


    /*******************************************************************************/
    /*                            WETH9 deposit/withdraw                           */
    /*******************************************************************************/

    describe("deposit", function () {
        it("should deposit ETH to receive WETH", async function () {
            const depositAmount = parseUnits('10');
            const bb = await weth.getBalance(owner.address);
            const balanceBefore = bb > 0n ? 0n : bb;
            await weth.deposit(depositAmount);
            const balanceAfter = (await weth.getBalance(owner.address)) - bb;

            expect(balanceBefore).eq(0n);
            expect(balanceAfter).eq(depositAmount);
            expect(balanceAfter).gt(balanceBefore);
        });
    });

    describe("withdraw", function () {
        it("should withdraw deposited ETH by getting WETH", async function () {
            const depositAmount = parseUnits('10');
            await weth.deposit(depositAmount);
            const balanceBefore = await weth.getBalance(owner.address);
            await weth.withdraw(balanceBefore);
            const balanceAfter = await weth.getBalance(owner.address);

            expect(balanceAfter).eq(0n);
            expect(balanceBefore).gt(balanceAfter);
        });
    });
});
