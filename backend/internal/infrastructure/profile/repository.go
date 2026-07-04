package profilerepo

import (
	"database/sql"

	"github.com/theguyupstairs/personal-website/internal/domain/profile"
)

type Repository struct {
	db *sql.DB
}

func New(db *sql.DB) *Repository {
	return &Repository{db: db}
}

func (r *Repository) Get() (*profile.Profile, error) {
	// TODO: query db
	return &profile.Profile{
		Handle: "@theguyupstairs",
		Bio:    "building things.",
		Links:  []string{"https://github.com/theguyupstairs"},
	}, nil
}
