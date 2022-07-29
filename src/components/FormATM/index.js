import React, { useState } from "react";
import styled from "styled-components";
import FormError from "../FormError";
import { ChromePicker } from "react-color";
import { useTranslation } from "react-i18next";
import { CONSTANTS } from "../../common/constant";
import {checkNumberHas2Digits} from "../../utils/checkNumberHas2Digits";
import {checkNumberHas16Digits} from "../../utils/checkNumberHas16Digits";
import {checkNumberOnlyHas3Digits} from "../../utils/checkNumberOnlyHas3Digits";
import {checkOnlyText} from "../../utils/checkOnlyText";

const Section = styled.section`
  margin: 5px auto;
  max-width: 720px;
  width: 100%;

  @media only screen and (max-width: ${CONSTANTS.LARGE_MOBILE}px) {
    margin: 5px 0px;
  }
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

  @media only screen and (max-width: ${CONSTANTS.LARGE_MOBILE}px) {
    width: 20%;
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
`;

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
  const { t } = useTranslation(CONSTANTS.TRANSLATE_COMMON);

  const handleChangeCompleteColor = (color) => {
    setColor(color.hex);
  };

  const handleOpenColorPicker = () => {
    setOpenColorPicker(!opernColorPicker);
  };

  const handleCancelSubmit = () => {
    if (window.confirm(t("formATM.confirm"))) {
      setOpenForm(false);
    }
  };

  const handleOnChange = (e) => {
    setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
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
      inputErrors.number = t("formATM.inputErrors.number.mising");
      isSubmit = false;
    } else {
      if (!checkNumberHas16Digits(values.number)) {
        inputErrors.number = t("formATM.inputErrors.number.16.digits");
        isSubmit = false;
      }
    }

    if (
      values.month === null ||
      values.month === undefined ||
      values.month === ""
    ) {
      inputErrors.month = t("formATM.inputErrors.month.mising");
      isSubmit = false;
    } else {
      if (checkNumberHas2Digits(values.month)) {
        if (parseInt(values.month) < 1 || parseInt(values.month) > 12) {
          inputErrors.month = t("formATM.inputErrors.month.range.0.12");
          isSubmit = false;
        }
      } else {
        inputErrors.month = t("formATM.inputErrors.month.2.digits");
        isSubmit = false;
      }
    }

    if (
      values.year === null ||
      values.year === undefined ||
      values.year === ""
    ) {
      inputErrors.year = t("formATM.inputErrors.year.mising");
      isSubmit = false;
    } else {
      if (checkNumberHas2Digits(values.year)) {
        if (parseInt(values.year) < 22 || parseInt(values.year) > 99) {
          inputErrors.year = t("formATM.inputErrors.year.range.22.99");
          isSubmit = false;
        }
      } else {
        inputErrors.year = t("formATM.inputErrors.year.2.digits");
        isSubmit = false;
      }
    }

    if (
      values.holder === null ||
      values.holder === undefined ||
      values.holder === ""
    ) {
      inputErrors.holder = t("formATM.inputErrors.holder.missing");
      isSubmit = false;
    } else {
      if (!checkOnlyText(values.holder)) {
        inputErrors.holder = t("formATM.inputErrors.holder.only.text");
        isSubmit = false;
      }
    }

    if (values.cvv === null || values.cvv === undefined || values.cvv === "") {
      inputErrors.cvv = t("formATM.inputErrors.cvv.missing");
      isSubmit = false;
    } else {
      if (!checkNumberOnlyHas3Digits(values.cvv)) {
        inputErrors.cvv = t("formATM.inputErrors.cvv.3.digits");
      }
    }

    if (
      values.system === null ||
      values.system === undefined ||
      values.system === "default"
    ) {
      inputErrors.system = t("formATM.inputErrors.system.missing");
      isSubmit = false;
    }

    if (
      values.bankLogo === null ||
      values.bankLogo === undefined ||
      values.bankLogo === "default"
    ) {
      inputErrors.bankLogo = t("formATM.inputErrors.bankLogo.missing");
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
      <Title>{t("formATM.title")}</Title>
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
          <option value="default">{t("formATM.choose.type")}</option>
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
          <option value="default">{t("formATM.choose.bank")}</option>
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
          style={{ background: color }}
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
          <ButtonSubmit type="submit">{t("formATM.add")}</ButtonSubmit>
          <ButtonCancel onClick={handleCancelSubmit}>
            {t("formATM.cancel")}
          </ButtonCancel>
        </FlexBox>
      </Form>
    </Section>
  );
}

export default FormATM;
