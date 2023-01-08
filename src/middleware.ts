export { default } from "next-auth/middleware";

export const config = { matcher: ["/drop/:path*", "/admin/:path*"] };
