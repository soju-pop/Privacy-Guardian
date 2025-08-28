import lynxLogo from '../assets/lynx-logo.png';

export function Header() {
  return (
    <view style={{
      display: 'flex',
      alignItems: 'center',
      gap: '18px',
      padding: '24px 0 0 0',
      maxWidth: '900px',
      margin: '0 auto',
    }}>
      <image src={lynxLogo} style={{ width: '38px', height: '38px', marginRight: '10px' }} />
      <view>
        <text style={{ fontWeight: '700', fontSize: '22px', color: '#2563eb' }}>Privacy Guardian</text>
        <text style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Local PII detection and redaction</text>
      </view>
    </view>
  );
}
