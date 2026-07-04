package analyticsapi

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/theguyupstairs/personal-website/internal/domain/analytics"
)

type Handler struct {
	repo analytics.Repository
}

func New(repo analytics.Repository) *Handler {
	return &Handler{repo: repo}
}

func (h *Handler) Track(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Page     string `json:"page"`
		Referrer string `json:"referrer"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}
	if err := h.repo.Track(analytics.Event{
		Page:      body.Page,
		Referrer:  body.Referrer,
		CreatedAt: time.Now(),
	}); err != nil {
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
