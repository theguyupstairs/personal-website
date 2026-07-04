package projectrepo

import (
	"database/sql"

	"github.com/theguyupstairs/personal-website/internal/domain/project"
)

type Repository struct {
	db *sql.DB
}

func New(db *sql.DB) *Repository {
	return &Repository{db: db}
}

func (r *Repository) List() ([]project.Project, error) {
	// TODO: query db
	return []project.Project{}, nil
}
