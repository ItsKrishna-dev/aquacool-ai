export function formatDeviceTime(offset = 0) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(Date.now() + offset * 3600000));
}
