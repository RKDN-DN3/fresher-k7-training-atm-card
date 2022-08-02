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
import { LANGUAGE, SCREEN } from "../../common/constant";
import { checkIsEmpty } from "../../utils/checkIsEmpty";

const ATMWrapper = styled.div`
  display: inline-block;
  padding: 10px;
  vertical-align: top;
  position: relative;

  @media only screen and (max-width: ${SCREEN.SMALL_PC}px) {
    padding: 10px 15px;
  }

  @media only screen and (max-width: ${SCREEN.MEDIUM_TABLET}px) {
    padding: 10px 25px;
  }

  @media only screen and (max-width: ${SCREEN.SMALL_TABLET}px) {
    padding: 10px;
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

  @media only screen and (max-width: ${SCREEN.SMALL_PC}px) {
    margin: 10px 15px;
  }

  @media only screen and (max-width: ${SCREEN.MEDIUM_TABLET}px) {
    margin: 10px 25px;
  }

  @media only screen and (max-width: ${SCREEN.SMALL_TABLET}px) {
    margin: 10px;
  }
`;
const IconDelete = styled.span`
  display: none;
  font-size: 20px;
  font-weight: 600;
  color: #dd0c0c;
  position: absolute;
  top: 10px;
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
  const { t } = useTranslation(LANGUAGE.TRANSLATE_COMMON);
  const [scale, setScale] = useState(0);
  const [numberFontSize, setNumberFontSize] = useState(25);
  const [cardWidth, setCardWidth] = useState(window.innerWidth);

  const detectSize = () => {
    setCardWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    if (cardWidth > SCREEN.LARGE_PC) {
      setScale(0.6);
      setNumberFontSize(23);
    }
    if (cardWidth <= SCREEN.MEDIUM_PC) {
      setScale(0.65);
      setNumberFontSize(25);
    }
    if (cardWidth === SCREEN.SMALL_PC) {
      setScale(0.65);
      setNumberFontSize(24);
    }
    if (cardWidth < SCREEN.SMALL_PC) {
      setScale(0.9);
      setNumberFontSize(24);
    }
    if (cardWidth <= SCREEN.LARGE_TABLET) {
      setScale(0.8);
      setNumberFontSize(25);
    }
    if (cardWidth <= SCREEN.MEDIUM_TABLET) {
      setScale(0.7);
      setNumberFontSize(24);
    }
    if (cardWidth <= SCREEN.SMALL_TABLET) {
      setScale(0.5);
      setNumberFontSize(21);
    }
    if (cardWidth <= SCREEN.LARGE_MOBILE) {
      setScale(0.83);
      setNumberFontSize(23);
    }
    if (cardWidth <= SCREEN.W400_MOBILE) {
      setScale(0.79);
    }
    if (cardWidth <= SCREEN.MEDIUM_MOBILE) {
      setScale(0.72);
    }
    if (cardWidth <= SCREEN.SMALL_MOBILE) {
      setScale(0.6);
    }
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [cardWidth]);

  useEffect(() => {
    checkTokenExpired();
    if (listATM && checkIsEmpty(listATM)) {
      getATMAction(userAuth.user.id, dispatch);
    }
  }, [dispatch, listATM, userAuth.user.id]);

  const handleOpenFormAddNew = () => {
    setOpenForm(!openForm);
  };

  const handleAddNew = async (values, color) => {
    let data = { ...values, bgColor: color, userId: userAuth.user.id };

    try {
      const res = await addNewATMCard(data);
      if (checkStatusResponse(res)) {
        getATMAction(userAuth.user.id, dispatch);
        setOpenForm(false);
        toast.success(t("home.alert.add.new.success"));
      } else {
        throw new Error("HTTP status: " + res.status);
      }
    } catch (error) {
      toast.error(t("home.alert.add.new.fail"));
    }
  };

  const handleOnChangeUpdate = async (data) => {
    clearTimeout(timer);

    const currentTimer = setTimeout(async () => {
      try {
        const res = await updateATMCard(data, data.id);
        if (checkStatusResponse(res)) {
          toast.success(t("home.alert.update.success"));
        } else {
          throw new Error("HTTP status: " + res.status);
        }
      } catch (error) {
        toast.error(t("home.alert.update.fail"));
      }
    }, 3000);

    setTimer(currentTimer);
  };

  const handleDeleteCardATM = async (e) => {
    let idATM = e.target.id;
    if (window.confirm("Are you sure?")) {
      try {
        const res = await deleteATMCard(idATM);
        if (checkStatusResponse(res)) {
          getATMAction(userAuth.user.id, dispatch);
          toast.success(t("home.alert.delete.success"));
        } else {
          throw new Error("HTTP status: " + res.status);
        }
      } catch (error) {
        toast.error(t("home.alert.delete.fail"));
      }
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
                    fontSize: numberFontSize,
                    color: "white",
                  }}
                >
                  {item.bankLogo}
                </h1>
              }
              numberFontSize={numberFontSize}
              scale={scale}
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
      <ButtonAddNew onClick={handleOpenFormAddNew}>
        {t("home.button.add.new")}
      </ButtonAddNew>

      {openForm && (
        <FormATM setOpenForm={setOpenForm} handleAddNew={handleAddNew} />
      )}

      {renderListATM()}
    </div>
  );
}

export default Home;
