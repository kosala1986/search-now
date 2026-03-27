export const CONFIG = {
  api: {
    endpoints: {
      search: 'http://localhost:3001/results',
    },
  },
} as const;

export type Config = typeof CONFIG;
