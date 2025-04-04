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
        console.log("Tracking Response:", trackData); // Debugging log
    } catch (err) {
        console.error("Error tracking click:", err);
    }
}
window.onload = () => {
trackClick();
};
//Check Button Clicks
async function trackButtonClick() {
        const affiliate_code = localStorage.getItem("affiliate_code");
        if (!affiliate_code) return;
        const ip_address = await fetch("https://api64.ipify.org?format=json").then(res => res.json()).then(data => data.ip);
        await fetch(`${BASE_URL}/track-button-click`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ affiliate_code, ip_address })
            });
}
