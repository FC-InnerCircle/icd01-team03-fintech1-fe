import { useState } from "react";
import { CardNumberInput } from "./CardNumberInput";
import { CardExpiryInput } from "./CardExpiryInput";
import { NumberInput } from "./NumberInput";
import { ExpiryDate, PaymentFormData } from "../types";
import { Select } from "./Select";
import { validateCardNumber, validateCVC, validateExpiryDate, validateSelect } from "../utils/validators";
import Button from "./Button";

const CardCompanyOptions = [
  { label: "삼성카드", value: "SAMSUNG" },
  { label: "현대카드", value: "HYUNDAI" },
];

const InstallmentOptions = [
  { label: "일시불", value: "0" },
  { label: "1개월", value: "1" },
  { label: "3개월", value: "3" },
  { label: "6개월", value: "6" },
  { label: "12개월", value: "12" },
];
type PaymentFormProps = {
  onSubmit: (data: PaymentFormData) => void;
};

type ErrorState = Record<keyof PaymentFormData, string>;

const CardPaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<PaymentFormData>({
    cardCompany: CardCompanyOptions[0].value,
    cardNumber: "",
    cardExpiry: { month: "", year: "" },
    cardCVC: "",
    installment: InstallmentOptions[0].value,
  });
  const [errors, setErrors] = useState<ErrorState>({
    cardCompany: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
    installment: "",
  });

  const handleCardCompanyChange = (value: string) => {
    setFormData((prev) => ({ ...prev, cardCompany: value }));
    setErrors((prev) => ({ ...prev, cardCompany: "" }));
  };

  const handleInputChange = (value: string) => {
    setFormData((prev) => ({ ...prev, installment: value }));
    setErrors((prev) => ({ ...prev, installment: "" }));
  };
  const handleCardNumberChange = (value: string) => {
    setFormData((prev) => ({ ...prev, cardNumber: value }));
    setErrors((prev) => ({ ...prev, cardNumber: "" }));
  };

  const handleCardNumberBlur = () => {
    setErrors((prev) => ({ ...prev, cardNumber: validateCardNumber(formData.cardNumber) }));
  };

  const handleCardExpiryChange = (value: ExpiryDate) => {
    setFormData((prev) => ({ ...prev, cardExpiry: value }));
    setErrors((prev) => ({ ...prev, cardExpiry: "" }));
  };

  const handleCardExpiryBlur = () => {
    setErrors((prev) => ({ ...prev, cardExpiry: validateExpiryDate(formData.cardExpiry) }));
  };

  const handleCardCVCChange = (value: string) => {
    setFormData((prev) => ({ ...prev, cardCVC: value }));
    setErrors((prev) => ({ ...prev, cardCVC: "" }));
  };

  const handleCardCVCBlur = () => {
    setErrors((prev) => ({ ...prev, cardCVC: validateCVC(formData.cardCVC) }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = {
      cardNumber: validateCardNumber(formData.cardNumber),
      cardExpiry: validateExpiryDate(formData.cardExpiry),
      cardCVC: validateCVC(formData.cardCVC),
      cardCompany: validateSelect(formData.cardCompany),
      installment: validateSelect(formData.installment),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="cardCompany">카드사</label>
        <Select onChange={handleCardCompanyChange} value={formData.cardCompany} options={CardCompanyOptions} />
        <label htmlFor="cardNumber">할부</label>
        <Select onChange={handleInputChange} value={formData.installment} options={InstallmentOptions} />
        <label htmlFor="cardNumber">카드번호</label>
        <CardNumberInput
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleCardNumberChange}
          onBlur={handleCardNumberBlur}
          error={errors.cardNumber}
        />
        <label htmlFor="cardExpiry">유효기간</label>
        <CardExpiryInput
          id="cardExpiry"
          name="cardExpiry"
          value={formData.cardExpiry}
          onChange={handleCardExpiryChange}
          onBlur={handleCardExpiryBlur}
          error={errors.cardExpiry}
        />

        <label htmlFor="cardCVC">CVC</label>
        <NumberInput
          id="cardCVC"
          name="cardCVC"
          value={formData.cardCVC}
          onChange={handleCardCVCChange}
          onBlur={handleCardCVCBlur}
          maxLength={3}
          placeholder="보안코드(CVC)"
          error={errors.cardCVC}
        />
      </div>
      <Button size="L" color="blue-500" type="submit">
        결제하기
      </Button>
    </form>
  );
};

export default CardPaymentForm;
