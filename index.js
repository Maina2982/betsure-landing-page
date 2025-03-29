document.addEventListener("DOMContentLoaded", function () {
    fetch(`${BACKEND_URL}/tips/wins`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("tips-table");

            // Ensure the table headers always exist
            const table = document.getElementById("tipsTable");
            if (!table.tHead) {
                const thead = table.createTHead();
                const headerRow = thead.insertRow();
                const headers = ["Date", "Match", "Tip", "Odds", "Outcome"];
                
                headers.forEach(headerText => {
                    const th = document.createElement("th");
                    th.textContent = headerText;
                    headerRow.appendChild(th);
                });
            }

            tableBody.innerHTML = ""; // Clear previous data

            // Populate table rows
            data.forEach(tip => {
                const row = document.createElement("tr");
                row.innerHTML = `
                   <td data-label="date">${tip.date}</td>
                    <td data-label="match">${tip.match}</td>
                    <td data-label="tip">${tip.tip}</td>
                    <td data-label="odds">${tip.odds}</td>
                    <td data-label="outcome">${tip.outcome}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error fetching data:", error));
});
