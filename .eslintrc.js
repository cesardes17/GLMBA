module.exports = {
  plugins: ["react", "react-native", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "prettier/prettier": "error",
  },
};
