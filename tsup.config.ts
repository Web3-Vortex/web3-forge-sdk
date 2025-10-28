import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    dts: true,
    sourcemap: false,
    minify: true,
    clean: true,
    treeshake: true,
    splitting: true,
    format: ["esm", "cjs"],
    target: "es2022",
    platform: "neutral",
    outDir: "dist",
    tsconfig: "tsconfig.build.json",
    external: [
        "ethers",
        "hardhat",
        "@nomicfoundation/hardhat-toolbox"
    ],
    define: {
        "process.env.NODE_ENV": JSON.stringify("production"),
        "__DEV__": "false",
    },
    terserOptions: {
        ecma: 2020,
        compress: {
            passes: 3,
            pure_getters: true,
            unsafe: true,
            drop_console: true,
            drop_debugger: true,
            dead_code: true,
            module: true,
        },
        mangle: {
            toplevel: true,
            // Если хотите ужать приватные свойства, можно, НО легко сломать API:
            // properties: { regex: /^_/ }
        },
        format: { comments: false },
    },

    esbuildOptions(options) {
        options.drop = ["console", "debugger"];
        options.legalComments = "none";
        options.metafile = true;
        options.sourcesContent = false;
    },
});