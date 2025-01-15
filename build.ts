import { build, BuildOptions, BuildResult, Message } from 'esbuild';
import copy from 'esbuild-plugin-copy';

(async () => {
  const buildOptions: BuildOptions = {
    entryPoints: ['src/index.ts'],
    outdir: './dist',
    bundle: true,
    minify: true,
    platform: 'node',
    plugins: [
      copy({
        resolveFrom: 'cwd',
        assets: {
          from: ['./src/views/**/*'],
          to: ['./dist/views'],
        }
      })
    ],
  };
  const { warnings, errors }: BuildResult = await build(buildOptions);

  logResult(warnings, errors);
})();

function logResult(warnings: Message[], errors: Message[]) {
  console.log('--------------');
  console.log('Build complete');
  if (warnings.length) console.log('Warnings: ', warnings);
  if (errors.length) console.log('Errors: ', errors);
  console.log('--------------');
}
