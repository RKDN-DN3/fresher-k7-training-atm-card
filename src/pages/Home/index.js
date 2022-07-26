import React, { useEffect, useState } from "react";
import { ATMCard } from "atm-card-react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserAuth } from "../../store/authSlice";
import { selectListATM } from "../../store/atmSlice";
import { checkTokenExpired } from "../../utils/checkTokenExpired";
import { getATMAction } from "../../store/apiRequest";
import styled from "styled-components";
import FormATM from "../../components/FormATM";
import { addNewATMCard, updateATMCard } from "../../services";
import { checkStatusResponse } from "../../utils/checkStatusResponse";
import { toast } from "react-toastify";

const ATMCardNew = styled(ATMCard)`
  &.component-atm-card-container {
    display: inline-block;
    padding: 5px 10px;
    vertical-align: top;
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

function Home() {
  const userAuth = useSelector(selectUserAuth);
  const listATM = useSelector(selectListATM);
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    checkTokenExpired();
    if (listATM && listATM.length === 0) {
      getATMAction(userAuth.accessToken, dispatch);
    }
  }, [dispatch, listATM, userAuth.accessToken]);

  const handleOnChangeUpdate = async (data) => {
    clearTimeout(timer);

    const currentTimer = setTimeout(async () => {
      try {
        const res = await updateATMCard(data, userAuth.accessToken, data.id);
        if (checkStatusResponse(res)) {
          toast.success("Update ATM Card Successfully!");
        }
      } catch (error) {
        toast.error("Update ATM Card Failed!");
      }
    }, 3000); 

    setTimer(currentTimer);
  };

  const renderListATM = () => {
    if (listATM) {
      return listATM.map((item, index) => {
        return (
          <ATMCardNew
            id={item.id}
            key={index}
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
        );
      });
    }
  };

  const handleOpenFormAddNew = () => {
    setOpenForm(!openForm);
  };

  const handleAddNew = async (values, color) => {
    let data = { ...values, bgColor: color, userId: userAuth.user.id };
    try {
      const res = await addNewATMCard(data, userAuth.accessToken);
      if (checkStatusResponse(res)) {
        getATMAction(userAuth.accessToken, dispatch);
        setOpenForm(false);
        toast.success("Add New ATM Card Successfully!");
      }
    } catch (error) {
      toast.error("Add New Failed!");
    }
  };

  return (
    <div>
      <ButtonAddNew onClick={handleOpenFormAddNew}>Add New</ButtonAddNew>
      {openForm && (
        <FormATM setOpenForm={setOpenForm} handleAddNew={handleAddNew} />
      )}
      {renderListATM()}
    </div>
  );
}

export default Home;
