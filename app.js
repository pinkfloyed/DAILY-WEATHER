const api = {
    key: "a445d915f2fa242786c340f724e7c6a5",
    base: "https://api.openweathermap.org/data/2.5/"
}

const box = document.querySelector('.box');
box.addEventListener('keypress', setQuery);

function setQuery(e) {
    if (e.keyCode === 13) {
        result(box.value);
    }
}

async function result(qu) {
    try {
        const response = await fetch(`${api.base}weather?q=${qu}&units=metric&APPID=${api.key}`);
        if (!response.ok) {
            throw new Error(`City not found. Please enter a valid city name.`);
        }

        const weather = await response.json();
        display(weather);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        displayError(error.message);
    }
}

function display(weather) {
    let a = document.querySelector('.location .city');
    a.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let d = new Date();
    let date = document.querySelector('.location .date');
    date.innerHTML = dateBuilder(d);

    let x = document.querySelector('.current .temp');
    x.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let w = document.querySelector('.current .weather');
    w.innerText = weather.weather[0].main;

    let h = document.querySelector('.hilow');
    h.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;

    
    clearError();
}

function displayError(message) {
    let errorContainer = document.querySelector('.error-message');
    
    if (!errorContainer) {
        errorContainer = document.createElement('div');
        errorContainer.classList.add('error-message');
        document.body.appendChild(errorContainer);
    }

    errorContainer.innerText = message;
    errorContainer.style.color = 'red';
    errorContainer.style.marginTop = '20px';
    errorContainer.style.textAlign = 'center';
    errorContainer.style.fontSize = '18px';
}

function clearError() {
    const errorContainer = document.querySelector('.error-message');
    if (errorContainer) {
        errorContainer.innerText = '';
    }
}

function dateBuilder(r) {
    let m = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let day = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    let date = r.getDate();
    let da = day[r.getDay()];
    let mo = m[r.getMonth()];
    let y = r.getFullYear();
    return `${da}, ${date} ${mo} ${y}`;
}
