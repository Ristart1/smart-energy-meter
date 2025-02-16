async function fetchData() {
    const sheetURL = "YOUR_GOOGLE_SHEETS_JSON_FEED_URL";

    try {
        const response = await fetch(sheetURL);
        const text = await response.text();

        // Extract JSON data correctly
        let jsonText = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
        const data = JSON.parse(jsonText);

        // Debugging: Check if data exists
        console.log("Fetched Data:", data);

        if (!data.table || !data.table.rows) {
            throw new Error("Invalid data format: No table or rows found");
        }

        let timestamps = [];
        let powerValues = [];
        let tableContent = "<table><tr><th>Timestamp</th><th>Voltage (V)</th><th>Current1 (A)</th><th>Current2 (A)</th><th>Current3 (A)</th><th>Current4 (A)</th><th>Power (W)</th></tr>";

        data.table.rows.forEach(row => {
            if (!row.c || row.c.length < 7) {
                console.warn("Skipping row due to missing data:", row);
                return;
            }

            let timestamp = row.c[0]?.v || "N/A";
            let voltage = row.c[1]?.v || 0;
            let current1 = row.c[2]?.v || 0;
            let current2 = row.c[3]?.v || 0;
            let current3 = row.c[4]?.v || 0;
            let current4 = row.c[5]?.v || 0;
            let power = row.c[6]?.v || 0;

            timestamps.push(timestamp);
            powerValues.push(power);

            tableContent += `<tr>
                <td>${timestamp}</td>
                <td>${voltage}</td>
                <td>${current1}</td>
                <td>${current2}</td>
                <td>${current3}</td>
                <td>${current4}</td>
                <td>${power}</td>
            </tr>`;
        });

        document.getElementById("dataTable").innerHTML = tableContent + "</table>";
        updateGraph(timestamps, powerValues);
    } catch (error) {
        console.error("Error Fetching Data:", error);
        document.getElementById("dataTable").innerHTML = "Error loading data. Check Console.";
    }
}
