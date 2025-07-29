import { Network } from "../../../types/network";

export const pancakeswapV3Addresses = new Map<Network, {router: string, factory: string, quoter: string}>([
    [Network.BSC, {
        router: '0x1b81D678ffb9C0263b24A97847620C99d213eB14',
        factory: '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
        quoter: '0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997',
    }],
    [Network.Ethereum, {
        router: '0x1b81D678ffb9C0263b24A97847620C99d213eB14',
        factory: '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
        quoter: '0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997',
    }],
    [Network.ZkEVM, {
        router: '0x1b81D678ffb9C0263b24A97847620C99d213eB14',
        factory: '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
        quoter: '0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997',
    }],
    [Network.ZkSync, {
        router: '0xD70C70AD87aa8D45b8D59600342FB3AEe76E3c68',
        factory: '0x1BB72E0CbbEA93c08f535fc7856E0338D7F7a8aB',
        quoter: '0x3d146FcE6c1006857750cBe8aF44f76a28041CCc',
    }],
    [Network.Arbitrum, {
        router: '0x1b81D678ffb9C0263b24A97847620C99d213eB14',
        factory: '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
        quoter: '0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997',
    }],
    [Network.Linea, {
        router: '0x1b81D678ffb9C0263b24A97847620C99d213eB14',
        factory: '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
        quoter: '0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997',
    }],
    [Network.Base, {
        router: '0x1b81D678ffb9C0263b24A97847620C99d213eB14',
        factory: '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
        quoter: '0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997',
    }],
    [Network.opBNB, {
        router: '0x1b81D678ffb9C0263b24A97847620C99d213eB14',
        factory: '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
        quoter: '0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997',
    }],
]);
