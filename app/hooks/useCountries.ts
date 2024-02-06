import countries from "world-countries";

const formattedCountries = countries.map((country:any)=>({
  value:country.cca2,
  label:country.name.common ,
  flag:country.flag,
  latlng:country.latlng,
  region:country.region,
}))




const useCountries =()=>{
  const getAll =()=> {
    console.log(countries);
   return formattedCountries
  }
  const getByValue  = (value:string)=>{
    return formattedCountries.find((item:any)=>item.value === value)
  }

  return {
    getAll,
    getByValue
  }
}


export default useCountries