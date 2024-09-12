/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects(){
    return[
      {
        source:'/',
        destination: '/list-pokemon',
        permanent:true
      }
    ]
  }
};

export default nextConfig;
