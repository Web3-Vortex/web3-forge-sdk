import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { ethers } from "ethers";
import "dotenv/config";
import { glob } from "glob";

task("test:dex", "Runs DEX tests on a fresh fork of the Base network")
    .addOptionalParam("testfiles", "The test files to run", "./test/dex/**/*.ts")
    .addOptionalParam("rpc", "Custom RPC URL to use for forking")
    .setAction(async (taskArgs, hre: HardhatRuntimeEnvironment) => {
        console.log("Preparing fresh fork for DEX tests...");

        let rpcUrl = taskArgs.rpc;

        if (!rpcUrl) {
            rpcUrl = process.env.ALCHEMY_KEY
                ? `https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
                : "https://base.llamarpc.com";
        }

        if (!rpcUrl) {
            throw new Error("RPC URL is not defined. Provide it with --rpc or set ALCHEMY_KEY in your .env file.");
        }

        console.log(`Using RPC URL: ${rpcUrl}`);

        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const latestBlockNumber = await provider.getBlockNumber();
        const targetBlockNumber = latestBlockNumber - 10;

        console.log(`Latest block on Base: ${latestBlockNumber}`);
        console.log(`Setting fork block number to: ${targetBlockNumber}`);

        process.env.FORK_BLOCK_NUMBER = targetBlockNumber.toString();

        const testFiles = await glob(taskArgs.testfiles);

        if (testFiles.length === 0) {
            console.warn(`No test files found for pattern: ${taskArgs.testfiles}`);
            return;
        }

        await hre.run("test", { testFiles: testFiles });
    });
