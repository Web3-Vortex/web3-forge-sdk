/** Аргумент функции, события или конструктора */
export interface AbiParameter {
    name?: string;
    type: string;
    internalType?: string;
    components?: AbiParameter[];
    indexed?: boolean;
}

/** Описание функции контракта */
export interface AbiFunction {
    type: "function";
    name: string;
    constant?: boolean;
    payable?: boolean;
    stateMutability?: "pure" | "view" | "nonpayable" | "payable";
    inputs: AbiParameter[];
    outputs: AbiParameter[];
}

/** Описание события */
export interface AbiEvent {
    type: "event";
    name: string;
    anonymous?: boolean;
    inputs: AbiParameter[];
}

/** Конструктор контракта */
export interface AbiConstructor {
    type: "constructor";
    inputs: AbiParameter[];
    stateMutability?: "nonpayable" | "payable";
}

/** fallback и receive функции */
export interface AbiFallback {
    type: "fallback" | "receive";
    payable?: boolean;
    stateMutability?: "payable" | "nonpayable";
}

/** Все допустимые элементы ABI */
export type AbiItem =
    | AbiFunction
    | AbiEvent
    | AbiConstructor
    | AbiFallback;

/** Основной тип ABI (массив элементов) */
export type ABI = AbiItem[];
