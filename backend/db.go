package main
import (
    "log"
    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
)

func open_db() (*gorm.DB, error) {
    db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
    if err != nil {
        return nil, err
    }
    return db, nil
}

func migrate_db(db *gorm.DB) error {
    err := db.AutoMigrate(&User{})
    if err != nil {
        log.Fatal("failed to migrate database:", err)
        return err
    }
    return nil
}
