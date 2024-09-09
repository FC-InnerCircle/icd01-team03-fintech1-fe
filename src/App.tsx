import PaymentProcess from "./components/PaymentProcess";
import "./index.css";

function App() {
  return (
    <>
      <div className="text-center">
        <PaymentProcess
          onSubmit={(data) => {
            console.log(data);
          }}
        />
      </div>
    </>
  );
}

export default App;
