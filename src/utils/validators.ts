import { ExpiryDate } from "../types";

export function validateCardNumber(cardNumber: string): string {
  if (!/^\d{16}$/.test(cardNumber)) {
    return "카드 번호는 16자리 숫자여야 합니다.";
  }
  return "";
}

export function validateExpiryDate(expiryDate: ExpiryDate): string {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  const month = Number.parseInt(expiryDate.month, 10);
  const year = Number.parseInt(expiryDate.year, 10);

  if (Number.isNaN(month) || Number.isNaN(year) || month < 1 || month > 12) {
    return "유효하지 않은 만료일입니다.";
  }

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return "카드가 이미 만료되었습니다.";
  }

  return "";
}

export function validateCVC(cvc: string): string {
  if (!/^\d{3}$/.test(cvc)) {
    return "CVC는 3자리 숫자여야 합니다.";
  }
  return "";
}

export function validateSelect(value: string): string {
  if (!value) {
    return "선택하세요";
  }
  return "";
}
