import type { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { ethers, network } from "hardhat";
import { expect } from "chai";
import { ZeroAddress, MaxUint256 } from "ethers";
import { WETH_ADDRESS_BASE, USDC_ADDRESS_BASE } from "./constants/tokens";
import { BASE_NETWORK } from "./constants/network";
import { ERC20 } from "../../src/erc20/contracts/ERC20";
import { AerodromeV2 } from "../../src/dex/AerodromeV2";

describe.only("Aerodrome V2 Dexes for Network: Base", function () {
    let owner: HardhatEthersSigner;

    // Dexes
    let aerodrome: AerodromeV2;

    beforeEach(async function () {
        // [owner] = await ethers.getSigners();
        const USDC_HOLDER = "0x0B0A5886664376F59C351ba3f598C8A8B4D0A6f3";
        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [USDC_HOLDER],
        });
        owner = await ethers.provider.getSigner(USDC_HOLDER);

        await network.provider.send("hardhat_setBalance", [
            USDC_HOLDER,
            "0x21e19e0c9bab2400000", // 10000 ETH в hex (10,000 * 10^18 = 1_0000_0000_0000_0000_0000)
        ]);


        // Create Dexes
        aerodrome = new AerodromeV2(BASE_NETWORK);
    });


    describe("Testing all base functions", function() {
        it("should correctly split a path of 3 tokens", function() {
            const path = [WETH_ADDRESS_BASE, false, USDC_ADDRESS_BASE, false, '0xde30da39c46104798bb5aa3fe8b9e0e1f348163f'];
            const expectedSplit = [
                [WETH_ADDRESS_BASE, false, USDC_ADDRESS_BASE],
                [USDC_ADDRESS_BASE, false, '0xde30da39c46104798bb5aa3fe8b9e0e1f348163f']
            ];
            const split = aerodrome.splitPath(path);
            expect(split).to.deep.equal(expectedSplit);
        });

        it("should return the same path if only 2 tokens", function() {
            const path = [WETH_ADDRESS_BASE, false, USDC_ADDRESS_BASE];
            const split = aerodrome.splitPath(path);
            expect(split).to.deep.equal([path]);
        });

        it("should return empty array if only 1 token", function() {
            const path = [WETH_ADDRESS_BASE];
            const split = aerodrome.splitPath(path);
            expect(split).to.deep.equal([]);
        });

        it("should correctly reverse a path", function() {
            const path = [WETH_ADDRESS_BASE, false, USDC_ADDRESS_BASE];
            const reversed = aerodrome.getReversedPath(path);
            expect(reversed).to.deep.equal([USDC_ADDRESS_BASE, false, WETH_ADDRESS_BASE]);
        });
    });


    describe("Get functions for network", function() {
        it("should return the correct pool count for each dex", async function() {
            const {
                clFactoryPoolCount,
                factoryPoolCount,
            } = await aerodrome.getPoolCount();

            expect(clFactoryPoolCount).to.be.greaterThan(0);
            expect(factoryPoolCount).to.be.greaterThan(0);
        });

        it("should return the correct pool address by index", async function() {
            // FIRST POOL
            const {
                clFactoryPool,
                clPool,
            } = await aerodrome.getPoolAddressByIndex(0);

            expect(clFactoryPool).to.be.not.equal(ZeroAddress);
            expect(clPool).to.be.not.equal(ZeroAddress);


            // NOT EXISTING POOL
            const {
                clFactoryPool: clFactoryPool0,
                clPool: clPool0,
            } = await aerodrome.getPoolAddressByIndex(1000000);

            expect(clFactoryPool0).to.be.equal(ZeroAddress);
            expect(clPool0).to.be.equal(ZeroAddress);


            // CL FACTORY POOL
            const {
                clFactoryPoolCount,
                factoryPoolCount,
            } = await aerodrome.getPoolCount();

            if(clFactoryPoolCount > factoryPoolCount) {
                const {
                    clFactoryPool,
                    clPool,
                } = await aerodrome.getPoolAddressByIndex(Number(clFactoryPoolCount) - 1);

                expect(clFactoryPool).to.be.not.equal(ZeroAddress);
                expect(clPool).to.be.equal(ZeroAddress);
            } else {
                const {
                    clFactoryPool,
                    clPool,
                } = await aerodrome.getPoolAddressByIndex(Number(factoryPoolCount) - 1);

                expect(clFactoryPool).to.be.equal(ZeroAddress);
                expect(clPool).to.be.not.equal(ZeroAddress);
            }
        });

        it("should return the correct factory address for each dex", async function() {
            const count0 = await aerodrome.getFactoryAddress();
            expect(count0.toLowerCase()).to.be.equal(aerodrome.factoryAddress.toLowerCase());
        });

        it("should return the correct pool address for each dex", async function() {
            const path0 = [WETH_ADDRESS_BASE, 500n, USDC_ADDRESS_BASE];
            const path1 = [WETH_ADDRESS_BASE, false, USDC_ADDRESS_BASE];
            const count0 = await aerodrome.getPoolAddress(path0);
            const count1 = await aerodrome.getPoolAddress(path1);


            expect(count0.toLowerCase()).to.be.equal(ZeroAddress);
            expect(count1.toLowerCase()).to.be.not.equal(ZeroAddress);
        });


        it("should return the reserves for each dex", async function() {
            const path0 = ['0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA', 1, USDC_ADDRESS_BASE];
            const path1 = [WETH_ADDRESS_BASE, false, USDC_ADDRESS_BASE];
            
            const count0 = await aerodrome.getPoolReserves(path0);
            const count1 = await aerodrome.getPoolReserves(path1);

            expect(count0).to.be.an('object');
            expect(count1).to.be.an('object');
        });


        it("should return the prices for each dex", async function() {
            // const path0 = ['0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA', 1, USDC_ADDRESS_BASE];
            const path1 = [WETH_ADDRESS_BASE, false, USDC_ADDRESS_BASE];

            const count1 = await aerodrome.getTokenPrice(path1);

            // expect(count0).to.be.equal(0);
            expect(count1).to.be.not.equal(0);
        });


        it("should return encoded swap for each dex", async function() {
            const path = [WETH_ADDRESS_BASE, false, USDC_ADDRESS_BASE];
            const amountIn = ethers.parseEther("1");

            const count0 = await aerodrome.getEncodedSwap(amountIn, path, owner.address);
        });


        it("should simulate swap for each dex", async function() {
            const path = [USDC_ADDRESS_BASE, false, WETH_ADDRESS_BASE];
            const amountIn = ethers.parseUnits("1", 6);

            const overrides = {
                maxFeePerGas: 10837221,
                maxPriorityFeePerGas: 8837221,
            }

            const usdc = new ERC20(USDC_ADDRESS_BASE, owner);
            const txApprove0 = await usdc.approve(aerodrome.routerAddress, MaxUint256);
            await txApprove0.wait();


            // const count0 = await alienBaseArea51V2.simulateSwap(owner.address, amountIn, path);
            const count1 = await aerodrome.simulateSwap(owner.address, amountIn, path, owner.address);


            // expect(count0).to.be.equal(0);
            // expect(count1).to.be.not.equal(0);
            // expect(count2).to.be.not.equal(0);
            // expect(count3).to.be.not.equal(0);
            // expect(count4).to.be.not.equal(0);
            // expect(count5).to.be.not.equal(0);
            // expect(count6).to.be.equal(0);
            // expect(count7).to.be.not.equal(0);
            // expect(count8).to.be.not.equal(0);
            // expect(count9).to.be.not.equal(0);
            // expect(count10).to.be.not.equal(0);
            // expect(count11).to.be.not.equal(0);
            // expect(count12).to.be.not.equal(0);
            // expect(count13).to.be.not.equal(0);
            // expect(count14).to.be.not.equal(0);
            // expect(count15).to.be.not.equal(0);
        });
    });
});
