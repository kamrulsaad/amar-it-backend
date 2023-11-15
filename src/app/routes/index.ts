import express from 'express';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { BlogCategoryRoute } from '../modules/blog-category/blog-category.routes';
import { BlogsRoute } from '../modules/blogs/blogs.routes';
import { BookingRoutes } from '../modules/booking/booking.routes';
import { CustomerRoutes } from '../modules/customer/customer.routes';
import { FaqRoute } from '../modules/faq/faq.routes';
import { FeedbackRoute } from '../modules/feedback/feedback.routes';
import { HomeBannerContentsRoute } from '../modules/home-banner/home-banner.routes';
import { PackageRoutes } from '../modules/package/package.routes';
import { PermissionRoutes } from '../modules/permission/permission.routes';
import { UserRoutes } from '../modules/user/user.routes';
import { ServiceRoutes } from '../modules/service/service.routes';
import { PaymentRoutes } from '../modules/payment/payment.routes';

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
    {
        path: '/services',
        route: ServiceRoutes,
    },
    {
        path: '/payment',
        route: PaymentRoutes,
    },
];

moduleroutes.forEach(route => {
    router.use(route.path, route.route);
});

export default router;
