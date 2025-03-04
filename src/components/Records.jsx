import axios from "axios";
import { useState, useEffect } from "react";
const Record = () => {
  const [records, setRecords] = useState([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRecords();
  }, []);

  const API_URL = " https://swapi.dev/api/people";

  const fetchRecords = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL);
      console.log(response.data.results);
      setRecords(response?.data?.results);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const addRecords = () => {
    try {
      setIsLoading(true);
      const newRecord = { name: name };
      setRecords([...records, newRecord]);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setName("");
      setIsLoading(false);
    }
  };

  const deleteRecord = (index) => {
    try {
      setIsLoading(true);
      setRecords(records.filter((_, i) => i !== index));
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1>Record Management</h1>
      <div>
        <input
          style={{ margin: "5px" }}
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Enter name to add record"
          type="text"
        />
        <button onClick={addRecords}>Add Record</button>
      </div>

      {records.length > 0 ? (
        <>
          {records.map((record, index) => (
            <>
              <li
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "5px",
                }}
              >
                {`Name = ${record.name}`}
                <button
                  style={{ margin: "5px" }}
                  onClick={() => deleteRecord(index)}
                >
                  Delete Record
                </button>
              </li>
            </>
          ))}
        </>
      ) : (
        <>
          {isLoading ? (
            <>
              {" "}
              <p>Loading.........</p>
            </>
          ) : (
            <>
              <p>No records to show</p>
            </>
          )}
        </>
      )}
    </>
  );
};
export default Record;
