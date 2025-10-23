// tasks/testCustom.ts
import { task, types } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { ethers as ethersStandalone } from "ethers";
import "dotenv/config";
import { glob } from "glob";

task("test:custom", "Run tests with optional fresh fork and flexible file selection")
    // Позиционный параметр: путь к файлу/паттерну (опционально)
    .addOptionalPositionalParam("testpath", "Single test file or glob pattern, e.g. ./test/erc20.spec.ts")
    // Альтернатива: параметр-паттерн (если позиционный не задан)
    .addOptionalParam("pattern", "Glob pattern for multiple files", "./test/**/*.ts")
    // Форк/не форк
    .addFlag("noFork", "Run tests without forking (use in-process hardhat network)")
    // Откуда форкать
    .addOptionalParam("rpc", "RPC URL to fork from (e.g. Alchemy/Infura/Base)", undefined, types.string)
    // Блок форка: точный номер
    .addOptionalParam("blockNumber", "Exact block number to fork at", undefined, types.int)
    // Блок форка: смещение от latest (если blockNumber не задан)
    .addOptionalParam("blockOffset", "Blocks behind latest to fork at", 10, types.int)
    // mocha фильтр
    .addOptionalParam("grep", "Mocha grep pattern", undefined, types.string)
    .setAction(async (args, hre: HardhatRuntimeEnvironment) => {
        const { testpath, pattern, noFork, rpc, blockNumber, blockOffset, grep } = args;

        // ----- Собираем список тестов -----
        const files = testpath
            ? await glob(testpath) // позиционный имеет приоритет
            : await glob(pattern ?? "./test/**/*.ts");

        if (files.length === 0) {
            console.warn(`No test files matched: ${testpath ?? pattern}`);
            return;
        }

        // ----- Опциональный fresh fork -----
        if (!noFork) {
            // URL источника для форка (по умолчанию — Base через Alchemy либо публичный Llama RPC)
            let rpcUrl: string | undefined = rpc;
            if (!rpcUrl) {
                rpcUrl = process.env.ALCHEMY_KEY
                    ? `https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
                    : "https://base.llamarpc.com";
            }
            if (!rpcUrl) {
                throw new Error("Fork RPC URL is not defined. Pass --rpc or set ALCHEMY_KEY.");
            }

            // Выбираем номер блока (точный или latest - offset)
            let targetBlock: number | undefined = blockNumber;
            if (targetBlock == null) {
                const provider = new ethersStandalone.JsonRpcProvider(rpcUrl);
                const latest = await provider.getBlockNumber();
                targetBlock = Math.max(0, latest - (Number(blockOffset) || 0));
                console.log(`Latest block: ${latest}, forking at: ${targetBlock}`);
            } else {
                console.log(`Forking at explicit block: ${targetBlock}`);
            }

            // Мутируем конфиг hardhat-сети под форк
            hre.config.networks.hardhat.forking = { url: rpcUrl, blockNumber: targetBlock };
            // (не обязательно) выставим chainId Base, если удобно для тестов
            // hre.config.networks.hardhat.chainId = 8453;

            // Можно передать блок через env, если где-то используете:
            process.env.FORK_BLOCK_NUMBER = String(targetBlock);
            process.env.FORK_RPC_URL = rpcUrl;

            console.log(`Fork ready → ${rpcUrl} @ block ${targetBlock}`);
        } else {
            // Явно очищаем forking, если флаг noFork
            if (hre.config.networks.hardhat.forking) {
                // @ts-ignore — свойство доступно
                hre.config.networks.hardhat.forking = undefined;
            }
            console.log("Running tests without forking.");
        }

        // ----- Запускаем тесты -----
        const mochaArgs: any = { testFiles: files };
        if (grep) mochaArgs.grep = grep;

        await hre.run("test", mochaArgs);
    });
