import React, { useState } from "react";
import styled from "styled-components";
import FormError from "../FormError";
import { ChromePicker } from "react-color";

const Section = styled.section`
  margin: 5px 10px;
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
  border-radius: 5px;
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
const InputDate = styled.input`
  outline: none;
  border: none;
  border-bottom: 1px solid #999;
  background-color: transparent;
  width: 10%;
  font-size: 16px;
  margin: 15px 0;
  &:last-child {
    margin-left: 10px;
  }
`;
const Select = styled.select`
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
  border-radius: 5px;
  display: block;
  background: #18b733;
  color: #fff;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
const ButtonCancel = styled.button`
  border: 1px solid #ebebeb;
  padding: 10px 20px;
  border-radius: 5px;
  display: block;
  background: #e90000;
  color: #fff;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
const FlexBox = styled.div`
  display: flex;
  align-items: center;
`;
const ChromePickerNew = styled(ChromePicker)`
  margin: 5px 0;
`

const systems = ["mastercard", "visa"];
const banks = [
  "Vietcombank",
  "Vietinbank",
  "Agribank",
  "BIDV",
  "Techcombank",
  "Sacombank",
  "MBBank",
  "VPBank",
];

function FormATM({ setOpenForm, handleAddNew }) {
  const [color, setColor] = useState("#D4AF37");
  const [opernColorPicker, setOpenColorPicker] = useState(false);
  const [values, setValues] = useState({
    number: "",
    month: "",
    year: "",
    holder: "",
    cvv: "",
    system: "default",
    bankLogo: "default",
  });
  const [errors, setErrors] = useState({});

  const handleChangeCompleteColor = (color) => {
    setColor(color.hex);
  };

  const handleOpenColorPicker = () => {
    setOpenColorPicker(!opernColorPicker);
  };

  const handleCancelSubmit = () => {
    if (window.confirm("Are you sure?")) {
      setOpenForm(false);
    }
  };

  const handleOnChange = (e) => {
    setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const checkNumberHas16Digits = (number) => {
    if (number) {
      return number.match(/^[0-9]{16}$/);
    }
  };

  const checkNumberHas2Digits = (number) => {
    if (number) {
      return number.match(/^[0-9]{1,2}$/);
    }
  };

  const checkNumberOnlyHas3Digits = (number) => {
    if (number) {
      return number.match(/^[0-9]{3}$/);
    }
  };

  const checkOnlyText = (string) => {
    if (string) {
      return string.match(/^[a-zA-Z ]*$/);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let inputErrors = {};
    let isSubmit = true;

    if (
      values.number === null ||
      values.number === undefined ||
      values.number === ""
    ) {
      inputErrors.number = "Missing number";
      isSubmit = false;
    } else {
      if (!checkNumberHas16Digits(values.number)) {
        inputErrors.number = "Number must be has 16 digits";
        isSubmit = false;
      }
    }

    if (
      values.month === null ||
      values.month === undefined ||
      values.month === ""
    ) {
      inputErrors.month = "Missing month";
      isSubmit = false;
    } else {
      if (checkNumberHas2Digits(values.month)) {
        if (parseInt(values.month) < 1 || parseInt(values.month) > 12) {
          inputErrors.month = "Value of month must be in range 0-12";
          isSubmit = false;
        }
      } else {
        inputErrors.month = "Month must be has 2 digits";
        isSubmit = false;
      }
    }

    if (
      values.year === null ||
      values.year === undefined ||
      values.year === ""
    ) {
      inputErrors.year = "Missing year";
      isSubmit = false;
    } else {
      if (checkNumberHas2Digits(values.year)) {
        if (parseInt(values.year) < 22 || parseInt(values.year) > 99) {
          inputErrors.year = "Value of year must be in range 22-99";
          isSubmit = false;
        }
      } else {
        inputErrors.year = "Year must be has 2 digits";
        isSubmit = false;
      }
    }

    if (
      values.holder === null ||
      values.holder === undefined ||
      values.holder === ""
    ) {
      inputErrors.holder = "Missing holder";
      isSubmit = false;
    } else {
      if (!checkOnlyText(values.holder)) {
        inputErrors.holder = "Holder must be only text";
        isSubmit = false;
      }
    }

    if (values.cvv === null || values.cvv === undefined || values.cvv === "") {
      inputErrors.cvv = "Missing CVV";
      isSubmit = false;
    } else {
      if (!checkNumberOnlyHas3Digits(values.cvv)) {
        inputErrors.cvv = "CVV must be has 3 digits";
      }
    }

    if (
      values.system === null ||
      values.system === undefined ||
      values.system === "default"
    ) {
      inputErrors.system = "Missing Type Card";
      isSubmit = false;
    }

    if (
      values.bankLogo === null ||
      values.bankLogo === undefined ||
      values.bankLogo === "default"
    ) {
      inputErrors.bankLogo = "Missing Bank Logo";
      isSubmit = false;
    }

    if (!isSubmit) {
      setErrors(inputErrors);
    } else {
      handleAddNew(values, color);

      if (Object.keys(errors).length > 0) {
        setErrors({});
      }
      setValues({
        number: "",
        month: "",
        year: "",
        holder: "",
        cvv: "",
        system: "default",
        bankLogo: "default",
      });
    }
  };

  return (
    <Section>
      <Form onSubmit={handleSubmit}>
        <Input
          type="number"
          id="number"
          name="number"
          placeholder="Number"
          value={values.number}
          onChange={handleOnChange}
        />
        {errors.number !== undefined && <FormError error={errors.number} />}
        <FlexBox>
          <InputDate
            type="number"
            id="month"
            name="month"
            placeholder="Month"
            value={values.month}
            onChange={handleOnChange}
          />
          {errors.month !== undefined && <FormError error={errors.month} />}
          <InputDate
            type="number"
            id="year"
            name="year"
            placeholder="Year"
            value={values.year}
            onChange={handleOnChange}
          />
          {errors.year !== undefined && <FormError error={errors.year} />}
        </FlexBox>
        <Input
          type="text"
          id="holder"
          name="holder"
          placeholder="Holder"
          value={values.holder}
          onChange={handleOnChange}
        />
        {errors.holder !== undefined && <FormError error={errors.holder} />}
        <Input
          type="number"
          id="cvv"
          name="cvv"
          placeholder="CVV"
          value={values.cvv}
          onChange={handleOnChange}
        />
        {errors.cvv !== undefined && <FormError error={errors.cvv} />}
        <Select
          id="system"
          value={values.system}
          name="system"
          onChange={handleOnChange}
        >
          <option value="default">Choose Type Card</option>
          {systems.map((system, index) => {
            return (
              <option key={index} value={system}>
                {system}
              </option>
            );
          })}
        </Select>
        {errors.system !== undefined && <FormError error={errors.system} />}
        <Select
          id="bankLogo"
          value={values.bankLogo}
          name="bankLogo"
          onChange={handleOnChange}
        >
          <option value="default">Choose Bank</option>
          {banks.map((bank, index) => {
            return (
              <option key={index} value={bank}>
                {bank}
              </option>
            );
          })}
        </Select>
        {errors.bankLogo !== undefined && <FormError error={errors.bankLogo} />}
        <Input
          style={{ background: color}}
          value={color}
          readOnly
          onClick={handleOpenColorPicker}
        ></Input>
        {opernColorPicker && (
          <ChromePickerNew
            color={color}
            onChangeComplete={handleChangeCompleteColor}
          />
        )}
        <FlexBox>
          <ButtonSubmit type="submit">Add</ButtonSubmit>
          <ButtonCancel onClick={handleCancelSubmit}>Cancel</ButtonCancel>
        </FlexBox>
      </Form>
    </Section>
  );
}

export default FormATM;
