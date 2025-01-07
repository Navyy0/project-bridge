import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    console.error('Route Error:', error); // Debugging error details

    if (!error) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1 style={{ fontSize: '2rem', color: 'red' }}>Unexpected Error</h1>
                <p style={{ fontSize: '1.2rem', color: '#555' }}>Something went wrong.</p>
            </div>
        );
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1 style={{ fontSize: '2rem', color: 'red' }}>Oops! An Error Occurred</h1>
            <p style={{ fontSize: '1.2rem', color: '#555' }}>
                {error?.status ? `Status: ${error.status}` : 'An unexpected error occurred.'}
            </p>
            <p style={{ fontSize: '1rem', color: '#777' }}>
                {error?.statusText || 'No additional details are available.'}
            </p>
            {error?.data && (
                <pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: '5px' }}>
                    {typeof error.data === 'string' ? error.data : JSON.stringify(error.data, null, 2)}
                </pre>
            )}
        </div>
    );
};

export default ErrorPage;
