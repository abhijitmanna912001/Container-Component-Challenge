import DataSource from "./components/shared/DataSource";

const App = () => {
  return (
    <div className="mt-[20px]">
      <h1>Welcome to the Fake Store</h1>
      <DataSource
        getDataFunc={getServerData("https://fakestoreapi.com/products")}
        resourceName="products"
      ></DataSource>
    </div>
  );
};

export default App;
