export const captureError = (error: Error | unknown, message?: string) => {
  console.log(`Error from HA Simulator: ${message}`, error);
};
