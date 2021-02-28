const yearTemplate: number[] = [0,3,3,6,1,4,6,2,5,0,3,5];
const leapTemplate: number[] = [0,3,4,0,2,5,0,3,6,1,4,6];
const monthDays: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const isLeap = (year: number): boolean => {
	var result = year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
	return result;
}


const calcJan = (year: number): number => {
	var yearOffset = year % 400;
	var centuryYears = Math.floor(yearOffset / 100);

	// Need century years, to subtract non-leap years. If the requested year is itself such a year, don't include it.
	// Why? (I'll get back to you on that.)
	if (year % 400 > 0 && year % 100 === 0) centuryYears--;
	var leapYears = Math.ceil(yearOffset / 4) - centuryYears;

	// Gregorian calendar.
	// 6 is the magic number. It just happens that 6 is the number for January in a % 400 === 0 year.
	var jan = 6 + yearOffset + leapYears;

	// Make sure 0 <= jan < 7.
	jan = jan % 7;

	return jan;
}

export const calc12DigitYear = (year: number): number[] => {
	var jan = calcJan(year);
	var yearDigits = [];
	var template = isLeap(year) ? leapTemplate : yearTemplate;
	yearDigits = template.map(d => (d+jan)%7);
	return yearDigits;
}

interface YearSpecs {
	year: number;
	janDigit: number;
	isLeap: boolean;
}

interface MonthSpecs {
	year: number;
	month: number;
	days: number;
	blanks: number;
}

export const generateMonthData = ({ year, janDigit, isLeap }: YearSpecs): Array<{}> => {
	var template = isLeap ? leapTemplate : yearTemplate;

	var data: Array<MonthSpecs> = [];
	template.forEach((digit: number, monthNdx: number) => {
		let month: MonthSpecs = { year, month: monthNdx, days: monthDays[monthNdx], blanks: (digit + 1*janDigit) % 7 };
		data.push(month);
	});
	if (isLeap) data[1].days = 29;

	return data;
}

