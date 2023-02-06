import { useEffect, useState } from "react";
import {
  deleteUser,
  getUser,
  postUser,
  updateUser,
} from "./services/userService";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function App() {
  const [arrUser, setArrUser] = useState([]);
  const [user, setUser] = useState();
  const [updateNameUser, setUpdateNameUser] = useState();
  const [updateIDUser, setUpdateIDUser] = useState();
  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  useEffect(() => {
    listUser();
  }, []);

  function listUser() {
    getUser()
      .then((res) => setArrUser(res.data))
      .catch((err) => console.log(err));
  }
  const handleDelete = (index) => {
    deleteUser(index)
      .then(() => listUser())
      .catch((err) => console.log(err));
  };

  const handleAddUser = () => {
    postUser(user)
      .then(() => {
        listUser();
        setUser("");
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (index) => {
    setShow(true);
    setUpdateIDUser(index);
    const getUser = arrUser.find((user) => user.id === index);
    setUpdateNameUser(getUser.name);
  };

  const element = arrUser.map((data, index) => {
    return (
      <div key={data.id}>
        <div>{index + 1}</div>
        <div>{data.name}</div>
        <div>
          <button onClick={() => handleDelete(data.id)}>Delete</button>
        </div>
        <div>
          <button onClick={() => handleUpdate(data.id)}>Update</button>
        </div>
      </div>
    );
  });

  const handleUpdateNameUser = (e) => {
    setUpdateNameUser(e.target.value);
  };

  const handleSave = () => {
    updateUser(updateNameUser, updateIDUser)
      .then(() => {
        listUser();
        setShow(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <div>
        <input value={user} onChange={(e) => setUser(e.target.value)} />
        <button onClick={handleAddUser}>Add User</button>
      </div>
      {element}

      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              onChange={handleUpdateNameUser}
              value={updateNameUser}
              style={{ width: "100%" }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

export default App;
