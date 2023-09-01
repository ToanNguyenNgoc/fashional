export const formatMoney = (amount: number): string => {
  const formattedAmount = amount.toLocaleString("vi-VN");
  return `${formattedAmount}đ`;
};
