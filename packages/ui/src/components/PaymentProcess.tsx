import React, { useState } from "react";
import CardPaymentForm from "./CardPaymentForm";
import { PaymentFormData } from "../types";
import PaymentMethodSelection from "./PaymentMethodSelection";

type PaymentStep = "method-selection" | "card-payment";

type PaymentProcessProps = {
  clientId: string;
  onSubmit: (data: PaymentFormData) => void;
};

const PaymentProcess: React.FC<PaymentProcessProps> = ({
  clientId,
  onSubmit,
}) => {
  console.log(clientId);
  const [currentStep, setCurrentStep] =
    useState<PaymentStep>("method-selection");
  const [, setPaymentMethod] = useState<"card" | "bank" | null>(null);

  const handleMethodSelect = (method: "card" | "bank") => {
    setPaymentMethod(method);
    if (method === "card") {
      setCurrentStep("card-payment");
    } else {
      console.log("Bank transfer selected");
    }
  };

  const handleCardPaymentSubmit = (data: PaymentFormData) => {
    onSubmit(data);
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-white rounded-lg shadow-md">
      {currentStep === "method-selection" && (
        <PaymentMethodSelection onSelect={handleMethodSelect} />
      )}
      {currentStep === "card-payment" && (
        <CardPaymentForm onSubmit={handleCardPaymentSubmit} />
      )}
    </div>
  );
};

export default PaymentProcess;
