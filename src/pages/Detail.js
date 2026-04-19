import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState({
    name: '',
    type: '',
    status: '',
    riskLevel: ''
  });

  const [loading, setLoading] = useState(true);

  // загрузка данных
  useEffect(() => {
    axios.get(`http://localhost:5000/criticalObjects/${id}`)
      .then(res => {
        setItem(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        alert("Ошибка загрузки");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:5000/criticalObjects/${id}`, item)
      .then(() => {
        alert("Обновлено!");
        navigate('/');
      })
      .catch(err => {
        console.error(err);
        alert("Ошибка обновления");
      });
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <div>
      <h1>Редактирование объекта</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={item.name}
          onChange={handleChange}
          required
        />
        <input
          name="type"
          value={item.type}
          onChange={handleChange}
          required
        />
        <input
          name="status"
          value={item.status}
          onChange={handleChange}
          required
        />
        <input
          name="riskLevel"
          value={item.riskLevel}
          onChange={handleChange}
          required
        />
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
};

export default Detail;