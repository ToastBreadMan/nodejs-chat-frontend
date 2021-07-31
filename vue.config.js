module.exports = {
    outputDir: "../nodejs-chat-backend/static",
    devServer: {
        proxy: 'http://localhost:8000'
    }
}