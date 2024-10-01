
import DashboardHeaderContainer from '@/components/Dashboard/Header/DashboardHeaderContainer';
import { Suspense } from 'react';

export default function Dashboard_Page() {

    return (
        <Suspense fallback={<Loading />}>

            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', margin: 0, padding: 0 }}>

                <DashboardHeaderContainer />
                <div style={{ margin: 10, marginTop: 40, padding: 15 }}>
                    Dashboard main area..
                    <p>LoreIpsum sunt consequat ut pariatur nisi magna mollit consequat exercitation. Et pariatur quis magna sit nisi elit
                        Ipsum sunt non do dolor mollit sunt ea non. Magna labore laborum duis eu. Consequat aute ullamco tempor veniam laboris est labore officia. Exercitation incididunt commodo qui adipisicing culpa. Nulla laborum sunt anim dolor cupidatat ut ullamco deserunt do ullamco aute esse veniam occaecat. In culpa ad commodo exercitation aliquip. Laboris et nisi ea enim proident nisi pariatur ea cillum excepteur.</p>
                </div>
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

