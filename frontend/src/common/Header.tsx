import lynxLogo from '../assets/lynx-logo.png';
import { useTheme } from '../theme/ThemeProvider.tsx';

export function Header() {
  const { headerText, headerSubText, card, borderRadius } = useTheme();
  return (
    <view style={{
      display: 'flex',
      alignItems: 'center',
      gap: '18px',
      padding: '24px 0 0 0',
      maxWidth: '900px',
      margin: '0 auto',
      background: card,
      borderRadius: borderRadius,
    }}>
      <image src={lynxLogo} style={{ width: '38px', height: '38px', marginRight: '10px' }} />
      <view>
        <text style={{ fontWeight: '700', fontSize: '22px', color: headerText }}>Privacy Guardian</text>
        <text style={{ fontSize: '14px', color: headerSubText, fontWeight: '500' }}>Local PII detection and redaction</text>
      </view>
    </view>
  );
}
