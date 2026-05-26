import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    rules: {
      // Content-heavy marketing site — plain quotes in JSX are intentional
      "react/no-unescaped-entities": "off",
      // Downgrade noisy Next.js warnings to warn so they don't block CI
      "@next/next/no-img-element": "warn",
      "@next/next/no-page-custom-font": "warn",
      // Synchronous setState in effect to reset data before async fetch is valid here
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];

export default eslintConfig;
