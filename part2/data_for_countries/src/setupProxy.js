const proxy = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(proxy.createProxyMiddleware('/countryProxy', {
        pathRewrite: {
            '^/countryProxy/': '/'
        },
        target: 'https://restcountries.eu',
        changeOrigin: true,
        secure: false
    }))

    app.use(proxy.createProxyMiddleware('/weatherProxy', {
        pathRewrite: {
            '^/weatherProxy/': '/'
        },
        target: 'https://www.metaweather.com',
        changeOrigin: true,
        secure: false
    }))
}