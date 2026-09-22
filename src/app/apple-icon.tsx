import { ImageResponse } from 'next/og'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'
export default function Icon() {
	return new ImageResponse(<div style={{ display: 'flex', width: '100%', height: '100%', background: '#7860ed', alignItems: 'center', justifyContent: 'center' }}>
		<svg width='140' height='140' viewBox='0 0 64 64'><path d='M12 33h10l6-17 9 33 6-16h9' fill='none' stroke='white' strokeWidth='4' strokeLinecap='round' strokeLinejoin='round' /></svg>
	</div>, size)
}
