package urlhandler

import (
	"fmt"
	"net/http"
	"strconv"
	"sync"
	"github.com/rs/cors"
	"github.com/gorilla/mux"
)

var (
	mu      sync.Mutex
	urlList        = make(map[string]string)
	count          = 0
	port    string = "5555"
)

func HandleRequests() {
	r := mux.NewRouter()
	r.HandleFunc("/add/{url}", addURL)
	r.HandleFunc("/{id}", redirectURL)
	handler:=cors.Default().Handler(r)
	fmt.Println("listening on port " + port)
	err := http.ListenAndServe(":"+port, handler)
	if err != nil {
		fmt.Printf("error is %s\n", err)
	}
	

}
func addURL(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	url := vars["url"]
	mu.Lock()
	defer mu.Unlock()
	count++
	short := strconv.Itoa(count)
	urlList[short] = url
	fmt.Printf("short url is %s\n",short)
	fmt.Fprintf(w, fmt.Sprintf("short url is http://localhost:%s/%s\n", port, short))

}
func redirectURL(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	short := vars["id"]

	mu.Lock()
	defer mu.Unlock()

	actualurl, ok := urlList[short]
	if !ok {
		http.NotFound(w, r)
		return
	}
	fmt.Printf("redirecting to %s\n", actualurl)
	http.Redirect(w, r, actualurl, http.StatusOK)

}
