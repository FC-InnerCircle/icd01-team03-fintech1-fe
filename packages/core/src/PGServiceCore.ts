interface PaymentRequestData {
  price: number;
  cardNumber: string;
  cvc: string;
  expireDate: string;
  cardCompany: string;
  installmentPeriod: number;
  customerId: string;
  paymentType: "CARD";
  successUrl: string;
  failUrl: string;
}

interface PaymentResponse {
  uuid: string;
  timestamp: string;
}

interface ErrorResponse {
  message: string;
}

type ApiResponse<T> = T & {
  message?: string;
};

class PGServiceSDK {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  private async request<T>(endpoint: string, method: string, data?: any): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${this.apiKey}`,
      },
      body: data ? JSON.stringify(data) : undefined,
    };

    try {
      const response = await fetch(url, options);
      const responseData: ApiResponse<T> = await response.json();

      if (!response.ok) {
        throw this.handleError(response.status, { message: responseData.message || "" });
      }

      return responseData;
    } catch (error) {
      throw error;
    }
  }

  private handleError(status: number, data: ErrorResponse): Error {
    const errorMessages: { [key: number]: string } = {
      400: "카드사 정상 응답 O, 결제 실패 (잔액 부족, 기간 만료, cvc 카드번호 오류...)",
      403: "API 키 오류 (만료 키, uuid 권한 없음)",
      404: "존재 API 404 오류",
      429: "API 키 당 1분당 1000번 이상 호출",
      500: "카드사 정상 응답 X (네트워크 timeout 등)",
    };

    const error = new Error(errorMessages[status] || data.message || "알 수 없는 오류");
    (error as any).status = status;
    (error as any).data = data;
    return error;
  }

  async requestPayment(paymentData: PaymentRequestData): Promise<PaymentResponse> {
    return this.request<PaymentResponse>("/payments/request", "POST", paymentData);
  }

  async cancelPayment(paymentId: string, uuid: string): Promise<ApiResponse<{}>> {
    return this.request(`/payment/${paymentId}/cancel`, "POST", { uuid });
  }

  async confirmPayment(paymentId: string, uuid: string): Promise<ApiResponse<{}>> {
    return this.request(`/payment/${paymentId}/confirm`, "POST", { uuid });
  }
}

export default PGServiceSDK;
