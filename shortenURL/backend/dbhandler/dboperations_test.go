package dbhandler

import (
	"testing"
)

func TestInsertURL(t *testing.T) {
	originalurl:="www.google.com"
	shorturl:="http://localhost:1"
	err := InsertURL(shorturl, originalurl)
	if err != nil {
		t.Errorf("error is %s\n", err)
	}
	
}
