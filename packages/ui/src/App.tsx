import PaymentProcess from "./components/PaymentProcess";
import "./index.css";

function App() {
  return (
    <>
      <div className="text-center">
        <PaymentProcess
          clientId="1234567890"
          onSubmit={(data) => {
            console.log(data);
          }}
        />
      </div>
    </>
  );
}

export default App;
