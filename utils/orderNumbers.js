
export const orderNumber = () => {
    // Constant part
    const prefix = "#";
    
    // Function to generate random uppercase letters
    function getRandomUppercaseLetter() {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return alphabet[Math.floor(Math.random() * 26)];
    }
    
    // Function to generate unique random three-digit number
    function getRandomUniqueNumber(existingNumbers) {
        let number;
        do {
        number = Math.floor(Math.random() * 1000);
        } while (existingNumbers.has(number));
        existingNumbers.add(number);
        return number.toString().padStart(4, '0');
    }
    
    // Generate two random uppercase letters
    const letter1 = getRandomUppercaseLetter();
    const letter2 = getRandomUppercaseLetter();
    
    // Generate three unique random numbers
    const uniqueNumbers = new Set();
    const numbers = getRandomUniqueNumber(uniqueNumbers);
    
    // Combine all parts to form the final string
    const result = prefix + letter1 + letter2 + numbers;
    
    return result;
}