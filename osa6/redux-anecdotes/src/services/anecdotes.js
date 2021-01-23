import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log(response);
  return response.data
}

const create = async (content) => {
  const response = await axios.post(baseUrl, content)
  return response.data
}

// update a certain field for certain blog
const update = (id, field, newValue) => {
  const data = { field: field, newValue: newValue };
  const req = axios.put(`${baseUrl}/${id}`, data);
  return req.then(res => res.data);
};

const anecdoteServices = { getAll, create, update }

export default anecdoteServices
