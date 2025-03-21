let weatherForm=document.querySelector(".weatherform");
let cityInput=document.querySelector(".cityinput");
let cardview=document.querySelector(".card");
let apiKey="0060d567c75cfab42bb6c4e133a40fcc";

document.addEventListener("DOMContentLoaded",()=>{
    getweatherData("chennai")
    .then(displayWeatherInfo)
    .catch(displayError(message))

});
weatherForm.addEventListener("submit", async event=>{
event.preventDefault();

    let city=cityInput.value.trim();
    if(city){
        try{
            let weatherData= await getweatherData(city);
            displayWeatherInfo(weatherData);

        }
        catch(error){
            console.error(error);
            displayError(error);
            
        }
    }
    else{
        
        displayError("Please enter a city")
    }
    cityInput.value="";
});

async function getweatherData(city) {
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    let response= await fetch(apiUrl);
    console.log(response);
    if(!response.ok){
        throw new Error("could not fetch weather data,Please enter a city");
    }
    return await response.json();
}
function displayWeatherInfo(data){
    console.log(data);
    
    let {name:city,
        main:{temp,humidity},
        weather:[{description,id}],
        wind:{deg,speed},
        timezone}=data;

        let cityDispaly=document.querySelector(".citydisplay");
        let tempDispaly=document.querySelector(".tempdisplay");
        let humidityDispaly=document.querySelector(".humiditydispaly");
        let descriptionDispaly=document.querySelector(".descdisplay");
        let windSpeedDisplay=document.querySelector(".Windspeed");
        let windDegDisplay=document.querySelector(".winddeg");
        let weatherEmoji=document.querySelector(".weatheremoji");
        let timeZoneDisplay = document.querySelector(".timezone");
        let errorDisplay=document.querySelector(".errordisplay");

        cityDispaly.textContent = city;
        tempDispaly.textContent=`${(temp - 273.15).toFixed(1)}°C`;
        humidityDispaly.textContent=`Humidity:${humidity}%`;
        descriptionDispaly.textContent=description;
        windSpeedDisplay.textContent=`Wind:${speed}mph`;
        windDegDisplay.textContent=`Wind deg:${deg}°`;
        weatherEmoji.textContent=getweatherEmoji(id);
        timeZoneDisplay.textContent = `Timezone: GMT${formatDateWithTimezone(timezone)}`;

        errorDisplay.textContent="";

}   

function getweatherEmoji(weatherId){
    switch(true){
        case(weatherId>=200 && weatherId < 300):
        return "⛈";
        case(weatherId>=300 && weatherId < 400):
        return "🌦";
        case(weatherId>=500 && weatherId < 600):
        return "🌧";
        case(weatherId>=600 && weatherId < 700):
        return "❄";
        case(weatherId>=700 && weatherId < 800):
        return "🌫";
        case(weatherId ===800):
        return "☀";
        case(weatherId>=801 && weatherId < 810):
        return "☁";
        default:
            return "❓";
    }

}
function displayError(message){
    let errorDisplay=document.querySelector(".errordisplay");
        errorDisplay.textContent=message;   
        
        document.querySelector(".citydisplay").textContent="";
        document.querySelector(".tempdisplay").textContent="";
        document.querySelector(".humiditydispaly").textContent="";
        document.querySelector(".descdisplay").textContent="";
        document.querySelector(".Windspeed").textContent="";
        document.querySelector(".winddeg").textContent="";
        document.querySelector(".weatheremoji").textContent="";
        document.querySelector(".timezone").textContent="";
        
}

function formatDateWithTimezone(offsetInSeconds) {
    let utcTime = new Date(); 
    let localTime = new Date(utcTime.getTime() + offsetInSeconds * 1000);
    return localTime.toString(); 
}

