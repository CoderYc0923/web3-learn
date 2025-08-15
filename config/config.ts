import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'WEB3学习靶场',
  },
  routes,
  npmClient: 'pnpm',
  favicons: [
    '/favicon.ico'
  ]
});

