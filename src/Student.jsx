import DataTable from "react-data-table-component";
import axios from "axios";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const Student = () => {
  var getUrl = "";
  var postUrl = "";
  var deleteUrl = "";
  var modifyUrl = "";
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({
    name: "",
    class: null,
    course: "",
  });

  const [editStudent, setEditStudent] = useState({
    name: "",
    class: null,
    course: "",
  });

  const [isFetching, setIsFetching] = useState(false);

  const fetchStudent = async () => {
    try {
      let response = await axios.get(getUrl);
      setStudents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () => {
    setStudent({ name: "", class: "", course: "" });
    try {
      let response = await axios.post(postUrl, student);
      console.log(response);
      alert(response.data.Result);
      setIsFetching(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (row) => {
    try {
      setIsFetching(true);
      let response = await axios.delete(deleteUrl + row.id);
      console.log(response);
      alert(response.data.result);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (e, row) => {
    e.preventDefault();
    try {
      setIsFetching(true);
      let response = await axios.put(modifyUrl + row.id, editStudent);
      console.log(response);
      alert(response.data.result);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [isFetching]);

  const columns = [
    {
      name: "ID",
      id: "id",
      selector: (row) => row.id,
    },
    {
      name: "Name",
      id: "name",
      selector: (row) => row.name,
    },
    {
      name: "Class",
      id: "class",
      selector: (row) => row.class,
    },
    {
      name: "Course",
      id: "course",
      selector: (row) => row.course,
    },
    {
      name: "Edit",
      id: "edit",
      cell: (row) => (
        <Popup
          trigger={
            <button className="bg-blue-500 px-1 py-0.5 rounded text-white font-medium hover:bg-blue-700">
              Edit
            </button>
          }
          position="right center"
          closeOnDocumentClick
        >
          <div>
            <form
              onSubmit={(e) => {
                handleEdit(e, row);
              }}
              className="p-2 flex flex-col space-y-2"
            >
              <label htmlFor="name">Name: </label>
              <input
                placeholder={row.name}
                onChange={(e) => {
                  setEditStudent((old) => {
                    return { ...old, name: e.target.value };
                  });
                }}
                className="border border-slate-400"
                id="name"
                type="text"
              />
              <label htmlFor="class">Class: </label>
              <input
                placeholder={row.class}
                onChange={(e) => {
                  setEditStudent((old) => {
                    return { ...old, class: e.target.value };
                  });
                }}
                className="border border-slate-400"
                id="class"
                type="text"
              />
              <label htmlFor="course">Course: </label>
              <input
                placeholder={row.course}
                onChange={(e) => {
                  setEditStudent((old) => {
                    return { ...old, course: e.target.value };
                  });
                }}
                className="border border-slate-400"
                id="course"
                type="text"
              />
              <input
                type="submit"
                value="Submit"
                className="self-center bg-blue-500 px-1 py-0.5 rounded text-white font-medium hover:bg-blue-700"
              />
            </form>
          </div>
        </Popup>
      ),
    },
    {
      name: "Delete",
      id: "delete",
      cell: (row) => (
        <button
          onClick={() => {
            handleDelete(row);
          }}
          className="bg-blue-500 px-1 py-0.5 rounded text-white font-medium hover:bg-blue-700"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <>
      <div>
        <h1 className="text-3xl text-center m-2 p-2">Student Table</h1>
        <form className="m-2 p-4 mr-4 flex justify-end gap-8 items-center">
          <h2 className="text-xl">(Add Student)</h2>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              value={student.name}
              onChange={(e) => {
                setStudent((old) => {
                  return { ...old, name: e.target.value };
                });
              }}
              className="border border-slate-400"
              id="name"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="class">Class: </label>
            <input
              value={student.class}
              onChange={(e) => {
                setStudent((old) => {
                  return { ...old, class: e.target.value };
                });
              }}
              className="border border-slate-400"
              id="class"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="course">Course: </label>
            <input
              value={student.course}
              onChange={(e) => {
                setStudent((old) => {
                  return { ...old, course: e.target.value };
                });
              }}
              className="border border-slate-400"
              id="course"
              type="text"
            />
          </div>
          <button
            onClick={handleAdd}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              aria-hidden="true"
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </form>
        <DataTable
          title="Students List"
          columns={columns}
          data={students}
          dense
          selectableRows
          selectableRowsHighlight
          highlightOnHover
          pagination
          fixedHeader
          defaultSortFieldId="id"
          defaultSortAsc={false}
        />
      </div>
    </>
  );
};

export default Student;
