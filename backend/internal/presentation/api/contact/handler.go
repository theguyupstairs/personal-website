package contactapi

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/theguyupstairs/personal-website/internal/domain/contact"
)

type Handler struct {
	repo contact.Repository
}

func New(repo contact.Repository) *Handler {
	return &Handler{repo: repo}
}

func (h *Handler) Post(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Email string `json:"email"`
		Body  string `json:"body"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}
	if err := h.repo.Save(contact.Message{
		Email:     body.Email,
		Body:      body.Body,
		CreatedAt: time.Now(),
	}); err != nil {
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
