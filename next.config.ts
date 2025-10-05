import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars2.githubusercontent.com',
				pathname: '/u/**'
			},
			{
				protocol: 'https',
				hostname: '*.supabase.co', // Adjust this to your specific Supabase project URL
				port: '',
				pathname: '/storage/v1/object/public/**'
			}
		]
	}
}

export default nextConfig
