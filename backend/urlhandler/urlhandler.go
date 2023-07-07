package urlhandler

import (
	"net/http"

	"github.com/gorilla/mux"
)

func HandleRequests() {
	r := mux.NewRouter()
	r.HandleFunc("/add/{url}", addURL)
	r.HandleFunc("/{id}", redirectURL)

	http.ListenAndServe(":5000", r)

}
func addURL(w http.ResponseWriter, r *http.Request) {

}
func redirectURL(w http.ResponseWriter, r *http.Request) {

}
