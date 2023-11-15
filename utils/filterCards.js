const searchInput = document.getElementById("search");
if (searchInput) {
    searchInput.addEventListener("input", (e) => {
        const searchValue = e.target.value.toLowerCase();
        const cards = document.querySelectorAll(".cards .card");
        const messageContainer = document.querySelector(".message-container"); // Container for the message

        cards.forEach(card => {
            const anchorTag = card.querySelector("a"); // Get the <a> tag within the card

            if (anchorTag) {
                const anchorText = anchorTag.innerText.toLowerCase(); // Get the inner text of the <a> tag in lowercase
                const cardElement = card; // Store the card element

                if (anchorText.includes(searchValue)) {
                    // If the anchor text contains the search input value
                    cardElement.style.display = "block";
                } else {
                    // If not, hide the card
                    cardElement.style.display = "none";
                }
                
                // Toggle the visually-hidden class on the parent element
                const parentElement = cardElement.parentElement;
                if (anchorText.includes(searchValue)) {
                    parentElement.classList.remove("visually-hidden");
                } else {
                    parentElement.classList.add("visually-hidden");
                }
            }
        });

        // Check if there are no matching cards and display the message
        const matchingCards = document.querySelectorAll(".cards .card[style='display: block;']");
        if (matchingCards.length === 0) {
            // Create and append the message div
            if (!messageContainer) {
                const messageDiv = document.createElement("div");
                messageDiv.classList.add("message-container");
                messageDiv.textContent = "No Courses Found! 😥 ";

                // Add or remove the specified classes
                messageDiv.classList.add("card", "border", "bg-transparent", "rounded-3", "mt-3", "text-white-50","sticky-bottom");

                document.querySelector(".cards").appendChild(messageDiv);
            }
        } else {
            // If matching cards are found, hide the message
            if (messageContainer) {
                messageContainer.remove();
            }
        }
    });
}
