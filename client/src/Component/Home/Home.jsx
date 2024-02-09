import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { FetchUserDetails } from "../Axios/apis";
import "../../styles/home.css";
import EditDetails from "./EditDetails";

const Home = () => {
  const [table, setTable] = useState([]);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    age: "",
    dob: "",
    contact: "",
    userId: "",
  });

  const handlEdit = (data) => {
    setUser({
      username: data.username,
      email: data.email,
      age: data.age,
      dob: data.dob,
      contact: data.contact,
      userId: data.user_id,
    });
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await FetchUserDetails();
      setTable(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="home-main">
      <Container>
        <div>
          <div className="d-flex justify-content-center pt-4"></div>
          <Table bordered hover>
            <thead>
              <tr>
                <th>SNo</th>
                <th>Username</th>
                <th>Email</th>
                <th>Age</th>
                <th>DOB</th>
                <th>Contact</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {table.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>{user.dob}</td>
                  <td>{user.contact}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handlEdit(user)}
                    >
                      Edit
                    </button>{" "}
                    {/* Add an edit button */}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        {show && (
          <EditDetails
            user={user}
            setUser={setUser}
            show={show}
            handleClose={handleClose}
          />
        )}
      </Container>
    </div>
  );
};

export default Home;
