const http = require("http")
const app = require("./app")

const PORT = process.env.PORT || 3000

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`TurboPay API running on port ${PORT}`)
})

process.on("SIGINT", shutdown)
process.on("SIGTERM", shutdown)

function shutdown() {
  console.log("Shutting down server...")

  server.close(() => {
    console.log("HTTP server closed")
    process.exit(0)
  })
}