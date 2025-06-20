.PHONY: FORCE
FORCE: # targets depending on FORCE will always be built (see https://www.gnu.org/software/make/manual/html_node/Force-Targets.html)

build: FORCE
	docker build -t frontend-assignment .

run: FORCE build
	docker run --rm -p 127.0.0.1:8080:8080 frontend-assignment
