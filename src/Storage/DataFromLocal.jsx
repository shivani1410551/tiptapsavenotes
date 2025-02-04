// import { atom } from "recoil";

// let dataFromLocal = atom({
//   key:"DataFromLocal",
//   default: {
//     data: Object.keys(localStorage),
//     state:"home"
//   }
// })

// export default dataFromLocal


import { useState, useEffect } from "react";

const useDataFromLocal = () => {
  const [dataFromLocal, setDataFromLocal] = useState({
    data: Object.keys(localStorage), // Get all keys from localStorage
    state: "home",
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setDataFromLocal({
        data: Object.keys(localStorage), // Update keys when localStorage changes
        state: "home",
      });
    };

    // Listen for storage changes (when localStorage is updated)
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return [dataFromLocal, setDataFromLocal];
};

export default useDataFromLocal;
