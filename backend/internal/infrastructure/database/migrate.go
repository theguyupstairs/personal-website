package database

import (
	"database/sql"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"
)

func RunMigrations(db *sql.DB, migrationsDir string) error {
	if _, err := db.Exec(`
		CREATE TABLE IF NOT EXISTS _migrations (
			name TEXT PRIMARY KEY,
			applied_at DATETIME DEFAULT (datetime('now'))
		)
	`); err != nil {
		return fmt.Errorf("create migrations table: %w", err)
	}

	entries, err := os.ReadDir(migrationsDir)
	if err != nil {
		return fmt.Errorf("read migrations dir: %w", err)
	}

	var files []string
	for _, e := range entries {
		if !e.IsDir() && strings.HasSuffix(e.Name(), ".up.sql") {
			files = append(files, e.Name())
		}
	}
	sort.Strings(files)

	for _, name := range files {
		var count int
		db.QueryRow(`SELECT COUNT(*) FROM _migrations WHERE name = ?`, name).Scan(&count)
		if count > 0 {
			continue
		}

		sql, err := os.ReadFile(filepath.Join(migrationsDir, name))
		if err != nil {
			return fmt.Errorf("read %s: %w", name, err)
		}

		if _, err := db.Exec(string(sql)); err != nil {
			return fmt.Errorf("apply %s: %w", name, err)
		}

		if _, err := db.Exec(`INSERT INTO _migrations (name) VALUES (?)`, name); err != nil {
			return fmt.Errorf("record %s: %w", name, err)
		}
	}

	return nil
}
