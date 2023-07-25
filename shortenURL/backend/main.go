package main

import (
	"chotaURL/dbhandler"
	"chotaURL/urlhandler"
	"fmt"
)

func main() {
	fmt.Println("chota url service ")
	dbhandler.DBinit()
	urlhandler.HandleRequests()
	//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999

}
