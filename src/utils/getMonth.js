export default function getMonth () {
  let yearM = []
  for (var i = 0; i <12; i++){
    yearM[i] = i + 1 + '月'
  }
  return yearM
}