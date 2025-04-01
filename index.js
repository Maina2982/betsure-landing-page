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

// Extract affiliate code from the query string
function getAffiliateCode() {
    const params = new URLSearchParams(window.location.search);
    const affiliateCode = params.get('affiliate_code'); 
    console.log("Extracted Affiliate Code:", affiliateCode); // Debugging log
    return affiliateCode;
}
async function trackClick() {
    const affiliate_code = getAffiliateCode();
    if (!affiliate_code) {
        console.log("No affiliate code found in URL.");
        return;
    }
    try {
        // Fetch the IP address
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        const ip_address = data.ip;
        console.log("User IP Address:", ip_address); // Debugging log
        // Send data to backend
        const trackResponse = await fetch("https://betsurebackend.onrender.com/track-click", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ affiliate_code, ip_address })
        });
        const trackData = await trackResponse.json();
        console.log("Tracking Response:", trackData); // Debugging log
    } catch (err) {
        console.error("Error tracking click:", err);
    }
}
// Run the function when the page fully loads
window.onload = () => {
    console.log("Page fully loaded, tracking click...");
    trackClick();
};
