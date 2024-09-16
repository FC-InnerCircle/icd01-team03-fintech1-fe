import "./index.css";
import PaymentWebComponent from "./PaymentWebComponent";

// IIFE나 UMD에서 전역으로 등록될 수 있도록 window에 할당
if (typeof window !== "undefined") {
  (window as any).PaymentSDK = {
    PaymentWebComponent,
  };
}

export { PaymentWebComponent };
