import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { PermissionRoutes } from '../modules/permission/permission.routes';
import { FaqRoute } from '../modules/faq/faq.routes';
import { BlogCategoryRoute } from '../modules/blog-category/blog-category.routes';
import { AdminRoutes } from '../modules/admin/admin.routes';
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
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/permissions',
    route: PermissionRoutes,
  },
  {
    path: '/faq',
    route: FaqRoute,
  },
  {
    path: '/blog-category',
    route: BlogCategoryRoute,
  },
];

moduleroutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
