/**
 * karma.conf.js
 * Configuración 100% Karma + Jasmine para React 18 + Babel + Auth0
 */

module.exports = function (config) {
  config.set({
    // Frameworks base
    frameworks: ["jasmine", "webpack"],

    files: [
      'src/setupTests.js',
      'src/tests/**/*.spec.js',
      'src/tests/**/*.spec.jsx'
    ],

    preprocessors: {
      'src/setupTests.js': ['webpack'],
      'src/tests/**/*.spec.js': ['webpack'],
      'src/tests/**/*.spec.jsx': ['webpack']
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
        fallback: {
          // Evita errores con dependencias Auth0 o Node internals
          fs: false,
          path: false,
          os: false,
        },
      },
    },

    // Reporters
    reporters: ["spec", "coverage"],

    coverageReporter: {
      dir: "coverage/",
      reporters: [
        { type: "html", subdir: "html" },
        { type: "lcov", subdir: "lcov" },
        { type: "text-summary" },
      ],
      exclude: [
        "src/tests",
        "src/test-setup.js",
        "src/setupTests.js",
      ],
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
