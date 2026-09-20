import { NextRequest, NextResponse } from 'next/server'

import { createClientFromServer } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
	const client = await createClientFromServer()
	const code = request.nextUrl.searchParams.get('code')
	const token = request.nextUrl.searchParams.get('token_hash')
	const result = code
		? await client.auth.exchangeCodeForSession(code)
		: token
			? await client.auth.verifyOtp({ token_hash: token, type: 'email' })
			: null
	if (!result || result.error)
		return NextResponse.redirect(new URL('/auth/confirm?error=expired', request.url))
	return NextResponse.redirect(new URL('/auth/confirm?verified=1', request.url))
}
