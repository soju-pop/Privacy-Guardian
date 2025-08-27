import { useTheme } from '../theme/ThemeProvider.tsx';

export function Switch({ checked, onChange }: { checked: boolean; onChange: (value: boolean) => void }) {
  const theme = useTheme();
  return (
    <view bindtap={() => onChange(!checked)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
      <view
        style={{
          width: 36,
          height: 20,
          background: checked ? theme.primary : theme.border,
          borderRadius: 12,
          position: 'relative',
          transition: 'background 0.2s',
          display: 'block',
        }}
      >
        <view
          style={{
            position: 'absolute',
            left: checked ? 18 : 2,
            top: 2,
            width: 16,
            height: 16,
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
