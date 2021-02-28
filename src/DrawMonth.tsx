import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const monthName = [
  'January', 'February', 'March',
  'April', 'May', 'June',
  'July', 'August', 'September',
  'October', 'November', 'December'
];

const MonthWrapper = styled.div`
	display: inline-block;
	font-size: .5em;
	padding: 3px;
`;

const MonthRow = styled.div`
	display: flex;
`;

const MonthHeader = styled.div`
	font-size: 1em;
	text-align:center;
`;

const MonthMasthead = styled.div`
	font-size:1.25em;
	margin-bottom: 3px;
`;

const DateCell = styled.div`
	position: relative;
	width: 14px;
	height: 14px;
	display: flex;
	justify-content: flex-end;
`;

function DrawMonth(props: any) {
	const [ monthData, setMonthData ] = useState(props.monthData);
console.log('DrawMOnth props', props);
	useEffect(() => {
		setMonthData(props.monthData);
	}, [props.monthData]);

	const generateHeader = () => {
		return (<MonthHeader>
		          <MonthMasthead>{monthName[monthData.month]} {monthData.year}</MonthMasthead>
		        </MonthHeader>); 
	}

	const drawDate = (date: any) => {
		var dateClass = date.selected ? `date-selected date-selected-${date.category}` : 'date-unselected';
		return <DateCell key={date.ndx}>
		         <div>{date.dt}</div>
		       </DateCell>
	}

	const buildMonthRowArray = (dates: any) => {
		var nRows = Math.ceil(dates.length / 7);
		var rows: any = [];
		for (let i = 0; i < nRows; i++) { rows.push([]); }
		var rowNdx = 0;
		dates.forEach((d: number, ndx: number) => {
			if (ndx > 0 && ndx % 7 === 0) rowNdx++;
   			rows[rowNdx].push((d === -1 ? { ndx: ndx, dt: '' } : { ndx: ndx, dt: d } ));
		});
		return rows;
	}

	const monthRows = (dates: any) => {
		var rows = buildMonthRowArray(dates);
		return <div>
		         {rows.map((row: any, key: number) => {
		           return <MonthRow key={key}>
		                    {row.map((date: any) => { return drawDate(date); })}
		                  </MonthRow>
		         })}
		       </div>
    
	}

	const generateCalendar = () => {
		var blanks = monthData.blanks;
		var monthDays = monthData.days;
		var dates: any = ['S','M','T','W','T','F','S'];
		for (let i = 0; i < blanks; i++) dates.push(-1);
		for (let i = 1; i <= monthDays; i++) dates.push(i);
		var html = monthRows(dates);
		return html;
	}

	return <MonthWrapper>
	         {generateHeader()}
	         {generateCalendar()}
	       </MonthWrapper>;
}

export default DrawMonth;

