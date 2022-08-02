import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import FormError from "../../components/FormError";
import { loginUser } from "../../services";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginFailed, loginStarted, loginSuccess } from "../../store/authSlice";
import Cookies from "js-cookie";
import { checkStatusResponse } from "../../utils/checkStatusResponse";
import { validateEmail } from "../../utils/validateEmail";
import { validatePassword } from "../../utils/validatePassword";
import { LANGUAGE } from "../../common/constant";

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

function Login() {
  const [values, setValues] = useState({
    email: "dong2@gmail.com",
    password: "Anh1234@",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { t } = useTranslation(LANGUAGE.TRANSLATE_COMMON);
  const dispatch = useDispatch();

  const handleLogin = async (user) => {
    dispatch(loginStarted());
    try {
      const res = await loginUser(user);
      if (checkStatusResponse(res)) {
        dispatch(loginSuccess(res.data));
        Cookies.set("user", JSON.stringify(res.data));
        toast.success(t("login.alert.successfully"));
        navigate("/", { replace: true });
      }
    } catch (error) {
      dispatch(loginFailed());
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
      values.email === null ||
      values.email === undefined ||
      values.email === ""
    ) {
      inputErrors.email = t("login.inputErrors.email.missing");
      isSubmit = false;
    } else {
      if (!validateEmail(values.email)) {
        inputErrors.email = t("login.inputErrors.email.valid");
        isSubmit = false;
      }
    }

    if (
      values.password === null ||
      values.password === undefined ||
      values.password === ""
    ) {
      inputErrors.password = t("login.inputErrors.password.missing");
      isSubmit = false;
    } else {
      if (!validatePassword(values.password)) {
        inputErrors.password = t("login.inputErrors.password.valid");
        isSubmit = false;
      }
    }

    if (!isSubmit) {
      setErrors(inputErrors);
    } else {
      if (Object.keys(errors).length > 0) {
        setErrors({});
      }
      const userLogin = {
        email: values.email,
        password: values.password,
      };
      handleLogin(userLogin);
    }

    setValues({
      ...values,
      email: "",
      password: "",
    });
  };

  return (
    <Section>
      <Title>{t("login.title")}</Title>
      <Form onSubmit={handleSubmit}>
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
        <ButtonSubmit type="submit">{t("login.button.submit")}</ButtonSubmit>
        <FooterForm>
          {t("login.not.member")}{" "}
          <Link to="/register">{t("login.link.signup")}</Link>
        </FooterForm>
      </Form>
    </Section>
  );
}

export default Login;
