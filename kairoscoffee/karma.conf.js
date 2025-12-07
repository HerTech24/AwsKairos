module.exports = function (config) {
  config.set({
    frameworks: ["jasmine", "webpack"],

    files: [
      "src/test-setup.js", 
      "src/tests/**/*.spec.js"
    ],

    preprocessors: {
      "src/test-setup.js": ["webpack"],
      "src/tests/**/*.spec.js": ["webpack", "coverage"], // Coverage aquí para reportar
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
              // 🔥 SOLUCIÓN AQUÍ: Forzamos la configuración de Babel
              // para asegurar que el plugin de cobertura 'istanbul' se cargue siempre.
              options: {
                presets: [
                  "@babel/preset-env",
                  ["@babel/preset-react", { "runtime": "automatic" }]
                ],
                plugins: ["babel-plugin-istanbul"] 
              }
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

    reporters: ["spec", "coverage"],

    coverageReporter: {
      dir: "coverage/",
      reporters: [
        { type: "html", subdir: "html" },
        { type: "text-summary" } // Reporte en terminal
      ],
      // IMPORTANTE: Excluir tests para que no cuenten en el % final
      exclude: [
          "src/tests/**",
          "src/test-setup.js"
      ],
      check: {
        global: {
          statements: 80,
          branches: 800, 
          functions: 80,
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

    plugins: [
      "karma-webpack",
      "karma-jasmine",
      "karma-chrome-launcher",
      "karma-spec-reporter",
      "karma-coverage",
    ],
  });
};