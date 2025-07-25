import { Network } from "../../../types/network";

export const elkswapV2Addresses = new Map<Network, {router: string, factory: string}>([
    [Network.Avalanche, {
        router: '0x9E4AAbd2B3E60Ee1322E94307d0776F2c8e6CFbb',
        factory: '0x091d35d7F63487909C863001ddCA481c6De47091',
    }],
    [Network.Polygon, {
        router: '0xf38a7A7Ac2D745E2204c13F824c00139DF831FFf',
        factory: '0xE3BD06c7ac7E1CeB17BdD2E5BA83E40D1515AF2a',
    }],
    [Network.Fantom, {
        router: '0x4D2cf285a519261F30b4d9c2c344Baf260d65Fa2',
        factory: '0x7Ba73c99e6f01a37f3e33854c8F544BbbadD3420',
    }],
    [Network.HuobiECO, {
        router: '0x62710D18596c808c70864695c77480De252DD9D5',
        factory: '0x997fCE9164D630CC58eE366d4D275B9D773d54A4',
    }],
    [Network.Gnosis, {
        router: '0xe5759714998e8B50A33c7333C04C2d02e5dcE77f',
        factory: '0xCB018587dA9590A18f49fFE2b85314c33aF3Ad3B',
    }],
    [Network.BSC, {
        router: '0xA63B831264183D755756ca9AE5190fF5183d65D6',
        factory: '0x31aFfd875e9f68cd6Cd12Cee8943566c9A4bBA13',
    }],
    [Network.KCC, {
        router: '0x5DDac4C73b15353dc4a00DaeAfb38631a7cBd389',
        factory: '0x1f9aa39001ed0630dA6854859D7B3eD255648599',
    }],
    [Network.Harmony, {
        router: '0xbeA02dc919B08b5aE2158a8fBC60D4DA5640737B',
        factory: '0xCdde1AbfF5Ae3Cbfbdb55c1e866Ac56380e18720',
    }],
    [Network.OKXChain, {
        router: '0x4652ab8e8821F234407b1f1cB0ac8dD7E617BfF8',
        factory: '0x1116f8B82028324f2065078b4ff6b47F1Cc22B97',
    }],
    [Network.Elastos, {
        router: '0xbF9Bebfd6954985E41Fed497a5421B3B5B0f66AB',
        factory: '0x440a1B8b8e968D6765D41E6b92DF3cBb0e9D2b1e',
    }],
    [Network.Moonriver, {
        router: '0xdCB8C29298AF7E9C48b56dB3c87dB6d124d1Ef97',
        factory: '0xd45145f10fD4071dfC9fC3b1aefCd9c83A685e77',
    }],
    [Network.Telos, {
        router: '0x75840EBB437981a3F3F1F004513821E0CcDCFC21',
        factory: '0x47c3163e691966f8c1b93B308A236DDB3C1C592d',
    }],
    [Network.Cronos, {
        router: '0xdB02A597b283eACb9436Cd2a2d15039a11A3299d',
        factory: '0xEEa0e2830D09D8786Cb9F484cA20898b61819ef1',
    }],
    [Network.Fuse, {
        router: '0x9a5De8C973c2f64f0f518DE581BcC2aa2dF8A621',
        factory: '0x779407e40Dad9D70Ba5ADc30E45cC3494ec71ad2',
    }],
    [Network.Iotex, {
        router: '0xAEB801BA5Cf1233B2a3765890D4f8f8C8141Fa43',
        factory: '0xF96bE66DA0b9bC9DFD849827b4acfA7e8a6F3C42',
    }],
    [Network.Ethereum, {
        router: '0xb5e9F6C58f548CeE53257304e287b23757eFFCA1',
        factory: '0x6511eBA915fC1b94b2364289CCa2b27AE5898d80',
    }],
    [Network.Arbitrum, {
        router: '0x0A2e5A3Dc2f74E5Bfaf0Bf90685A5A899f379Cb0',
        factory: '0xA59B2044EAFD15ee4deF138D410d764c9023E1F0',
    }],
    [Network.Optimism, {
        router: '0xeadE97aFC8f79A8E5Ba85d57C4a4E629b1160C6A',
        factory: '0xedfad3a0f42a8920b011bb0332ade632e552d846',
    }],
    [Network.Kava, {
        router: '0x7a2c1D96C76B6EB62241df4d2fAEb9F0D3D59E10',
        factory: '0xC012C4b3d253A8F22d5e4ADA67ea2236FF9778fc',
    }],
    [Network.BitTorrent, {
        router: '0x7520D45BCC30Be211C6B28f6291522555EDa4D6c',
        factory: '0xc06348AEE3f3E92eE452816E0D3F25C919F6fB04',
    }],
    [Network.Bitgert, {
        router: '0x7ae799fDBE4c330A4AC18d8d65765222A0D47e6D',
        factory: '0xfbb4E52FEcc90924c79F980eb24a9794ae4aFFA4',
    }],
    [Network.Metis, {
        router: '0x7ae799fDBE4c330A4AC18d8d65765222A0D47e6D',
        factory: '0xfbb4E52FEcc90924c79F980eb24a9794ae4aFFA4',
    }],
    [Network.Wanchain, {
        router: '0x7ae799fDBE4c330A4AC18d8d65765222A0D47e6D',
        factory: '0xfbb4E52FEcc90924c79F980eb24a9794ae4aFFA4',
    }],
    [Network.NeonEvm, {
        router: '0x7ae799fDBE4c330A4AC18d8d65765222A0D47e6D',
        factory: '0xfbb4E52FEcc90924c79F980eb24a9794ae4aFFA4',
    }],
    [Network.Astar, {
        router: '0x7ae799fDBE4c330A4AC18d8d65765222A0D47e6D',
        factory: '0xfbb4E52FEcc90924c79F980eb24a9794ae4aFFA4',
    }],
    [Network.Base, {
        router: '0x7ae799fDBE4c330A4AC18d8d65765222A0D47e6D',
        factory: '0xfbb4E52FEcc90924c79F980eb24a9794ae4aFFA4',
    }],
    [Network.Linea, {
        router: '0x7ae799fDBE4c330A4AC18d8d65765222A0D47e6D',
        factory: '0xfbb4E52FEcc90924c79F980eb24a9794ae4aFFA4',
    }],
    [Network.Velas, {
        router: '0x7ae799fDBE4c330A4AC18d8d65765222A0D47e6D',
        factory: '0xfbb4E52FEcc90924c79F980eb24a9794ae4aFFA4',
    }],
    [Network.QBlockchain, {
        router: '0x7ae799fDBE4c330A4AC18d8d65765222A0D47e6D',
        factory: '0xfbb4E52FEcc90924c79F980eb24a9794ae4aFFA4',
    }],
    [Network.Arthera, {
        router: '0x35FC5DF37eABaB62B55ECDc349b2d718C88E107A',
        factory: '0x69D10bc18cD588A4b70F836a471D4e9C2FD86092',
    }],
    [Network.RootStock, {
        router: '0x35FC5DF37eABaB62B55ECDc349b2d718C88E107A',
        factory: '0x69D10bc18cD588A4b70F836a471D4e9C2FD86092',
    }],
]);