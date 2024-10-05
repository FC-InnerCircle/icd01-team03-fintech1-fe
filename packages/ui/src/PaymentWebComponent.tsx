import { createRoot } from "react-dom/client";
import PaymentProcess from "./components/PaymentProcess";
import { PaymentFormData } from "./types";
import styles from "./index.css?inline";

class PaymentWebComponent extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement("div");
    mountPoint.setAttribute("class", "payment-form");
    const shadow = this.attachShadow({ mode: "open" });

    const clientId = this.getAttribute("client-id");

    const styleElement = document.createElement("style");
    styleElement.textContent = styles;
    shadow.appendChild(styleElement);

    const tailwindScript = document.createElement("script");
    tailwindScript.textContent = `
      (() => {
        const tailwind = document.querySelector('style[data-tailwind]');
        if (tailwind) {
          const clonedTailwind = tailwind.cloneNode(true);
          document.currentScript.parentElement.insertBefore(clonedTailwind, document.currentScript);
        }
      })();
    `;
    shadow.appendChild(tailwindScript);

    shadow.appendChild(mountPoint);

    const onSubmit = (paymentForm: PaymentFormData) => {
      console.log("Payment submitted:", paymentForm);
      this.dispatchEvent(
        new CustomEvent("payment-submitted", { detail: paymentForm })
      );
    };

    const root = createRoot(mountPoint);
    root.render(
      <PaymentProcess clientId={clientId || ""} onSubmit={onSubmit} />
    );
  }
}

customElements.define("payment-form", PaymentWebComponent);

export default PaymentWebComponent;
