import { createRoot } from "react-dom/client";
import PaymentForm, { type PaymentFormData } from "./components/PaymentForm";

class PaymentWebComponent extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement("div");
    this.attachShadow({ mode: "open" }).appendChild(mountPoint);

    const onSubmit = (paymentForm: PaymentFormData) => {
      console.log("Payment submitted with card number:", paymentForm);
      this.dispatchEvent(new CustomEvent("payment-submitted", { detail: { cardNumber: paymentForm } }));
    };

    const root = createRoot(mountPoint);
    root.render(<PaymentForm onSubmit={onSubmit} />);
  }
}

customElements.define("payment-form", PaymentWebComponent);

export default PaymentWebComponent;
