.PHONY: all up down test clean help

all: up

build:
	@docker compose build 

up: down build
	@docker compose up -d

down:
	@docker compose down

test:
	@echo WARN: make build up is necessary before executing this command.
	@cd backend && $(MAKE) test
	@cd frontend && npm run test

clean:
	$(MAKE) -C backend clean

help:
	@echo "Available commands:"
	@echo "  make build        - Create images for both projects: backend and frontend"
	@echo "  make up           - Launch the whole stack"
	@echo "  make down         - Stop the whole stack"
	@echo "  make test         - Run the test suite in the HOST"
	@echo "  make clean        - Remove and clean unnecessary files from projects"