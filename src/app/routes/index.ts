import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { PermissionRoutes } from '../modules/permission/permission.routes';
import { FaqRoute } from '../modules/faq/faq.routes';
import { BlogCategoryRoute } from '../modules/blog-category/blog-category.routes';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { BlogsRoute } from '../modules/blogs/blogs.routes';
import { CustomerRoutes } from '../modules/customer/customer.routes';
import { PackageRoutes } from '../modules/package/package.routes';
import { HomeBannerContentsRoute } from '../modules/home-banner/home-banner.routes';
import { BookingRoutes } from '../modules/booking/booking.routes';
import { FeedbackRoute } from '../modules/feedback/feedback.routes';
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
    {
        path: '/blogs',
        route: BlogsRoute,
    },
    {
        path: '/customers',
        route: CustomerRoutes,
    },
    {
        path: '/packages',
        route: PackageRoutes,
    },
    {
        path: '/home-banner',
        route: HomeBannerContentsRoute,
    },
    {
        path: '/booking',
        route: BookingRoutes,
    },
    {
        path: '/feedback',
        route: FeedbackRoute,
    },
];

moduleroutes.forEach(route => {
    router.use(route.path, route.route);
});

export default router;
