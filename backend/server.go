package main

import (
    "github.com/gofiber/fiber/v2"
    "github.com/gofiber/fiber/v2/middleware/session"
    "github.com/gofiber/storage/sqlite3"
)

type Backend struct {
    app *fiber.App
    store *session.Store
}

func local_create_server(dbFile string) *Backend {
    app := fiber.New(fiber.Config{
        AppName: "Webinar-RPL Backend",
    })
    storage := sqlite3.New(sqlite3.Config{
        Database: dbFile,
    })
    store := session.New(session.Config{
        Storage: storage,
    })

    return &Backend{
        app:   app,
        store: store,
    }
}

func local_make_handle(backend *Backend) {
    app := backend.app
    api := app.Group("/api")

    api.Get("info", func (c *fiber.Ctx) error {
        return c.JSON(fiber.Map{
            "success": true,
            "message": "Welcome to the Go Fiber API",
            "version": "1.0.0",
        })
    })

    app.Get("/", func(c *fiber.Ctx) error {
        return c.SendString("Server is running. Try /api/info")
    })
}
