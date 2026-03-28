import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { angularOutputTarget, type ValueAccessorConfig } from '@stencil/angular-output-target';

const angularValueAccessorBindings: ValueAccessorConfig[] = [];

export const config: Config = {
  namespace: 'ui-core',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    reactOutputTarget({
      outDir: '../react-wrapper/src/components/stencil-generated',
      stencilPackageName: '@search-now/ui-core',
    }),
    angularOutputTarget({
      componentCorePackage: '@search-now/ui-core',
      directivesProxyFile: '../angular-wrapper/src/directives/proxies.ts',
      directivesArrayFile: '../angular-wrapper/src/directives/index.ts',
      valueAccessorConfigs: [],
      outputType: 'standalone',
    }),
    { type: 'dist-custom-elements' },
    { type: 'dist' },
  ],
};
