# PyWebflow - Frontend

This is the frontend package for **PyWebflow**, a Python-based web framework for creating flow-based workflows. It allows users to easily build and manage node-based projects using native Python. The frontend is built with [ReactFlow](https://reactflow.dev/) and React to deliver an intuitive visual editor.

## Getting Started

### Prerequisites

- **Node.js** (v16 or later is recommended)
- **npm** or **yarn**

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/muhammad-fiaz/pywebflow.git
   cd pywebflow/packages/frontend
   ```

2. **Install dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using bun:

   ```bash
   bun install
   ```

### Running in Development

Start the development server with:

Using npm:

```bash
npm start
```

Or using bun:

```bash
bun start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

To build the production-ready files:

Using npm:

```bash
npm run build
```

Or using bun:

```bash
bun run build
```

The production build will be output to the `dist` folder. These static files can then be served by your PyWebflow backend or any static file server.

## Usage

Once the production build is ready, integrate the static files with your PyWebflow backend. For example, the backend can serve these files using FastAPI's `StaticFiles` middleware.

## Contributing

Contributions are welcome! Before contributing, please review the following:

- Check out our [CONTRIBUTING.md](../../CONTRIBUTING.md) for detailed guidelines.
- Please review our [CODE_OF_CONDUCT.md](../../CODE_OF_CONDUCT.md) to ensure a respectful and inclusive environment.

## License

This project is licensed under the Apache-2.0 License. See the [LICENSE](../../LICENSE) file for more details.

## Acknowledgements

- **ReactFlow:** For the powerful node-based UI components.
- **PyWebflow Team:** For continuously improving the project and supporting the community.
