package main

import (
    l "log"
    f "fmt"
    "os"
)

func main() {
    // DO THE DB STUFF
    db, err := open_db()
    if err != nil {
        l.Fatal("ERR: Failed to open the db.")
        return
    }
    err = migrate_db(db)
    if err != nil {
        l.Fatal("ERR: Failed to mirgrate the db.")
        return
    }
    f.Fprint(os.Stderr, "INFO: DB init task completed successfully.")

    // DO THE SERVER STUFF
    app := local_create_server()
    local_make_handle(app)
    if err := app.Listen(":3000"); err != nil {
        l.Fatal("ERR: Server failed to start: ", err)
    }
}
