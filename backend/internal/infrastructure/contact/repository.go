package contactrepo

import (
	"database/sql"

	"github.com/theguyupstairs/personal-website/internal/domain/contact"
)

type Repository struct {
	db *sql.DB
}

func New(db *sql.DB) *Repository {
	return &Repository{db: db}
}

func (r *Repository) Save(m contact.Message) error {
	// TODO: insert into db
	return nil
}
