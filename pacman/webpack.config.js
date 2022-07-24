module.exports = {
  module: {
    rules: [
      {
        test: /\.wav$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
};
