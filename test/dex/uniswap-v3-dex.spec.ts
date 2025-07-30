import type { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { ethers, network } from "hardhat";
import { expect } from "chai";
import { ZeroAddress, MaxUint256 } from "ethers";
import { 
    UniswapV3,
    PancakeSwapV3,
    SushiSwapV3,
    DerpDexV3,
    ThroneV3,
    HorizonDexV3,
    SwapBasedAmmV3,
    BaseSwapV3,
    KinetixV3,
    DackieSwapV3,
    WagmiV3,
    AlienBaseV3,
} from "../../src/dex/UniswapV3Kind";
import { WETH_ADDRESS_BASE, USDC_ADDRESS_BASE } from "./constants/tokens";
import { BASE_NETWORK } from "./constants/network";
import { ERC20 } from "../../src/erc20/contracts/ERC20";

describe.only("Uniswap V3 Dexes for Network: Base", function () {
    let owner: HardhatEthersSigner;

    // Dexes
    let uniswapV3: UniswapV3;
    let pancakeSwapV3: PancakeSwapV3;
    let sushiSwapV3: SushiSwapV3;
    let derpDexV3: DerpDexV3;
    let throneV3: ThroneV3;
    let horizonDexV3: HorizonDexV3;
    let swapBasedAmmV3: SwapBasedAmmV3;
    let baseSwapV3: BaseSwapV3;
    let kinetixV3: KinetixV3;
    let dackieSwapV3: DackieSwapV3;
    let wagmiV3: WagmiV3;
    let alienBaseV3: AlienBaseV3;

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
        uniswapV3 = new UniswapV3(BASE_NETWORK);
        pancakeSwapV3 = new PancakeSwapV3(BASE_NETWORK);
        sushiSwapV3 = new SushiSwapV3(BASE_NETWORK);
        derpDexV3 = new DerpDexV3(BASE_NETWORK);
        throneV3 = new ThroneV3(BASE_NETWORK);
        horizonDexV3 = new HorizonDexV3(BASE_NETWORK);
        swapBasedAmmV3 = new SwapBasedAmmV3(BASE_NETWORK);
        baseSwapV3 = new BaseSwapV3(BASE_NETWORK);
        kinetixV3 = new KinetixV3(BASE_NETWORK);
        dackieSwapV3 = new DackieSwapV3(BASE_NETWORK);
        wagmiV3 = new WagmiV3(BASE_NETWORK);
        alienBaseV3 = new AlienBaseV3(BASE_NETWORK);
    });


    describe("Get functions for network", function() {
        it.skip("should return the correct pool count for each dex", async function() {
            let count0 = await uniswapV3.getPoolCount();
            let count1 = await pancakeSwapV3.getPoolCount();
            let count2 = await sushiSwapV3.getPoolCount();
            let count3 = await derpDexV3.getPoolCount();
            let count4 = await throneV3.getPoolCount();
            let count5 = await horizonDexV3.getPoolCount();
            let count6 = await swapBasedAmmV3.getPoolCount();
            let count7 = await baseSwapV3.getPoolCount();
            let count8 = await kinetixV3.getPoolCount();
            let count9 = await dackieSwapV3.getPoolCount();
            let count10 = await wagmiV3.getPoolCount();
            let count11 = await alienBaseV3.getPoolCount();

            expect(count0).to.be.greaterThan(0);
            expect(count1).to.be.greaterThan(0);
            expect(count2).to.be.greaterThan(0);
            expect(count3).to.be.greaterThan(0);
            expect(count4).to.be.greaterThan(0);
            expect(count5).to.be.greaterThan(0);
            expect(count6).to.be.greaterThan(0);
            expect(count7).to.be.greaterThan(0);
            expect(count8).to.be.greaterThan(0);
            expect(count9).to.be.greaterThan(0);
            expect(count10).to.be.greaterThan(0);
            expect(count11).to.be.greaterThan(0);
        });

        it.skip("should return the correct pool address by index", async function() {
            let count0 = await uniswapV3.getPoolAddressByIndex(0);
            let count1 = await pancakeSwapV3.getPoolAddressByIndex(0);
            let count2 = await sushiSwapV3.getPoolAddressByIndex(0);
            let count3 = await derpDexV3.getPoolAddressByIndex(0);
            let count4 = await throneV3.getPoolAddressByIndex(0);
            let count5 = await horizonDexV3.getPoolAddressByIndex(0);
            let count6 = await swapBasedAmmV3.getPoolAddressByIndex(0);
            let count7 = await baseSwapV3.getPoolAddressByIndex(0);
            let count8 = await kinetixV3.getPoolAddressByIndex(0);
            let count9 = await dackieSwapV3.getPoolAddressByIndex(0);
            let count10 = await wagmiV3.getPoolAddressByIndex(0);
            let count11 = await alienBaseV3.getPoolAddressByIndex(0);

            expect(count0).to.be.not.equal(ZeroAddress);
            expect(count1).to.be.not.equal(ZeroAddress);
            expect(count2).to.be.not.equal(ZeroAddress);
            expect(count3).to.be.not.equal(ZeroAddress);
            expect(count4).to.be.not.equal(ZeroAddress);
            expect(count5).to.be.not.equal(ZeroAddress);
            expect(count6).to.be.not.equal(ZeroAddress);
            expect(count7).to.be.not.equal(ZeroAddress);
            expect(count8).to.be.not.equal(ZeroAddress);
            expect(count9).to.be.not.equal(ZeroAddress);
            expect(count10).to.be.not.equal(ZeroAddress);
            expect(count11).to.be.not.equal(ZeroAddress);
        });

        it("should return the correct factory address for each dex", async function() {
            let count0 = await uniswapV3.getFactoryAddress();
            let count1 = await pancakeSwapV3.getFactoryAddress();
            let count2 = await sushiSwapV3.getFactoryAddress();
            let count3 = await derpDexV3.getFactoryAddress();
            let count4 = await throneV3.getFactoryAddress();
            let count5 = await horizonDexV3.getFactoryAddress();
            let count6 = await swapBasedAmmV3.getFactoryAddress();
            let count7 = await baseSwapV3.getFactoryAddress();
            let count8 = await kinetixV3.getFactoryAddress();
            let count9 = await dackieSwapV3.getFactoryAddress();
            let count10 = await wagmiV3.getFactoryAddress();
            let count11 = await alienBaseV3.getFactoryAddress();

            expect(count0.toLowerCase()).to.be.equal(uniswapV3.factoryAddress.toLowerCase());
            expect(count1.toLowerCase()).to.be.equal(pancakeSwapV3.factoryAddress.toLowerCase());
            expect(count2.toLowerCase()).to.be.equal(sushiSwapV3.factoryAddress.toLowerCase());
            expect(count3.toLowerCase()).to.be.equal(derpDexV3.factoryAddress.toLowerCase());
            expect(count4.toLowerCase()).to.be.equal(throneV3.factoryAddress.toLowerCase());
            expect(count5.toLowerCase()).to.be.equal(horizonDexV3.factoryAddress.toLowerCase());
            expect(count6.toLowerCase()).to.be.equal(swapBasedAmmV3.factoryAddress.toLowerCase());
            expect(count7.toLowerCase()).to.be.equal(baseSwapV3.factoryAddress.toLowerCase());
            expect(count8.toLowerCase()).to.be.equal(kinetixV3.factoryAddress.toLowerCase());
            expect(count9.toLowerCase()).to.be.equal(dackieSwapV3.factoryAddress.toLowerCase());
            expect(count10.toLowerCase()).to.be.equal(wagmiV3.factoryAddress.toLowerCase());
            expect(count11.toLowerCase()).to.be.equal(alienBaseV3.factoryAddress.toLowerCase());
        });

        it("should return the correct pool address for each dex", async function() {
            const path = [WETH_ADDRESS_BASE, 500, USDC_ADDRESS_BASE];
            let count0 = await uniswapV3.getPoolAddress(path);
            let count1 = await pancakeSwapV3.getPoolAddress(path);
            let count2 = await sushiSwapV3.getPoolAddress(path);
            let count3 = await derpDexV3.getPoolAddress(path);
            let count4 = await throneV3.getPoolAddress(path);
            let count5 = await horizonDexV3.getPoolAddress(path);
            let count6 = await swapBasedAmmV3.getPoolAddress(path);
            let count7 = await baseSwapV3.getPoolAddress(path);
            let count8 = await kinetixV3.getPoolAddress(path);
            let count9 = await dackieSwapV3.getPoolAddress(path);
            let count10 = await wagmiV3.getPoolAddress(path);
            let count11 = await alienBaseV3.getPoolAddress(path);

            expect(count0.toLowerCase()).to.be.not.equal(ZeroAddress);
            expect(count1.toLowerCase()).to.be.not.equal(ZeroAddress);
            expect(count2.toLowerCase()).to.be.not.equal(ZeroAddress);
            expect(count3.toLowerCase()).to.be.equal(ZeroAddress);
            expect(count4.toLowerCase()).to.be.equal(ZeroAddress);
            expect(count5.toLowerCase()).to.be.equal(ZeroAddress);
            expect(count6.toLowerCase()).to.be.not.equal(ZeroAddress);
            expect(count7.toLowerCase()).to.be.equal(ZeroAddress);
            expect(count8.toLowerCase()).to.be.not.equal(ZeroAddress);
            expect(count9.toLowerCase()).to.be.not.equal(ZeroAddress);
            expect(count10.toLowerCase()).to.be.equal(ZeroAddress);
            expect(count11.toLowerCase()).to.be.equal(ZeroAddress);
        });


        it("should return the reserves for each dex", async function() {
            const path = [WETH_ADDRESS_BASE, 500, USDC_ADDRESS_BASE];
            let count0 = await uniswapV3.getPoolReserves(path);
            let count1 = await pancakeSwapV3.getPoolReserves(path);
            let count2 = await sushiSwapV3.getPoolReserves(path);
            // let count3 = await derpDexV3.getPoolReserves(path);
            // let count4 = await throneV3.getPoolReserves(path);
            // let count5 = await horizonDexV3.getPoolReserves(path);
            let count6 = await swapBasedAmmV3.getPoolReserves(path);
            // let count7 = await baseSwapV3.getPoolReserves(path);
            let count8 = await kinetixV3.getPoolReserves(path);
            let count9 = await dackieSwapV3.getPoolReserves(path);
            // let count10 = await wagmiV3.getPoolReserves(path);
            // let count11 = await alienBaseV3.getPoolReserves(path);


            expect(count0).to.be.an('object');
            expect(count1).to.be.an('object');
            expect(count2).to.be.an('object');
            // expect(count3).to.be.an('object');
            // expect(count4).to.be.an('object');
            // expect(count5).to.be.an('object');
            expect(count6).to.be.an('object');
            // expect(count7).to.be.an('object');
            expect(count8).to.be.an('object');
            expect(count9).to.be.an('object');
            // expect(count10).to.be.an('object');
            // expect(count11).to.be.an('object');
        });


        it("should return the prices for each dex", async function() {
            const path = [WETH_ADDRESS_BASE, 500, USDC_ADDRESS_BASE];
            let count0 = await uniswapV3.getTokenPrice(path);
            let count1 = await pancakeSwapV3.getTokenPrice(path);
            let count2 = await sushiSwapV3.getTokenPrice(path);
            // let count3 = await derpDexV3.getTokenPrice(path);
            // let count4 = await throneV3.getTokenPrice(path);
            // let count5 = await horizonDexV3.getTokenPrice(path);
            // let count6 = await swapBasedAmmV3.getTokenPrice(path);
            // let count7 = await baseSwapV3.getTokenPrice(path);
            /// let count8 = await kinetixV3.getTokenPrice(path);
            /// let count9 = await dackieSwapV3.getTokenPrice(path);
            // let count10 = await wagmiV3.getTokenPrice(path);
            // let count11 = await alienBaseV3.getTokenPrice(path);


            expect(count0).to.be.not.equal(0);
            expect(count1).to.be.not.equal(0);
            expect(count2).to.be.not.equal(0);
            // expect(count3).to.be.not.equal(0);
            // expect(count4).to.be.not.equal(0);
            // expect(count5).to.be.not.equal(0);
            // expect(count6).to.be.equal(0);
            // expect(count7).to.be.not.equal(0);
            // expect(count8).to.be.not.equal(0);
            // expect(count9).to.be.not.equal(0);
            // expect(count10).to.be.not.equal(0);
            // expect(count11).to.be.not.equal(0);
        });


        it("should return encoded swap for each dex", async function() {
            const path = [WETH_ADDRESS_BASE, 500, USDC_ADDRESS_BASE];
            const amountIn = ethers.parseEther("1");

            let count0 = await uniswapV3.getEncodedSwap(amountIn, path, owner.address);
            let count1 = await pancakeSwapV3.getEncodedSwap(amountIn, path, owner.address);
            let count2 = await sushiSwapV3.getEncodedSwap(amountIn, path, owner.address);
            let count3 = await derpDexV3.getEncodedSwap(amountIn, path, owner.address);
            let count4 = await throneV3.getEncodedSwap(amountIn, path, owner.address);
            let count5 = await horizonDexV3.getEncodedSwap(amountIn, path, owner.address);
            let count6 = await swapBasedAmmV3.getEncodedSwap(amountIn, path, owner.address);
            let count7 = await baseSwapV3.getEncodedSwap(amountIn, path, owner.address);
            let count8 = await kinetixV3.getEncodedSwap(amountIn, path, owner.address);
            let count9 = await dackieSwapV3.getEncodedSwap(amountIn, path, owner.address);
            let count10 = await wagmiV3.getEncodedSwap(amountIn, path, owner.address);
            let count11 = await alienBaseV3.getEncodedSwap(amountIn, path, owner.address);


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


        it("should simulate swap for each dex", async function() {
            const path = [WETH_ADDRESS_BASE, 500, USDC_ADDRESS_BASE];
            const amountIn = ethers.parseUnits("1", 6);

            const overrides = {
                maxFeePerGas: 10837221,
                maxPriorityFeePerGas: 8837221,
            }

            const usdc = new ERC20(USDC_ADDRESS_BASE, owner);
            const txApprove0 = await usdc.approve(uniswapV3.routerAddress, MaxUint256, overrides);
            await txApprove0.wait();

            const txApprove1 = await usdc.approve(pancakeSwapV3.routerAddress, amountIn, overrides);
            await txApprove1.wait();

            const txApprove2 = await usdc.approve(sushiSwapV3.routerAddress, amountIn, overrides);
            await txApprove2.wait();

            const txApprove3 = await usdc.approve(derpDexV3.routerAddress, amountIn, overrides);
            await txApprove3.wait();

            const txApprove4 = await usdc.approve(throneV3.routerAddress, amountIn, overrides);
            await txApprove4.wait();

            const txApprove5 = await usdc.approve(horizonDexV3.routerAddress, amountIn, overrides);
            await txApprove5.wait();

            const txApprove6 = await usdc.approve(swapBasedAmmV3.routerAddress, amountIn, overrides);
            await txApprove6.wait();

            const txApprove7 = await usdc.approve(baseSwapV3.routerAddress, amountIn, overrides);
            await txApprove7.wait();

            const txApprove8 = await usdc.approve(kinetixV3.routerAddress, amountIn, overrides);
            await txApprove8.wait();

            const txApprove9 = await usdc.approve(dackieSwapV3.routerAddress, amountIn, overrides);
            await txApprove9.wait();

            const txApprove10 = await usdc.approve(wagmiV3.routerAddress, amountIn, overrides);
            await txApprove10.wait();

            const txApprove11 = await usdc.approve(alienBaseV3.routerAddress, amountIn, overrides);
            await txApprove11.wait();


            let count0 = await uniswapV3.getPoolReserves(path);
            let count1 = await pancakeSwapV3.getPoolReserves(path);
            let count2 = await sushiSwapV3.getPoolReserves(path);
            // let count3 = await derpDexV3.getPoolReserves(path);
            // let count4 = await throneV3.getPoolReserves(path);
            // let count5 = await horizonDexV3.getPoolReserves(path);
            let count6 = await swapBasedAmmV3.getPoolReserves(path);
            // let count7 = await baseSwapV3.getPoolReserves(path);
            let count8 = await kinetixV3.getPoolReserves(path);
            let count9 = await dackieSwapV3.getPoolReserves(path);
            // let count10 = await wagmiV3.getPoolReserves(path);
            // let count11 = await alienBaseV3.getPoolReserves(path);


            expect(count0).to.be.an('object');
            expect(count1).to.be.an('object');
            expect(count2).to.be.an('object');
            // expect(count3).to.be.an('object');
            // expect(count4).to.be.an('object');
            // expect(count5).to.be.an('object');
            expect(count6).to.be.an('object');
            // expect(count7).to.be.an('object');
            expect(count8).to.be.an('object');
            expect(count9).to.be.an('object');
            // expect(count10).to.be.an('object');
            // expect(count11).to.be.an('object');
        });
    });
});
