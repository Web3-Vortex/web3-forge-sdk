import { expect } from "chai";
import { cutEncodedDataParams } from "../../src/utils/cut-encoded-data-params";
import { splitEncodedData } from "../../src/utils/split-encoded-data";

describe("cutEncodedDataParams", function () {
    // Valid swap data from Uniswap v2
    // Transaction link https://sepolia.etherscan.io/tx/0xf913e3da19b70952ae07a95704b4b0c5baf9447ebbe2adae2ce9bb1114608fd4
    const VALID_DATA = "0x7ff36ab500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000119837d6c9c110755412d85775bf5e6f9434bf610000000000000000000000000000000000000000000000000000000068812c9100000000000000000000000000000000000000000000000000000000000000020000000000000000000000007b79995e5f793a07bc00c21412e50ecae098e7f9000000000000000000000000a77f517cdfa3d6980bf88c0c29a8fa4a56f3ef1e";
    const { functionSelector, chunks } = splitEncodedData(VALID_DATA);

    it("should split data when cutting a single chunk", function () {
        const result = cutEncodedDataParams(VALID_DATA, 2); // Вырезаем третий чанк
        
        const topHalfChunks = chunks.slice(0, 2);
        const bottomHalfChunks = chunks.slice(3);
        
        const expectedTopHalf = functionSelector + topHalfChunks.map(c => c.slice(2)).join('');
        const expectedBottomHalf = '0x' + bottomHalfChunks.map(c => c.slice(2)).join('');
        
        expect(result.topHalf).to.equal(expectedTopHalf);
        expect(result.bottomHalf).to.equal(expectedBottomHalf);
    });

    it("should split data when cutting a range of chunks", function () {
        const result = cutEncodedDataParams(VALID_DATA, 1, 4); // Вырезаем с 1 по 4
        
        const topHalfChunks = chunks.slice(0, 1);
        const bottomHalfChunks = chunks.slice(5);
        
        const expectedTopHalf = functionSelector + topHalfChunks.map(c => c.slice(2)).join('');
        const expectedBottomHalf = '0x' + bottomHalfChunks.map(c => c.slice(2)).join('');
        
        expect(result.topHalf).to.equal(expectedTopHalf);
        expect(result.bottomHalf).to.equal(expectedBottomHalf);
    });

    it("should handle out-of-bounds index by cutting the last chunk", function () {
        const result = cutEncodedDataParams(VALID_DATA, 100); // Индекс за пределами, вырезаем последний
        
        const topHalfChunks = chunks.slice(0, chunks.length - 1);
        
        const expectedTopHalf = functionSelector + topHalfChunks.map(c => c.slice(2)).join('');
        
        expect(result.topHalf).to.equal(expectedTopHalf);
        expect(result.bottomHalf).to.equal('0x');
    });

    it("should return only functionSelector if no chunks exist", function () {
        const shortData = "0x12345678";
        const result = cutEncodedDataParams(shortData, 0);

        expect(result.topHalf).to.equal(shortData);
        expect(result.bottomHalf).to.equal('0x');
    });
});