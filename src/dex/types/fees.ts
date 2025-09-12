export const UniswapV3Fees = {
    FEE_0: 100,
    FEE_1: 200,
    FEE_2: 300,
    FEE_3: 400,
    FEE_4: 500,
    FEE_5: 3000,
    FEE_6: 10000,
} as const;
export type UniswapV3Fees = typeof UniswapV3Fees[keyof typeof UniswapV3Fees];

export const AlienbaseV3Fees = {
    FEE_0: 500,
    FEE_1: 3000,
    FEE_2: 10000,
} as const;
export type AlienbaseV3Fees = typeof AlienbaseV3Fees[keyof typeof AlienbaseV3Fees];

export const ThroneV3Fees = {
    FEE_0: 100,
    FEE_1: 500,
    FEE_2: 2500,
    FEE_3: 10000,
} as const;
export type ThroneV3Fees = typeof ThroneV3Fees[keyof typeof ThroneV3Fees];

export const WagmiV3Fees = {
    FEE_0: 0,
    FEE_1: 500,
    FEE_2: 1500,
    FEE_3: 3000,
    FEE_4: 10000,
} as const;
export type WagmiV3Fees = typeof WagmiV3Fees[keyof typeof WagmiV3Fees];

export const HorizonDexV3Fees = {
    FEE_0: 8,
    FEE_1: 300,
} as const;
export type HorizonDexV3Fees = typeof HorizonDexV3Fees[keyof typeof HorizonDexV3Fees];

export const SwapBasedAmmV3Fees = {
    FEE_0: 35,
    FEE_1: 40,
    FEE_2: 80,
    FEE_3: 500,
    FEE_4: 2500,
    FEE_5: 10000,
} as const;
export type SwapBasedAmmV3Fees = typeof SwapBasedAmmV3Fees[keyof typeof SwapBasedAmmV3Fees];