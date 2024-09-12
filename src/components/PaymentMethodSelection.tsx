import React, { useState } from "react";
import Button from "./Button";

type PaymentMethod = "card" | "bank";

interface PaymentMethodOption {
  value: PaymentMethod;
  label: string;
}

interface PaymentMethodSelectionProps {
  onSelect: (method: PaymentMethod) => void;
}

const PAYMENT_METHODS: PaymentMethodOption[] = [
  { value: "card", label: "카드 결제" },
  { value: "bank", label: "계좌 이체" },
];

const PaymentMethodButton: React.FC<{
  method: PaymentMethodOption;
  isSelected: boolean;
  onClick: () => void;
}> = ({ method, isSelected, onClick }) => (
  <Button
    type="button"
    onClick={onClick}
    color="gray-400"
    outlined
    className={`${isSelected ? "!border-blue-500" : ""}`}
  >
    <span className="flex items-center justify-between w-full">
      {method.label}
      {isSelected && <span className="text-blue-500">✓</span>}
    </span>
  </Button>
);

const PaymentMethodSelection: React.FC<PaymentMethodSelectionProps> = ({ onSelect }) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
  };

  const handleSubmit = () => {
    if (selectedMethod) {
      onSelect(selectedMethod);
    }
  };

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-center">결제 방식 선택</h2>
      <div className="space-y-4">
        {PAYMENT_METHODS.map((method) => (
          <PaymentMethodButton
            key={method.value}
            method={method}
            isSelected={selectedMethod === method.value}
            onClick={() => handleMethodSelect(method.value)}
          />
        ))}
      </div>
      <Button type="button" onClick={handleSubmit} disabled={!selectedMethod} className="w-full mt-6" color="blue-500">
        다음 단계로
      </Button>
    </div>
  );
};

export default PaymentMethodSelection;
