import axios, { AxiosResponse } from 'axios';

/**
 * Service that holds account functions (e.g. create an account)
 */
class AccountService {
    
    /**
     * Creates a new account with the given username and password.
     * @param username - The account username
     * @param password - The account password
     * @returns AxiosResponse - API response
     */
    static async createAccount(username: string, password: string): Promise<AxiosResponse> {
        const response = await axios.post('/api/create-account', { username, password });
        return response; // Return the full Axios response for further processing
    }
}

  export default AccountService;