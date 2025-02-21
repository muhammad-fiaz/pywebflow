#!/bin/bash

set -e  # Exit immediately if a command fails

# Ensure we are in the root of the project
cd "$(dirname "$0")/.."

# Detect OS
OS="$(uname -s)"

# Function to check if a command exists
command_exists() {
    command -v "$1" &>/dev/null
}

# Function to find and remove existing virtual environments
remove_existing_venv() {
    for VENV_DIR in ".venv" "venv" "env" "virtualenv" "bin"; do
        if [ -d "$VENV_DIR" ]; then
            echo "🗑️ Removing existing virtual environment: $VENV_DIR..."
            rm -rf "$VENV_DIR"
            echo "✅ Removed $VENV_DIR"
        fi
    done
}

# Remove any existing virtual environment before running `uv sync`
remove_existing_venv

# Check if Node.js is installed
if ! command_exists node; then
  echo "❌ Error: Node.js is not installed. Please install Node.js and try again."
  exit 1
fi

# Display Node.js version
echo "✅ Node.js version: $(node -v)"

# Install Bun globally
echo "📦 Installing Bun..."
npm install -g bun

# Verify Bun installation
if ! command_exists bun; then
  echo "❌ Error: Bun installation failed."
  exit 1
fi

# Display Bun version
echo "✅ Bun version: $(bun --version)"

# Ensure Bun is up to date
bun install -g bun@latest

# Install frontend dependencies and build
echo "🛠️ Building frontend..."
bun install --cwd packages/frontend
bun run --cwd packages/frontend build

# Ensure the frontend build output exists
if [ ! -d "webflow/frontend/dist" ]; then
  echo "❌ Error: Frontend build directory 'webflow/frontend/dist' not found!"
  exit 1
fi

echo "✅ Frontend build completed successfully."

# Check if Python is installed based on OS
PYTHON_CMD=""

case "$OS" in
    Darwin | Linux)
        if command_exists python3; then
            PYTHON_CMD="python3"
        elif command_exists python; then
            PYTHON_CMD="python"
        else
            echo "❌ Error: Python is not installed. Please install Python and try again."
            exit 1
        fi
        ;;
    CYGWIN* | MINGW32* | MSYS* | MINGW*)
        if command_exists python; then
            PYTHON_CMD="python"
        else
            echo "❌ Error: Python is not installed on Windows. Please install Python and try again."
            exit 1
        fi
        ;;
    *)
        echo "❌ Unsupported OS detected: $OS"
        exit 1
        ;;
esac

# Display Python version
echo "✅ Python version: $($PYTHON_CMD --version)"

# Ensure pip is installed and upgraded
echo "📦 Upgrading pip..."
$PYTHON_CMD -m ensurepip
$PYTHON_CMD -m pip install --upgrade pip

# Install `uv` using pip
echo "📦 Installing uv..."
$PYTHON_CMD -m pip install uv

# Verify `uv` installation
if ! command_exists uv; then
  echo "❌ Error: uv installation failed."
  exit 1
fi

# Display `uv` version
echo "✅ uv installed successfully! Version: $(uv --version)"

# Run `uv sync` to automatically create the virtual environment and install dependencies
echo "🔄 Running uv sync..."
uv sync
echo "✅ uv sync completed successfully."

# Detect the correct virtual environment path
VENV_DIR=""
for dir in ".venv" "venv" "env" "virtualenv"; do
    if [ -d "$dir" ]; then
        VENV_DIR="$dir"
        break
    fi
done

# Ensure the virtual environment exists
if [ -z "$VENV_DIR" ]; then
    echo "❌ Error: Virtual environment was not created by uv sync!"
    exit 1
fi

# Build Python package
echo "🛠️ Building Python package..."
uv build
echo "✅ Build process completed successfully."
