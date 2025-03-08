const SHEET_URL = "https://script.google.com/macros/s/AKfycbzJBI0ZcrZMmrA6wLc3F0M8fWqLU4nCpUK9pUr2S6nY_rotyVIqDN_wU82tQ42Inpzz0g/exec";  // Replace with your Google Sheets CSV URL

async function fetchData() {
    try {
        const response = await fetch(SHEET_URL);
        const text = await response.text();
        const rows = text.trim().split("\n").slice(1);  
        const data = rows.map(row => row.split(","));

        console.log("Fetched Data:", data); // Debugging

        if (data.length === 0) {
            console.warn("No data available.");
            return;
        }

        let latest = data[data.length - 1]; // Get the latest row
        document.getElementById("voltage").innerText = latest[1] + " V";
        document.getElementById("current").innerText = latest[2] + " A";
        document.getElementById("powerFactor").innerText = latest[4];
        document.getElementById("energy").innerText = latest[5] + " kWh";

        checkAlerts(parseFloat(latest[2]), parseFloat(latest[4]));
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function checkAlerts(current, powerFactor) {
    let alertMessage = "";
    if (current > 10) alertMessage = "⚠️ High Current Detected!";
    if (powerFactor < 0.8) alertMessage = "⚠️ Low Power Factor Warning!";

    document.getElementById("alert").innerText = alertMessage;
}

setInterval(fetchData, 10000); // Fetch data every 10 seconds
fetchData();
