async function fetchData() {
    const sheetURL = "https://docs.google.com/spreadsheets/d/1XfFaFAWLZHu8me2znEvmRC3rK8OMVrtSKg4GSZbOgjg/gviz/tq?tqx=out:json";
    const response = await fetch(https://script.google.com/macros/s/AKfycbx3t5-HScPodCggRzirSqeAdfTVUsDcjK05oEjFXCk5D1uiPHGzP3AS4lRpM4hdWdqM/exec);
    const text = await response.text();
    
    let jsonText = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
    const data = JSON.parse(jsonText);

    let timestamps = [];
    let powerValues = [];
    let tableContent = "<table><tr><th>Timestamp</th><th>Voltage (V)</th><th>Current1 (A)</th><th>Current2 (A)</th><th>Current3 (A)</th><th>Current4 (A)</th><th>Power (W)</th></tr>";

    data.table.rows.forEach(row => {
        let timestamp = row.c[0].v;
        let voltage = row.c[1].v;
        let current1 = row.c[2].v;
        let current2 = row.c[3].v;
        let current3 = row.c[4].v;
        let current4 = row.c[5].v;
        let power = row.c[6].v;

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
}

function updateGraph(labels, data) {
    const ctx = document.getElementById('powerChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Power Consumption (W)',
                data: data,
                borderColor: 'blue',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: 'Time' } },
                y: { title: { display: true, text: 'Power (W)' } }
            }
        }
    });
}

window.onload = fetchData;
