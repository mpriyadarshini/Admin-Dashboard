import React, {useState, useEffect} from "react";


const Filter = ({users, setCurrentUsers,setTotalRecords }) => {
    const [query, setQuery] = useState("");
    const search_parameters =
      users && Object.keys(Object.assign({}, ...users));

    useEffect(() => {
        const filteredData = users.filter((item) =>
        search_parameters.some((parameter) =>
          item[parameter].toString().toLowerCase().includes(query)
        )
      );
      if (query !== "") {
        setCurrentUsers(filteredData);
        setTotalRecords(filteredData.length);
      } else {
        setCurrentUsers(users);
        setTotalRecords(users.length);
      }
    },[query,setCurrentUsers,setTotalRecords,users]);
const search = (e) => {
    setQuery(e.target.value);
   
  };
    return(
        <div>
          <input
            type="text"
            placeholder="Search by name, email or role"
            onChange={(e) => search(e)}
            className="w-full p-2 border-2 border-black-500"
          />
        </div>

    )
}

export default Filter;


