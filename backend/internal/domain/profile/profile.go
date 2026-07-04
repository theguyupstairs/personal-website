package profile

type Profile struct {
	Handle string
	Bio    string
	Links  []string
}

type Repository interface {
	Get() (*Profile, error)
}
