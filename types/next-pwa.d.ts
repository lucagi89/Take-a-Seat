declare module 'next-pwa' {
  import { NextConfig } from 'next';

  type PWAOptions = {
    dest: string;
    disable?: boolean;
    skipWaiting?: boolean;
    register?: boolean;
    [key: string]: any;
  };

  const withPWA: (options: PWAOptions) => (nextConfig: NextConfig) => NextConfig;
  export default withPWA;
}
