import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

export type ErrorResponse = {
    status: number;
    statusText: string;
    data: any;
    error?: {
        message?: string;
    };
};

const ErrorPage: React.FC = () => {
    // you don't need to explicitly set error to `unknown`
    const error = useRouteError() as ErrorResponse; // Cast to your ErrorResponse type

    return (
        <div
            id='error-page'
            className='flex flex-col gap-8 justify-center items-center h-screen'
        >
            <h1 className='text-4xl font-bold'>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p className='text-slate-400'>
                <i>
                    {
                        isRouteErrorResponse(error) ?
                            (
                                // note that error is type `ErrorResponse`
                                error.error?.message || error.statusText
                            ) :
                            'Unknown error message'
                    }
                </i>
            </p>
        </div>
    )
}

export default ErrorPage