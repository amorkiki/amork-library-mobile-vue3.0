export default function getYear (y) {
  const thisY=new Date().getFullYear()
  let yearArr=[]
  for(var i=y;i<=thisY;i++){
    yearArr.push(i + '年')
  }
  return yearArr
}
