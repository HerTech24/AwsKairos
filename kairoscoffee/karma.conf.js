// karma.conf.js
module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],

    // ✅ CORRECCIÓN: Carga solo el setup y los archivos de test.
    // Webpack se encargará de importar los componentes que esos tests necesiten.
    files: [
      "src/tests/test-setup.js", // Carga la configuración de Jasmine primero
      "src/tests/**/*.test.js"  // Carga todos los archivos de test
    ],

    exclude: [],

    // ✅ CORRECCIÓN: Aplica webpack solo a los archivos de entrada
    preprocessors: {
      "src/tests/test-setup.js": ["webpack"],
      "src/tests/**/*.test.js": ["webpack"]
    },

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
                presets: ["@babel/preset-env", "@babel/preset-react"],
                plugins: ["istanbul"] // Necesario para 'karma-coverage'
              }
            }
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
          },
          {
            test: /\.(png|jpg|jpeg|gif|svg)$/i,
            type: "asset/resource"
          }
        ]
      },
      resolve: {
        extensions: [".js", ".jsx"]
      }
    },

    webpackMiddleware: {
      noInfo: true,
      stats: "errors-only"
    },

    reporters: ["spec", "coverage"],

    coverageReporter: {
      dir: "coverage",
      reporters: [
        { type: "html", subdir: "html" },
        { type: "text-summary" },
        { type: "lcov", subdir: "lcov" }
      ]
    },

    browsers: ["ChromeHeadless"],

    customLaunchers: {
      ChromeHeadlessCI: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox", "--disable-gpu"]
      }
    },

    singleRun: true, // Lo cambié a true para que coincida con tu script "test"
    autoWatch: false,
    concurrency: Infinity,
    logLevel: config.LOG_INFO,

    plugins: [
      "karma-webpack",
      "karma-jasmine",
      "karma-chrome-launcher",
      "karma-coverage",
      "karma-spec-reporter"
    ]
  });
};