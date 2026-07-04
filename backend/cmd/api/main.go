package main

import (
	"log"
	"net/http"

	analyticsrepo "github.com/theguyupstairs/personal-website/internal/infrastructure/analytics"
	contactrepo   "github.com/theguyupstairs/personal-website/internal/infrastructure/contact"
	"github.com/theguyupstairs/personal-website/internal/infrastructure/database"
	profilerepo   "github.com/theguyupstairs/personal-website/internal/infrastructure/profile"
	projectrepo   "github.com/theguyupstairs/personal-website/internal/infrastructure/project"
	analyticsapi  "github.com/theguyupstairs/personal-website/internal/presentation/api/analytics"
	contactapi    "github.com/theguyupstairs/personal-website/internal/presentation/api/contact"
	profileapi    "github.com/theguyupstairs/personal-website/internal/presentation/api/profile"
	projectapi    "github.com/theguyupstairs/personal-website/internal/presentation/api/project"
)

func main() {
	cfg := database.DefaultConfig()

	db, err := database.New(cfg.Path)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	if err := database.RunMigrations(db, "./migrations"); err != nil {
		log.Fatal(err)
	}
	log.Println("cfg", cfg)
	log.Println("Migrations complete.");

	// repos
	profileRepo   := profilerepo.New(db)
	projectRepo   := projectrepo.New(db)
	analyticsRepo := analyticsrepo.New(db)
	contactRepo   := contactrepo.New(db)

	// handlers
	profileHandler   := profileapi.New(profileRepo)
	projectHandler   := projectapi.New(projectRepo)
	analyticsHandler := analyticsapi.New(analyticsRepo)
	contactHandler   := contactapi.New(contactRepo)

	// routes
	mux := http.NewServeMux()
	mux.HandleFunc("GET /api/ping",       func(w http.ResponseWriter, _ *http.Request) { w.Write([]byte("pong")) })
	mux.HandleFunc("GET /api/profile",    profileHandler.Get)
	mux.HandleFunc("GET /api/projects",   projectHandler.List)
	mux.HandleFunc("POST /api/contact",   contactHandler.Post)
	mux.HandleFunc("POST /api/analytics", analyticsHandler.Track)

	log.Println("Starting server on :8080")
	log.Fatal(http.ListenAndServe(":8080", mux))
}
