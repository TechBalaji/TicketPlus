export const validateCoupon = (code: string): number => {
  const coupons: Record<string, number> = {
    'FIRST10': 10,
    'SUMMER20': 20,
    'SPECIAL25': 25,
    'FESTIVAL30': 30
  };

  return coupons[code] || 0;
};