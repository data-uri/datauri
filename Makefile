SHELL  = /bin/sh
NPM    = npm
NODE   = node
MODULE = ./node_modules/.bin/
MOCHA  = $(MODULE)mocha --recursive --ui bdd --timeout 3000

install:
	$(NPM) install
clean:
	rm -rf node_modules
lint:
	$(MODULE)jshint datauri.js cli.js lib/*
spec:
	$(MOCHA) --reporter spec
dot:
	$(MOCHA) --reporter dot
test_editor: lint dot
fulltest: clean install test
test: lint spec