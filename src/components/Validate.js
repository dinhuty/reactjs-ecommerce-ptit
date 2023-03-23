import React from 'react'

const Validate = (data, type) => {
  const errors = {};
  const regaxPhoneNumberVietNam = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  //     Secure Password requirements

  // Password must contain at least one digit [0-9].
  // Password must contain at least one lowercase Latin character [a-z].
  // Password must contain at least one uppercase Latin character [A-Z].
  // Password must contain at least one special character like ! @ # & ( ).
  // Password must contain a length of at least 8 characters and a maximum of 20 characters.
  if (type === "signUp") {
    // validate Name
    if (!data.Name.trim()) {
      errors.Name = "Nhập tên của bạn";
    } else {
      delete errors.Name;
    }
    // validate Name
    if (!data.PhoneNumber.trim()) {
      errors.PhoneNumber = "Nhập số điện thoại";
    } else if (!regaxPhoneNumberVietNam.test(data.PhoneNumber)) {
      errors.PhoneNumber = "Số điện thoại không đúng";
    }
    else {
      delete errors.PhoneNumber;
    }
    // validate Adress
    if (!data.Address.trim()) {
      errors.Address = "Nhập địa chỉ";
    } else {
      delete errors.Address;
    }
    // validate Email
    if (!data.Email) {
      errors.Email = "Nhập email của bạn";
    } else if (!/\S+@\S+\.\S+/.test(data.Email)) {
      errors.Email = "Sai định dạng email";
    } else {
      delete errors.Email;
    }
    // validate Password
    if (!data.Password) {
      errors.Password = "Nhập mật khẩu";
    }else if (data.Password.length < 8) {
      errors.Password = "Mật khẩu cần ít nhất 8 ký tự";
    }
    else if (!data.Password.match(/[A-Z]/)) {
      errors.Password = "Mật khẩu phải có ít nhất 1 chữ cái viết hoa";
    }
    else if (!data.Password.match(/[0-9]/)) {
      errors.Password = "Mật khẩu phải có ít nhất 1 số";
    }
    else if (!data.Password.match(/[!@#$%^&?*]/)) {
      errors.Password = "Mật khẩu phải có ít nhất 1 kí tự đặc biệt";
    } else {
      delete errors.Password;
    }
    // validate confrim password
    if (!data.ConfrimPassword) {
      errors.ConfrimPassword = "Xác nhận mật khẩu";
    } else if (data.ConfrimPassword !== data.Password) {
      errors.ConfrimPassword = "Mật khẩu không khớp";
    } else {
      delete errors.ConfrimPassword;
    }
  } else {
    // validate Email
    if (!data.Email) {
      errors.Email = "Nhập email của bạn";
    } else if (!/\S+@\S+\.\S+/.test(data.Email)) {
      errors.Email = "Sai định dạng email";
    } else {
      delete errors.Email;
    }
    // validate Password
    if (!data.Password) {
      errors.Password = "Nhập mật khẩu";
    } else if (data.Password.length < 8) {
      errors.Password = "Mật khẩu cần ít nhất 8 ký tự";
    } else {
      delete errors.Password;
    }
  }
  return errors;
};
export default Validate