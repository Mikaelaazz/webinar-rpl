package main

import (
    "fmt"
    "log"
    "time"
    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
)

func main() {
    // Open a connection to SQLite database
    db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
    if err != nil {
        log.Fatal("failed to connect database:", err)
    }

    // Auto migrate the schema (creates tables)
    err = db.AutoMigrate(&User{})
    if err != nil {
        log.Fatal("failed to migrate database:", err)
    }

    // Create a user
    db.Create(&User{
        UserFullName: "John Doe",
        UserPassword: "111",
        UserEmail: "example@example.com",
        UserInstance: "Menganggur",
        UserRole: Admin,
        UserCreatedAt: time.Now(),
        UserPicture: "",
    })

    // Read a user
    var user User
    db.First(&user, "user_full_name= ?", "John Doe")
    fmt.Printf("Found user: %v\n", user)

    // Update a user
    // db.Model(&user).Update("Age", 30)
    // // Or update multiple fields
    // db.Model(&user).Updates(User{
    //     Name: "John Smith",
    //     Age:  31,
    // })

    // Read the updated user
    // var updatedUser User
    // db.First(&updatedUser, user.ID)
    // fmt.Printf("Updated user: %v\n", updatedUser)
    //
    // // Delete a user
    // db.Delete(&user)
    //
    // // Verify deletion
    // var count int64
    // db.Model(&User{}).Where("email = ?", "john@example.com").Count(&count)
    // fmt.Printf("Users with email john@example.com: %d\n", count)
}
