package analytics

import "time"

type Event struct {
	Page      string
	Referrer  string
	CreatedAt time.Time
}

type Repository interface {
	Track(e Event) error
}
