# PyWebflow - Frontend

This is the frontend for **PyWebflow**, a visual programming tool for building web applications.

The frontend is built with [React](https://react.dev/), [ReactFlow](https://reactflow.dev/), [Tailwind CSS](https://tailwindcss.com/), and [TypeScript](https://www.typescriptlang.org/). It provides a user-friendly interface for creating and managing flow-based workflows.

Other tools and libraries used include:

- [ShadCN/UI](https://ui.shadcn.com/) for UI components
- [Mantine](https://mantine.dev/) for UI components
- [Vite](https://vitejs.dev/) for fast development and builds

## Getting Started

### Prerequisites

- **Node.js** (v16 or later is recommended)
- **Bun** (Recommended for managing npm scripts)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/muhammad-fiaz/pywebflow.git
   cd pywebflow/packages/frontend
   ```

2. **Install dependencies:**

   Using bun:

   ```bash
   bun install
   ```

### Running in Development

Start the development server with:

Using bun:

```bash
bun start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

To build the production-ready files:

Using bun:

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
