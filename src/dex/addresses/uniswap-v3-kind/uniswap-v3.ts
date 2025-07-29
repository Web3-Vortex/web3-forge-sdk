import { Network } from "../../../types/network";

export const uniswapV3Addresses = new Map<Network, {router: string, factory: string, quoter: string}>([
    [Network.Ethereum, {
        router: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
        factory: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
        quoter: '0x61fFE014bA17989E743c5F6cB21bF9697530B21e',
    }],
    [Network.Unichain, {
        router: '0x73855d06de49d0fe4a9c42636ba96c62da12ff9c',
        factory: '0x1f98400000000000000000000000000000000003',
        quoter: '0x385a5cf5f83e99f7bb2852b6a19c3538b9fa7658',
    }],
    [Network.Arbitrum, {
        router: '0x2626664c2603336E57B271c5C0b26F421741e481',
        factory: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
        quoter: '0x61fFE014bA17989E743c5F6cB21bF9697530B21e',
    }],
    [Network.Optimism, {
        router: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
        factory: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
        quoter: '0x61fFE014bA17989E743c5F6cB21bF9697530B21e',
    }],
    [Network.Polygon, {
        router: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
        factory: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
        quoter: '0x61fFE014bA17989E743c5F6cB21bF9697530B21e',
    }],
    [Network.Base, {
        router: '0x2626664c2603336E57B271c5C0b26F421741e481',
        factory: '0x33128a8fC17869897dcE68Ed026d694621f6FDfD',
        quoter: '0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a',
    }],
    [Network.BSC, {
        router: '0xB971eF87ede563556b2ED4b1C0b0019111Dd85d2',
        factory: '0xdB1d10011AD0Ff90774D0C6Bb92e5C5c8b4461F7',
        quoter: '0x78D78E420Da98ad378D7799bE8f4AF69033EB077',
    }],
    [Network.Avalanche, {
        router: '0xbb00FF08d01D300023C629E8fFfFcb65A5a578cE',
        factory: '0x740b1c1de25031C31FF4fC9A62f554A55cdC1baD',
        quoter: '0xbe0F5544EC67e9B3b2D979aaA43f18Fd87E6257F',
    }],
    [Network.Celo, {
        router: '0x5615CDAb10dc425a742d643d949a7F474C01abc4',
        factory: '0xAfE208a311B21f13EF87E33A90049fC17A7acDEc',
        quoter: '0x82825d0554fA07f7FC52Ab63c961F330fdEFa8E8',
    }],
    [Network.Blast, {
        router: '0x549FEB8c9bd4c12Ad2AB27022dA12492aC452B66',
        factory: '0x792edAdE80af5fC680d96a2eD80A44247D2Cf6Fd',
        quoter: '0x6Cdcd65e03c1CEc3730AeeCd45bc140D57A25C77',
    }],
    [Network.ZkSync, {
        router: '0x99c56385daBCE3E81d8499d0b8d0257aBC07E8A3',
        factory: '0x8FdA5a7a8dCA67BBcDd10F02Fa0649A937215422',
        quoter: '0x8Cb537fc92E26d8EBBb760E632c95484b6Ea3e28',
    }],
    [Network.WorldChain, {
        router: '0x091AD9e2e6e5eD44c1c66dB50e49A601F9f36cF6',
        factory: '0x7a5028BDa40e7B173C278C5342087826455ea25a',
        quoter: '0x10158D43e6cc414deE1Bd1eB0EfC6a5cBCfF244c',
    }],
    [Network.Zora, {
        router: '0x7De04c96BE5159c3b5CeffC82aa176dc81281557',
        factory: '0x7145F8aeef1f6510E92164038E1B6F8cB2c42Cbb',
        quoter: '0x11867e1b3348F3ce4FcC170BC5af3d23E07E64Df',
    }],
]);
