namespace chunk {
    export function getChunkNumber(chunkSize: number, itemsCount: number, maxChunks: number = 50): number {
        const chunks = Math.ceil(itemsCount / chunkSize);
        return chunks > maxChunks ? maxChunks : chunks;
    }


    export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    }

    export function processInChunks<T>(
        items: T[],
        chunkSize: number,
        processor: (item: T, index: number) => any
    ): any[] {
        const chunks = chunkArray(items, chunkSize);
        const results: any[] = [];
    
        // Обрабатываем каждый чанк последовательно
        for (const chunk of chunks) {
            const chunkResults = chunk.map((item, index) => processor(item, index));
            results.push(...chunkResults);
        }
    
        return results;
    }
    
    export async function processInChunksAsync<T>(
        items: T[],
        chunkSize: number,
        processor: (item: T, index: number) => any,
        awaitTime: number = 0,
    ): Promise<any[]> {
        const chunks = chunkArray(items, chunkSize);
        const results: any[] = [];
    
        // Обрабатываем каждый чанк последовательно
        for (const chunk of chunks) {
            const chunkResults = await Promise.all(
                chunk.map((item, index) => processor(item, index))
            );
            results.push(...chunkResults);

            if (awaitTime > 0 && chunk !== chunks[chunks.length - 1]) {
                await new Promise<void>(r => setTimeout(r, awaitTime));
            }
        }
    
        return results;
    }
}

export default chunk;