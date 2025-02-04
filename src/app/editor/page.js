'use client'

import { ProviderRedux, ProviderUI } from "../providers";

import MainBgContainer from "@/components/editor_page/MainBgContainer";
import EditorMainContainer from "@/components/editor_page/EditorMainContainer";

export default function Editor_Page() {

    return (
        <ProviderUI>
            <ProviderRedux>

                <MainBgContainer>
                    <EditorMainContainer />
                </MainBgContainer>

            </ProviderRedux>
        </ProviderUI>

    )
}