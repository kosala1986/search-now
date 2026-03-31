# Architecture Overview

## Project Structure

```
search-now-workspace/
├── packages/
│   ├── ui-core/              # Core Stencil components
│   │   ├── src/
│   │   │   ├── components/   # Stencil components
│   │   │   ├── services/     # Business logic & API calls
│   │   │   ├── types/        # TypeScript type definitions
│   │   │   ├── utils/        # Utility functions
│   │   │   └── config.ts     # Configuration
│   │   └── dist/             # Generated build output
│   ├── react-wrapper/        # Auto-generated React bindings
│   └── angular-wrapper/      # Angular wrapper
├── apps/
│   ├── demo-react/           # React demo application
│   └── demo-angular/         # Angular demo application
└── mock/                     # Mock API server
```
