import React from 'react';
import styled, { StyledFunction } from 'styled-components';
import DrawMonth from './DrawMonth'; // Do we need this?

interface iProps {
	months: any;
	hideCalendar: Function;
	
}

const CalendarLayoutPlaceholder = styled.div`
	position: fixed;
	top: 80px;
`;

const CalendarLayoutWrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 100vw;
`;

const CalendarMonthGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	padding: 5px;
	background: black;
	color: white;
	border-radius: 10px;
`;

const CalendarCloseButton = styled.div<{ onClick: any }>`
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background-color: green;
`;

const CalendarLayout = React.forwardRef<HTMLInputElement, iProps>((props, ref) => {
	return (
		  <CalendarLayoutPlaceholder ref={ref}>
		    <CalendarLayoutWrapper>
		      <CalendarMonthGrid>
		        <div /><div /><div style={{display: 'flex', justifyContent: 'flex-end'}}><CalendarCloseButton onClick={props.hideCalendar} /></div>
	          { props.months.map((m: any, key: number) => <DrawMonth key={key} monthData={m} />) }
		      </CalendarMonthGrid>
		    </CalendarLayoutWrapper>
		  </CalendarLayoutPlaceholder>
	);
});

export default CalendarLayout;
