.PHONY: all backend frontend clean

all: backend frontend

build:
	docker compose build 

up: down build
	docker compose up -d

test:
	@cd backend && $(MAKE) test

down:
	docker compose down

clean:
	$(MAKE) -C backend clean
	$(MAKE) -C frontend clean

help:
	@echo "Available commands:"
	@echo "  make build        - Create images for both projects: backend and frontend"
	@echo "  make run          - Run the whole platform"
	@echo "  make clean        - Remove and clean unnecessary files from projects: backend and frontend"