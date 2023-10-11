import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
const router = express.Router();

const moduleroutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
];

moduleroutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
