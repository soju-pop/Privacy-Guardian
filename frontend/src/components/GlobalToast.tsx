import { useToast } from "../contexts/ToastContext.tsx";
import { Toast } from "../common/Toast.tsx";

export function GlobalToast() {
  const { toast, isVisible, hideToast } = useToast();

  if (!toast) return null;

  return (
    <Toast
      message={toast.message}
      show={isVisible}
      onClose={hideToast}
      style={toast.style}
    />
  );
}
