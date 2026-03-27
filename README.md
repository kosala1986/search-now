# Search Now Workspace

A monorepo project featuring web components built with Stencil, along with React and Angular wrappers for easy integration.

## Packages

- **ui-core**: Core Stencil web components library
- **react-wrapper**: React wrapper for the core components
- **angular-wrapper**: Angular wrapper for the core components

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the Stencil web components (required for the demo app):
   ```bash
   cd packages/ui-core
   npm run build
   ```

3. Start the mock server (from the root folder):
   ```bash
   npm run mock:server
   ```

   This starts a JSON server on http://localhost:3001/ with sample data.

4. Start the demo app (from the root folder):
   ```bash
   npm run dev --workspace=demo-react
   ```

   The react app will be available at http://localhost:5173/

## Development

- Use `npm run build` in each package to build
- Use `npm run test` to run tests
- Use `npm run start` in apps to start development servers

### Running Components Separately

For developing the web components independently:

```bash
cd packages/ui-core
npm run start
```

This starts the Stencil development server at http://localhost:3333/

## Using the Components

### In React Applications

Import and use the web components through the React wrapper:

```tsx
import { SearchNow } from '@search-now/react-wrapper';

function App() {
  return (
    <div>
      <SearchNow />
    </div>
  );
}
```

### In Angular Applications

Import and use the web components through the Angular wrapper:

```typescript
// Angular wrapper implementation
```