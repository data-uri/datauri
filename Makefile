SHELL = /bin/sh
NPM   = npm
NODE  = node
MODULE = ./node_modules/.bin/

install:
	$(NPM) install
test: lint spec
fulltest: clean install test
clean:
	rm -rf node_modules
lint:
	$(MODULE)jshint datauri.js cli.js lib/*
spec:
	@echo "Running test suite..."
	$(MODULE)mocha \
		--recursive \
		--ui bdd \
		--reporter spec \
		--timeout 3000
.PHONY: all test fulltest clean lint mocha