import { useEffect } from '@lynx-js/react';

export function Toast({ message, show, duration = 2500, onClose }: { message: string; show: boolean; duration?: number; onClose: () => void }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;
  return (
    <view style={{
      position: 'fixed',
      right: '24px',
      bottom: '24px',
      background: '#ef4444',
      color: '#fff',
      borderRadius: '12px',
      padding: '16px 28px',
      fontWeight: '600',
      fontSize: '16px',
      boxShadow: '0 2px 8px #0002',
      zIndex: 9999,
      minWidth: '180px',
      textAlign: 'center',
    }}>
      <text>{message}</text>
    </view>
  );
}
