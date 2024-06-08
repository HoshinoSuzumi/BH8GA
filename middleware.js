import createMiddleware from 'next-intl/middleware';
import {localePrefix, locales} from './navigation';

export default createMiddleware({
    locales, localePrefix, defaultLocale: 'zh', localeDetection: true
});

// only applies this middleware to files in the app directory
export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
};
