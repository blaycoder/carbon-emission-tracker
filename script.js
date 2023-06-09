"use strict";

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const formBtn = document.querySelector(".form__btn")
let inputType = document.querySelector(".form__input--type");

let inputDistance = document.querySelector(".form__input--distance");
let inputTypeTransit = document.querySelector(".form__input-type--transit");
let inputTypeFlight = document.querySelector(".form__input-type--flight");
let inputTypeFuel = document.querySelector(".form__input-type--fuel");
let inputEnergy = document.querySelector(".form__input--energy");
let inputTypeLitres = document.querySelector(".form__input-type--litres");
const statusMsg = document.querySelector('.status');
const statusResponse = document.querySelector('.status-response');
const resetBtn = document.querySelector('.reset__btn')
let inputConsumption = document.querySelector(".form__input--consumption")
let inputLocation = document.querySelector(".form__input--location")

resetBtn.addEventListener('click', ()=>{
  window.location.reload()
})
let fuelValue;
let litresValue;
let consumptionValue;
let locationValue;
const renderStatus = function (msg) {
    let text = `
    <div class="status-response">
    <h4>Carbon: ${msg} <span class="status"></span> </h4>
</div>
    `;
    statusResponse.insertAdjacentHTML("afterbegin", text)
  };

const userActivities = {
  energy: "traditional-energy",
  bike: "motorbike",
  flight: "flight",
  travel: "car-travel",
  fuelCarbon: "fuel-carbon",
  cleanEnergy: "clean-energy",
};

let html;

const clear = ()=>{
    html = ''
}


// Fuel to Carbon API
const fuelC = async function(){
  const encodedParams = new URLSearchParams();
  encodedParams.append("type", `${fuelValue}`);
  encodedParams.append("litres", `${litresValue}`);
  const options = {
    method: 'POST',
    headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': 'ef717d6197msha13aa8e5d330360p10ccfejsnb888ea2165e0',
		'X-RapidAPI-Host': 'tracker-for-carbon-footprint-api.p.rapidapi.com'
	},
	body: encodedParams
};
try{
  const response = await fetch('https://tracker-for-carbon-footprint-api.p.rapidapi.com/fuelToCO2e', options)
  if(!response.ok) throw new Error('Problem getting the results')
  const data = await response.json();
  console.log(data.carbon)
  if(!data.succcess){
      renderStatus(data.carbon) 
  }else{
    renderStatus("Incorrect infomation provided")
  } 
}catch(err){
  console.error(err)
}
    }

    formBtn.addEventListener("click", function(e){
      e.preventDefault()
      fuelC()
      })
      // Add event listener to select option
      inputType.addEventListener("change", filterList);
      

// Traditional Energy API
// const trackTE = async function (){
//   const encodedParams = new URLSearchParams();
//   encodedParams.append("consumption", `${consumptionValue}`);
//   encodedParams.append("location", `${locationValue}`);
//   const options = {
//     method: 'POST',
//     headers: {
// 		'content-type': 'application/x-www-form-urlencoded',
// 		'X-RapidAPI-Key': 'ef717d6197msha13aa8e5d330360p10ccfejsnb888ea2165e0',
// 		'X-RapidAPI-Host': 'tracker-for-carbon-footprint-api.p.rapidapi.com'
// 	},
// 	body: encodedParams
// };
// try{
//   const response = await fetch('https://tracker-for-carbon-footprint-api.p.rapidapi.com/traditionalHydro', options)
//   if(!response.ok) throw new Error('Problem getting the results')
//   const data = await response.json();
//   console.log(consumptionValue, locationValue)
//   console.log(data.carbon)
//   if(!data.succcess){
//       renderStatus(data.carbon) 
//   }else{
//     renderStatus("Incorrect infomation provided")
//   } 
// }catch(err){
//   console.error(err)
// }
// }  

// formBtn.addEventListener("click", function(e){
// e.preventDefault()
// trackTE()
// })
// // Add event listener to select option
// inputType.addEventListener("change", filterList);


// Render the information for the selected option
function filterList(e) {

  e.preventDefault()    
  let selectedOption = inputType.value;
  if (selectedOption === userActivities.energy) { 
    clear();

    html = `
        <div data-option="traditional-energy">
        <div class="form__row">
        <label class="form__label">Consumption</label>
        <input
          class="form__input form__input--consumption"
          placeholder="
          The KWH usage."
          oninput="consumptionValue = this.value"
        />
      </div>
      <div class="form__row">
        <label class="form__label">Location </label>
        <input
          class="form__input form__input--location"
          placeholder="(USA, Canada, UK, Europe, Africa, LatinAmerica, MiddleEast)"
          oninput="locationValue = this.value"
        />
      </div>
      </div>   
        `;
       
  } else if (selectedOption === userActivities.flight) {
    clear()
    html = `
        <div data-option="flight-details">
            <div class="form__row">
            <label class="form__label">Distance</label>
            <input
              class="form__input form__input--distance"
              placeholder="The flight distance in KM.
            />
          </div>
          <div class="form__row">
            <label class="form__label">Type</label>
            <input
              class="form__input form__input--type--flight"
              placeholder="(DomesticFlight, ShortEconomyClassFlight, ShortBusinessClassFlight, 
                LongEconomyClassFlight, LongPremiumClassFlight, LongBusinessClassFlight, LongFirstClassFlight)."
            />
          </div>
          </div>
        `;
  } else if (selectedOption === userActivities.fuelCarbon) {
    clear()
    html = `
        <div data-option="fuel-carbon-details">
            <div class="form__row">
            <label class="form__label">Type</label>
            <input
              class="form__input form__input--type--fuel"
              placeholder="The type can be Petrol, Diesel, LPG."
              oninput="fuelValue = this.value"
            />
          </div>
          <div class="form__row">
            <label class="form__label">Litres</label>
            <input
              class="form__input form__input--litres"
              placeholder=""
              oninput="litresValue = this.value"
            />
          </div>
          </div>
        `;
  } else if (selectedOption === userActivities.cleanEnergy) {
    clear()
    html = `   
        <div data-option="clean-energy-details">
        <div class="form__row">
        <label class="form__label">Energy</label>
        <input
          class="form__input form__input--energy"
          placeholder=""
        />
      </div>
      <div class="form__row">
        <label class="form__label">Consumption</label>
        <input
          class="form__input form__input--consumption"
          placeholder="The amount of energy consumed in KWH."
        />
      </div>
      </div>
        `;
  }else if (selectedOption === userActivities.transit) {
    clear()
    html = `   
        <div data-option="clean-energy-details">
        <div class="form__row">
        <label class="form__label">Distance</label>
        <input
          class="form__input form__input--distance"
          placeholder=""
        />
      </div>
      <div class="form__row">
        <label class="form__label">Type</label>
        <input
          class="form__input form__input--type--transit"
          placeholder=""
        />
      </div>
      </div>
        `;
  }    
  else {
    html = ``;
  }
  form.insertAdjacentHTML('beforeend', html);
}





// function flight(){
//     const encodedParams = new URLSearchParams();
// encodedParams.append("distance", `${inputDistance.value}`);
// encodedParams.append("type", `${inputTypeFlight}`);

// const options = {
// 	method: 'POST',
// 	headers: {
// 		'content-type': 'application/x-www-form-urlencoded',
// 		'X-RapidAPI-Key': 'f3ac58eedcmsh158cae8631cd06ep1ae4a0jsnce95e6464a1d',
// 		'X-RapidAPI-Host': 'tracker-for-carbon-footprint-api.p.rapidapi.com'
// 	},
// 	body: encodedParams
// };

// const trackFlight = async function(){
//     try{
//         const response = fetch('https://tracker-for-carbon-footprint-api.p.rapidapi.com/flight', options)
//         if(!response.ok) throw new Error('Problem getting the results')
//         const data = await response.json();
//         console.log(data)
//       }catch(err){
//         console.error(err)
//       }
//     }
//     trackFlight()
// }


// function cleanEnergy(){
//     const encodedParams = new URLSearchParams();
//     encodedParams.append("energy", "Solar");
//     encodedParams.append("consumption", "400");
    
//     const options = {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/x-www-form-urlencoded',
//             'X-RapidAPI-Key': 'f3ac58eedcmsh158cae8631cd06ep1ae4a0jsnce95e6464a1d',
//             'X-RapidAPI-Host': 'tracker-for-carbon-footprint-api.p.rapidapi.com'
//         },
//         body: encodedParams
//     };
    
//    const CE = async function(){
//     try{
//         const response = fetch('https://tracker-for-carbon-footprint-api.p.rapidapi.com/cleanHydro', options)
//         if(!response.ok) throw new Error('Problem getting the results')
//         const data = await response.json();
//         console.log(data)
//     }catch(err){
//         console.error(err)
//     }
//    } 
//    CE()
// }

// function PT(){
//     const encodedParams = new URLSearchParams();
// encodedParams.append("distance", `${inputDistance.value}`);
// encodedParams.append("type", `${inputTypeTransit.value}`);

// const options = {
// 	method: 'POST',
// 	headers: {
// 		'content-type': 'application/x-www-form-urlencoded',
// 		'X-RapidAPI-Key': 'f3ac58eedcmsh158cae8631cd06ep1ae4a0jsnce95e6464a1d',
// 		'X-RapidAPI-Host': 'tracker-for-carbon-footprint-api.p.rapidapi.com'
// 	},
// 	body: encodedParams
// };

// const trackPT = async function(){
//     try{
//         const response = fetch('https://tracker-for-carbon-footprint-api.p.rapidapi.com/publicTransit', options)
//         if(!response.ok) throw new Error('Problem getting the results')
//         const data = await response.json();
//         console.log(data)
//     }catch(err){
//         console.error(err)
//     }
//    } 
//    trackPT()
// }
