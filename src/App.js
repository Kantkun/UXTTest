import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://api.sampleapis.com/beers/ale");
      setData(res.data);
    };
    fetchData();
  }, []);

  // console.log(data);

  const handleSelect = (idx) => {
    const arr = [...selected];
    const findIdx = arr.findIndex((i) => i === idx);
    console.log(findIdx);
    if (findIdx > -1) {
      arr.splice(findIdx, 1);
    } else {
      arr.push(idx);
    }
    setSelected(arr);
  };

  const sorted = () => {
    const arr = [...data];
    const sortedArr = arr
      .sort((a, b) => b.rating.average - a.rating.average)
      .slice(0, 5);
    setData(sortedArr);
  };

  return (
    <div>
      <div className="m-2 text-success fw-bold fs-1">UXT : Beer Test</div>
      <div className="d-flex flex-row">
        <div className="mx-2">
          <button onClick={() => sorted()}>5 Best beers</button>
        </div>
        <div className="mx-2">
          <button>5 Best value beers</button>
        </div>
      </div>
      {data?.map((i, idx) => {
        return (
          <div
            className={`w-50 mx-2 my-2 p-2 border border-primary rounded ${
              selected.findIndex((i) => i === idx) === -1
                ? "bg-white"
                : "bg-warning"
            }`}
          >
            <img src={i.image} alt="Not found" />
            <div className="mt-4">Name : {i.name}</div>
            <div className={idx % 2 === 0 ? "text-success" : "text-danger"}>
              Price : {i.price}
            </div>
            <div>Rating : {i.rating.average.toFixed(2)}</div>
            <button onClick={() => handleSelect(idx)}>select</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
