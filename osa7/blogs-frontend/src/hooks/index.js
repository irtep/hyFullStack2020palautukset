import { useState, useEffect } from 'react';
import axios from 'axios';

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect( () => {
    axios
      .get(baseUrl)
      .then((res) => {
        setResources(res.data);
      })
      .catch( (err) => {
        console.log(err);
      });
  }, [baseUrl]);

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource);
    setResources ([...resources, response.data]);
  };

  const service = {
    create
  };

  return [
    resources, service
  ];
};

export const useField = (type, iId) => {
  const [value, setValue] = useState('');
  const [id] = useState(iId);
  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
    id
  };
};
