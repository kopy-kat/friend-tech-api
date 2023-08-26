import React, { useEffect, useState } from 'react';
import ResponseComponent from '../components/ResponseComponent';
import {
    getEvents,
    getUserDetails,
    getHoldingsActivity,
    getFriendsActivity,
    getPortfolio,
    getPoints,
    getTopListByPrice,
    getTrending,
    getKosettoConfig,
    searchUsersByTwitterHandle,
} from './api/endpoints';

const Home = () => {
    const [response, setResponse] = useState<any>(null);

    const handleSendRequest = async (endpoint: string, parameters: any) => {
        let result;

        switch (endpoint) {
            case 'getEvents':
                result = await getEvents();
                break;
            case 'getUserDetails':
                result = await getUserDetails(parameters.address, parameters.authToken);
                break;
            case 'getHoldingsActivity':
                result = await getHoldingsActivity(parameters.address);
                break;
            case 'getFriendsActivity':
                result = await getFriendsActivity(parameters.address);
                break;
            case 'getPortfolio':
                result = await getPortfolio(parameters.address, parameters.authToken);
                break;
            case 'getPoints':
                result = await getPoints(parameters.address);
                break;
            case 'searchUsersByTwitterHandle':
                result = await searchUsersByTwitterHandle(
                    parameters.username,
                    parameters.authToken,
                );
                break;
            case 'getTopListByPrice':
                result = await getTopListByPrice();
                break;
            case 'getTrending':
                result = await getTrending();
                break;
            case 'getKosettoConfig':
                result = await getKosettoConfig();
                break;
            default:
                result = { message: 'Invalid endpoint' };
        }

        setResponse(result);
    };

    // Call the "Events" endpoint when the component mounts
    useEffect(() => {
        handleSendRequest('getEvents', {});
    }, []);

    return (
        <main className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <ResponseComponent response={response} onSendRequest={handleSendRequest} />
        </main>
    );
};

export default Home;
