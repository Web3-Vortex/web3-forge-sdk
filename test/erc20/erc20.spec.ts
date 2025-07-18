import { ethers } from "hardhat";
import { expect } from "chai";
import type { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { ERC20 } from "../../src/erc20/contracts/ERC20";
import { JsonRpcProvider, parseUnits } from "ethers";
import { erc20Abi } from "../../src/erc20/abi/erc20-abi";
import { callTransaction } from "../../src/erc20/utils/call-transaction";

describe("ERC20", function () {
    let owner: HardhatEthersSigner;
    let user1: HardhatEthersSigner;
    let user2: HardhatEthersSigner;
    let rawContract: any;
    let testErc20: ERC20;

    const TOKEN_NAME = "Test Token";
    const TOKEN_SYMBOL = "TST";
    const INITIAL_SUPPLY = parseUnits("1000", 18);

    beforeEach(async function () {
        const signers = await ethers.getSigners();
        owner = signers[0] as HardhatEthersSigner;
        user1 = signers[1] as HardhatEthersSigner;
        user2 = signers[2] as HardhatEthersSigner;
        const TestERC20Factory = await ethers.getContractFactory("TestERC20");
        rawContract = await TestERC20Factory.deploy(TOKEN_NAME, TOKEN_SYMBOL);
        await rawContract.waitForDeployment();
        const address: string = await rawContract.getAddress();
        testErc20 = new ERC20(address.toString(), owner);
    });


    describe("constructor", function () {
        it("should get the correct name", async function () {
            expect(await testErc20.getName()).to.equal(TOKEN_NAME);
        });

        it("should get the correct symbol", async function () {
            expect(await testErc20.getSymbol()).to.equal(TOKEN_SYMBOL);
        });

        it("should get the correct decimals", async function () {
            expect(await testErc20.getDecimals()).to.equal(18);
        });

        it("should get the correct total supply", async function () {
            expect(await testErc20.getTotalSupply()).to.equal(INITIAL_SUPPLY);
        });

        it("should get the correct balance", async function () {
            expect(await testErc20.getBalance(owner.address)).to.equal(INITIAL_SUPPLY);
            expect(await testErc20.getBalance(user1.address)).to.equal(0);
        });

        it("should get the correct allowance", async function () {
            expect(await testErc20.getAllowance(owner.address, user1.address)).to.equal(0);
        });
    });


    /*******************************************************************************/
    /*                        EIP20 standard POST functions                        */
    /*******************************************************************************/

    describe("approve and revokeApprove", function () {
        it("should approve to second account", async function () {
            const amount = parseUnits("1000", 18);

            await testErc20.approve(user1.address, amount);
            expect(await testErc20.getAllowance(owner.address, user1.address)).to.equal(amount);
        });

        it("should revoke allowance", async function () {
            const amount = parseUnits("1000", 18);
            
            // Testing approve is working
            await testErc20.approve(user1.address, amount);
            expect(await testErc20.getAllowance(owner.address, user1.address)).to.equal(amount);
            
            // Testing revokeApprove is working
            await testErc20.revokeApprove(user1.address);
            expect(await testErc20.getAllowance(owner.address, user1.address)).to.equal(0);
        });

        it("should add allowance", async function () {
            const amount = parseUnits("1000", 18);
            const addAmount = parseUnits("500", 18);
            const expectedAmount = amount + addAmount;
            
            // Testing approve is working
            await testErc20.approve(user1.address, amount);
            expect(await testErc20.getAllowance(owner.address, user1.address)).to.equal(amount);

            // Testing addAllowance is working
            await testErc20.addAllowance(user1.address, addAmount);
            expect(await testErc20.getAllowance(owner.address, user1.address)).to.equal(expectedAmount);
        });

        it("should sub allowance", async function () {
            const amount = parseUnits("1000", 18);
            const subAmount = parseUnits("500", 18);
            const expectedAmount = amount - subAmount;
            
            // Testing approve is working
            await testErc20.approve(user1.address, amount);
            expect(await testErc20.getAllowance(owner.address, user1.address)).to.equal(amount);

            // Testing subAllowance is working
            await testErc20.subAllowance(user1.address, subAmount);
            expect(await testErc20.getAllowance(owner.address, user1.address)).to.equal(expectedAmount);

            // Testing subAllowance is working for more amount
            await testErc20.subAllowance(user1.address, amount);
            expect(await testErc20.getAllowance(owner.address, user1.address)).to.equal(0);
        });

        it("should revoke approval", async function () {
            const amount = parseUnits("1000", 18);
            const expectedAmount = 0n;
            
            // Testing approve is working
            await testErc20.approve(user1.address, amount);
            expect(await testErc20.getAllowance(owner.address, user1.address)).to.equal(amount);

            // Testing revokeApprove is working
            await testErc20.revokeApprove(user1.address);
            expect(await testErc20.getAllowance(owner.address, user1.address)).to.equal(expectedAmount);
        });
    });

    describe("transfer", function () {
        it("should transfer tokens", async function () {
            const amount = parseUnits("100", 18);
            await testErc20.transfer(user1.address, amount);
            expect(await testErc20.getBalance(user1.address)).to.equal(amount);
            expect(await testErc20.getBalance(owner.address)).to.equal(INITIAL_SUPPLY - amount);
        });

        it("should fail to transfer tokens with insufficient balance", async function () {
            const amount = INITIAL_SUPPLY + 1n;
            await expect(testErc20.transfer(user1.address, amount)).to.be.reverted;
        });
    });

    describe("transferFrom", function () {
        it("should transfer tokens from another account", async function () {
            const amount = parseUnits("100", 18);
            await testErc20.approve(user1.address, amount);

            const user1Erc20 = new ERC20(testErc20.address.toString(), user1);
            await user1Erc20.transferFrom(owner.address, user2.address, amount);

            expect(await testErc20.getBalance(user2.address)).to.equal(amount);
            expect(await testErc20.getBalance(owner.address)).to.equal(INITIAL_SUPPLY - amount);
        });

        it("should fail to transfer tokens from another account with insufficient allowance", async function () {
            const amount = parseUnits("100", 18);
            const user1Erc20 = new ERC20(testErc20.address.toString(), user1);
            await expect(user1Erc20.transferFrom(owner.address, user2.address, amount)).to.be.reverted;
        });
    });


    /*******************************************************************************/
    /*                             Additional functions                            */
    /*******************************************************************************/

    describe("Getters", function () {
        it("should get contract runner", function () {
            const runnerAddress = (testErc20.runner as HardhatEthersSigner).address;
            expect(runnerAddress.toLowerCase()).to.equal(owner.address.toLowerCase());
        });

        it("should get contract address", function () {
            expect(testErc20.address).to.not.equal('');
            expect(testErc20.address.length).to.equal(42);
        });

        it("should abi equal to erc20Abi", function () {
            expect(testErc20.abi).to.deep.equal(erc20Abi);
        });
    });


    describe("Test encoded functions", function () {
        it("should transfer encoded", async function () {
            const encoded = testErc20.getEncodedTransfer(user1.address, parseUnits("100", 18));
            expect(encoded).to.not.equal('');

            await callTransaction(testErc20.runner as JsonRpcProvider, {
                from: owner.address,
                to: user1.address,
                value: parseUnits("100", 18),
                data: encoded,
            });
        });

        it("should approve encoded", async function () {
            const encoded = testErc20.getEncodedApprove(user1.address, parseUnits("100", 18));
            expect(encoded).to.not.equal('');

            await callTransaction(testErc20.runner as JsonRpcProvider, {
                from: owner.address,
                to: user1.address,
                value: parseUnits("100", 18),
                data: encoded,
            });
        });

        it("should transferFrom encoded", async function () {
            const encoded = testErc20.getEncodedTransferFrom(owner.address, user1.address, parseUnits("100", 18));
            expect(encoded).to.not.equal('');

            await callTransaction(testErc20.runner as JsonRpcProvider, {
                from: owner.address,
                to: user1.address,
                value: parseUnits("100", 18),
                data: encoded,
            });
        });
    });
});
