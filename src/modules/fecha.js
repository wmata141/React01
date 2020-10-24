import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import styled from 'styled-components';
import "react-datepicker/dist/react-datepicker.css";
import '../assets/styles/css/index.scss';
import { FaBars } from 'react-icons/fa';
import { RiCalendar2Line } from 'react-icons/ri';
import reactLogo from '../assets/images/logo.svg';
import Aside from '../components/Aside'

const About = () => {
  const [toggled, setToggled] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
  }, [])

  const CustomInput = React.forwardRef((props, ref) => {
    return (
      <CustomDatePickDiv onClick={props.onClick}>
        <CustomIconDiv>
          <RiCalendar2Line size={20} />
        </CustomIconDiv>
        <LabelDatePick ref={ref}>
          {props.value || props.placeholder}
        </LabelDatePick>
      </CustomDatePickDiv>
    );
  });

  return (
    <Aside
      toggled={toggled}
      setToggled={setToggled}
    >
      <main>
        <div className="btn-toggle" onClick={() => setToggled(true)}>
          <FaBars />
        </div>
        <header>
          <h1>
            <img width={80} src={reactLogo} alt="react logo" /> {'Fecha'}
          </h1>
        </header>
        <h2>Fecha: </h2>
        <div style={{ display: 'flex' }}>
          <DatePickerDiv>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              customInput={<CustomInput />}
            />
          </DatePickerDiv>
          <DatePickerDiv>
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              customInput={<CustomInput />}
            />
          </DatePickerDiv>
        </div>
        <footer>
          footer
        </footer>
      </main>
    </Aside>
  )
}

export default About;

const DatePickerDiv = styled.div`  
  display: flex;
  position: relative;
  cursor: pointer;
`;

const CustomDatePickDiv = styled.div`  
  display: flex;
  align-items: end;
  background-color: white;
  border: solid 0.1em #cbd4c9;
  border-radius: 0.25em;  
  padding-right: 160px;
  padding-top: 5px;
  padding-left: 5px;
`;

const CustomIconDiv = styled.div`
  color: grey;
  &:hover {
    color: #05ACB1;
  }  
`;

const LabelDatePick = styled.label`
  color: grey;
  cursor: pointer;  
`
