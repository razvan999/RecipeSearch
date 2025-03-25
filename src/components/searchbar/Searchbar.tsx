import "./Searchbar.css";
import "../../index.css";
import { useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Areas, Categories } from "../../DataTypes";

const Searchbar = ({ getData }: { getData: (value: string) => void }) => {
  const inputFieldValue = useRef<HTMLInputElement>(null);
  const [selectedValue, setSelectedValue] = useState("");

  const [areas, setAreas] = useState<Areas[] | null>(null);
  const [categories, setCategories] = useState<Categories[] | null>(null);

  const fetchedAreas = useFetch({
    api_call: "areas",
  });

  const fetchedCategories = useFetch({
    api_call: "categories",
  });

  useEffect(() => {
    if (fetchedAreas.error) {
      console.error(fetchedAreas.error);
    } else {
      setAreas(fetchedAreas.data as Areas[]);
    }

    if (fetchedCategories.error) {
      console.error(fetchedCategories.error);
    } else {
      setCategories(fetchedCategories.data as Categories[]);
    }
  }, [fetchedAreas, fetchedCategories]);

  const onclickHandler = () => {
    const value = inputFieldValue.current?.value;
    if (value) {
      getData(value);
    }
  };

  useEffect(() => {
    inputFieldValue.current?.focus();
  }, []);

  const selectAreaCategories = (
    <div className="filters">
      <div>
        <select
          className="w-[200px] border border-gray-300 p-2 rounded-md"
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
        >
          <option value="" disabled>
            Select an option
          </option>
          {areas?.map((area, index) => {
            return (
              <option key={index} value={area.strArea}>
                {area.strArea}
              </option>
            );
          })}
        </select>

        <select
          className="w-[200px] border border-gray-300 p-2 rounded-md"
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
        >
          <option value="" disabled>
            Select an option
          </option>
          {categories?.map((category, index) => {
            return (
              <option key={index} value={category.strCategory}>
                {category.strCategory}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );

  return (
    <div className="searchbarComponent">
      <div className="searchbarContainer">
        <div className="searchbar">
          <input
            ref={inputFieldValue}
            type="text"
            placeholder="Enter the ingredient..."
          />
          <button className="card-button" onClick={onclickHandler}>
            Search
          </button>
        </div>
        {/* {selectAreaCategories} */}
      </div>
    </div>
  );
};

export default Searchbar;
