import React, { useState } from 'react'
import '../SignIn/signin.css'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import validate from '../Validate';
import { toast, Zoom } from 'react-toastify';
import axios from '../SignIn/axios';
import Loading from '../Loading/Loading';
const SignUp = () => {
  const [focus, setFocus] = useState({});
  const [errors, setErrors] = useState({});
  const [signUpError, setSignUpError] = useState('')
  const [data, setData] = useState({
    Name: "",
    Email: "",
    Password: "",
    ConfrimPassword: "",
    PhoneNumber: "",
    Address: "",

  });
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

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
  // useEffect
  useEffect(() => {
    setErrors(validate(data, "signUp"));
  }, [data, focus]);
  // blurHandler
  const blurHandler = (event) => {
    setFocus({ ...focus, [event.target.name]: true });
  };
  //   submitHandler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setSignUpError('')

    const name = data.Name
    const email = data.Email
    const password = data.Password
    const phoneNumber = data.PhoneNumber
    const passwordConfirmed = data.ConfrimPassword
    const adress = data.Address

    if (Object.keys(errors).length) {
      setSignUpError('Vui lòng nhập đúng thông tin')
      setLoading(false)
      console.log(errors)
      return;
    }
    axios
      .post("https://localhost:7164/api/Accounts/SignUpUser", { name, email, password, phoneNumber, passwordConfirmed, adress })
      .then(res => {
        navigate('/signIn')
        toast.success('Đăng ký thành công', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
          pauseOnFocusLoss: true,
          transition: Zoom,
          role: "alert"
        })
      }).catch(errors => {
        if (!errors?.response) {
          setSignUpError("No Server Response");

        } else if (errors.response?.status === 400) {
          setSignUpError("Tài khoản đã tồn tại");
        } else if (errors.response?.status === 401) {
          setSignUpError("Unauthorized");
        } else {
          setSignUpError("Đăng nhập thất bại");
        }
        setLoading(false)
      })
  };
  return (

    <div className='signin container'>
      <form className='sign-form' onSubmit={handleSubmit}>
        <p className='sign-title'>Đăng ký</p>
        {signUpError && <p className="signIn__error">{signUpError}</p>}
        <div className="sign-input">
          <input
            className='input'
            type="text"
            name="Name"
            value={data.Name}
            onChange={changeHandler}
            onBlur={blurHandler}
            placeholder='Name'
          />
          {errors.Name && focus.Name && <span className='error'>{errors.Name}</span>}
        </div>
        <div className='sign-input'>
          <input
            className='input'
            type="text"
            name="Email"
            value={data.Email}
            onChange={changeHandler}
            onBlur={blurHandler}
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
            onBlur={blurHandler}
            placeholder="Mật khẩu"
          />
          {errors.Password && focus.Password && <span className='error'>{errors.Password}</span>}
        </div>
        <div className='sign-input'>
          <input
            className='input'
            type="Password"
            name="ConfrimPassword"
            value={data.ConfrimPassword}
            onChange={changeHandler}
            onBlur={blurHandler}
            placeholder="Xác nhận mật khẩu"
          />
          {errors.ConfrimPassword && focus.ConfrimPassword && (
            <span className='error'>{errors.ConfrimPassword}</span>
          )}
        </div>
        <div className="sign-input">
          <input
            className='input'
            type="text"
            name="PhoneNumber"
            value={data.PhoneNumber}
            onChange={changeHandler}
            onBlur={blurHandler}
            placeholder='Số điện thoại'
          />
          {errors.PhoneNumber && focus.PhoneNumber && <span className='error'>{errors.PhoneNumber}</span>}
        </div>
        <div className="sign-input">
          <input
            className='input'
            type="text"
            name="Address"
            value={data.Address}
            onChange={changeHandler}
            onBlur={blurHandler}
            placeholder='Địa chỉ'
          />
          {errors.Address && focus.Address && <span className='error'>{errors.Address}</span>}
        </div>
        <div className='sign-input sign-btn'>
          {!loading ? <button className='sign-in__btn' type="submit">Đăng ký</button> : <Loading />}
          <div className="dir_signup">
            <p>Bạn đã có tài khoản? </p>
            <Link className='sign-up__btn' to="/signIn">Đăng nhập ngay!</Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignUp
