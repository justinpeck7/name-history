/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  sassOptions: {
    prependData: `@use 'styles/colors' as *;`,
  },
};
