import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Form.css";

const Form = () => {
  const nameRef = useRef(null);
  const typeRef = useRef(null);
  const statusRef = useRef(null);
  const riskRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nameRef.current.value || !typeRef.current.value) {
      alert("Заполните обязательные поля");
      return;
    }

    const newObject = {
      name: nameRef.current.value,
      type: typeRef.current.value,
      status: statusRef.current.value,
      riskLevel: riskRef.current.value
    };

    axios.post("https://timp-lab1-vosl.onrender.com/criticalObjects", newObject)
      .then(() => navigate('/'))
      .catch(error => {
        console.error(error);
        alert("Ошибка при добавлении");
      });
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Добавление объекта</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input placeholder="Название" ref={nameRef} required />
        <input placeholder="Тип" ref={typeRef} required />
        <input placeholder="Статус" ref={statusRef} required />
        <input placeholder="Уровень риска" ref={riskRef} required />

        <button className="btn-new" type="submit">
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default Form;