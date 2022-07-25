import React, { useEffect, useState } from "react";
import { ATMCard } from "atm-card-react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserAuth } from "../../store/authSlice";
import { selectListATM } from "../../store/atmSlice";
import { checkTokenExpired } from "../../utils/checkTokenExpired";
import { getATMAction } from "../../store/apiRequest";
import styled from "styled-components";

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
  &:hover{
    opacity: .8;
  }
`;

function Home() {
  const userAuth = useSelector(selectUserAuth);
  const listATM = useSelector(selectListATM);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    number: "",
    month: 0,
    year: 0,
    holder: "",
    cvv: "",
    system: "",
    bankLogo: "",
    userId: userAuth.user.id,
  });

  useEffect(() => {
    checkTokenExpired();
    if (listATM && listATM.length === 0) {
      getATMAction(userAuth.accessToken, dispatch);
    }
  }, [dispatch, listATM, userAuth.accessToken]);

  const renderListATM = () => {
    if (listATM) {
      return listATM.map((item, index) => {
        return (
          <ATMCardNew
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
          />
        );
      });
    }
  };

  return (
    <div>
      <ButtonAddNew>Add New</ButtonAddNew>
      {renderListATM()}
    </div>
  );
}

export default Home;
