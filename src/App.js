import React, { useEffect, useState } from "react";
import Pagination from "./paginate";
import "./App.css";
import EditModal from "./EditModal";
import { MdDelete } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
function App() {
  const [adminData, setAdminData] = useState();
  const [query, setQuery] = useState("");
  const [totalRecords, setTotalRecords] = useState();
  const [currentRecords, setCurrentRecords] = useState();
  const [loading, setLoading] = useState(false);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [selectData, setSelectData] = useState();
  const [showModal, setShowModal] = useState(false);
  const search_parameters =
    adminData && Object.keys(Object.assign({}, ...adminData));
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const numberOfPages = Math.ceil(46 / recordsPerPage);
  const search = (e) => {
    setQuery(e.target.value);
    const filteredData = adminData.filter((item) =>
      search_parameters.some((parameter) =>
        item[parameter].toString().toLowerCase().includes(query)
      )
    );
    if (query !== "") {
      setCurrentRecords(filteredData);
      setTotalRecords(filteredData.length);
    } else {
      setCurrentRecords(adminData);
      setTotalRecords(adminData.length);
    }
  };
  // console.log("test3", numberOfPages);
  const remove = (id) => {
    const dataAfterDelete = currentRecords.filter((item) => {
      return item.id !== id;
    });
    setCurrentRecords(dataAfterDelete);
  };

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    console.log("test1", isCheck);
    if (isCheckAll) {
      setIsCheck(currentRecords.map((li) => li.id));
    } else {
      setIsCheck([]);
    }
    console.log("test2", isCheck);
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    if (!isCheck.includes(id)) {
      setIsCheck([...isCheck, id]);
    }
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
    console.log("test3", isCheck);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const removeSelected = () => {
    const dataAfterSelectedDelete = currentRecords.filter((el) => {
      return !isCheck.includes(el.id);
    });
    setCurrentRecords(dataAfterSelectedDelete);
  };

  useEffect(() => {
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    setCurrentRecords(
      adminData && adminData.slice(indexOfFirstRecord, indexOfLastRecord)
    );
  }, [adminData, currentPage]);

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const res = data;
        setAdminData(res);
        setTotalRecords(res.length);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="m-8">
      <div>
        <input
          type="text"
          placeholder="Search by name, email or role"
          onChange={(e) => search(e)}
          className="w-full p-2 border-2 border-black-500"
        />
      </div>
      <div class="flex flex-col mt-6">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div class="overflow-hidden border-b border-gray-200 rounded-md shadow-md">
              <table class="min-w-full overflow-x-scroll divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-xs font-bold tracking-wider text-left text-gray-500 uppercase"
                    >
                      <input
                        type="checkbox"
                        name="selectAll"
                        id="selectAll"
                        onChange={handleSelectAll}
                        checked={!isCheckAll}
                      ></input>
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-xs font-bold tracking-wider text-left text-gray-500 uppercase"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-xs font-bold tracking-wider text-left text-gray-500 uppercase"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-xs font-bold tracking-wider text-left text-gray-500 uppercase"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-xs font-bold tracking-wider text-left text-gray-500 uppercase"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                {currentRecords &&
                  currentRecords.map((item) => {
                    return (
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr class="transition-all hover:bg-gray-100 hover:shadow-lg">
                          <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                            <input
                              type="checkbox"
                              id={item.id}
                              onChange={handleClick}
                              checked={isCheck.includes(item.id)}
                            ></input>
                          </td>
                          <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {item.name}
                          </td>
                          <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {item.email}
                          </td>
                          <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap capitalize">
                            {item.role}
                          </td>
                          <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                            <div className="flex">
                              <span className="px-2">
                                <TiEdit
                                  size="20"
                                  onClick={() => {
                                    setShowModal(true);
                                    setSelectData(item);
                                  }}
                                />
                              </span>
                              <span>
                                <MdDelete
                                  size="20"
                                  onClick={() => remove(item.id)}
                                />
                              </span>
                            </div>
                          </td>
                        </tr>
                        {showModal && (
                          <EditModal
                            closeModal={closeModal}
                            data={selectData}
                          />
                        )}
                      </tbody>
                    );
                  })}
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="float-left">
          <button
            onClick={removeSelected}
            className="rounded-full bg-pink-500 p-3 text-white"
          >
            Delete Selected
          </button>
        </div>
        <div className="float-right">
          <Pagination
            numberOfPages={numberOfPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
