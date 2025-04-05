package main

import (
    "gorm.io/gorm"
)

type EventParticipant struct {
    gorm.Model
    EventPId     int    `gorm:"column:eventp_id;primaryKey"`
    EventId      int    `gorm:"column:event_id"`
    UserId       int    `gorm:"column:user_id"`
    EventPCome   bool   `gorm:"column:eventp_come"`
    EventPCert   string `gorm:"column:eventp_cert"`
    EventPCode   string `gorm:"column:eventp_code"`

    Event        Event  `gorm:"foreignKey:EventId"`
    User         User   `gorm:"foreignKey:UserId"`
}
