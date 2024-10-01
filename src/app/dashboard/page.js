
import { Suspense } from 'react';

export default function Dashboard_Page() {

    return (
        <Suspense fallback={<Loading />}>

            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', margin: 0, padding: 0 }}>
                <div style={{ marginBottom: 5, padding: 5, borderColor: 'grey', borderWidth: 0, borderBottomWidth: 1, backgroundColor: 'white' }}>Dashboard Header</div>
                <div style={{ margin: 0, padding: 5 }}>
                    Dashboard main area..
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

