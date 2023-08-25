document.addEventListener("DOMContentLoaded", function () {
const clickbtn = document.getElementById("touch");
function details(info){
  var location = document.getElementById("names");
  location.textContent = info.name;
  var humid = document.getElementById("hum");
  humid.textContent = info.main["humidity"] + "%";
  var date= document.getElementById("date");
  var time= document.getElementById("time");
  var localTimestamp = info.dt+info.timezone;
  const localTime = new Date(localTimestamp * 1000);
  const options = { year: '2-digit', month: '2-digit', day: '2-digit'} ;
  const option={hour: '2-digit', minute: '2-digit' };
  const formattedDate = localTime.toLocaleString('en-US', options);
  const formattedTime = localTime.toLocaleString('en-US', option);
  date.textContent= formattedDate;
  time.textContent= formattedTime;
  var describe = document.getElementById('des');
  describe.textContent = info.weather[0].description;
  var tempCelsius = document.getElementById("temps");
  var calcCelsius=info.main['temp'] - 273.15;
  tempCelsius.textContent= calcCelsius.toFixed(2)+"°C";
  var presDet= document.getElementById("press");
  presDet.textContent=info.main['pressure']+ " hPa";
  var air= document.getElementById("wind")
  air.textContent=info.wind['speed'] +" m/s"
  var iconCode = info.weather[0].main;
  if (iconCode =="Clouds"){
  var weatherIcon = document.getElementById("code");
  weatherIcon.src = "cloud.png";
  }
  else if (iconCode=="Rain"){
  var weatherIcon = document.getElementById("code");
  weatherIcon.src = "rain.png";
  }
  else if (iconCode=="Thunderstorm"){
  var weatherIcon = document.getElementById("code");
  weatherIcon.src = "storm.png";
  }
  else if (iconCode=="Drizzle"){
  var weatherIcon = document.getElementById("code");
  weatherIcon.src = "drizzle.png";
  }
  else if (iconCode=="Clear"){
  var weatherIcon = document.getElementById("code");
  weatherIcon.src = "clear.png";   
  }
  else if (iconCode=="Mist"){
  var weatherIcon = document.getElementById("code");
  weatherIcon.src = "visibility.png"; 
  }
  var temptwo=document.getElementById('minmax');
  var minimum=info.main['temp_min']-273.15;
  var maximum=info.main['temp_max']-273.15;
  temptwo.textContent=minimum.toFixed(2)+"°C /" + maximum.toFixed(2)+"°C";

  var visible=document.getElementById('vis');
  visible.textContent=info.visibility+" m";
}


async function DataFetch() {
  const response = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=BhimDatta&appid=5b6efc31d9df5b58c06a64f0cba78094"
  );
  const data = await response.json();
  console.log(data);
  details(data);
}

async function FetchData() {
  const searchQuery = document.getElementById("input-box").value;
  console.log(searchQuery);
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=5b6efc31d9df5b58c06a64f0cba78094`
  );
  
  if(response.status === 404) {
    var loopContainer = document.getElementById("container");
    loopContainer.innerHTML = "";
    console.log("Location not found");
    var not = document.createElement("p1");
    not.textContent = "NO RESULT FOUND.";
    loopContainer.appendChild(not);
  }
  else{
  var loopContainer = document.getElementById("container");
  loopContainer.innerHTML = "";
  const data= await response.json();
  console.log(data) ;
  var top =document.createElement("top");
  top.classList.add("top"); 
  var left =document.createElement("left");
  left.classList.add("left"); 
  var right =document.createElement("right");
  right.classList.add("right"); 


  var weatherTemp=document.createElement("div_temp")
  weatherTemp.textContent = data.main.temp.toString() + "°C";
  
  var iconCode= document.createElement("div_code");
  iconCode.textContent= data.weather[0].main;
  if (iconCode.textContent =="Clouds"){
  var weatherIcon = document.createElement("img");
  weatherIcon.classList.add("imgs"); 
  weatherIcon.src = "cloud.png";
  }
  else if (iconCode.textContent=="Rain"){
  var weatherIcon = document.createElement("img");
  weatherIcon.classList.add("imgs"); 
  weatherIcon.src = "rain.png";
  }
  else if (iconCode.textContent=="Thunderstorm"){
  var weatherIcon = document.createElement("img");
  weatherIcon.classList.add("imgs"); 
  weatherIcon.src = "storm.png";
  }
  else if (iconCode.textContent=="Drizzle"){
  var weatherIcon = document.createElement("img");
  weatherIcon.classList.add("imgs"); 
  weatherIcon.src = "drizzle.png";
  }
  else if (iconCode.textContent=="Clear"){
  var weatherIcon = document.createElement("img");
  weatherIcon.classList.add("imgs"); 
  weatherIcon.src = "clear.png";   
  }
  else if (iconCode.textContent=="Mist" || iconCode=="Fog" || iconCode=="Haze"){
  var weatherIcon = document.createElement("img");
  weatherIcon.classList.add("imgs"); 
  weatherIcon.src = "mist.png"; 
  }
  else if (iconCode.textContent =="Snow"){
  var weatherIcon = document.createElement("img");
  weatherIcon.classList.add("imgs"); 
  weatherIcon.src = "rain.png";
  }
  else if (iconCode.textContent =="Dust"){
  var weatherIcon = document.createElement("img");
  weatherIcon.classList.add("imgs"); 
  weatherIcon.src ="dust.png";
  }

  var Info = document.createElement("div_details");
  Info.textContent = data.weather[0].description;

  var Location = document.createElement("div_location")
  var locationText = document.createElement("place");
  locationText.textContent= data.name.toString();
  Location.appendChild(locationText);

  var weatherMax_temp=document.createElement("div_max")
  weatherMax_temp.textContent= data.main.temp_max.toString() + "°C ";

  var weatherMin_temp=document.createElement("div_min")
  weatherMin_temp.textContent= "/ "+ data.main.temp_min.toString() + "°C";

  var date=document.createElement("date");
  var time=document.createElement("time");
  var localTimestamp = data.dt+data.timezone;
  const localTime = new Date(localTimestamp * 1000);
  const options = { year: '2-digit', month: '2-digit', day: '2-digit'} ;
  const option={hour: '2-digit', minute: '2-digit' };
  const formattedDate = localTime.toLocaleString('en-US', options);
  const formattedTime = localTime.toLocaleString('en-US', option);
  date.textContent= formattedDate;
  time.textContent= formattedTime;

  var weatherPressure= document.createElement("div_pressure");
  var pressureImage = document.createElement("img");
  pressureImage.classList.add("img1"); 
  pressureImage.src = "press-removebg-preview.png"
  weatherPressure.appendChild(pressureImage);
  var brElement = document.createElement("br");
  weatherPressure.appendChild(brElement);
  var pressureHeading = document.createElement("h");
  pressureHeading.textContent = "Pressure";
  weatherPressure.appendChild(pressureHeading);
  var pressureValue = document.createElement("p");
  pressureValue.classList.add("p2"); 
  pressureValue.textContent = data.main.pressure.toString() + " Pa";
  weatherPressure.appendChild(pressureValue);

  var weatherHumidity=document.createElement("div_humid")
  var humidImage = document.createElement("img");
  humidImage.classList.add("img1"); 
  humidImage.src = "hum-removebg-preview.png"
  weatherHumidity.appendChild(humidImage);
  var brElement = document.createElement("br");
  weatherHumidity.appendChild(brElement);
  var humidityHeading = document.createElement("h");
  humidityHeading.textContent = "Humidity";
  weatherHumidity.appendChild(humidityHeading);
  var humidityValue = document.createElement("p");
  humidityValue.classList.add("p2"); 
  humidityValue.textContent = data.main.humidity.toString() + "%";
  weatherHumidity.appendChild(humidityValue);

  var weatherWind=document.createElement("div_wind")
  var windImage = document.createElement("img");
  windImage.classList.add("img1"); 
  windImage.src = "speed-removebg-preview.png"
  weatherWind.appendChild(windImage);
  var brElement = document.createElement("br");
  weatherWind.appendChild(brElement);
  var windHeading = document.createElement("h");
  windHeading.textContent = "Wind Speed";
  weatherWind.appendChild(windHeading);
  var windValue = document.createElement("p");
  windValue.classList.add("p2"); 
  windValue.textContent = data.wind.speed.toString() + " m/s";
  weatherWind.appendChild(windValue);
  
  var visible=document.createElement("div_visible");
  var visibleImage = document.createElement("img");
  visibleImage.classList.add("img1"); 
  visibleImage.src = "vis.png"
  visible.appendChild(visibleImage);
  var brElement = document.createElement("br");
  visible.appendChild(brElement);
  var visibleHeading = document.createElement("h");
  visibleHeading.textContent = "Visibility";
  visible.appendChild(visibleHeading);
  var visibilityValue = document.createElement("p");
  visibilityValue.classList.add("p2"); 
  visibilityValue.textContent = data.visibility.toString() + " m";
  visible.appendChild(visibilityValue);
  top.appendChild(date);
  top.appendChild(time);
  left.appendChild(top);
  left.appendChild(Location);
  left.appendChild(weatherIcon);
  left.appendChild(weatherTemp);
  var brElement = document.createElement("br");
  left.appendChild(brElement);
  left.appendChild(weatherMax_temp);
  left.appendChild(weatherMin_temp);
  var brElement = document.createElement("br");
  left.appendChild(brElement);
  var brElement = document.createElement("br");
  left.appendChild(brElement);
  

  left.appendChild(Info);
  right.appendChild(weatherHumidity);
  right.appendChild(weatherPressure);
  right.appendChild(weatherWind); 
  right.appendChild(visible);     
  loopContainer.appendChild(left); 
  loopContainer.appendChild(right);  
}
}

if (document.getElementById("input-box").value == "") {
  DataFetch();
} else {
  FetchData();
}

clickbtn.addEventListener("click", () => FetchData());
});