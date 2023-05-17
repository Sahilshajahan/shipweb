const monthsIndex=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];

export function getDateString(date, pattern) {
  switch(pattern){
      default:
          return null;
      case "ddmmmyyyy":
        return date.getDate()+monthsIndex[date.getMonth()].slice(0,1).toUpperCase()+monthsIndex[date.getMonth()].slice(1,)+date.getFullYear();
      case "YYYY-mm-dd":
        return date.getFullYear()+"-"+(date.getMonth()<9?'0':'')+(date.getMonth()+1)+"-"+(date.getDate()<10?'0':'')+date.getDate();
      case "MMMYYYY":
          return monthsIndex[date.getMonth()].slice(0,1).toUpperCase()+monthsIndex[date.getMonth()].slice(1,)+date.getFullYear();
      case "dd-MMM-YYYY":
          return (date.getDate()<10?'0':'')+date.getDate()+"-"+monthsIndex[date.getMonth()].slice(0,1).toUpperCase()+monthsIndex[date.getMonth()].slice(1,)+"-"+date.getFullYear();
  }
}
///////////////////
