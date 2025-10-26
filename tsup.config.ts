import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    dts: true,
    sourcemap: true,
    minify: true,
    clean: true,
    format: ["esm", "cjs"],
    target: "es2020",
    treeshake: true,
    platform: "neutral",
    outDir: "dist",
    tsconfig: "tsconfig.build.json",
    external: ["ethers", "hardhat", "@nomicfoundation/hardhat-toolbox"]
});