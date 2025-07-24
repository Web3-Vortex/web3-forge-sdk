import { splitEncodedData } from "./split-encoded-data";


/**
 * Разделяет закодированные данные на две части, вырезая чанки по индексу или диапазону.
 *
 * Эта функция сначала разбирает строку данных, а затем "вырезает"
 * один или несколько чанков. Все, что было до вырезанной части
 * (включая селектор функции), попадает в `topHalf`. Все, что было после,
 * попадает в `bottomHalf`.
 *
 * @param data - Входная шестнадцатеричная строка.
 * @param start - Начальный индекс для вырезания. По умолчанию 0.
 * @param end - Конечный индекс для вырезания. Если end < start, вырезается только
 *              один элемент по индексу start. По умолчанию 0.
 * @returns Объект с полями `topHalf` и `bottomHalf`.
 */
export function cutEncodedDataParams(data: string, start: number = 0, end: number = 0): {
    topHalf: string,
    bottomHalf: string,
} {
    const { functionSelector, chunks } = splitEncodedData(data);

    if (chunks.length === 0) {
        // Если чанков нет, то и вырезать нечего.
        // topHalf будет содержать только селектор функции.
        return {
            topHalf: functionSelector,
            bottomHalf: '0x',
        }
    }

    // "Прижимаем" индексы к границам массива
    const startIndex = Math.max(0, Math.min(start, chunks.length - 1));
    const endIndex = (end < start) ? startIndex : Math.max(0, Math.min(end, chunks.length - 1));

    const leftChunks = chunks.slice(0, startIndex);
    const rightChunks = chunks.slice(endIndex + 1);

    const topHalf = functionSelector + leftChunks.map(chunk => chunk.slice(2)).join('');
    const bottomHalf = '0x' + rightChunks.map(chunk => chunk.slice(2)).join('');

    return {
        topHalf,
        bottomHalf,
    };
}