import { createWebHistory, createRouter } from "vue-router";
const routes = [
    {
        path: "/",
        name: "homepage",
        component: () => import("@/views/HomePage.vue"),
    },
    {
        path: "/test",
        name: "test",
        component: () => import("@/views/test.vue"),
    },
    {
        path: "/gioi-thieu",
        name: "about-us",
        component: () => import("@/views/AboutUs.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/san-pham/:id",
        name: "book.detail",
        component: () => import("@/views/BookDetail.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/user/:id",
        name: "user.profile",
        component: () => import("@/views/ProfileUser.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/tac-gia/:id",
        name: "author.detail",
        component: () => import("@/views/AuthorDetail.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/san-pham",
        name: "book.list",
        component: () => import("@/views/BookList.vue"),
    },
    {
        path: "/gio-hang",
        name: "card",
        component: () => import("@/views/Card.vue"),
    },
    {
        path: "/dat-hang",
        name: "order",
        component: () => import("@/views/Order.vue"),
    },
    
];
const router = createRouter({
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 }
    },
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;