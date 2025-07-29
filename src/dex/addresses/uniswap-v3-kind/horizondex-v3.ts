import { Network } from "../../../types/network";


// https://docs.horizondex.io/resources/contracts
export const horizonDexV3Addresses = new Map<Network, {router: string, factory: string, quoter: string}>([
    [Network.Linea, {
        router: '0x272E156Df8DA513C69cB41cC7A99185D53F926Bb',
        factory: '0x9Fe607e5dCd0Ea318dBB4D8a7B04fa553d6cB2c5',
        quoter: '0x07AceD5690e09935b1c0e6E88B772d9440F64718',
    }],
    [Network.Base, {
        router: '0x99AEC509174Cbf06F8F7E15dDEeB7bcC32363827',
        factory: '0x07AceD5690e09935b1c0e6E88B772d9440F64718',
        quoter: '0x94ddDe405A00180891eD79Dc1147F0d841c30D73',
    }],
]);
