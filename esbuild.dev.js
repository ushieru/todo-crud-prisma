import { spawn } from 'child_process'
import esbuild from 'esbuild'

let server;

const startServer = (message) => {
    if (server) server.kill('SIGINT')
    server = spawn('node', ['./dist/index.mjs'], { stdio: 'inherit' })
    console.log(`\n${message}\n`)
}

esbuild.build({
    entryPoints: ['./src/index.ts'],
    watch: { onRebuild: (err) => !err && startServer('Rebuilded') },
    bundle: true,
    minify: true,
    platform: 'node',
    format: 'esm',
    target: ['esnext'],
    external: ['/node_modules/*'],
    outfile: './dist/index.mjs',
})
    .then(() => startServer('Done 🚀'))
    .catch(() => process.exit(1))