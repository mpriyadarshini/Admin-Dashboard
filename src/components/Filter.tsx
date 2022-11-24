import React, { useState, useEffect, ChangeEvent } from "react";
import { User } from "../client";

type FilterProps = {
  users: User[],
  setCurrentUsers: (users: User[]) => void;
  setTotalRecords: (count: number) => void;
};

const Filter = ({ users, setCurrentUsers, setTotalRecords }: FilterProps) => {
  const [query, setQuery] = useState("");
  const searchParameters =
    users && Object.keys(Object.assign({}, ...users));

  useEffect(() => {
    const filteredData = users.filter((item: any) =>
      searchParameters.some((parameter) =>
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
  }, [query, users]);
  const search = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);

  };
  return (
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


