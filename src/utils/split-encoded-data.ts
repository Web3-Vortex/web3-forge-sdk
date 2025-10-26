/**
 * Разбирает строку с закодированными данными вызова контракта.
 *
 * Эта функция принимает шестнадцатеричную строку, начинающуюся с '0x',
 * и разделяет ее на селектор функции и чанки данных.
 *
 * @example
 * const data = '0x7ff36ab50000000000000000000000000000000000000000000000000000000000000001';
 * const result = splitEncodedData(data);
 * // result.functionSelector будет '0x7ff36ab5'
 * // result.chunks будет ['0x0000000000000000000000000000000000000000000000000000000000000001']
 *
 * // Перед разбором функция выполняет валидацию:
 * // 1. Проверяет, что строка начинается с префикса '0x'.
 * // 2. Убеждается, что все символы после префикса являются валидными
 * //    шестнадцатеричными символами (0-9, a-f, A-F).
 * // 3. Проверяет, что длина данных после селектора функции (первые 10 символов)
 * //    кратна 64, что соответствует стандартной длине параметров в EVM.
 *
 * @description В случае ошибки валидации, функция выбрасывает исключение с подробным
 * сообщением, указывающим на некорректные символы или неверную длину.
 *
 * @param data - Входная шестнадцатеричная строка, представляющая закодированные данные.
 * @returns Объект, содержащий:
 *          - `original`: исходная строка данных.
 *          - `functionSelector`: первые 10 символов данных (включая '0x'),
 *            которые представляют селектор функции.
 *          - `chunks`: массив строк, представляющий остальные данные,
 *            разделенные на чанки по 64 символа.
 * @throws {Error} Если данные не начинаются с '0x', содержат
 *                 недопустимые шестнадцатеричные символы, или имеют
 *                 некорректную длину.
 */
export function splitEncodedData(data: string): {
    original: string,
    functionSelector: string,
    chunks: string[],
} {
    if (!data.startsWith('0x')) {
        throw new Error("Invalid data format: string must start with '0x'.");
    }
    if (data.length < 3) {
        throw new Error("Data is too small");
    }

    const hexPart = data.slice(2);
    const invalidCharIndices: number[] = [];
    
    for (let i = 0; i < hexPart.length; i++) {
        const char: string = hexPart[i]!;
        if (!/^[0-9a-fA-F]$/.test(char)) {
            invalidCharIndices.push(i + 2); // +2 для учета префикса '0x'
        }
    }

    if (invalidCharIndices.length > 0) {
        let pointerLine = '';
        for (let i = 0; i < data.length; i++) {
            if (invalidCharIndices.includes(i)) {
                pointerLine += '^';
            } else {
                pointerLine += ' ';
            }
        }
        const errorMessage = `Invalid hexadecimal characters found:\n${data}\n${pointerLine}`;
        throw new Error(errorMessage);
    }
    
    const functionSelector = data.slice(0, 10);
    const dataWithoutFunctionSelector = data.slice(10);
    const chunkSize = 64;

    if (dataWithoutFunctionSelector.length % chunkSize !== 0) {
        throw new Error(`Invalid data length: the data part after the function selector must be a multiple of ${chunkSize}.`);
    }

    const chunks: string[] = [];
    
    for (let i = 0; i < dataWithoutFunctionSelector.length; i += chunkSize) {
        chunks.push('0x' + dataWithoutFunctionSelector.slice(i, i + chunkSize));
    }
    
    return {
        original: data,
        functionSelector,
        chunks,
    };
}