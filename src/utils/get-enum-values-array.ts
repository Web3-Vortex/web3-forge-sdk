export function getEnumValuesArray<E extends Record<string, string | number>>(
    e: E,
): (E[keyof E])[] {
    return Object.values(e).filter(
        (v) =>
            typeof v === "number" ||
            !Object.prototype.hasOwnProperty.call(e, v as string)
    ) as (E[keyof E])[];
}