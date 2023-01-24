
import React, { Fragment } from 'react';
import InputCustom from '../FormElements/InputCustom';
import SectionContainer from './SectionContainer';

const PersonDetails = ({ title, state, user }) => {

    //const rootPath = 'personDetails';
    return (
        <SectionContainer type={'grid'} headingTxt={title}>
            <Fragment>
                {
                    Object.keys(state).reverse().map((item, index) => {

                        // let basePath = `${item}`;
                        return Object.keys(state[item]).map((i, ind) => {
                            // let subPath = `${i}`
                            // let path = rootPath + '/' + basePath + '/' + subPath + '/value';
                            return <InputCustom
                                key={`${ind}_${index}`}
                                labelText={state[item][i].label}
                                defValue={state[item][i].value}
                                path={state[item][i].path}
                                required={state[item][i].required}
                                user={user}
                            />
                        })
                    })

                }
            </Fragment>
        </SectionContainer>
    );
};

export default PersonDetails;