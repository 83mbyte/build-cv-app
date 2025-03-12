'use client'

import { Toaster } from "@/components/ui/toaster";
import { ProviderRedux, ProviderUI } from "../providers";

import LoginPageContainer from "@/components/login_page/LoginPageContainer";

export default function Editor_Page() {

    return (
        <ProviderUI>
            <ProviderRedux>

                <LoginPageContainer />

                {/* to show info , warnings and so on as toasts */}
                <Toaster />
            </ProviderRedux>
        </ProviderUI>

    )
}