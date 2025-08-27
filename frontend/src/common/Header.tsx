import lynxLogo from '../assets/lynx-logo.png';

export function Header() {
  return (
    <view style={{
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      padding: '24px 0 0 0',
      maxWidth: 900,
      margin: '0 auto',
    }}>
      <image src={lynxLogo} style={{ width: 38, height: 38, marginRight: 10 }} />
      <view>
        <text style={{ fontWeight: '700', fontSize: 22, color: '#2563eb' }}>Privacy Guardian</text>
        <text style={{ fontSize: 14, color: '#64748b', fontWeight: '500' }}>Local PII detection and redaction</text>
      </view>
    </view>
  );
}
