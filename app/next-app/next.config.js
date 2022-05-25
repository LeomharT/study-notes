/** @type {import('next').NextConfig} */
module.exports = {
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },
    images: {
        disableStaticImages: true
    },
    webpack: (config, options) =>
    {
        config.module.rules.push({
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: 'file-loader',
            options: {
                // outputPath: 'static/fonts',
                outputPath: '../public/assets/fonts',
                publicPath: '/assets/fonts',
            },
        });
        config.module.rules.push({
            test: /\.(png|jpe?g|svg|ico|webp)$/,
            loader: 'file-loader',
            options: {
                // publicPath: `/_next/static/`,
                // outputPath: `../static/`,
                // name: 'assets/images/[name].[ext]',

                outputPath: '../public/assets/images',
                publicPath: '/assets/images',
                // name: '[name].[ext]?[contenthash]',
            },
        });
        config.module.rules.push({
            test: /apple-touch-icon\.(png)$/i,
            loader: 'file-loader',
            options: {

                outputPath: '../public/images/email',
                publicPath: '/assets/images',
                name: '[name].[ext]?[contenthash]',
            },
        });
        config.module.rules.push({
            test: /\.(mov|mp4)$/,
            loader: 'file-loader',
            options: {
                // publicPath: `/_next/static/`,
                // outputPath: `../static/`,
                // name: 'assets/images/[name].[ext]',

                outputPath: '../public/assets/videos',
                publicPath: '/assets/videos',
                name: 'videos/[name].[ext]',
            },
        });

        return config;
    },
};
