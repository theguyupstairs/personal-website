package projectapi

import (
	"encoding/json"
	"net/http"

	"github.com/theguyupstairs/personal-website/internal/domain/project"
)

type Handler struct {
	repo project.Repository
}

func New(repo project.Repository) *Handler {
	return &Handler{repo: repo}
}

func (h *Handler) List(w http.ResponseWriter, r *http.Request) {
	projects, err := h.repo.List()
	if err != nil {
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(projects)
}
