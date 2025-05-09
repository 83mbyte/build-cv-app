'use client'

import { ProviderRedux, ProviderUI } from '@/app/providers';
import ControlCenterContainer from '@/components/control_center/ControlCenterContainer';
import { Toaster } from "@/components/ui/toaster";


const page = () => {
    return (
        <ProviderUI>
            <ProviderRedux>

                <ControlCenterContainer />
                <Toaster />

            </ProviderRedux>
        </ProviderUI>
    );
};

export default page;