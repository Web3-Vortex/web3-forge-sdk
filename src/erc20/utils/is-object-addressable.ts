import type { IAddressable } from "../../types/IAddressable";

export function isObjectAddressable(object: any): object is IAddressable {
    return typeof object === 'object' && object !== null && 'address' in object && typeof object.address === 'string';
}