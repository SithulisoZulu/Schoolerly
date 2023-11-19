// Date Select
// Function to generate numbers and initialize Select2
function loadNumbers() {
    // Select the dropdown element
    var selectElement = $("#dateSelect");

    // Create an initial option with text "Date" and value ""
    var initialOption = new Option("Date", "");
    selectElement.append(initialOption);

    // Generate and load 31 numbers
    for (var i = 1; i <= 31; i++) {
        // Create an option element
        var option = new Option(i, i);

        // Append the option to the select element
        selectElement.append(option);
    }

}

// Call the function to load numbers when the page is loaded
$(document).ready(function () {
    loadNumbers();
});



//Month Select
// Function to load months and initialize Select2
function loadMonths() {
    // Select the dropdown element
    var selectElement = $("#monthSelect");

    // Array of month names
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Create an initial option with text "Select a month" and value ""
    var initialOption = new Option("Select a month", "");
    selectElement.append(initialOption);

    // Generate and load months
    for (var i = 0; i < months.length; i++) {
        // Create an option element
        var option = new Option(months[i], months[i]);

        // Append the option to the select element
        selectElement.append(option);
    }
}

// Call the function to load months when the page is loaded
$(document).ready(function () {
    loadMonths();
});


// Year Select
// Function to load years and initialize Select2
function loadYears() {
    // Select the dropdown element
    var selectElement = $("#yearSelect");

    // Create an initial option with text "Select a year" and value ""
    var initialOption = new Option("Select a year", "");
    selectElement.append(initialOption);
    
    // Generate and load years from 1990 to 2023
    for (var year = 1990; year <= 2023; year++) {
        // Create an option element
        var option = new Option(year, year);

        // Append the option to the select element
        selectElement.append(option);
    }
}

// Call the function to load years when the page is loaded
$(document).ready(function () {
    loadYears();
});


//year of Passing Select
    // Function to load years and initialize Select2
    function loadYearsOfPassing() {
        // Select the dropdown element
        var yearOfPassingSelect = $("#yearOfPassingSelect");

        // Create an initial option with text "Select a year" and value ""
        var initialOption = new Option("Select a year", "");
        yearOfPassingSelect.append(initialOption);
        

        // Generate and load years from 1990 to 2023
        for (var year = 1990; year <= 2023; year++) {
            // Create an option element
            var option = new Option(year, year);

            // Append the option to the select element
            yearOfPassingSelect.append(option);
           
        }
    }

    // Call the function to load years when the page is loaded
    $(document).ready(function () {
        loadYearsOfPassing();
    });

    //Cities S
        // Fetch city data from JSON file and populate the dropdown
        fetch('/data/zaCities.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Select the dropdown element
            var selectElement = $("#citySelect");

            // Create an initial option with text "Select a city" and value ""
            var initialOption = new Option("Select a city", "");
            selectElement.append(initialOption);

            // Iterate over the city data and create options
            data.forEach(city => {
                var option = new Option(city.city, city.city);
                selectElement.append(option);
            });

        })
        .catch(error => console.error('Error fetching data:', error));