package main

import (
	"crypto/rand"
	"encoding/json"
	"fmt"
	"log"
	"math/big"
	"os"
	"strconv"
	"time"

	jsonnet "github.com/google/go-jsonnet"
	"github.com/google/go-jsonnet/ast"
)

/*
Support for random function named randomString in jsonnet. randomString can be invoked like
std.native("randomString")(20).

# Refer to example jsonnet file named randomString.jsonnet

Usage

	buliding binary

		go build .\jsonnetext.go

	execution

		jsonnetext.[sh|exe]  {Full path to jsonnet file} {optional - json output file path}
		eg :- jsonnetext.exe randomString.jsonnet randomString.json

	ouput
		generated json file based on jsonnet definition

		if no outputfile path mentioned, out file will be in the same path as jsonnet input file with .json
		extension sufix
*/
func main() {
	start := time.Now()

	fmt.Println(os.Args)

	var jsonv, outfile string
	jsonv = Load(os.Args[1])

	if len(os.Args) < 3 {
		//outfile param not present. output file name will be input file + .json
		outfile = os.Args[1] + ".json"
	} else {
		outfile = os.Args[2]
	}
	fmt.Println(outfile)

	err := os.WriteFile(outfile, []byte(jsonv), 0777)
	if err != nil {

		log.Panic(err.Error())

	}
	duration := time.Since(start)

	fmt.Println("Completed processing", os.Args, ". Time in nano seconds", duration.Nanoseconds())

}

func GenerateRandomString(n int) (string, error) {

	const letters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

	ret := make([]byte, n)

	for i := 0; i < n; i++ {

		num, err := rand.Int(rand.Reader, big.NewInt(int64(len(letters))))

		if err != nil {

			return "", err

		}

		ret[i] = letters[num.Int64()]

	}

	return string(ret), nil

}

var randomString = &jsonnet.NativeFunction{

	Name: "randomString",

	Params: ast.Identifiers{"x"},

	Func: func(x []interface{}) (interface{}, error) {

		bytes, err := json.Marshal(x[0])

		if err != nil {

			return nil, err

		}

		intVar, err1 := strconv.Atoi(string(bytes))

		if err1 != nil {

			return nil, err

		}

		return GenerateRandomString(intVar)

	},
}

func Load(templateFilePath string) string {

	vm := jsonnet.MakeVM()

	vm.NativeFunction(randomString)

	jsonStr, err := vm.EvaluateFile(templateFilePath)

	if err != nil {

		log.Panic(err.Error())

	}

	return jsonStr

}
