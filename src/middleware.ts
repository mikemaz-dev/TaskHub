import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { Pages } from '@/config/public-page.config'

import { token } from '@/types/auth/tokens.types'

export function middleware(request: NextRequest) {
	const isLoggedIn = !!request.cookies.get(token.accessToken)

	if (!isLoggedIn) {
		return NextResponse.redirect(new URL(Pages.LOGIN, request.url))
	}

	if (isLoggedIn && request.nextUrl.pathname === Pages.LOGIN) {
		return NextResponse.redirect(new URL(Pages.DASHBOARD, request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: '/dashboard/:path*'
}
