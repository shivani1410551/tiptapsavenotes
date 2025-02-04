// import { selector } from "recoil";
// import DataFromLocal from "./DataFromLocal"


// let processed = selector({
//   key: "ProcessedData",
//   get: ({ get }) => {
//     let dataKeys = get(DataFromLocal)
//  return dataKeys.data.map(key => JSON.parse(localStorage.getItem(key)))
// }
// })

// export default processed;




import { useEffect, useState } from "react";

const ProcessedData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const keys = Object.keys(localStorage);

    const parsedData = keys
      .map((key) => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      })
      .filter(Boolean);

    setData(parsedData);
  }, []);
  return (
    <div>
      <h2>Processed Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ProcessedData;
