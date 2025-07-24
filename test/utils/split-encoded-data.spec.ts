import { expect } from "chai";
import { splitEncodedData } from "../../src/utils/split-encoded-data";

describe("splitEncodedData with validation", function () {
    // Valid swap data from Uniswap v2
    // Transaction link https://sepolia.etherscan.io/tx/0xf913e3da19b70952ae07a95704b4b0c5baf9447ebbe2adae2ce9bb1114608fd4
    const VALID_DATA = "0x7ff36ab500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000119837d6c9c110755412d85775bf5e6f9434bf610000000000000000000000000000000000000000000000000000000068812c9100000000000000000000000000000000000000000000000000000000000000020000000000000000000000007b79995e5f793a07bc00c21412e50ecae098e7f9000000000000000000000000a77f517cdfa3d6980bf88c0c29a8fa4a56f3ef1e";
    const INVALID_DATA = "0x7ff36ab5000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000119837d6c9c110755412d85775bf5e6f9434bf610000000000000000000000000000000000000000000000000000000068812c9100000000000000000000000000000000000000000000000000000000000000020000000000000000000000007b79995e5f793a07bc00c21412e50ecae098e7f9000000000000000000000000a77f517cdfa3d6980bf88c0c29a8fa4a56f3ef1e";

    it("should process valid data correctly", function () {
        const { original, functionSelector, chunks } = splitEncodedData(VALID_DATA);

        expect(functionSelector).to.equal(VALID_DATA.slice(0, 10));
        expect(chunks.length).to.be.equal(7);
        expect(original).to.be.equal(VALID_DATA);
    });

    it("should throw an error if data does not start with '0x'", function () {
        const invalidData = "aa" + "a".repeat(126);
        expect(() => splitEncodedData(invalidData)).to.throw("Invalid data format: string must start with '0x'.");
    });

    it("should throw an error with a visual pointer to invalid characters", function () {
        const invalidData = "0x123g567h90";
        const expectedErrorMessage = `Invalid hexadecimal characters found:\n${invalidData}\n     ^   ^  `;
        expect(() => splitEncodedData(invalidData)).to.throw(expectedErrorMessage);
    });

    it("should identify multiple invalid characters", function () {
        const dataWithMultipleErrors = "0x123z456y789x";
        const expectedErrorMessage = `Invalid hexadecimal characters found:\n${dataWithMultipleErrors}\n     ^   ^   ^`;
        expect(() => splitEncodedData(dataWithMultipleErrors)).to.throw(expectedErrorMessage);
    });

    it("should throw an error for data with invalid length", function () {
        const invalidLengthData = VALID_DATA + "a".repeat(10); // Making the length not a multiple of 64
        expect(() => splitEncodedData(invalidLengthData)).to.throw("Invalid data length: the data part after the function selector must be a multiple of 64.");
    });

    it("should not throw an error for data with valid length", function () {
        expect(() => splitEncodedData(VALID_DATA)).to.not.throw();
    });

    it("should throw an error for data with invalid length", function () {
        expect(() => splitEncodedData(INVALID_DATA)).to.throw("Invalid data length: the data part after the function selector must be a multiple of 64.");
    });
});
