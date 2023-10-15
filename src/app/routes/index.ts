import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { PermissionRoutes } from '../modules/permission/permission.routes';
import { FaqRoute } from '../modules/faq/faq.routes';
const router = express.Router();

const moduleroutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/permissions',
    route: PermissionRoutes,
  },
  {
    path: '/faq',
    route: FaqRoute,
  },
];

moduleroutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
