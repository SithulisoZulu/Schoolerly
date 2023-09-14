const purify = DOMPurify();

/**
 * Sanitizes the input against XSS attacks and trims it.
 * @param {string} input - The input to be sanitized.
 * @returns {string} - Returns the sanitized and trimmed input.
 * @throws {Error} - Throws an error if the input is empty after sanitization and trimming.
 */
export function sanitizeInput(input) {
    // Use DOMPurify library to sanitize input against XSS attacks
    var sanitizedInput = purify.sanitize(input);
  
    // Trim the sanitized input
    sanitizedInput = sanitizedInput.trim();
  
    // // Check for empty input
    // if (sanitizedInput === "") {
    //   throw new Error("Input cannot be empty");
    // }
  // console.log(sanitizedInput)
    return sanitizedInput;
  }