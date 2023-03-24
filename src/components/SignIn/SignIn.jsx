import React, { useState } from 'react'
import './signin.css'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import validate from '../Validate';
import { useDispatch } from 'react-redux';
import { authActions } from '../Redux/authSlice';
import { selectToken } from '../Redux/authSlice';
import { toast } from 'react-toastify';
import axios from './axios';
import Loading from '../Loading/Loading';

const SignIn = () => {
  const [focus, setFocus] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false)
  console.log("Loading" + loading)
  const [loginError, setLoginError] = useState('')
  const [data, setData] = useState({
    Email: "",
    Password: "",
  });

  const navigate = useNavigate()
  const dispatch = useDispatch()

  //   changeHandler
  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/')
    }
  }, []);
  useEffect(() => {
    setErrors(validate(data, "Login"));
  }, [data, focus]);

  const focusHandler = (event) => {
    setFocus({ ...focus, [event.target.name]: true });
  };

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const email = data.Email
    const password = data.Password
    if (Object.keys(errors).length) {
      toast('Vui lòng nhập đúng thông tin')
      return;
    }
    axios
      .post("https://localhost:7164/api/Accounts/SignIn", { email, password })
      .then(res => {
        const token = res.data.token;
        const user = res.data.user;
        console.log(token)
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);
        setLoginError('')
        dispatch(authActions.getToken())
        dispatch(authActions.isLogin())
        navigate('/')
        toast('longin thành công')

      }).catch(errors => {
        if (!errors?.response) {
          setLoginError('No Server Response')
        } else if (errors.response?.status === 400) {
          setLoginError("Sai tài khoản hoặc mật khẩu");
        } else if (errors.response?.status === 401) {
          setLoginError("Unauthorized");
        } else {
          setLoginError("Đăng nhập thất bại");
        }
        setLoading(false)

      })

  };
  return (
    <div className='signin container'>
      <form className='sign-form' onSubmit={handleSubmit}>
        {/* {loading && <Loading />} */}
        <p className='sign-title'>Login</p>
        {loginError && <p className="signIn__error">{loginError}</p>}
        <div className='sign-input'>
          <input
            className='input'
            type="text"
            name="Email"
            value={data.Email}
            onChange={changeHandler}
            onFocus={focusHandler}
            placeholder="Email"
          />
          {errors.Email && focus.Email && <span className='error'>{errors.Email}</span>}
        </div>
        <div className='sign-input'>
          <input
            className='input'
            type="Password"
            name="Password"
            value={data.Password}
            onChange={changeHandler}
            onFocus={focusHandler}
            placeholder="Mật khẩu"
          />
          {errors.Password && focus.Password && <span className='error'>{errors.Password}</span>}
        </div>

        <div className='sign-input sign-btn'>
          {!loading ? <button className='sign-in__btn' type="submit">Đăng nhập</button> : <Loading />}

          {/* <button className={loading ? 'sign-in__btn__load' : 'sign-in__btn'} type="submit">Đăng nhập</button> */}
          <div className="dir_signup">
            <p>Bạn chưa có tài khoản? </p>
            <Link className='sign-up__btn' to="/signUp">Đăng ký ngay!</Link>
          </div>
        </div>
      </form>
    </div>

  )
}

export default SignIn