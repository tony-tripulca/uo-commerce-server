module.exports = {
  apps: [
    {
      name: "UoCommerceServer",
      namespace: "uo-commerce-server",
      script: "./src/index.js",
      watch: ["./src", "./src/*.js"],
      output: "./logs/out.log",
      error: "./logs/error.log",
    },
  ],
};
