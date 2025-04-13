package main

import (
    "fmt"
    "time"
    "log"

    "github.com/gofiber/fiber/v2"
    "github.com/gofiber/fiber/v2/middleware/session"
    "github.com/gofiber/storage/sqlite3"
    "golang.org/x/crypto/bcrypt"
    "gorm.io/gorm"
    "webrpl/table"
)

type Backend struct {
    app   *fiber.App
    store *session.Store
    db    *gorm.DB
}

func appCreateNewServer(dbFile string, db *gorm.DB) *Backend {
    app := fiber.New(fiber.Config{
        AppName: "Webinar-RPL Backend",
    })
    storage := sqlite3.New(sqlite3.Config{
        Database: dbFile,
    })
    store := session.New(session.Config{
        Storage:        storage,
        Expiration:     24 * time.Hour,
        CookieHTTPOnly: true,
        CookieSecure:   false,
        CookiePath:     "/",
    })

    return &Backend{
        app:   app,
        store: store,
        db:    db,
    }
}

func appMakeRouteHandler(backend *Backend) {
    app := backend.app
    api_route := app.Group("/api")

    appHandleRegister(backend, api_route)

    app.Get("/", func(c *fiber.Ctx) error {
        return c.SendString("Server is running.")
    })
}

func HashPassword(password string) (string, error) {
    // The cost parameter determines how computationally expensive the hash is to calculate
    // The default is 10, but you can increase it for better security (at the cost of performance)
    hashedBytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
    if err != nil {
        return "", fmt.Errorf("failed to hash password: %w", err)
    }
    return string(hashedBytes), nil
}

func CheckPassword(hashedPassword, plainPassword string) bool {
    err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(plainPassword))
    return err == nil
}

func appHandleRegister(backend *Backend, route fiber.Router) {
    route.Post("register", func(c *fiber.Ctx) error {
        var body struct {
            UserFullName  string `json:"name"`
            UserPassword  string `json:"pass"`
            UserEmail     string `json:"email"`
            UserInstance  string `json:"instance"`
            UserRole      string `json:"role"`
            UserPicture   string `json:"picture"`
        }

        if err := c.BodyParser(&body); err != nil {
            return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
                "success": false,
                "message": "Invalid request body.",
                "error":   err.Error(),
            })
        }

        if body.UserFullName == "" || body.UserPassword == "" || body.UserEmail == "" {
            return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
                "success": false,
                "message": "Name, password and email are required.",
            })
        }

        var existingUser table.User
        result := backend.db.Where("user_email = ?", body.UserEmail).First(&existingUser)
        if result.RowsAffected > 0 {
            return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
                "success": false,
                "message": "User with this email already exists.",
            })
        }

        hashedPassword, err := HashPassword(body.UserPassword)
        if err != nil {
            log.Printf("Password hashing error: %v", err)
            return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
                "success": false,
                "message": "Failed to process password.",
                "error":   err.Error(),
            })
        }

        var userRole table.UserRoleEnum = table.NUser
        if body.UserRole == string(table.Admin) {
            userRole = table.Admin
        }

        newUser := table.User{
            UserFullName:   body.UserFullName,
            UserPassword:   hashedPassword,
            UserEmail:      body.UserEmail,
            UserInstance:   body.UserInstance,
            UserRole:       userRole,
            UserPicture:    body.UserPicture,
            UserCreatedAt:  time.Now(),
        }

        if err := backend.db.Create(&newUser).Error; err != nil {
            log.Printf("Database error: %v", err)
            return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
                "success": false,
                "message": "Failed to create user.",
                "error":   err.Error(),
            })
        }

        sess, err := backend.store.Get(c)
        if err != nil {
            log.Printf("Session error: %v", err)
        } else {
            sess.Set("userId", newUser.UserId)
            sess.Set("userEmail", newUser.UserEmail)
            sess.Set("userRole", newUser.UserRole)
            if err := sess.Save(); err != nil {
                log.Printf("Session save error: %v", err)
            }
        }

        return c.Status(fiber.StatusCreated).JSON(fiber.Map{
            "success":      true,
            "message":      "User registered successfully.",
            "timestamp":    time.Now().UTC().Format("2006-01-02 15:04:05"),
            "userId":       newUser.UserId,
            "userFullName": newUser.UserFullName,
            "userEmail":    newUser.UserEmail,
            "userInstance": newUser.UserInstance,
            "userRole":     newUser.UserRole,
            "userPicture":  newUser.UserPicture,
            "createdAt":    newUser.UserCreatedAt,
        })
    })
}
