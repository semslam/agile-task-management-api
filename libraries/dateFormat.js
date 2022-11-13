const {isNumber} = require("../libraries/utilities")
  /**
   * Convert date to timestamp 
   * @param {Date} strDateTime 
   * @returns return number
   */
  const convertDateToTimeStamp = (strDateTime)=>{
   if(!(strDateTime instanceof Date)) 
      throw new Error("This function only accept data instance!")
    const datum = Date.parse(strDateTime);
   return datum/1000;
  }
/**
 * Convert timestamp to date
 * @param {Number} unixTimestamp 
 * @returns return data instance
 */
  const convertTimeStampToDate = (unixTimestamp)=>{
    if(!isNumber(unixTimestamp)) 
      throw new Error("This value is not a number")
    const milliseconds = unixTimestamp * 1000; // 1575909015000
    return new Date(milliseconds);
  }

/**
 * Check the end date grater than start date
 * @param {String} endDate 
 * @param {String} startDate 
 * @returns return boolean
 */
  const isEndIsGreaterThanStartDate = (endDate,startDate)=>{
   return (Date.parse(startDate) < Date.parse(endDate))? false:true;
  }

 module.exports ={
    convertDateToTimeStamp,
    convertTimeStampToDate,
    isEndIsGreaterThanStartDate
  }
