import axios from 'axios';
import {
    Events,
    UserDetails,
    HoldingsActivity,
    FriendsActivity,
    Portfolio,
    Points,
    ErrorResponse,
    TopListByPrice,
    Trending,
    KosettoConfig,
} from '../../../types';

const BASE_URL = 'https://prod-api.kosetto.com';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

const getHeaders = (authToken?: string) => {
    return authToken ? { Authorization: authToken } : {};
};

// Error Handling
const handleError = (error: any): ErrorResponse => {
    return error.response?.data || { message: 'An unexpected error occurred' };
};

// User Endpoints
export const getUserDetails = async (
    address: string,
    authToken: string,
): Promise<UserDetails | ErrorResponse> => {
    try {
        const response = await apiClient.get<UserDetails>(`/users/${address}`, {
            headers: getHeaders(authToken),
        });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

// Search Users by Twitter Handle
export const searchUsersByTwitterHandle = async (
    username: string,
    authToken: string,
): Promise<{ users: Array<any> } | ErrorResponse> => {
    try {
        const response = await apiClient.get(`/search/users?username=${username}`, {
            headers: getHeaders(authToken),
        });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

// Holdings Activity
export const getHoldingsActivity = async (
    address: string,
): Promise<HoldingsActivity | ErrorResponse> => {
    try {
        const response = await apiClient.get<HoldingsActivity>(`/holdings-activity/${address}`);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

// Friends Activity
export const getFriendsActivity = async (
    address: string,
): Promise<FriendsActivity | ErrorResponse> => {
    try {
        const response = await apiClient.get<FriendsActivity>(`/friends-activity/${address}`);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

// Portfolio
export const getPortfolio = async (
    address: string,
    authToken: string,
): Promise<Portfolio | ErrorResponse> => {
    try {
        const response = await apiClient.get<Portfolio>(`/portfolio/${address}`, {
            headers: getHeaders(authToken),
        });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

// Points
export const getPoints = async (address: string): Promise<Points | ErrorResponse> => {
    try {
        const response = await apiClient.get<Points>(`/points/${address}`);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

// Events
export const getEvents = async (): Promise<Events | ErrorResponse> => {
    try {
        const response = await apiClient.get<Events>('/events');
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

// Top List by Price
export const getTopListByPrice = async (): Promise<TopListByPrice | ErrorResponse> => {
    try {
        const response = await apiClient.get<TopListByPrice>('/lists/top-by-price');
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

// Trending
export const getTrending = async (): Promise<Trending | ErrorResponse> => {
    try {
        const response = await apiClient.get<Trending>('/lists/trending');
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

// Kosetto Config
export const getKosettoConfig = async (): Promise<KosettoConfig | ErrorResponse> => {
    try {
        const response = await apiClient.get<KosettoConfig>('/config');
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};
