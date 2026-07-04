package contact

import "time"

type Message struct {
	Email     string
	Body      string
	CreatedAt time.Time
}

type Repository interface {
	Save(m Message) error
}
