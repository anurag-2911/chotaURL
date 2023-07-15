package dbhandler

import (
	"database/sql"
	"encoding/json"
	"fmt"
	_ "github.com/lib/pq"
	"io/ioutil"
	"os"
)

var db *sql.DB

type DbConfig struct {
	User     string `json:"user"`
	Password string `json:"password"`
	Dbname   string `json:"dbname"`
	Host     string `json:"host"`
	Port     string `json:"port"`
}

func DBinit() {
	fmt.Println("initializing database")
	configFile, err := os.Open("utils/config.json")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer configFile.Close()

	var config DbConfig
	data, err := ioutil.ReadAll(configFile)
	if err != nil {
		fmt.Println(err)
		return
	}

	err = json.Unmarshal(data, &config)
	if err != nil {
		fmt.Println(err)
		return
	}
	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s "+
		"password=%s dbname=%s sslmode=disable",
		config.Host, config.Port, config.User, config.Password, config.Dbname)

	db, err = sql.Open("postgres", psqlInfo)
	if err != nil {
		fmt.Println(err)
		return
	}

	err = db.Ping()
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println("Successfully connected!")
}

func InsertURL(shortURL string, originalURL string) error {
	_, err := db.Exec("INSERT INTO urls (short_url, original_url) VALUES ($1, $2)", shortURL, originalURL)
	if err != nil {
		return err
	}
	return nil
}

func GetOriginalURL(shorturl string) (string, error) {
	var originalURL string
	err := db.QueryRow("SELECT original_url FROM urls WHERE short_url = $1", shorturl).Scan(&originalURL)
	if err != nil {
		return "", fmt.Errorf("error in getting the value from db %s", err)
	}
	return originalURL, nil

}
