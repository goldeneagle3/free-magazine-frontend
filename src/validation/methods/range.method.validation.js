export const validateRangeOfInput = (num,option) => {
 	 if (typeof num !== 'number') return false;
	 if (option.min && num < option.min) return false;
	 if (option.max && num > option.max) return false;

 	 return true;
};
