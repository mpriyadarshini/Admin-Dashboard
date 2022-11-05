import React, { useEffect, useState } from "react";
import Pagination from "./Paginate";
import "./App.css";
import EditModal from "./EditModal";
import { MdDelete } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import { loadData, User } from "../../client";
import Filter from  "./Filter"

export default function DataTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [currentUsers, setCurrentUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState<number[]>([]);
    const [selectData, setSelectData] = useState<User>();
    const [showModal, setShowModal] = useState(false);
    
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const numberOfPages = Math.ceil(totalRecords / recordsPerPage);
    

    
    // console.log("test3", numberOfPages);
    const remove = (id) => {
      const dataAfterDelete = currentUsers.filter((item) => {
        return item.id !== id;
      });
      setCurrentUsers(dataAfterDelete);
    };
  
    const handleSelectAll = (e) => {
      setIsCheckAll(!isCheckAll);
      console.log("test1", isCheck);
      if (isCheckAll) {
        setIsCheck(currentUsers.map((li) => li.id));
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
      const dataAfterSelectedDelete = currentUsers.filter((el) => {
        return !isCheck.includes(el.id);
      });
      setCurrentUsers(dataAfterSelectedDelete);
    };
  
    useEffect(() => {
      const indexOfLastRecord = currentPage * recordsPerPage;
      const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
      setCurrentUsers(
        users && users.slice(indexOfFirstRecord, indexOfLastRecord)
      );
    }, [users, currentPage,setCurrentUsers]);
  
    useEffect(() => {
      setLoading(true);
      
        loadData().then((data) => {
          const res = data;
          setUsers(res);
          setLoading(false);
        })
    }, [setLoading, setUsers]);

    return (
      <div className="m-8">
        <Filter users={users} setCurrentUsers={setCurrentUsers} setTotalRecords={setTotalRecords}/>
        <div className="flex flex-col mt-6">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden border-b border-gray-200 rounded-md shadow-md">
                <table className="min-w-full overflow-x-scroll divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold tracking-wider text-left text-gray-500 uppercase"
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
                        className="px-6 py-3 text-xs font-bold tracking-wider text-left text-gray-500 uppercase"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold tracking-wider text-left text-gray-500 uppercase"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold tracking-wider text-left text-gray-500 uppercase"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold tracking-wider text-left text-gray-500 uppercase"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  {currentUsers &&
                    currentUsers.map((item) => {
                      return (
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                              <input
                                type="checkbox"
                                id={item.id.toString()}
                                onChange={handleClick}
                                checked={isCheck.includes(item.id)}
                              ></input>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                              {item.name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                              {item.email}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap capitalize">
                              {item.role}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
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
  