# Variables
SHELL := /bin/bash
VENV_DIR := ./env
PYTHON := python3

setup:
	@if [ ! -d "$(VENV_DIR)" ]; then \
		$(PYTHON) -m venv $(VENV_DIR); \
		echo "#### Virtual environment created in subdirectory/$(VENV_DIR)"; \
	fi
	@$(VENV_DIR)/bin/pip install -r requirements.txt 
	@echo "#### Dependencies are installed"

run: setup
	@$(VENV_DIR)/bin/uvicorn main:app --host 0.0.0.0 --port 8000 --reload

# style errors
lint:
	@$(VENV_DIR)/bin/flake8 .

# Format code
fmt:
	@$(VENV_DIR)/bin/black .

# Check types
type-check:
	@export MYPYPATH=$(PWD)/backend && $(VENV_DIR)/bin/mypy --explicit-package-bases .

# Common security vulneravilities
security-check:
	@$(VENV_DIR)/bin/bandit -r .

# Common security issues on dependencies
dependency-check:
	@$(VENV_DIR)/bin/pip-audit

pip-install: setup
	@if [ -z "$(packages)" ]; then \
		echo "#### Error: No packages specified for installation."; \
		exit 1; \
	else \
		echo "#### Installing packages: $(packages)..."; \
		$(VENV_DIR)/bin/pip install --no-cache-dir $(packages); \
	fi
	@$(VENV_DIR)/bin/pip freeze > requirements.txt
	@echo "#### requirements.txt updated."

clean:
	@rm -rf $(VENV_DIR)
	@find . -type d -name '__pycache__' -exec rm -rf {} +
	@find . -type d -name '.mypy_cache' -exec rm -rf {} +
	@echo "Cleanup completed"

help:
	@echo "Available commands:"
	@echo "  make setup               - Create virtual environment and install dependencies"
	@echo "  make run                 - Run the full platform (FE + BE)"
	@echo "  make clean               - Remove virtual environment and caches"
	@echo "  make pip-install         - To install python libraries. Ex: make pip.install packages=\"fastapi uvicorn\""
	@echo "  make build               - Obfuscate the code creatin a C binary"
	@echo "  make remove-source-code  - Only executed at docker build step for security reasons"

.PHONY: setup run image pip-install clean help
