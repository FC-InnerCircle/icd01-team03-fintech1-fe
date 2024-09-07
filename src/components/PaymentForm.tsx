import { useState, type FormEvent } from "react";
import { CardNumberInput } from "./CardNumberInput";
import { CardExpiryInput, type ExpiryDate } from "./CardExpriyInput";
import { NumberInput } from "./NumberInput";

export type PaymentFormData = {
  cardNumber: string;
  cardExpiry: ExpiryDate;
  cardCVC: string;
};
type PaymentFormProps = {
  onSubmit: (cardNumber: PaymentFormData) => void;
};

const PaymentForm = ({ onSubmit }: PaymentFormProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState<ExpiryDate>({} as ExpiryDate);
  const [cardCVC, setCardCVC] = useState("");

  const handleCardNumberChange = (value: string) => {
    setCardNumber(value);
  };

  const handleCardExpiryChange = (value: ExpiryDate) => {
    setCardExpiry(value);
  };

  const handleCardCVCChange = (value: string) => {
    setCardCVC(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ cardNumber, cardExpiry, cardCVC });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="cardNumber">카드번호</label>
        <CardNumberInput
          type="text"
          inputMode="numeric"
          id="cardNumber"
          name="cardNumber"
          value={cardNumber || ""}
          onChange={handleCardNumberChange}
        />

        <CardExpiryInput onChange={handleCardExpiryChange} />
        <NumberInput maxLength={3} placeholder="보안코드(CVC)" onChange={handleCardCVCChange} />
      </div>
      <button type="submit">결제하기</button>
    </form>
  );
};

export default PaymentForm;
