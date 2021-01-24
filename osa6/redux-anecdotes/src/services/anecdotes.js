import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
  const response = await axios.post(baseUrl, content)
  return response.data
}

// update votes
const update = (id, content, votes) => {
  const data = { content, votes };
  const req = axios.put(`${baseUrl}/${id}`, data);
  return req.then(res => res.data);
};

const anecdoteServices = { getAll, create, update }

export default anecdoteServices
