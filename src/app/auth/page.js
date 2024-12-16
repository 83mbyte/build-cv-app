
import AuthPageContainer from '@/components/Auth_Page/AuthPageContainer';
import { Suspense } from 'react';

export default function Auth_Page() {

    return (
        <Suspense fallback={<Loading />}>
            <AuthPageContainer />
        </Suspense>
    )
}

const Loading = () => {
    return (
        <div style={{ display: 'flex', height: '100vh', width: '100%', margin: 1, padding: 1, alignItems: 'center', justifyContent: 'center' }}>
            <h2>Loading...</h2>
        </div>
    )
}