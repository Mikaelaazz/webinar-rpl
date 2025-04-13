package main

import (
    "time"

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
        Expiration:     24 * time.Hour,
        CookieHTTPOnly: true,
        CookieSecure:   false,
        CookiePath:     "/api",
        CookieName:     "session_id",
    })

    return &Backend{
        app:   app,
        store: store,
    }
}

func local_make_route_handler(backend *Backend) {
    app := backend.app
    api_route := app.Group("/api")

    local_handle_setSessionName(backend, api_route)
    local_handle_getSessionName(backend, api_route)

    app.Get("/", func(c *fiber.Ctx) error {
        return c.SendString("Server is running.")
    })
}

func local_handle_setSessionName(backend *Backend, route fiber.Router) {
    route.Post("/set-session-name", func(c *fiber.Ctx) error {
        var body struct {
            Name string `json:"name"`
        }

        if err := c.BodyParser(&body); err != nil {
            return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
                "success": false,
                "message": "Invalid request body",
                "error": err.Error(),
            })
        }

        sessionData, err := backend.store.Get(c)
        if err != nil {
            return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
                "success": false,
                "message": "Failed to get session",
                "error": err.Error(),
            })
        }

        sessionData.Set("name", body.Name)
        if err := sessionData.Save(); err != nil {
            return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
                "success": false,
                "message": "Failed to save session",
                "error": err.Error(),
            })
        }

        return c.JSON(fiber.Map{
            "success": true,
            "message": "Session created successfully",
            "name": body.Name,
        })
    })
}

func local_handle_getSessionName(backend *Backend, route fiber.Router) {
    route.Get("/get-session-name", func(c *fiber.Ctx) error {
        sessionData, err := backend.store.Get(c)
        if err != nil {
            return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
                "success": false,
                "message": "Failed to get session",
                "error": err.Error(),
            })
        }

        name := sessionData.Get("name")

        return c.JSON(fiber.Map{
            "success": true,
            "name": name,
        })
    })
}
