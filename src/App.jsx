import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee,faStar,faArrowsLeftRight } from '@fortawesome/free-solid-svg-icons';
import CurrencyDropdown from './components/CurrencyDropdown.jsx';
const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount,setConvertedAmount] = useState(null)
  const [converting,setConverting] = useState(false)
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || ['USD', 'EUR']);



 const fetchCurrencies = async () => {
  try{
    const response = await fetch("https://api.frankfurter.dev/v1/currencies");
    const data = await response.json();
    setCurrencies(Object.keys(data));
  }
  catch(error){
    console.error("Error fetching currencies:", error);
  }
 }

useEffect(() => {
  fetchCurrencies();
}, []);

console.log(currencies);

const currencyConverter = async()=>{
  console.log("Converting from", fromCurrency, "to", toCurrency, "with amount", amount);
//conversion logic
if(!amount) return;
setConverting(true);
try{
    const response = await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}1&from=${fromCurrency}&to=${toCurrency}`);
    const data = await response.json();
    setConvertedAmount(data.rates[toCurrency] + "" + toCurrency)
  }
  catch(error){
    console.error("Error fetching currencies:", error);
  }finally{
    setConverting(true);
  }
}

const handleFavorite= (currency) =>{
//add to favorite
}

const swapCurrencies = ( )=>{
  setFromCurrency(toCurrency)
  setToCurrency(fromCurrency)
}


































  //link = "https://api.frankfurter.dev/v1/latest?amount=1&from=USD&to=EUR"
  //link_2 = " https://api.frankfurter.dev/v1/currencies"
  return (
    <div className='screen-bg h-screen flex items-center justify-center'>
        <div className='bg-white container max-w-2xl rounded mx-auto p-4 shadow-lg my-2 flex flex-col flex-1 gap-4'>
           <h1 className='capitalize text-4xl text-gray-800 font-semibold'>currency conveter</h1>
           <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-end'>
            <CurrencyDropdown currencies={currencies} title="From: " handleFavorite={handleFavorite} currency={fromCurrency} setCurrency={setFromCurrency} favorites={favorites}/>
            {/*swap button*/}
            <div className='flex justify-center items-center mb-2'>
              <button onClick={swapCurrencies} className='cursor-pointer text-gray-800 hover:text-gray-600 text-md'>
             <FontAwesomeIcon icon={faArrowsLeftRight}/>
              </button>
            </div>
           
            <CurrencyDropdown currencies={currencies} title="To:"  handleFavorite={handleFavorite} currency={toCurrency} setCurrency={setToCurrency} favorites={favorites}/>
           </div>
           <div className='flex flex-col gap-2'>
            <label className='text-gray-800 mt-4 block ' htmlFor='amount' id='amount'>Amount:</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className='focus:outline-none hover:bg-violet-50 focus:ring-2 focus:ring-indigo-300 shadow-sm p-4 rounded'/>
            <div className='flex justify-end'>
              <button onClick={currencyConverter} className={`button-bg px-5 py-2 rounded text-white text-md text-lg font-bold ${converting? "animate-pulse" : ""}`}>Convert</button>
            </div>
           </div>
          {converting && (<div className='text-rose-500 text-2xl'>Converted Amount: {convertedAmount}</div>)} 
        </div>
    </div>
  )
}

export default App
