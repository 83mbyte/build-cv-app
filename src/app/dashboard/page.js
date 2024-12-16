
import DashboardHeaderContainer from '@/components/Dashboard/Header/DashboardHeaderContainer';
import DashboardMainContainer from '@/components/Dashboard/MainArea/DashboardMainContainer';
import { Suspense } from 'react';

export default function Dashboard_Page() {

    return (
        <Suspense fallback={<Loading />}>

            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', margin: 0, padding: 0 }}>

                {/* header container */}
                <header>
                    <DashboardHeaderContainer />
                </header>

                {/* main area container */}
                <main style={{ height: '100%' }}>
                    <DashboardMainContainer />
                </main>

            </div>

        </Suspense>
    )
}

const Loading = () => {
    return (
        <div style={{ display: 'flex', height: '100vh', width: '100%', margin: 1, padding: 1, alignItems: 'center', justifyContent: 'center' }}>
            <h2>Loading... Please wait.</h2>
        </div>
    )
}

