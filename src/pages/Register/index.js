import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import FormError from "../../components/FormError";
import { registerUser } from "../../services";
import FormAlert from "../../components/FormAlert";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { checkStatusResponse } from "../../utils/checkStatusResponse";
import { validateEmail } from "../../utils/validateEmail";
import { validatePassword } from "../../utils/validatePassword";
import { validateUsername } from "../../utils/validateUsername";
import { CONSTANTS } from "../../common/constant";

const Section = styled.section`
  margin: 0 auto;
  max-width: 720px;
  width: 100%;
`;
const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
`;
const Form = styled.form`
  padding: 30px 20px;
  border: 1px solid #ebebeb;
`;
const Input = styled.input`
  outline: none;
  border: none;
  border-bottom: 1px solid #999;
  background-color: transparent;
  width: 100%;
  font-size: 16px;
  margin: 15px 0;
`;
const ButtonSubmit = styled.button`
  border: 1px solid #ebebeb;
  padding: 10px 20px;
  border-radius: 2px;
`;
const FooterForm = styled.div`
  float: right;
`;

function Register() {
  const [values, setValues] = useState({
    fullname: "",
    phone: "",
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [errors, setErrors] = useState({});
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const { t } = useTranslation(CONSTANTS.TRANSLATE_COMMON);

  const handleRegister = async () => {
    let userRegister = {
      id: uuidv4(),
      fullname: values.fullname,
      username: values.username,
      phone: values.phone,
      email: values.email,
      password: values.password,
    };
    try {
      const res = await registerUser(userRegister);
      if (checkStatusResponse(res)) {
        setRegisterSuccess(true);
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isSubmit = true;
    const inputErrors = {};

    if (
      values.fullname === null ||
      values.fullname === undefined ||
      values.fullname === ""
    ) {
      inputErrors.fullname = t("register.inputErrors.fullname.missing");
      isSubmit = false;
    }

    if (
      values.username === null ||
      values.username === undefined ||
      values.username === ""
    ) {
      inputErrors.username = t("register.inputErrors.username.missing");
      isSubmit = false;
    } else {
      if (!validateUsername(values.username)) {
        inputErrors.username = t("register.inputErrors.username.valid");
        isSubmit = false;
      }
    }

    if (
      values.phone === null ||
      values.phone === undefined ||
      values.phone === ""
    ) {
      inputErrors.phone = t("register.inputErrors.phone.missing");
      isSubmit = false;
    }

    if (
      values.email === null ||
      values.email === undefined ||
      values.email === ""
    ) {
      inputErrors.email = t("register.inputErrors.email.missing");
      isSubmit = false;
    } else {
      if (!validateEmail(values.email)) {
        inputErrors.email = t("register.inputErrors.email.valid");
        isSubmit = false;
      }
    }

    if (
      values.password === null ||
      values.password === undefined ||
      values.password === ""
    ) {
      inputErrors.password = t("register.inputErrors.password.missing");
      isSubmit = false;
    } else {
      if (!validatePassword(values.password)) {
        inputErrors.password = t("register.inputErrors.password.valid");
        isSubmit = false;
      }
    }

    if (
      values.cpassword === null ||
      values.cpassword === undefined ||
      values.cpassword === ""
    ) {
      inputErrors.cpassword = t("register.inputErrors.cpassword.missing");
      isSubmit = false;
    } else {
      if (values.cpassword !== values.password) {
        inputErrors.cpassword = t("register.inputErrors.cpassword.confirm");
        isSubmit = false;
      }
    }

    if (!isSubmit) {
      setErrors(inputErrors);
    } else {
      if (Object.keys(errors).length > 0) {
        setErrors({});
      }
      setValues({
        ...values,
        fullname: "",
        phone: "",
        username: "",
        email: "",
        password: "",
        cpassword: "",
      });

      handleRegister();
    }
  };

  return (
    <Section>
      <Title>{t("register.title")}</Title>
      <Form onSubmit={handleSubmit}>
        {registerSuccess && (
          <FormAlert
            alert={t("register.alert.successfully")}
            color="#379543"
            isRegister="true"
          />
        )}
        <Input
          type="text"
          id="fullname"
          name="fullname"
          placeholder="Fullname"
          value={values.fullname}
          onChange={handleOnChange}
        />
        {errors.fullname !== undefined && <FormError error={errors.fullname} />}
        <Input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={values.username}
          onChange={handleOnChange}
        />
        {errors.username !== undefined && <FormError error={errors.username} />}
        <Input
          type="number"
          id="phone"
          name="phone"
          placeholder="Phone"
          value={values.phone}
          onChange={handleOnChange}
        />
        {errors.phone !== undefined && <FormError error={errors.phone} />}
        <Input
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleOnChange}
        />
        {errors.email !== undefined && <FormError error={errors.email} />}
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleOnChange}
        />
        {errors.password !== undefined && <FormError error={errors.password} />}
        <Input
          type="password"
          id="cpassword"
          name="cpassword"
          placeholder="Confirm Password"
          value={values.cpassword}
          onChange={handleOnChange}
        />
        {errors.cpassword !== undefined && (
          <FormError error={errors.cpassword} />
        )}
        <ButtonSubmit type="submit">{t("register.button.submit")}</ButtonSubmit>
        <FooterForm>
          {t("register.have.already.account")}{" "}
          <Link to="/login">{t("register.login.now")}</Link>
        </FooterForm>
      </Form>
    </Section>
  );
}

export default Register;
