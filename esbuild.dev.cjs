const { spawn } = require('child_process');
const esbuild = require('esbuild');

const outfile = 'dist/index.js'

let server;
const startServer = () => {
    if (server) server.kill('SIGINT')
    server = spawn('node', [outfile], { stdio: 'inherit' })
}

const nodemonPlugin = {
    name: 'nodemonPlugin',
    setup(build) {
        build.onEnd(() => {
            startServer();
        })
    }
};

(async () => {
    const ctx = await esbuild.context({
        entryPoints: ['src/index.ts'],
        bundle: true,
        minify: true,
        platform: 'node',
        target: 'node18',
        packages: 'external',
        outfile: outfile,
        logLevel: 'info',
        plugins: [nodemonPlugin]
    })

    await ctx.watch()
})();
