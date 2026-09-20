import { ImageResponse } from 'next/og'
export const alt = 'TaskHub — Bring your work into focus'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export default function OpenGraphImage() {
	return new ImageResponse(
		<div style={{ display: 'flex', width: '100%', height: '100%', background: '#0c0b13', color: '#faf9ff', padding: 64, flexDirection: 'column', justifyContent: 'space-between' }}>
			<div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 32 }}>
				<div style={{ display: 'flex', background: '#7860ed', borderRadius: 18, padding: 12 }}>
					<svg width='36' height='36' viewBox='0 0 64 64'><path d='M12 33h10l6-17 9 33 6-16h9' fill='none' stroke='white' strokeWidth='4' strokeLinecap='round' strokeLinejoin='round' /></svg>
				</div>TaskHub
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', fontSize: 80, letterSpacing: -4, lineHeight: 1.08 }}>
				<span>Bring your work</span><span style={{ color: '#ad9cff' }}>into focus.</span>
			</div>
			<div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #35303f', paddingTop: 24, fontSize: 22, color: '#bcb7cd' }}>
				<span>Projects. People. Progress.</span><span>Built by Mike Mazurkevich</span>
			</div>
		</div>, size
	)
}
