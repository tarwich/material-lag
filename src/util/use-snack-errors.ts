import { useSnackbar } from "notistack";

export const useSnackErrors = () => {
  const snackbar = useSnackbar();

  return (error: Error | string) => {
    const message = error instanceof Error ? error.message : error;

    snackbar.enqueueSnackbar(message, {
      variant: 'error',
      anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
    });
  };
};
