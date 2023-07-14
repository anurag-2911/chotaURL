package urlhandler

import (
	"chotaURL/dbhandler"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"sync"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

var (
	mu      sync.Mutex
	urlList        = make(map[string]string)
	count          = 0
	port    string = "8080"
)

func init() {
	fmt.Println("init function in url handler")
}
func HandleRequests() {
	r := mux.NewRouter()
	r.HandleFunc("/hello", helloHandler).Methods("GET")
	r.HandleFunc("/add/{url}", addURL)
	r.HandleFunc("/{id}", redirectURL)
	r.HandleFunc("/get/{id}", getURL)
	
	http.Handle("/", r)
	handler := cors.Default().Handler(r)
	fmt.Println("listening on port " + port)
	err := http.ListenAndServe(":"+port, handler)
	if err != nil {
		fmt.Printf("error is %s\n", err)
	}

}
func helloHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello World")
}
func getURL(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	fmt.Printf("request for shorturl %s\n", id)
	mu.Lock()
	defer mu.Unlock()

	url, ok := urlList[id]
	if !ok {
		http.NotFound(w, r)
		return
	}
	fmt.Printf("url found %s\n", url)
	w.Write([]byte(url))
}
func addURL(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	url := vars["url"]
	mu.Lock()
	defer mu.Unlock()
	count++
	short := strconv.Itoa(count)
	urlList[short] = url
	fmt.Printf("short url is %s\n", short)
	err := dbhandler.InsertURL(short, url)
	if err != nil {
		log.Println("error in saving the url in db ", err)
	} else {
		log.Println("added short url in db")
	}

	fmt.Fprintf(w, fmt.Sprintf("short url is http://localhost:%s/%s\n", port, short))

}
func redirectURL(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	short := vars["id"]

	mu.Lock()
	defer mu.Unlock()

	actualurl, err := dbhandler.GetOriginalURL(short)

	if err != nil {
		fmt.Printf("error is getting actual url from db so reading from map %s\n", err)
		actualurl = urlList[short]
	} else {
		fmt.Println("got original url from db ", actualurl)
	}
	fmt.Printf("redirecting to %s\n", actualurl)
	http.Redirect(w, r, actualurl, http.StatusOK)

}
