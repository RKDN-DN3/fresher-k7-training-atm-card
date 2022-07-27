import React, { useEffect, useState } from "react";
import { ATMCard } from "atm-card-react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserAuth } from "../../store/authSlice";
import { selectListATM } from "../../store/atmSlice";
import { checkTokenExpired } from "../../utils/checkTokenExpired";
import { getATMAction } from "../../store/apiRequest";
import styled from "styled-components";
import FormATM from "../../components/FormATM";
import { addNewATMCard, deleteATMCard, updateATMCard } from "../../services";
import { checkStatusResponse } from "../../utils/checkStatusResponse";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { CONSTANTS } from "../../common/constant";

const ATMWrapper = styled.div`
  display: inline-block;
  padding: 5px 10px;
  vertical-align: top;
  position: relative;

  &.component-atm-card-container {
  }
`;
const ButtonAddNew = styled.button`
  border: 1px solid #ebebeb;
  padding: 10px 20px;
  margin: 5px 10px;
  border-radius: 5px;
  display: block;
  background: #18b733;
  color: #fff;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
const IconDelete = styled.span`
  display: none;
  font-size: 25px;
  font-weight: 600;
  color: #dd0c0c;
  position: absolute;
  top: 5px;
  left: 20px;
  cursor: pointer;

  ${ATMWrapper}:hover & {
    display: block;
  }
`;

function Home() {
  const userAuth = useSelector(selectUserAuth);
  const listATM = useSelector(selectListATM);
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);
  const [timer, setTimer] = useState(null);
  const {t} = useTranslation(CONSTANTS.TRANSLATE_COMMON)

  useEffect(() => {
    checkTokenExpired();
    if (listATM && listATM.length === 0) {
      getATMAction(userAuth.accessToken, userAuth.user.id, dispatch);
    }
  }, [dispatch, listATM, userAuth.accessToken, userAuth.user.id]);

  const handleOpenFormAddNew = () => {
    setOpenForm(!openForm);
  };

  const handleAddNew = async (values, color) => {
    let data = { ...values, bgColor: color, userId: userAuth.user.id };

    try {
      const res = await addNewATMCard(data, userAuth.accessToken);
      if (checkStatusResponse(res)) {
        getATMAction(userAuth.accessToken, userAuth.user.id, dispatch);
        setOpenForm(false);
        toast.success(t("home.alert.add.new.success"));
      }
    } catch (error) {
      toast.error(t("home.alert.add.new.fail"));
    }
  };

  const handleOnChangeUpdate = async (data) => {
    clearTimeout(timer);

    const currentTimer = setTimeout(async () => {
      try {
        const res = await updateATMCard(data, userAuth.accessToken, data.id);
        if (checkStatusResponse(res)) {
          toast.success(t("home.alert.update.success"));
        }
      } catch (error) {
        toast.error(t("home.alert.update.fail"));
      }
    }, 3000);

    setTimer(currentTimer);
  };

  const handleDeleteCardATM = async (e) => {
    let idATM = e.target.id;
    try {
      const res = await deleteATMCard(idATM, userAuth.accessToken);
      if (checkStatusResponse(res)) {
        getATMAction(userAuth.accessToken, userAuth.user.id, dispatch);
        toast.success(t("home.alert.delete.success"));
      }
    } catch (error) {
      toast.error(t("home.alert.delete.fail"));
    }
  };

  const renderListATM = () => {
    if (listATM) {
      return listATM.map((item, index) => {
        return (
          <ATMWrapper key={index}>
            <ATMCard
              id={item.id}
              year={item.year}
              month={item.month}
              cvv={item.cvv}
              number={item.number}
              holderName={item.holder}
              bankLogo={
                <h1
                  style={{
                    fontFamily: "Arial",
                    fontSize: 30,
                    color: "white",
                  }}
                >
                  {item.bankLogo}
                </h1>
              }
              scale={0}
              system={item.system}
              bgColor={item.bgColor}
              onChange={(data) => {
                const currentData = {
                  ...item,
                  cvv: data.cvv,
                  holder: data.holder,
                  month: data.month,
                  number: data.number,
                  year: data.year,
                };
                handleOnChangeUpdate(currentData);
              }}
            />
            <IconDelete id={item.id} onClick={handleDeleteCardATM}>
              x
            </IconDelete>
          </ATMWrapper>
        );
      });
    }
  };

  return (
    <div>
      <ButtonAddNew onClick={handleOpenFormAddNew}>{t("home.button.add.new")}</ButtonAddNew>
      {openForm && (
        <FormATM setOpenForm={setOpenForm} handleAddNew={handleAddNew} />
      )}
      {renderListATM()}
    </div>
  );
}

export default Home;
