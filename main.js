// Async function to populate the table with currency conversion data
const populate = async (base, value) => {
    // Initialize an empty string to hold the HTML rows for the table
    let myStr = "";

    // Define the API URL with the provided base currency
    const url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_1FlngNDWCnhPeRwrwc0amo3EATlgp8ntyxwkTBf8&base_currency=${base}`;

    // Fetch the currency conversion data from the API
    let response = await fetch(url);

    // Parse the response as JSON
    let rJson = await response.json();

    // Make the output table visible by setting its display to "block"
    document.querySelector(".output").style.display = "block";

    // Iterate over the keys in the "data" section of the API response
    for (let key of Object.keys(rJson["data"])) {
        // Build each table row with currency name, code, and the converted value
        myStr += `<tr>
            <td>${key}</td> <!-- Currency name -->
            <td>${rJson["data"][key]["code"]}</td> <!-- Currency code -->
            <td>${Math.round(rJson["data"][key]["value"] * value)}</td> <!-- Converted value -->
        </tr>`;
    }

    // Select the table body element where rows will be inserted
    const tableBody = document.querySelector("tbody");

    // Insert the constructed rows into the table body as HTML
    tableBody.innerHTML = myStr;
};

// Select the button element with class "btn" for conversion
const btn = document.querySelector(".btn");

// Add an event listener to the button that triggers on click
btn.addEventListener("click", (e) => {
    // Prevent the form from submitting or reloading the page
    e.preventDefault();

    // Retrieve the quantity entered by the user and parse it as an integer
    const inputValue = parseInt(document.querySelector("input[name='quantity']").value);

    // Retrieve the selected currency from the dropdown
    const currency = document.querySelector("select[name='currency']").value;

    // Call the populate function with the chosen currency and quantity as arguments
    populate(currency, inputValue);
});
