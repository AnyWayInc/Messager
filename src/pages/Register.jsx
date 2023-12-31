import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Создать пользователя
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Создать уникальное название картинки
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Обновить профиль
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //Создать пользователя в firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //Создать пустого пользовательский чат на firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">MsgCorp</span>
        <span className="title">Регистрация</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Отображаемое имя" />
          <input required type="email" placeholder="Email" />
          <input required type="password" placeholder="Пароль" />
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Добавьте фотографию профиля</span>
          </label>
          <button disabled={loading}>Войти</button>
          {loading && "Загрузка изображения..."}
          {err && <span>Что-то пошло не так</span>}
        </form>
        <p>
          Вы имеете аккаунт? <Link to="/Login">Войти</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
