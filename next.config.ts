import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars2.githubusercontent.com',
				port: '',
				pathname: '/u/**'
			}
		]
	}
}

export default nextConfig
