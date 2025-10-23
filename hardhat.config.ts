import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
import "./tasks/test-dex";
import "./tasks/test-custom";


const BASE_URL = process.env.ALCHEMY_KEY ? `https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}` : "https://base.llamarpc.com";


const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 50000,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 8453,
      forking: {
        url: BASE_URL,
        blockNumber: process.env.FORK_BLOCK_NUMBER ? parseInt(process.env.FORK_BLOCK_NUMBER) : 34386449,
      },
      chains: {
        8453: {
          hardforkHistory: {
            cancun: 0,
          },
        },
      },
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 8453,
    }
  },
  gasReporter: {
    enabled: false,
  },
};

export default config;
