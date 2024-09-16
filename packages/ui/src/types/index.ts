export interface ExpiryDate {
  month: string;
  year: string;
}

export interface PaymentFormData {
  cardCompany: string;
  cardNumber: string;
  cardExpiry: ExpiryDate;
  cardCVC: string;
  installment: string;
}
