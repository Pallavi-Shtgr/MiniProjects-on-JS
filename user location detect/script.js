const button = document.querySelector("button");
const apiKey = 'YOUR_OPENCAGE_API_KEY'; // Replace with your OpenCage API key

button.addEventListener("click", () => {
    if (navigator.geolocation) {
        button.innerText = "Allow to detect location";
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        button.innerText = "Your browser does not support geolocation";
    }
});

function onSuccess(position) {
    button.innerText = "Detect your location";
    let { latitude, longitude } = position.coords;

    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`)
        .then(response => response.json())
        .then(result => {
            let allDetails = result.results[0].components;
            let { country, postcode } = allDetails;
            button.innerText = `${country} ${postcode}, ${country}`;
            console.table(allDetails);
        })
        .catch(() => {
            button.innerText = "Something went wrong";
        });
}

function onError(error) {
    if (error.code == 1) {
        button.innerText = "You denied the request";
    } else if (error.code == 2) {
        button.innerText = "Location not available";
    } else {
        button.innerText = "Something went wrong";
    }
    button.setAttribute("disabled", "true");
}
