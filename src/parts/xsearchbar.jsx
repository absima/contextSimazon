import { useContext } from "react";
import { ProjContext } from "../setContext";


export default function Searchbar() {
  const {searchParams, setSearchParams} = useContext(ProjContext);
  return (
    <div>
      <input
        className="input"
        placeholder="Search by ID or name or type ..."
        value={searchParams.get("filter") || ""}
        onChange={(event) => {
          let filter = event.target.value;
          if (filter) {
            setSearchParams({ filter });
          } else {
            setSearchParams({});
          }
        }}
      />
    </div>

  )

}

