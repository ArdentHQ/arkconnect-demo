import toastService from "react-hot-toast";
import { ToastMessage, ToastTemplate } from "@/app/components/Toast";
import { isTruthy } from "@/app/utils/isTruthy";

const showToast = (toastMessage?: ToastMessage): void => {
  if (!isTruthy(toastMessage) || !isTruthy(toastMessage.message)) {
    return;
  }

  toastService.custom(
    (toast: { id: string; visible: boolean }) => (
      <ToastTemplate
        isVisible={toast.visible}
        toastMessage={toastMessage}
        onClose={() => {
          toastService.dismiss(toast.id);

          if (toastMessage.onClose !== undefined) {
            toastMessage.onClose();
          }
        }}
      />
    ),
    {
      duration:
        isTruthy(toastMessage.isStatic) || isTruthy(toastMessage.isLoading)
          ? Number.POSITIVE_INFINITY
          : 5000,
    },
  );
};

export const useToasts = (): {
  showToast: (toastMessage?: ToastMessage) => void;
  clear: () => void;
} => ({
  showToast,
  clear: (): void => {
    toastService.dismiss();
  },
});
