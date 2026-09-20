import { isAuthError } from '@supabase/supabase-js'

const messages: Record<string, string> = {
	over_email_send_rate_limit: 'Email sending limit reached. Please wait before requesting another link.',
	over_request_rate_limit: 'Too many requests. Please wait before trying again.',
	email_address_not_authorized: 'The email provider does not allow sending to this address. Contact the workspace owner.',
	email_address_invalid: 'Please enter a valid email address.',
	email_provider_disabled: 'Email sign-in is disabled. Contact the workspace owner.',
	signup_disabled: 'New accounts are currently disabled. Use an existing account.',
	unexpected_failure: 'The sign-in service could not send your link. The workspace owner should check Supabase Auth logs.'
}

export function signInError(error: unknown): string {
	if (isAuthError(error)) {
		const code = error.code
		const message = code && messages[code]
		// Show a diagnostic code without logging emails, session data or tokens.
		if (message) return `${message} (${code})`
		if (error.status === 429) return 'Too many requests. Please wait before requesting another link. (429)'
		return `Could not send your sign-in link. Please contact the workspace owner.${code ? ` (${code})` : ''}`
	}
	return 'Could not reach the sign-in service. Check your connection and try again.'
}
