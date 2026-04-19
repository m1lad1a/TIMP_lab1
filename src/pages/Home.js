import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // загрузка данных
  useEffect(() => {
    axios.get("https://timp-lab1-vosl.onrender.com/criticalObjects")
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        alert("Ошибка загрузки данных");
        setLoading(false);
      });
  }, []);

  // удаление
  const deleteItem = (id) => {
    axios.delete(`https://timp-lab1-vosl.onrender.com/criticalObjects/${id}`)
      .then(() => {
        setData(data.filter(item => item.id !== id));
      })
      .catch(err => {
        console.error(err);
        alert("Ошибка удаления");
      });
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <div>
      <h1>Объекты критической инфраструктуры</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            <Link to={`/detail/${item.id}`}>
              {item.name} ({item.type})
            </Link>
            <button onClick={() => deleteItem(item.id)} style={{ marginLeft: "10px" }}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
      <Link to="/add">Добавить объект</Link>
    </div>
  );
};

export default Home;