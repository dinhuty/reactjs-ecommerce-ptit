import React, { useState } from 'react'
import '../SignIn/signin.css'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import validate from '../Validate';
import axios from "axios";

const Login = () => {
    const [focus, setFocus] = useState({});
    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState('')
    const [data, setData] = useState({
        Email: "",
        Password: "",
    });

    const navigate = useNavigate()

    //   changeHandler
    const changeHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };


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
        setLoginError()
        const email = data.Email
        const password = data.Password
        if (Object.keys(errors).length) {
            setLoginError('Vui lòng nhập đúng thông tin')
            return;
        }
        axios
            .post("https://localhost:7164/api/Accounts/SignIn", { email, password })
            .then(res => {
                const token = res.data.token;
                const user = res.data.user;
                setLoginError('')
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
                        onBlur={focusHandler}
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
                        onBlur={focusHandler}
                        placeholder="Mật khẩu"
                    />
                    {errors.Password && focus.Password && <span className='error'>{errors.Password}</span>}
                </div>

                <div className='sign-input sign-btn'>
                    <button className='sign-in__btn' type="submit">Đăng nhập</button>
                </div>
            </form>
        </div>

    )
}

export default Login
