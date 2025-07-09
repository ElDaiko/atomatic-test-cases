const config = {
  appId: "com.qa-generator.app",
  productName: "QA Generator",
  directories: {
    output: "dist-electron",
  },
  files: [
    "dist/**/*",
    "main.js",
    "package.json",
    "!src/**/*",
    "!*.md",
    "!*.bat",
    "!*.sh",
    "!tsconfig*.json",
    "!vite.config.ts",
    "!eslint.config.js",
  ],
  compression: "maximum",
  npmRebuild: false,
  buildDependenciesFromSource: false,
  nodeGypRebuild: false,

  // Configuración Windows
  win: {
    target: {
      target: "portable",
      arch: ["x64"],
    },
    artifactName: "${productName}-${version}.${ext}",
    requestedExecutionLevel: "asInvoker",
    signAndEditExecutable: false,
    forceCodeSigning: false,
  },

  // Configuración macOS
  mac: {
    target: {
      target: "dmg",
      arch: ["x64"],
    },
    artifactName: "${productName}-${version}-mac.${ext}",
    category: "public.app-category.developer-tools",
  },

  // Configuración Linux
  linux: {
    target: {
      target: "AppImage",
      arch: ["x64"],
    },
    artifactName: "${productName}-${version}-linux.${ext}",
    category: "Development",
  },

  // Filtros para reducir tamaño
  extraFiles: [
    {
      from: "node_modules/electron/dist/locales",
      to: "locales",
      filter: ["en-US.pak", "es.pak"],
    },
  ],
};

module.exports = config;
