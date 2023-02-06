import axios from "../utils/baseAxios";

const baseURL = "user";
const getUser = async () => {
  return await axios.get(`${baseURL}`);
};
const deleteUser = async (id) => {
  return await axios.delete(`${baseURL}/${id}`);
};

const postUser = async (name) => {
  return await axios.post(`${baseURL}`, { name });
};

const updateUser = async (name, id) => {
  return await axios.put(`${baseURL}/${id}`, { name });
};

export { getUser, deleteUser, postUser, updateUser };
