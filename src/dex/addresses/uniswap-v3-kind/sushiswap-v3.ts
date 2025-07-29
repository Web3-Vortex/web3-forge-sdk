import { Network } from "../../../types/network";


// https://github.com/sushiswap/v3-periphery/tree/master/deployments
export const sushiswapV3Addresses = new Map<Network, {router: string, factory: string, quoter: string}>([
    [Network.ArbitrumNova, {
        router: '0xc14Ee6B248787847527e11b8d7Cf257b212f7a9F',
        factory: '0xaa26771d497814E81D305c511Efbb3ceD90BF5bd',
        quoter: '0xb1E835Dc2785b52265711e17fCCb0fd018226a6e',
    }],
    [Network.Arbitrum, {
        router: '0x8A21F6768C1f8075791D08546Dadf6daA0bE820c',
        factory: '0x1af415a1EbA07a4986a52B6f2e7dE7003D82231e',
        quoter: '0x0524E833cCD057e4d7A296e3aaAb9f7675964Ce1',
    }],
    [Network.Avalanche, {
        router: '0x8E4638eefee96732C56291fBF48bBB98725c6b31',
        factory: '0x3e603C14aF37EBdaD31709C4f848Fc6aD5BEc715',
        quoter: '0xb1E835Dc2785b52265711e17fCCb0fd018226a6e',
    }],
    [Network.Base, {
        router: '0xFB7eF66a7e61224DD6FcD0D7d9C3be5C8B049b9f',
        factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
        quoter: '0xb1E835Dc2785b52265711e17fCCb0fd018226a6e',
    }],
    [Network.Blast, {
        router: '0x5D0aA5dD03199D80089278B261167ffF24C304ca',
        factory: '0x7680D4B43f3d1d54d6cfEeB2169463bFa7a6cf0d',
        quoter: '0xD93a91442Afd80243cF12f7110f48aB276fFf33F',
    }],
    [Network.Boba, {
        router: '', // TODO: add router
        factory: '0x0BE808376Ecb75a5CF9bB6D237d16cd37893d904',
        quoter: '0xb1E835Dc2785b52265711e17fCCb0fd018226a6e',
    }],
    [Network.BSC, {
        router: '0x909662a99605382dB1E8d69cc1f182bb577d9038',
        factory: '0x126555dd55a39328F69400d6aE4F782Bd4C34ABb',
        quoter: '0xb1E835Dc2785b52265711e17fCCb0fd018226a6e',
    }],
    [Network.BTTC, {
        router: '0xe43ca1Dee3F0fc1e2df73A0745674545F11A59F5',
        factory: '0xBBDe1d67297329148Fe1ED5e6B00114842728e65',
        quoter: '0x0389879e0156033202C44BF784ac18fC02edeE4f',
    }],
    [Network.Celo, {
        router: '',
        factory: '0x93395129bd3fcf49d95730D3C2737c17990fF328',
        quoter: '',
    }],
    [Network.Core, {
        router: '0x734583f62Bb6ACe3c9bA9bd5A53143CA2Ce8C55A',
        factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
        quoter: '0x640129e6b5C31B3b12640A5b39FECdCa9F81C640',
    }],
    [Network.Ethereum, {
        router: '0x2E6cd2d30aa43f40aa81619ff4b6E0a41479B13F',
        factory: '0xbACEB8eC6b9355Dfc0269C18bac9d6E2Bdc29C4F',
        quoter: '0x64e8802FE490fa7cc61d3463958199161Bb608A7',
    }],
    [Network.Fantom, {
        router: '',
        factory: '0x7770978eED668a3ba661d51a773d3a992Fc9DDCB',
        quoter: '0xb1E835Dc2785b52265711e17fCCb0fd018226a6e',
    }],
    [Network.Filecoin, {
        router: '0x0389879e0156033202C44BF784ac18fC02edeE4f',
        factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
        quoter: '0x9B3fF703FA9C8B467F5886d7b61E61ba07a9b51c',
    }],
    [Network.Fuse, {
        router: '',
        factory: '0x1b9d177CcdeA3c79B6c8F40761fc8Dc9d0500EAa',
        quoter: '0xb1E835Dc2785b52265711e17fCCb0fd018226a6e',
    }],
    [Network.Gnosis, {
        router: '0x4F54dd2F4f30347d841b7783aD08c050d8410a9d',
        factory: '0xf78031CBCA409F2FB6876BDFDBc1b2df24cF9bEf',
        quoter: '0xb1E835Dc2785b52265711e17fCCb0fd018226a6e',
    }],
    [Network.Haqq, {
        router: '0xFB7eF66a7e61224DD6FcD0D7d9C3be5C8B049b9f',
        factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
        quoter: '0x734583f62Bb6ACe3c9bA9bd5A53143CA2Ce8C55A',
    }],
    [Network.Hemi, {
        router: '0x33d91116e0370970444B0281AB117e161fEbFcdD',
        factory: '0xCdBCd51a5E8728E0AF4895ce5771b7d17fF71959',
        quoter: '0x1400feFD6F9b897970f00Df6237Ff2B8b27Dc82C',
    }],
    [Network.Katana, {
        router: '0x4e1d81A3E627b9294532e990109e4c21d217376C',
        factory: '0x203e8740894c8955cB8950759876d7E7E45E04c1',
        quoter: '0x92dea23ED1C683940fF1a2f8fE23FE98C5d3041c',
    }],
    [Network.Kava, {
        router: '0xFF51a7C624Eb866917102707F3dA8bFb99Db8692',
        factory: '0x1e9B24073183d5c6B7aE5FB4b8f0b1dd83FDC77a',
        quoter: '0x5AbEdAc449A8301467c3e124B98e7151641F1e56',
    }],
    [Network.Linea, {
        router: '0xb1E835Dc2785b52265711e17fCCb0fd018226a6e',
        factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
        quoter: '0xFB7eF66a7e61224DD6FcD0D7d9C3be5C8B049b9f',
    }],
    [Network.Metis, {
        router: '0x2ABf469074dc0b54d793850807E6eb5Faf2625b1',
        factory: '0x145d82bCa93cCa2AE057D1c6f26245d1b9522E6F',
        quoter: '0xFbc12984689e5f15626Bad03Ad60160Fe98B303C',
    }],
    [Network.Moonbeam, {
        router: '',
        factory: '0x2ecd58F51819E8F8BA08A650BEA04Fc0DEa1d523',
        quoter: '0xb1E835Dc2785b52265711e17fCCb0fd018226a6e',
    }],
    [Network.Moonriver, {
        router: '',
        factory: '0x2F255d3f3C0A3726c6c99E74566c4b18E36E3ce6',
        quoter: '0xb1E835Dc2785b52265711e17fCCb0fd018226a6e',
    }],
    [Network.Optimism, {
        router: '0x8c32Fd078B89Eccb06B40289A539D84A4aA9FDA6',
        factory: '0x9c6522117e2ed1fE5bdb72bb0eD5E3f2bdE7DBe0',
        quoter: '0xb1E835Dc2785b52265711e17fCCb0fd018226a6e',
    }],
    [Network.Polygon, {
        router: '0x0aF89E1620b96170e2a9D0b68fEebb767eD044c3',
        factory: '0x917933899c6a5F8E37F31E19f92CdBFF7e8FF0e2',
        quoter: '0xb1E835Dc2785b52265711e17fCCb0fd018226a6e',
    }],
    [Network.PolygonZkEvm, {
        router: '0xc14Ee6B248787847527e11b8d7Cf257b212f7a9F',
        factory: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
        quoter: '0xb1E835Dc2785b52265711e17fCCb0fd018226a6e',
    }],
    [Network.RootStock, {
        router: '0x1400feFD6F9b897970f00Df6237Ff2B8b27Dc82C',
        factory: '0x46B3fDF7b5CDe91Ac049936bF0bDb12c5d22202e',
        quoter: '0xe43ca1Dee3F0fc1e2df73A0745674545F11A59F5',
    }],
    [Network.Scroll, {
        router: '0x33d91116e0370970444B0281AB117e161fEbFcdD',
        factory: '0x46B3fDF7b5CDe91Ac049936bF0bDb12c5d22202e',
        quoter: '0xe43ca1Dee3F0fc1e2df73A0745674545F11A59F5',
    }],
    [Network.ScaleEuropa, {
        router: '0xd20a95C4470458aa00B1dF11EDA08c12ac29b858',
        factory: '0x51d15889b66A2c919dBbD624d53B47a9E8feC4bB',
        quoter: '0x25281328d69fd3452D16ffAb96E5EdD1c0a0AC43',
    }],
    [Network.Sonic, {
        router: '0x1400feFD6F9b897970f00Df6237Ff2B8b27Dc82C',
        factory: '0x46B3fDF7b5CDe91Ac049936bF0bDb12c5d22202e',
        quoter: '0xe43ca1Dee3F0fc1e2df73A0745674545F11A59F5',
    }],
    [Network.Tatara, {
        router: '0x1f2FCf1d036b375b384012e61D3AA33F8C256bbE',
        factory: '0x9B3336186a38E1b6c21955d112dbb0343Ee061eE',
        quoter: '0x33d91116e0370970444B0281AB117e161fEbFcdD',
    }],
    [Network.Thundercore, {
        router: '0xc14Ee6B248787847527e11b8d7Cf257b212f7a9F',
        factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
        quoter: '0x49244385bd56f557cE5201d8504C6D7f42Da8EF6',
    }],
    [Network.ZetaChain, {
        router: '0x0389879e0156033202C44BF784ac18fC02edeE4f',
        factory: '0xB45e53277a7e0F1D35f2a77160e91e25507f1763',
        quoter: '0x57bfFa72db682f7eb6C132DAE03FF36bBEB0c459',
    }],
]);
