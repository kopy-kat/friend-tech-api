import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

interface Props {
    response: any;
    onSendRequest: (endpoint: string, parameters: any) => void;
}

const endpoints = [
    { name: 'Events', value: 'getEvents', description: 'Retrieve a list of recent events.' },
    {
        name: 'Top List by Price',
        value: 'getTopListByPrice',
        description: 'Get users sorted by token price.',
    },
    { name: 'Trending', value: 'getTrending', description: 'Fetch trending users.' },
    {
        name: 'Kosetto Config',
        value: 'getKosettoConfig',
        description: 'Get configuration for Kosetto NFT.',
    },
    {
        name: 'User Details',
        value: 'getUserDetails',
        description: 'Get details for a specific user.',
        inputs: ['Address', 'Auth Token'],
    },
    {
        name: 'Search Users by Twitter Handle',
        value: 'searchUsersByTwitterHandle',
        description: 'Search users by their Twitter handle.',
        inputs: ['Username', 'Auth Token'],
    },
    {
        name: 'Holdings Activity',
        value: 'getHoldingsActivity',
        description: 'Get trading history for a user.',
        inputs: ['Address'],
    },
    {
        name: 'Friends Activity',
        value: 'getFriendsActivity',
        description: 'Get friends-related activity for a user.',
        inputs: ['Address'],
    },
    {
        name: 'Portfolio',
        value: 'getPortfolio',
        description: 'Get portfolio details for a user.',
        inputs: ['Address', 'Auth Token'],
    },
    {
        name: 'Points',
        value: 'getPoints',
        description: 'Get the points for a user (e.g., for airdrops).',
        inputs: ['Address'],
    },
];

const ResponseComponent: React.FC<Props> = ({ response, onSendRequest }) => {
    const [activeTab, setActiveTab] = useState<'json' | 'tree' | 'rendered'>('json');
    const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0].value);
    const [address, setAddress] = useState('');
    const [authToken, setAuthToken] = useState('');
    const [username, setUsername] = useState('');
    const [selectedNode, setSelectedNode] = useState<any>(response);
    const [requestLoading, setRequestLoading] = useState<boolean>(false);

    const handleRequest = async () => {
        setRequestLoading(true);
        const endpointConfig = endpoints.find((endpoint) => endpoint.value === selectedEndpoint);
        const parameters: any = {};
        if (endpointConfig?.inputs?.includes('Address')) {
            parameters.address = address;
        }
        if (endpointConfig?.inputs?.includes('Auth Token')) {
            parameters.authToken = authToken;
        }
        if (endpointConfig?.inputs?.includes('Username')) {
            parameters.username = username;
        }
        await onSendRequest(selectedEndpoint, parameters);
        setRequestLoading(false);
    };

    // A recursive function to render data as cards
    const renderData = (data: any) => {
        return Object.keys(data).map((key) => (
            <div key={key} className="mb-2">
                {typeof data[key] === 'object' && data[key] !== null ? (
                    <div className="p-4 rounded mb-4">
                        <h3 className="font-bold">{key}</h3>
                        {renderData(data[key])}
                        <hr />
                    </div>
                ) : (
                    <div className="flex items-center">
                        <span className="font-bold mr-2">{key}:</span>
                        {key.toLowerCase().includes('url') && typeof data[key] === 'string' ? (
                            <img src={data[key]} alt={key} className="w-12 h-12 rounded" />
                        ) : (
                            <span>{data[key]}</span>
                        )}
                    </div>
                )}
            </div>
        ));
    };

    const renderCards = () => {
        return Array.isArray(response) ? (
            response.map((item, index) => <div key={index}>{renderData(item)}</div>)
        ) : (
            <div>{renderData(response)}</div>
        );
    };

    const renderContent = () => {
        if (activeTab === 'json') {
            return (
                <pre className="whitespace-pre-wrap break-all">
                    {JSON.stringify(response, null, 2)}
                </pre>
            );
        } else if (activeTab === 'tree') {
            return <ReactJson src={response} enableClipboard={false} displayDataTypes={false} />;
        } else if (activeTab === 'rendered') {
            return renderCards();
        }
    };

    const selectedInputs =
        endpoints.find((endpoint) => endpoint.value === selectedEndpoint)?.inputs || [];

    return (
        <div className="flex flex-col p-8 md:p-12 lg:p-12 w-full">
            <div className="flex items-center mb-4">
                <img
                    src="./friendtechlogo.png"
                    alt="Friend Tech"
                    width={50}
                    height={50}
                    className="mr-4"
                />
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100">
                    friend.tech API Tester
                </h2>
            </div>
            <div className="flex flex-col md:flex-row flex-wrap items-center mb-4">
                <select
                    className="p-3 border text-ellipsis border-gray-300 rounded text-gray-700 dark:text-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:border-blue-500 w-full md:flex-grow md:w-auto mb-2 md:mb-0 overflow-hidden whitespace-nowrap"
                    onChange={(e) => setSelectedEndpoint(e.target.value)}
                >
                    {endpoints.map((endpoint) => (
                        <option key={endpoint.value} value={endpoint.value}>
                            {endpoint.name} - {endpoint.description}
                        </option>
                    ))}
                </select>

                <button
                    onClick={handleRequest}
                    className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none focus:bg-blue-700 transition duration-150 ease-in-out w-full md:w-auto"
                >
                    {requestLoading ? 'Loading...' : 'Send Request'}
                </button>
            </div>
            {selectedInputs.includes('Address') && (
                <input
                    type="text"
                    placeholder="Address"
                    className="mb-4 p-3 border border-gray-300 rounded text-gray-700 dark:text-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:border-blue-500"
                    onChange={(e) => setAddress(e.target.value)}
                />
            )}
            {selectedInputs.includes('Auth Token') && (
                <input
                    type="text"
                    placeholder="Auth Token"
                    className="mb-4 p-3 border border-gray-300 rounded text-gray-700 dark:text-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:border-blue-500"
                    onChange={(e) => setAuthToken(e.target.value)}
                />
            )}
            {selectedInputs.includes('Username') && (
                <input
                    type="text"
                    placeholder="Username"
                    className="mb-4 p-3 border border-gray-300 rounded text-gray-700 dark:text-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:border-blue-500"
                    onChange={(e) => setUsername(e.target.value)}
                />
            )}

            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                Response
            </h2>
            <div className="flex space-x-4 mb-4">
                <button
                    onClick={() => setActiveTab('json')}
                    className={activeTab === 'json' ? 'font-bold' : ''}
                >
                    JSON
                </button>
                <button
                    onClick={() => setActiveTab('tree')}
                    className={activeTab === 'tree' ? 'font-bold' : ''}
                >
                    Tree
                </button>
                <button
                    onClick={() => setActiveTab('rendered')}
                    className={activeTab === 'rendered' ? 'font-bold' : ''}
                >
                    Rendered
                </button>
            </div>
            <div className="text-sm md:text-base bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600 max-h-[800px] overflow-y-auto">
                {renderContent()}
            </div>
        </div>
    );
};

export default ResponseComponent;
