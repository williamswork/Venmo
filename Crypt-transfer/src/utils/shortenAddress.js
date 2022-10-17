export const shortenAdress = ({address}) => {
  const value1 = address.slice(0 ,5);
  const value2  =  address.slice( address.length - 4)

  return (`${value1}... ${value2}`)
}