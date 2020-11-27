export default function getMonthDay () {
  let MonthD = [] 
  for (var i = 1; i <= 31; i++){
    MonthD.push(i + '日')
  } 
  return MonthD
}