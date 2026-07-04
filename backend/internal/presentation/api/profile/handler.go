package profileapi

import (
	"encoding/json"
	"net/http"

	"github.com/theguyupstairs/personal-website/internal/domain/profile"
)

type Handler struct {
	repo profile.Repository
}

func New(repo profile.Repository) *Handler {
	return &Handler{repo: repo}
}

func (h *Handler) Get(w http.ResponseWriter, r *http.Request) {
	p, err := h.repo.Get()
	if err != nil {
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(p)
}
