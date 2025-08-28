import { useTheme } from '../theme/ThemeProvider.tsx';

export function Switch({ checked, onChange }: { checked: boolean; onChange: (value: boolean) => void }) {
  const theme = useTheme();
  return (
    <view bindtap={() => onChange(!checked)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
      <view
        style={{
          width: '36px',
          height: '20px',
          background: checked ? theme.primary : theme.border,
          borderRadius: '12px',
          position: 'relative',
          transition: 'background 0.2s',
          display: 'block',
        }}
      >
        <view
          style={{
            position: 'absolute',
            left: checked ? '18px' : '2px',
            top: '2px',
            width: '16px',
            height: '16px',
            background: '#fff',
            borderRadius: '50%',
            boxShadow: '0 1px 4px #0001',
            transition: 'left 0.2s',
          }}
        />
      </view>
    </view>
  );
}
