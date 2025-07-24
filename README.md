# web3-forge

This project contains a set of tools and libraries for Web3 development, including a flexible DEX testing framework.

## Custom DEX Testing Task

A custom Hardhat task `test:dex` is available to streamline testing of DEX-related functionality. This task automatically creates a fresh fork of the Base network using the latest block number (minus 10 for stability) to ensure tests run against recent and stable chain data.

### Usage

The primary command is `npx hardhat test:dex`. It can be customized with the following optional parameters.

| Command / Parameter         | Description                                                                 | Example                                                              |
| --------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `npx hardhat test:dex`      | Runs all DEX tests located in the `test/dex/` directory.                    | `npx hardhat test:dex`                                               |
| `--rpc <URL>`               | Specifies a custom RPC URL to use for creating the network fork.            | `npx hardhat test:dex --rpc https://your-custom-rpc-url.com`       |
| `--testfiles <PATH>`        | Runs tests from a specific file or a custom path pattern.                   | `npx hardhat test:dex --testfiles ./test/dex/uniswap-v2-kind.spec.ts` |

---

### Default Project Tasks

This project also includes the standard Hardhat tasks.

```shell
npx hardhat help
npx hardhat test
npx hardhat node
```
