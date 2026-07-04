package project

type Project struct {
	ID          int
	Name        string
	Description string
	Tags        []string
	URL         string
}

type Repository interface {
	List() ([]Project, error)
}
