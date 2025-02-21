# Use Python 3.12 and Node.js as the base image
FROM python:3.12-slim AS builder

# Set working directory
WORKDIR /app

# Install required system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js (LTS) from NodeSource
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm@latest

# Verify Node.js installation
RUN node -v && npm -v

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"

# Verify Bun installation
RUN bun --version

# Copy dependency files first for caching
COPY bun.lockb package.json ./
RUN bun install

# Install frontend dependencies and build
COPY packages/frontend packages/frontend
RUN bun run build:frontend

# Install `uv` using pip
RUN pip install --no-cache-dir uv

# Copy the full project
COPY . .

# Run `uv sync` to install dependencies
RUN uv sync

# Build the Python package
RUN uv build

# Final minimal image with only the built package
FROM python:3.12-slim AS package

# Set working directory
WORKDIR /package

# Install Node.js again in the final image
RUN apt-get update && apt-get install -y nodejs && rm -rf /var/lib/apt/lists/*

# Copy the built package from the builder stage
COPY --from=builder /app/dist /package/dist

# Default command to list built package files
CMD ["ls", "-lh", "/package/dist"]
