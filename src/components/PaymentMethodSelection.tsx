import { useState } from "react";

type PaymentMethod = "card" | "bank";

type PaymentFormProps = {
  onSelect: (data: PaymentMethod) => void;
};

const PaymentMethodSelection: React.FC<PaymentFormProps> = ({ onSelect }) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
  };
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-center">결제 방식 선택</h2>
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => handleMethodSelect("card")}
          className={`w-full p-4 flex items-center justify-between border rounded-lg ${
            selectedMethod === "card" ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          <span className="flex items-center">카드 결제</span>
          {selectedMethod === "card" && <span className="text-blue-500">✓</span>}
        </button>
        <button
          type="button"
          onClick={() => handleMethodSelect("bank")}
          className={`w-full p-4 flex items-center justify-between border rounded-lg ${
            selectedMethod === "bank" ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          <span className="flex items-center">계좌 이체</span>
          {selectedMethod === "bank" && <span className="text-blue-500">✓</span>}
        </button>
      </div>
      <button
        type="button"
        onClick={() => selectedMethod && onSelect(selectedMethod)}
        disabled={!selectedMethod}
        className="w-full mt-6"
      >
        다음 단계로
      </button>
    </div>
  );
};

export default PaymentMethodSelection;
