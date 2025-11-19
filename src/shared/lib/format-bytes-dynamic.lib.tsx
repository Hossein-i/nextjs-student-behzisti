export const formatBytesDynamic = (bytes: number, locale: string = 'fa-IR') => {
  if (bytes === 0) {
    return '۰ بایت';
  }

  const units = ['byte', 'kilobyte', 'megabyte', 'gigabyte', 'terabyte'];
  const k = 1024;
  const magnitude = Math.floor(Math.log(bytes) / Math.log(k));
  const unit = units[Math.min(magnitude, units.length - 1)];
  const value = bytes / Math.pow(k, magnitude);

  const formatter = new Intl.NumberFormat(locale, {
    style: 'unit',
    unit,
    unitDisplay: 'long',
    maximumFractionDigits: 2,
  });

  return formatter.format(value);
};
