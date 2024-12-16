// Regex to ensure at least 1 letter and 1 number
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;

/**
 * Check length requirements for the given field
 * @param input 
 * @param fieldName 
 * @param min 
 * @param max 
 * @returns 
 */
export const checkLengthReq = (
    input:string,
    fieldName:string,
    min:number | null,
    max:number | null
) => {
    if (min && input.length < min) {
        return `${fieldName} should be greater than ${min} characters`;
    } else if (max && input.length > max) {
        return `${fieldName} should be less than ${max} characters`;
    }
    return '';
}


/**
 * Validates the username and password from the form
 * 
 * @returns newErrors Error messages object
*/
export const validateAccountInput = (
    username:string,
    password: string,
    passwordScore:number
) => {
    const newErrors: { username?: string; password?: string } = {};

    // Validate username
    if (!username.trim()) {
        newErrors.username = 'Username cannot be empty.';
    } else {
        // username exists
        // The username is >= 10 characters, and <= 50 characters
        const lengthError = checkLengthReq(username, 'Username', 10, 50);
        if (lengthError) {
            newErrors.username = lengthError;
        }
    }

    // Validate password
    if (!password.trim()) {
        newErrors.password = 'Password cannot be empty.';
    } else {
        // password exists
        // The password is >= 20 characters, and <= 50 characters
        const lengthError = checkLengthReq(password, 'Password', 20, 50);
        if (lengthError) {
            newErrors.password = lengthError;
        } else if (!passwordRegex.test(password)) {
            // Contains at least 1 letter (a-zA-Z) and 1 number (0-9)
            newErrors.password = 'Password must contain at least one letter and one number.';
        } else if (passwordScore < 2) {
            // The password has a Zxcvbn score >= 2.
            newErrors.password = 'Password is too weak. Please use a stronger password.';
        }
    }

        return newErrors;
}