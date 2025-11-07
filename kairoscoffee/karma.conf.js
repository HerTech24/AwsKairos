// karma.conf.js
module.exports = function (config) {
  config.set({
    // Frameworks principales
    frameworks: ["jasmine", "webpack"],

    // Archivos de prueba a ejecutar
    files: [
      "src/**/*.spec.js",
      "src/**/*.test.js",
    ],

    // Preprocesamiento con Webpack
    preprocessors: {
      "src/**/*.spec.js": ["webpack", "coverage"],
      "src/**/*.test.js": ["webpack", "coverage"],
    },

    // Configuración de Webpack
    webpack: {
      mode: "development",
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  ["@babel/preset-env", { targets: { esmodules: true } }],
                  ["@babel/preset-react", { runtime: "automatic" }],
                ],
                plugins: ["istanbul"], // Necesario para reportes de cobertura
              },
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

    // Reporteros de resultados
    reporters: ["spec", "coverage"],

    // Configuración de cobertura (karma-coverage)
    coverageReporter: {
      dir: "coverage/",
      reporters: [
        { type: "html", subdir: "html" },
        { type: "lcov", subdir: "lcov" },
        { type: "text-summary" },
      ],
    },

    browsers: ["ChromeHeadless"],

    // Recomendado para CI o pruebas automatizadas
    singleRun: true,

    // Mejor salida visual en consola
    colors: true,
    logLevel: config.LOG_INFO,

    // Configuración adicional de Jasmine
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

    // Plugins necesarios
    plugins: [
      "karma-webpack",
      "karma-jasmine",
      "karma-chrome-launcher",
      "karma-spec-reporter",
      "karma-coverage",
    ],
  });
};
