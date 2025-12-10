const BASE_URL = "https://betsurebackend.onrender.com";
function getAffiliateCode() {
    const urlParts = window.location.search.substring(1); // Remove "?"
    if (!urlParts) return null; // No affiliate code in URL
    const affiliateCode = parseInt(urlParts, 10); // Convert to integer
    if (isNaN(affiliateCode)) return null; // Invalid format
    localStorage.setItem("affiliate_code", affiliateCode); // Replace with actual code
    return affiliateCode;
}
// Function to extract affiliate code from URL (assuming format: ?1)
async function trackClick() {
    const affiliate_code = getAffiliateCode();
    if (!affiliate_code) {
        return;
    }
    try {
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        const ip_address = data.ip;
        const trackResponse = await fetch(`${BASE_URL}/track-click`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ affiliate_code, ip_address })
        });
        const trackData = await trackResponse.json();
    } catch (err) {
        console.error("Error tracking click:", err);
    }
}
window.onload = () => {
trackClick();
};
// Check Button Clicks
async function trackButtonClick() {
    const affiliate_code = localStorage.getItem("affiliate_code");
    if (!affiliate_code) {
        // Even if no affiliate code, still redirect
        window.location.href = "https://tipstar.win/tipstar.apk";
        return;
    }
    try {
        const ip_address = await fetch("https://api64.ipify.org?format=json")
            .then(res => res.json())
            .then(data => data.ip);
        await fetch(`${BASE_URL}/track-button-click`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ affiliate_code, ip_address })
        });
    } catch (error) {
        console.error("Tracking failed:", error);
    }
    // Redirect after tracking is complete
    window.location.href = "https://tipstar.win/tipstar.apk";
}
//tips
document.addEventListener("DOMContentLoaded", function () {
    fetch(`${BASE_URL}/tips/wins`)
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
              <td data-label="outcome"><div class="td-content">${tip.outcome}</div></td>
              <td data-label="date"><div class="td-content">${tip.date}</div></td>
              <td data-label="match"><div class="td-content">${tip.match}</div></td>
              <td data-label="tip"><div class="td-content">${tip.tips}</div></td>
              <td data-label="odds"><div class="td-content">${tip.odds}</div></td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error fetching data:", error));
});
