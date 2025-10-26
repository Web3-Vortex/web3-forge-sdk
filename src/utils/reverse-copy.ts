export function reverseCopy<T>(arr: readonly T[]): T[] {
    const result: T[] = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        const v = arr[i];
        if (v !== undefined) result.push(v);
    }
    return result;
}