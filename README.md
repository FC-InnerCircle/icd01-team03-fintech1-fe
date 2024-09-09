# icd01-team03-fintech1-fe

## 설치
```bash
npm install
```

## 실행
```bash
npm run dev
```

## 빌드
```bash
npm run build
```
## html에 잘 들어가지는 지 확인
1. 빌드 된 폴더 (./dist) 복사
2. 복사한 폴더 ./public에 붙여넣기
3. `npx http-server` 실행
4. http://localhost:8080/ 에 접속
5. 나오는지 확인

## react 프로젝트에 적용 (추후 바로 추가 가능하도록 수정 예정입니다.)
1. 빌드 된 폴더 (./dist) 복사
2. react 프로젝트에 붙여넣기
3. react 프로젝트 html <head> 태그 내에 `  <script src="./src/sdk/payment-sdk.iife.js"></script>` 추가
4. type 추가
``` typescript
// src/types/global.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    'payment-form': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      'client-id'?: string;
    };
  }
}
```

```json
// tsconfig.json
{
  compilerOptions: {
    //...

    "typeRoots": [".[build 폴더 붙여넣은 path]/payment-sdk.d.ts", "./src/types"],
  }
}
```

5. 아래 컴포넌트 추가
 ```typescript
 // src/components/PaymentForm.tsx
import {useEffect, useRef} from 'react';

const PaymentForm = () => {
  const formRef = useRef(null);

  useEffect(() => {
    const handlePaymentSubmit = event => {
      console.log('Payment submitted:', event.detail);
      // 결제 처리 로직
    };

    if (formRef.current) {
      formRef.current.addEventListener('payment-submitted', handlePaymentSubmit);
    }

    return () => {
      if (formRef.current) {
        formRef.current.removeEventListener('payment-submitted', handlePaymentSubmit);
      }
    };
  }, []);

  return <payment-form ref={formRef} client-id="test-client"></payment-form>;
};

export default PaymentForm;
```
