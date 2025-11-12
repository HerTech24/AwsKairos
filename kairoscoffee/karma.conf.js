module.exports = function (config) {
  config.set({
    // Frameworks principales
    frameworks: ["jasmine", "webpack"],

    // Archivos de prueba (Setup primero, luego los tests)
        files: [
      "src/test-setup.js", 
      "src/tests/**/*.spec.js"
      ],

    // Preprocesamiento: Webpack para el setup y los tests
    preprocessors: {
      "src/test-setup.js": ["webpack"],
      "src/tests/**/*.spec.js": ["webpack", "coverage"],
    },

    // Configuración Webpack para transformar y mockear entorno reactivo
    webpack: {
      mode: "development",
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              // Opciones de Babel eliminadas de aquí.
              // Webpack usará automáticamente tu archivo .babelrc
            },
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.(png|jpg|jpeg|gif|svg)$/i,
            type: "asset/resource",
          },
        ],
      },
      resolve: {
        extensions: [".js", ".jsx"],
      },
    },

    // Reporteadores
    reporters: ["spec", "coverage"],

    coverageReporter: {
      dir: "coverage/",
      reporters: [
        { type: "html", subdir: "html" },
        { type: "lcov", subdir: "lcov" },
        { type: "text-summary" }
      ],
      // Excluir los archivos de test y setup del reporte de cobertura
      exclude: [
          "src/tests",
          "src/test-setup.js"
      ],

      check: {
        global: {
          statements: 100,
          branches: 50,
          functions: 100,
          lines: 100
        }
      }

    },
    
    browsers: ["ChromeHeadless"],

    singleRun: true,
    colors: true,
    logLevel: config.LOG_INFO,

    client: {
      jasmine: {
        random: false,
        timeoutInterval: 10000,
      },
      clearContext: false,
    },

    specReporter: {
      suppressErrorSummary: false,
      suppressFailed: false,
      suppressPassed: false,
      showSpecTiming: true,
    },

    // Plugins necesarios (estaban bien)
    plugins: [
      "karma-webpack",
      "karma-jasmine",
      "karma-chrome-launcher",
      "karma-spec-reporter",
      "karma-coverage",
    ],
  });
};