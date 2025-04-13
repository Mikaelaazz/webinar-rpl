package main

import (
    "github.com/gofiber/fiber/v2"
)

func local_create_server() *fiber.App {
    app := fiber.New(fiber.Config{
        AppName: "Webinar-RPL Backend",
    })
    return app
}

func local_make_handle(app *fiber.App) {
    api := app.Group("/api")

    api.Get("/info", func (c *fiber.Ctx) error {
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
