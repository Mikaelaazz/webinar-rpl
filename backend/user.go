package main

import (
    "time"
    "gorm.io/gorm"
)

type UserRoleEnum string

const (
    Admin UserRoleEnum = "admin"
    NUser UserRoleEnum = "user"
)

type User struct {
    gorm.Model
    UserId         int          `gorm:"column:user_id;primaryKey"`
    UserFullName   string       `gorm:"column:user_full_name"`
    UserPassword   string       `gorm:"column:user_password"`
    UserEmail      string       `gorm:"column:user_email"`
    UserInstance   string       `gorm:"column:user_instance"`
    UserRole       UserRoleEnum `gorm:"column:user_role"`
    UserCreatedAt  time.Time    `gorm:"column:user_created_at;type:datetime"`
    UserPicture    string       `gorm:"column:user_picture"`
    // Relationships - add these fields
    EventParticipants []EventParticipant `gorm:"foreignKey:UserId"`
    OTPs              []OTP              `gorm:"foreignKey:UserId"`
}
