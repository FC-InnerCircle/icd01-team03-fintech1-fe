import tw from "twin.macro";
import PaymentForm from "./components/PaymentForm";

function App() {
  return (
    <>
      <div css={tw`text-center`}>
        <PaymentForm
          onSubmit={(data) => {
            console.log(data);
          }}
        />
      </div>
    </>
  );
}

export default App;
