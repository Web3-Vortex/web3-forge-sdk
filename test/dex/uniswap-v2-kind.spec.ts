import type { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { expect } from "chai";
import { ZeroAddress } from "ethers";
import { DexBaseKindUniswapV2 } from "../../src/dex/UniswapV2Kind";
import { DexType } from "../../src/dex/types/IDexParams";
import { WETH_ADDRESS_BASE, USDC_ADDRESS_BASE } from "./constants/tokens";
import { UNISWAP_V2_ROUTER_ADDRESS_BASE, UNISWAP_V2_FACTORY_ADDRESS_BASE } from "./constants/dexes";
import { BASE_NETWORK } from "./constants/network";

describe("Uniswap V2 Kind", function () {
    let owner: HardhatEthersSigner;
    let dex: DexBaseKindUniswapV2;

    beforeEach(async function () {
        [owner] = await ethers.getSigners();

        dex = new DexBaseKindUniswapV2(
            UNISWAP_V2_ROUTER_ADDRESS_BASE,
            UNISWAP_V2_FACTORY_ADDRESS_BASE,
            BASE_NETWORK
        );
    });

    describe("constructor", function () {
        it("should set the correct router and factory addresses", async function () {
            expect(dex.routerAddress).to.equal(UNISWAP_V2_ROUTER_ADDRESS_BASE);
            expect(dex.factoryAddress).to.equal(UNISWAP_V2_FACTORY_ADDRESS_BASE);

            const factoryAddress = await dex.getFactoryAddress();
            expect(factoryAddress.toLowerCase()).to.equal(UNISWAP_V2_FACTORY_ADDRESS_BASE.toLowerCase());
        });

        it("should have correct dex params", function() {
            expect(dex.dexParams.name).to.equal('Uniswap V2');
            expect(dex.dexParams.type).to.equal(DexType.UniswapV2);
        });
    });


    describe("Testing all base functions", function() {
        it("should correctly split a path of 3 tokens", function() {
            const path = [WETH_ADDRESS_BASE, USDC_ADDRESS_BASE, '0xde30da39c46104798bb5aa3fe8b9e0e1f348163f'];
            const expectedSplit = [
                [WETH_ADDRESS_BASE, USDC_ADDRESS_BASE],
                [USDC_ADDRESS_BASE, '0xde30da39c46104798bb5aa3fe8b9e0e1f348163f']
            ];
            const split = dex.splitPath(path);
            expect(split).to.deep.equal(expectedSplit);
        });

        it("should return the same path if only 2 tokens", function() {
            const path = [WETH_ADDRESS_BASE, USDC_ADDRESS_BASE];
            const split = dex.splitPath(path);
            expect(split).to.deep.equal([path]);
        });

        it("should return empty array if only 1 token", function() {
            const path = [WETH_ADDRESS_BASE];
            const split = dex.splitPath(path);
            expect(split).to.deep.equal([]);
        });
    });

    describe("getPoolAddress", function() {
        it("should return the correct pool address for WETH/USDC", async function() {
            const poolAddress = await dex.getPoolAddress([
                WETH_ADDRESS_BASE,
                USDC_ADDRESS_BASE
            ]);

            expect(poolAddress.toLowerCase()).to.not.equal(ZeroAddress);
        });
    });

    describe("getTokenPrice", function() {
        it("should return the correct price for WETH in USDC", async function() {
            const path = [WETH_ADDRESS_BASE, USDC_ADDRESS_BASE];
            const price = await dex.getTokenPrice(path);

            expect(price).to.be.a('number');
            expect(price).to.be.greaterThan(0);
        });
    });


    describe.only("getEncodedSwap", function() {
        it("should return the correct encoded swap data", function() {
            const path = [WETH_ADDRESS_BASE, USDC_ADDRESS_BASE];
            const amountIn = ethers.parseUnits("1", 18);
            const sendTo = owner.address;
            
            const encodedSwap = dex.getEncodedSwap(amountIn, path, sendTo);

            // expect(encodedSwap.data).to.be.a('string');
            // expect(encodedSwap.topHalf).to.be.a('string');
            // expect(encodedSwap.bottomHalf).to.be.a('string');

            console.log(encodedSwap);
            
            // expect(encodedSwap.data).to.match(/^0x[a-fA-F0-9]{138}$/);
            // expect(encodedSwap.topHalf).to.equal('0x38ed1739');
            // expect(encodedSwap.bottomHalf).to.match(/^0x[a-fA-F0-9]{72}$/);
        });
    });
});
