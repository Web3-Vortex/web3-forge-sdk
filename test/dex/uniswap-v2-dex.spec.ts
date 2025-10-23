import type { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { ethers, network } from "hardhat";
import { expect } from "chai";
import { ZeroAddress, MaxUint256 } from "ethers";
import { 
    AlienBaseV2,
    AlienBaseArea51V2,
    BaseSwapV2,
    DeltaSwapV2,
    DackieSwapV2,
    RingSwapV2,
    RocketSwapV2,
    RaiFinanceV2,
    UniswapV2,
    PancakeSwapV2,
    SushiSwapV2,
    SharkSwapV2,
    SwapBasedAmmV2,
    LeetSwapV2,
    IcecreamSwapV2,
    ElkV2,
} from "../../src/dex/UniswapV2Kind";
import { WETH_ADDRESS_BASE, USDC_ADDRESS_BASE } from "./constants/tokens";
import { BASE_NETWORK } from "./constants/network";
import { ERC20 } from "../../src/erc20/tokens/ERC20";
import { IxSwapV2 } from "../../src/dex/IxSwapV2";

describe("Uniswap V2 Dexes for Network: Base", function () {
    let owner: HardhatEthersSigner;

    // Dexes
    let alienBaseV2: AlienBaseV2;
    let alienBaseArea51V2: AlienBaseArea51V2;
    let baseSwapV2: BaseSwapV2;
    let deltaSwapV2: DeltaSwapV2;
    let dackieSwapV2: DackieSwapV2;
    let ringSwapV2: RingSwapV2;
    let rocketSwapV2: RocketSwapV2;
    let raiFinanceV2: RaiFinanceV2;
    let uniswapV2: UniswapV2;
    let pancakeSwapV2: PancakeSwapV2;
    let sushiSwapV2: SushiSwapV2;
    let sharkSwapV2: SharkSwapV2;
    let swapBasedAmmV2: SwapBasedAmmV2;
    let leetSwapV2: LeetSwapV2;
    let icecreamSwapV2: IcecreamSwapV2;
    let elkV2: ElkV2;

    let ixsswapv2: IxSwapV2;

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
        alienBaseV2 = new AlienBaseV2(BASE_NETWORK);
        alienBaseArea51V2 = new AlienBaseArea51V2(BASE_NETWORK);
        baseSwapV2 = new BaseSwapV2(BASE_NETWORK);
        deltaSwapV2 = new DeltaSwapV2(BASE_NETWORK);
        dackieSwapV2 = new DackieSwapV2(BASE_NETWORK);
        ringSwapV2 = new RingSwapV2(BASE_NETWORK);
        rocketSwapV2 = new RocketSwapV2(BASE_NETWORK);
        raiFinanceV2 = new RaiFinanceV2(BASE_NETWORK);
        uniswapV2 = new UniswapV2(BASE_NETWORK);
        pancakeSwapV2 = new PancakeSwapV2(BASE_NETWORK);
        sushiSwapV2 = new SushiSwapV2(BASE_NETWORK);
        sharkSwapV2 = new SharkSwapV2(BASE_NETWORK);
        swapBasedAmmV2 = new SwapBasedAmmV2(BASE_NETWORK);
        leetSwapV2 = new LeetSwapV2(BASE_NETWORK);
        icecreamSwapV2 = new IcecreamSwapV2(BASE_NETWORK);
        elkV2 = new ElkV2(BASE_NETWORK);
        ixsswapv2 = new IxSwapV2(BASE_NETWORK);
    });


    describe.only("Testing all base functions", function() {
        it("should correctly split a path of 3 tokens", function() {
            const path = [WETH_ADDRESS_BASE, USDC_ADDRESS_BASE, '0xde30da39c46104798bb5aa3fe8b9e0e1f348163f'];
            const expectedSplit = [
                [WETH_ADDRESS_BASE, USDC_ADDRESS_BASE],
                [USDC_ADDRESS_BASE, '0xde30da39c46104798bb5aa3fe8b9e0e1f348163f']
            ];
            const split = ixsswapv2.splitPath(path);
            console.log(split);
            expect(split).to.deep.equal(expectedSplit);
        });
    });


    describe("Get functions for network", function() {
        it("should return the correct pool count for each dex", async function() {
            const count0 = await alienBaseArea51V2.getPoolCount();
            const count1 = await alienBaseV2.getPoolCount();
            const count2 = await baseSwapV2.getPoolCount();
            const count3 = await deltaSwapV2.getPoolCount();
            const count4 = await dackieSwapV2.getPoolCount();
            const count5 = await ringSwapV2.getPoolCount();
            const count6 = await rocketSwapV2.getPoolCount();
            const count7 = await raiFinanceV2.getPoolCount();
            const count8 = await uniswapV2.getPoolCount();
            const count9 = await pancakeSwapV2.getPoolCount();
            const count10 = await sushiSwapV2.getPoolCount();
            const count11 = await sharkSwapV2.getPoolCount();
            const count12 = await swapBasedAmmV2.getPoolCount();
            const count13 = await leetSwapV2.getPoolCount();
            const count14 = await icecreamSwapV2.getPoolCount();
            const count15 = await elkV2.getPoolCount();
            const count16 = await ixsswapv2.getPoolCount();

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
            expect(count12).to.be.greaterThan(0);
            expect(count13).to.be.greaterThan(0);
            expect(count14).to.be.greaterThan(0);
            expect(count15).to.be.greaterThan(0);
            expect(count16).to.be.greaterThan(0);
        });

        it("should return the correct pool address by index", async function() {
            const count0 = await alienBaseArea51V2.getPoolAddressByIndex(0);
            const count1 = await alienBaseV2.getPoolAddressByIndex(0);
            const count2 = await baseSwapV2.getPoolAddressByIndex(0);
            const count3 = await deltaSwapV2.getPoolAddressByIndex(0);
            const count4 = await dackieSwapV2.getPoolAddressByIndex(0);
            const count5 = await ringSwapV2.getPoolAddressByIndex(0);
            const count6 = await rocketSwapV2.getPoolAddressByIndex(0);
            const count7 = await raiFinanceV2.getPoolAddressByIndex(0);
            const count8 = await uniswapV2.getPoolAddressByIndex(0);
            const count9 = await pancakeSwapV2.getPoolAddressByIndex(0);
            const count10 = await sushiSwapV2.getPoolAddressByIndex(0);
            const count11 = await sharkSwapV2.getPoolAddressByIndex(0);
            const count12 = await swapBasedAmmV2.getPoolAddressByIndex(0);
            const count13 = await leetSwapV2.getPoolAddressByIndex(0);
            const count14 = await icecreamSwapV2.getPoolAddressByIndex(0);
            const count15 = await elkV2.getPoolAddressByIndex(0);
            const count16 = await ixsswapv2.getPoolAddressByIndex(0);

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
            expect(count12).to.be.not.equal(ZeroAddress);
            expect(count13).to.be.not.equal(ZeroAddress);
            expect(count14).to.be.not.equal(ZeroAddress);
            expect(count15).to.be.not.equal(ZeroAddress);
            expect(count16).to.be.not.equal(ZeroAddress);
        });

        it("should return the correct factory address for each dex", async function() {
            const count0 = await alienBaseArea51V2.getFactoryAddress();
            const count1 = await alienBaseV2.getFactoryAddress();
            const count2 = await baseSwapV2.getFactoryAddress();
            const count3 = await deltaSwapV2.getFactoryAddress();
            const count4 = await dackieSwapV2.getFactoryAddress();
            const count5 = await ringSwapV2.getFactoryAddress();
            const count6 = await rocketSwapV2.getFactoryAddress();
            const count7 = await raiFinanceV2.getFactoryAddress();
            const count8 = await uniswapV2.getFactoryAddress();
            const count9 = await pancakeSwapV2.getFactoryAddress();
            const count10 = await sushiSwapV2.getFactoryAddress();
            const count11 = await sharkSwapV2.getFactoryAddress();
            const count12 = await swapBasedAmmV2.getFactoryAddress();
            const count13 = await leetSwapV2.getFactoryAddress();
            const count14 = await icecreamSwapV2.getFactoryAddress();
            const count15 = await elkV2.getFactoryAddress();
            const count16 = await ixsswapv2.getFactoryAddress();

            expect(count0.toLowerCase()).to.be.equal(alienBaseArea51V2.factoryAddress.toLowerCase());
            expect(count1.toLowerCase()).to.be.equal(alienBaseV2.factoryAddress.toLowerCase());
            expect(count2.toLowerCase()).to.be.equal(baseSwapV2.factoryAddress.toLowerCase());
            expect(count3.toLowerCase()).to.be.equal(deltaSwapV2.factoryAddress.toLowerCase());
            expect(count4.toLowerCase()).to.be.equal(dackieSwapV2.factoryAddress.toLowerCase());
            expect(count5.toLowerCase()).to.be.equal(ringSwapV2.factoryAddress.toLowerCase());
            expect(count6.toLowerCase()).to.be.equal(rocketSwapV2.factoryAddress.toLowerCase());
            expect(count7.toLowerCase()).to.be.equal(raiFinanceV2.factoryAddress.toLowerCase());
            expect(count8.toLowerCase()).to.be.equal(uniswapV2.factoryAddress.toLowerCase());
            expect(count9.toLowerCase()).to.be.equal(pancakeSwapV2.factoryAddress.toLowerCase());
            expect(count10.toLowerCase()).to.be.equal(sushiSwapV2.factoryAddress.toLowerCase());
            expect(count11.toLowerCase()).to.be.equal(sharkSwapV2.factoryAddress.toLowerCase());
            expect(count12.toLowerCase()).to.be.equal(swapBasedAmmV2.factoryAddress.toLowerCase());
            expect(count13.toLowerCase()).to.be.equal(leetSwapV2.factoryAddress.toLowerCase());
            expect(count14.toLowerCase()).to.be.equal(icecreamSwapV2.factoryAddress.toLowerCase());
            expect(count15.toLowerCase()).to.be.equal(elkV2.factoryAddress.toLowerCase());
            expect(count16.toLowerCase()).to.be.equal(ixsswapv2.factoryAddress.toLowerCase());
        });

        it("should return the correct pool address for each dex", async function() {
            const path = [WETH_ADDRESS_BASE, USDC_ADDRESS_BASE];
            const count0 = await alienBaseArea51V2.getPoolAddress(path);
            const count1 = await alienBaseV2.getPoolAddress(path);
            const count2 = await baseSwapV2.getPoolAddress(path);
            const count3 = await deltaSwapV2.getPoolAddress(path);
            const count4 = await dackieSwapV2.getPoolAddress(path);
            const count5 = await ringSwapV2.getPoolAddress(path);
            const count6 = await rocketSwapV2.getPoolAddress(path);
            const count7 = await raiFinanceV2.getPoolAddress(path);
            const count8 = await uniswapV2.getPoolAddress(path);
            const count9 = await pancakeSwapV2.getPoolAddress(path);
            const count10 = await sushiSwapV2.getPoolAddress(path);
            const count11 = await sharkSwapV2.getPoolAddress(path);
            const count12 = await swapBasedAmmV2.getPoolAddress(path);
            const count13 = await leetSwapV2.getPoolAddress(path);
            const count14 = await icecreamSwapV2.getPoolAddress(path);
            const count15 = await elkV2.getPoolAddress(path);
            const count16 = await ixsswapv2.getPoolAddress(path);


            expect(count0.toLowerCase()).to.be.equal(ZeroAddress);
            expect(count1.toLowerCase()).to.be.not.equal(ZeroAddress);
            expect(count2.toLowerCase()).to.be.not.equal(ZeroAddress);
            expect(count3.toLowerCase()).to.be.not.equal(ZeroAddress);
            expect(count4.toLowerCase()).to.be.not.equal(ZeroAddress);
            expect(count5.toLowerCase()).to.be.not.equal(ZeroAddress);
            expect(count6.toLowerCase()).to.be.equal(ZeroAddress);
            expect(count7.toLowerCase()).to.be.not.equal(ZeroAddress);
            expect(count8.toLowerCase()).to.be.not.equal(ZeroAddress);
            expect(count9.toLowerCase()).to.be.not.equal(ZeroAddress);
            expect(count10.toLowerCase()).to.be.not.equal(ZeroAddress);
            expect(count11.toLowerCase()).to.be.not.equal(ZeroAddress);
            expect(count12.toLowerCase()).to.be.not.equal(ZeroAddress);
            expect(count13.toLowerCase()).to.be.not.equal(ZeroAddress);
            expect(count14.toLowerCase()).to.be.not.equal(ZeroAddress);
            expect(count15.toLowerCase()).to.be.not.equal(ZeroAddress);
            expect(count16.toLowerCase()).to.be.equal(ZeroAddress);
        });


        it("should return the reserves for each dex", async function() {
            const path = [WETH_ADDRESS_BASE, USDC_ADDRESS_BASE];
            // const count0 = await alienBaseArea51V2.getPoolReserves(path);
            const count1 = await alienBaseV2.getPoolReserves(path);
            const count2 = await baseSwapV2.getPoolReserves(path);
            const count3 = await deltaSwapV2.getPoolReserves(path);
            const count4 = await dackieSwapV2.getPoolReserves(path);
            const count5 = await ringSwapV2.getPoolReserves(path);
            // const count6 = await rocketSwapV2.getPoolReserves(path);
            const count7 = await raiFinanceV2.getPoolReserves(path);
            const count8 = await uniswapV2.getPoolReserves(path);
            const count9 = await pancakeSwapV2.getPoolReserves(path);
            const count10 = await sushiSwapV2.getPoolReserves(path);
            const count11 = await sharkSwapV2.getPoolReserves(path);
            const count12 = await swapBasedAmmV2.getPoolReserves(path);
            const count13 = await leetSwapV2.getPoolReserves(path);
            const count14 = await icecreamSwapV2.getPoolReserves(path);
            const count15 = await elkV2.getPoolReserves(path);
            // const count16 = await ixsswapv2.getPoolReserves(path);

            // expect(count0.reserve0).to.be.equal(0);
            expect(count1.reserve0).to.be.not.equal(0);
            expect(count2.reserve0).to.be.not.equal(0);
            expect(count3.reserve0).to.be.not.equal(0);
            expect(count4.reserve0).to.be.not.equal(0);
            expect(count5.reserve0).to.be.not.equal(0);
            // expect(count6.reserve0).to.be.equal(0);
            expect(count7.reserve0).to.be.not.equal(0);
            expect(count8.reserve0).to.be.not.equal(0);
            expect(count9.reserve0).to.be.not.equal(0);
            expect(count10.reserve0).to.be.not.equal(0);
            expect(count11.reserve0).to.be.not.equal(0);
            expect(count12.reserve0).to.be.not.equal(0);
            expect(count13.reserve0).to.be.not.equal(0);
            expect(count14.reserve0).to.be.not.equal(0);
            expect(count15.reserve0).to.be.not.equal(0);
            // expect(count16.reserve0).to.be.not.equal(0);
        });


        it("should return the prices for each dex", async function() {
            const path = [WETH_ADDRESS_BASE, USDC_ADDRESS_BASE];
            // const count0 = await alienBaseArea51V2.getPoolReserves(path);
            const count1 = await alienBaseV2.getTokenPrice(path);
            const count2 = await baseSwapV2.getTokenPrice(path);
            const count3 = await deltaSwapV2.getTokenPrice(path);
            const count4 = await dackieSwapV2.getTokenPrice(path);
            const count5 = await ringSwapV2.getTokenPrice(path);
            // const count6 = await rocketSwapV2.getTokenPrice(path);
            const count7 = await raiFinanceV2.getTokenPrice(path);
            const count8 = await uniswapV2.getTokenPrice(path);
            const count9 = await pancakeSwapV2.getTokenPrice(path);
            const count10 = await sushiSwapV2.getTokenPrice(path);
            const count11 = await sharkSwapV2.getTokenPrice(path);
            const count12 = await swapBasedAmmV2.getTokenPrice(path);
            const count13 = await leetSwapV2.getTokenPrice(path);
            const count14 = await icecreamSwapV2.getTokenPrice(path);
            const count15 = await elkV2.getTokenPrice(path);
            // const count16 = await ixsswapv2.getTokenPrice(path);

            // expect(count0).to.be.equal(0);
            expect(count1).to.be.not.equal(0);
            expect(count2).to.be.not.equal(0);
            expect(count3).to.be.not.equal(0);
            expect(count4).to.be.not.equal(0);
            expect(count5).to.be.not.equal(0);
            // expect(count6).to.be.equal(0);
            expect(count7).to.be.not.equal(0);
            expect(count8).to.be.not.equal(0);
            expect(count9).to.be.not.equal(0);
            expect(count10).to.be.not.equal(0);
            expect(count11).to.be.not.equal(0);
            expect(count12).to.be.not.equal(0);
            expect(count13).to.be.not.equal(0);
            expect(count14).to.be.not.equal(0);
            expect(count15).to.be.not.equal(0);
            // expect(count16).to.be.not.equal(0);
        });


        it("should return encoded swap for each dex", async function() {
            const path = [WETH_ADDRESS_BASE, USDC_ADDRESS_BASE];
            const amountIn = ethers.parseEther("1");


            const count0 = await alienBaseArea51V2.getEncodedSwap(amountIn, path, owner.address);
            const count1 = await alienBaseV2.getEncodedSwap(amountIn, path, owner.address);
            const count2 = await baseSwapV2.getEncodedSwap(amountIn, path, owner.address);
            const count3 = await deltaSwapV2.getEncodedSwap(amountIn, path, owner.address);
            const count4 = await dackieSwapV2.getEncodedSwap(amountIn, path, owner.address);
            const count5 = await ringSwapV2.getEncodedSwap(amountIn, path, owner.address);
            const count6 = await rocketSwapV2.getEncodedSwap(amountIn, path, owner.address);
            const count7 = await raiFinanceV2.getEncodedSwap(amountIn, path, owner.address);
            const count8 = await uniswapV2.getEncodedSwap(amountIn, path, owner.address);
            const count9 = await pancakeSwapV2.getEncodedSwap(amountIn, path, owner.address);
            const count10 = await sushiSwapV2.getEncodedSwap(amountIn, path, owner.address);
            const count11 = await sharkSwapV2.getEncodedSwap(amountIn, path, owner.address);
            const count12 = await swapBasedAmmV2.getEncodedSwap(amountIn, path, owner.address);
            const count13 = await leetSwapV2.getEncodedSwap(amountIn, path, owner.address);
            const count14 = await icecreamSwapV2.getEncodedSwap(amountIn, path, owner.address);
            const count15 = await elkV2.getEncodedSwap(amountIn, path, owner.address);
            const count16 = await ixsswapv2.getEncodedSwap(amountIn, path, owner.address);

            console.log(count0);


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
            const path = [USDC_ADDRESS_BASE, WETH_ADDRESS_BASE];
            const amountIn = ethers.parseUnits("1", 6);

            const overrides = {
                maxFeePerGas: 10837221,
                maxPriorityFeePerGas: 8837221,
            }

            const usdc = new ERC20(USDC_ADDRESS_BASE, owner);
            const txApprove0 = await usdc.approve(uniswapV2.routerAddress, MaxUint256);
            await txApprove0.wait();

            const txApprove1 = await usdc.approve(alienBaseV2.routerAddress, amountIn, overrides);
            await txApprove1.wait();

            const txApprove2 = await usdc.approve(baseSwapV2.routerAddress, amountIn, overrides);
            await txApprove2.wait();

            const txApprove3 = await usdc.approve(deltaSwapV2.routerAddress, amountIn, overrides);
            await txApprove3.wait();

            const txApprove4 = await usdc.approve(dackieSwapV2.routerAddress, amountIn, overrides);
            await txApprove4.wait();

            const txApprove5 = await usdc.approve(ringSwapV2.routerAddress, amountIn, overrides);
            await txApprove5.wait();

            const txApprove6 = await usdc.approve(rocketSwapV2.routerAddress, amountIn, overrides);
            await txApprove6.wait();

            const txApprove7 = await usdc.approve(raiFinanceV2.routerAddress, amountIn, overrides);
            await txApprove7.wait();

            const txApprove8 = await usdc.approve(uniswapV2.routerAddress, amountIn, overrides);
            await txApprove8.wait();

            const txApprove9 = await usdc.approve(pancakeSwapV2.routerAddress, amountIn, overrides);
            await txApprove9.wait();

            const txApprove10 = await usdc.approve(sushiSwapV2.routerAddress, amountIn, overrides);
            await txApprove10.wait();

            const txApprove11 = await usdc.approve(sharkSwapV2.routerAddress, amountIn, overrides);
            await txApprove11.wait();

            const txApprove12 = await usdc.approve(swapBasedAmmV2.routerAddress, amountIn, overrides);
            await txApprove12.wait();

            const txApprove13 = await usdc.approve(leetSwapV2.routerAddress, amountIn, overrides);
            await txApprove13.wait();

            const txApprove14 = await usdc.approve(icecreamSwapV2.routerAddress, amountIn, overrides);
            await txApprove14.wait();

            const txApprove15 = await usdc.approve(elkV2.routerAddress, amountIn, overrides);
            await txApprove15.wait();

            const txApprove16 = await usdc.approve(ixsswapv2.routerAddress, amountIn, overrides);
            await txApprove16.wait();


            // const count0 = await alienBaseArea51V2.simulateSwap(owner.address, amountIn, path);
            const count1 = await alienBaseV2.simulateSwap(owner.address, amountIn, path, owner.address);
            const count2 = await baseSwapV2.simulateSwap(owner.address, amountIn, path, owner.address);
            const count3 = await deltaSwapV2.simulateSwap(owner.address, amountIn, path, owner.address);
            const count4 = await dackieSwapV2.simulateSwap(owner.address, amountIn, path, owner.address);
            // const count5 = await ringSwapV2.simulateSwap(owner.address, amountIn, path, owner.address);
            // const count6 = await rocketSwapV2.simulateSwap(owner.address, amountIn, path, owner.address);
            const count7 = await raiFinanceV2.simulateSwap(owner.address, amountIn, path, owner.address);
            const count8 = await uniswapV2.simulateSwap(owner.address, amountIn, path, owner.address);
            const count9 = await pancakeSwapV2.simulateSwap(owner.address, amountIn, path, owner.address);
            const count10 = await sushiSwapV2.simulateSwap(owner.address, amountIn, path, owner.address);
            const count11 = await sharkSwapV2.simulateSwap(owner.address, amountIn, path, owner.address);
            const count12 = await swapBasedAmmV2.simulateSwap(owner.address, amountIn, path, owner.address);
            const count13 = await leetSwapV2.simulateSwap(owner.address, amountIn, path, owner.address);
            const count14 = await icecreamSwapV2.simulateSwap(owner.address, amountIn, path, owner.address);
            const count15 = await elkV2.simulateSwap(owner.address, amountIn, path, owner.address);
            // const count16 = await ixsswapv2.simulateSwap(owner.address, amountIn, path, owner.address);

            // console.log(count0);


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
