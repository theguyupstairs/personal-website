package analyticsrepo

import (
	"database/sql"

	"github.com/theguyupstairs/personal-website/internal/domain/analytics"
)

type Repository struct {
	db *sql.DB
}

func New(db *sql.DB) *Repository {
	return &Repository{db: db}
}

func (r *Repository) Track(e analytics.Event) error {
	// TODO: insert into db
	return nil
}
