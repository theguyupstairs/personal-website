package main

import (
	"log"
	"net/http"
)

func health(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("pong"))
}

func main() {

	http.HandleFunc("/api/ping", health)

	log.Println("Starting server on :8080")

	log.Fatal(http.ListenAndServe(":8080", nil))
}