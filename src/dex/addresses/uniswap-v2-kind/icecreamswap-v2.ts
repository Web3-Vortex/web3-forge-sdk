import { Network } from "../../../types/network";


// https://wiki.icecreamswap.com/intro/contracts/v2
export const icecreamswapV2Addresses = new Map<Network, {router: string, factory: string}>([
    [Network.Base, {
        router: '0xBb5e1777A331ED93E07cF043363e48d320eb96c4',
        factory: '0x9E6d21E759A7A288b80eef94E4737D313D31c13f',
    }],
    [Network.Arbitrum, {
        router: '0xA1d3462AFbFFe3BA45A5044FB899e6E219Ec842A',
        factory: '0x0a354845411CC1212cfb33Acc6A52Fcd4A80e3Ae',
    }],
    [Network.Avalanche, {
        router: '0x3FFc2315A992b01dc4B3f79C8EEa1921091Ee24f',
        factory: '0xb4FE60CD05A3e68668007Cee83DDFD9A50A45B36',
    }],
    [Network.Bitgert, {
        router: '0xBb5e1777A331ED93E07cF043363e48d320eb96c4',
        factory: '0x9E6d21E759A7A288b80eef94E4737D313D31c13f',
    }],
    [Network.Blast, {
        router: '0xBb5e1777A331ED93E07cF043363e48d320eb96c4',
        factory: '0x9E6d21E759A7A288b80eef94E4737D313D31c13f',
    }],
    [Network.BOB, {
        router: '0x698a912F8CA34Df9b46E6Ea4A2B2DB0B7151b083',
        factory: '0x7b2a5C88AB9367147F6ac384F857CbaDF5aA70a7',
    }],
    [Network.BobaNetwork, {
        router: '0x698a912F8CA34Df9b46E6Ea4A2B2DB0B7151b083',
        factory: '0x7b2a5C88AB9367147F6ac384F857CbaDF5aA70a7',
    }],
    [Network.BSC, {
        router: '0xB403c6c93446eD1453CAa51d69A492053e008240',
        factory: '0x89BdF2078BAFbdde92A796F7FC76abd36B84d4Db',
    }],
    [Network.Celo, {
        router: '0xA1d3462AFbFFe3BA45A5044FB899e6E219Ec842A',
        factory: '0xFABbD5f4a53725266a4fA84D4140276794572cD6',
    }],
    [Network.Core, {
        router: '0xBb5e1777A331ED93E07cF043363e48d320eb96c4',
        factory: '0x9E6d21E759A7A288b80eef94E4737D313D31c13f',
    }],
    [Network.Cronos, {
        router: '0xb4FE60CD05A3e68668007Cee83DDFD9A50A45B36',
        factory: '0x63d3C7Ab37ca36A2A0A338076C163fF60c72527c',
    }],
    [Network.Dogechain, {
        router: '0x4Cbd6DE8819237d43EA44b8F14fd4d39bCc3c2D5',
        factory: '0x064b3B79A13A3D8959614AC45ffb7907A135f57a',
    }],
    [Network.DoKenSuperChain, {
        router: '0xBb5e1777A331ED93E07cF043363e48d320eb96c4',
        factory: '0x9E6d21E759A7A288b80eef94E4737D313D31c13f',
    }],
    [Network.Fantom, {
        router: '0x3FFc2315A992b01dc4B3f79C8EEa1921091Ee24f',
        factory: '0xb4FE60CD05A3e68668007Cee83DDFD9A50A45B36',
    }],
    [Network.Fuse, {
        router: '0xBb5e1777A331ED93E07cF043363e48d320eb96c4',
        factory: '0x9E6d21E759A7A288b80eef94E4737D313D31c13f',
    }],
    [Network.Kroma, {
        router: '0xb4FE60CD05A3e68668007Cee83DDFD9A50A45B36',
        factory: '0x63d3C7Ab37ca36A2A0A338076C163fF60c72527c',
    }],
    [Network.Lightlink, {
        router: '0xE578184bC88EB48485Bba23a37B5509578d2aE38',
        factory: '0xC87De04e2EC1F4282dFF2933A2D58199f688fC3d',
    }],
    [Network.Linea, {
        router: '0xa575f37e869e6887564F87c07e2885e08D542C4a',
        factory: '0x3FFc2315A992b01dc4B3f79C8EEa1921091Ee24f',
    }],
    [Network.Mantle, {
        router: '0xb4FE60CD05A3e68668007Cee83DDFD9A50A45B36',
        factory: '0x63d3C7Ab37ca36A2A0A338076C163fF60c72527c',
    }],
    [Network.Metis, {
        router: '0xb4FE60CD05A3e68668007Cee83DDFD9A50A45B36',
        factory: '0x63d3C7Ab37ca36A2A0A338076C163fF60c72527c',
    }],
    [Network.Mode, {
        router: '0xb4FE60CD05A3e68668007Cee83DDFD9A50A45B36',
        factory: '0x63d3C7Ab37ca36A2A0A338076C163fF60c72527c',
    }],
    [Network.Moonbeam, {
        router: '0xb4FE60CD05A3e68668007Cee83DDFD9A50A45B36',
        factory: '0x63d3C7Ab37ca36A2A0A338076C163fF60c72527c',
    }],
    [Network.Moonriver, {
        router: '0xb4FE60CD05A3e68668007Cee83DDFD9A50A45B36',
        factory: '0x63d3C7Ab37ca36A2A0A338076C163fF60c72527c',
    }],
    [Network.NeonEvm, {
        router: '0xBb5e1777A331ED93E07cF043363e48d320eb96c4',
        factory: '0x9E6d21E759A7A288b80eef94E4737D313D31c13f',
    }],
    [Network.Optimism, {
        router: '0xb4FE60CD05A3e68668007Cee83DDFD9A50A45B36',
        factory: '0x3FFc2315A992b01dc4B3f79C8EEa1921091Ee24f',
    }],
    [Network.Quitmer, {
        router: '0x575C065Bf1Fa9D6F0F94AAC620a6936dD8517c7D',
        factory: '0x84aeB58fb9187dD64282d0C0975F788e21dd4475',
    }],
    [Network.RARI, {
        router: '0x60cA396F69b8D9b22886208984D89a682D9D6f04',
        factory: '0x8bCf938b30575594B02420e86b100121c92A54a3',
    }],
    [Network.Scroll, {
        router: '0xBb5e1777A331ED93E07cF043363e48d320eb96c4',
        factory: '0x9E6d21E759A7A288b80eef94E4737D313D31c13f',
    }],
    [Network.ShimmerEvm, {
        router: '0xBbB4CCfc93657AC125F4b1f734111349d1bFF611',
        factory: '0x24cb308a4e2F3a4352F513681Bd0c31a0bd3BA31',
    }],
    [Network.Telos, {
        router: '0xBb5e1777A331ED93E07cF043363e48d320eb96c4',
        factory: '0x9E6d21E759A7A288b80eef94E4737D313D31c13f',
    }],
    [Network.XDCNetwork, {
        router: '0xBb5e1777A331ED93E07cF043363e48d320eb96c4',
        factory: '0x9E6d21E759A7A288b80eef94E4737D313D31c13f',
    }],
    [Network.XLayer, {
        router: '0xE578184bC88EB48485Bba23a37B5509578d2aE38',
        factory: '0xC87De04e2EC1F4282dFF2933A2D58199f688fC3d',
    }],
    [Network.XODEX, {
        router: '0xBb5e1777A331ED93E07cF043363e48d320eb96c4',
        factory: '0x9E6d21E759A7A288b80eef94E4737D313D31c13f',
    }],
]);


