async function fetchData() {
    const sheetURL = "YOUR_GOOGLE_SHEETS_JSON_FEED_URL";

    try {
        const response = await fetch(sheetURL);
        const text = await response.text();

        console.log("✅ Raw Response from Google Sheets:", text); // Debugging log

        let jsonText = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
        const data = JSON.parse(jsonText);

        console.log("✅ Parsed JSON Data:", data); // Debugging log

        if (!data.table || !data.table.rows || data.table.rows.length === 0) {
            console.warn("⚠️ No data found in Google Sheets.");
            document.getElementById("dataTable").innerHTML = "No data available.";
            return;
        }

        let timestamps = [];
        let powerValues = [];
        let tableContent = "<table><tr><th>Timestamp</th><th>Voltage (V)</th><th>Current (A)</th><th>Power (W)</th></tr>";

        data.table.rows.forEach((row, index) => {
            if (!row.c || row.c.length < 4) {
                console.warn(`⚠️ Skipping row ${index + 1} due to missing data:`, row);
                return;
            }

            let timestamp = row.c[0]?.f || "N/A"; // Use 'f' for formatted date
            let voltage = row.c[1]?.v || 0;
            let current = row.c[2]?.v || 0;
            let power = row.c[3]?.v || 0;

            timestamps.push(timestamp);
            powerValues.push(power);

            tableContent += `<tr>
                <td>${timestamp}</td>
                <td>${voltage}</td>
                <td>${current}</td>
                <td>${power}</td>
            </tr>`;
        });

        document.getElementById("dataTable").innerHTML = tableContent + "</table>";
        updateGraph(timestamps, powerValues);
    } catch (error) {
        console.error("❌ Error Fetching Data:", error);
        document.getElementById("dataTable").innerHTML = "Error loading data. Check Console.";
    }
}

window.onload = fetchData;
