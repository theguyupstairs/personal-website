package database

import (
	"database/sql"

	_ "modernc.org/sqlite"
)

func New(path string) (*sql.DB, error) {
	return sql.Open("sqlite", path)
}