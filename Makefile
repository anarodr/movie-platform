.PHONY: all up down test clean help

all: up

build:
	@docker compose build

up: down build
	@docker compose up -d

down:
	@docker compose down

test: up
	@docker compose exec -T backend bash -c "/usr/local/bin/wait-for-it.sh backend:8000 -- make test PWD=/backend"

clean:
	$(MAKE) -C backend clean

help:
	@echo "Available commands:"
	@echo "  make build        - Create images for both projects: backend and frontend"
	@echo "  make up           - Launch the whole stack"
	@echo "  make down         - Stop the whole stack"
	@echo "  make test         - Run the test suite in the HOST"
	@echo "  make clean        - Remove and clean unnecessary files from projects"