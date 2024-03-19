/** @type {import('next').NextConfig} */
const nextConfig = {
  // output:'export',
    images: {
        domains: ["amansamant23.files.wordpress.com"],
        domains: ['images.unsplash.com','static.wixstatic.com' ,'example.com', 'anotherdomain.com','media.istockphoto.com'],
        unoptimized:true
      },
      
};

module.exports = nextConfig
