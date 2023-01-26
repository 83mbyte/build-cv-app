
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputCustom from '../components/FormElements/InputCustom';
import SectionContainer from './SectionContainer';


import { fetchPersonDetails } from '../redux/features/personDetails/personDetailsSlice';
import SpinnerCustom from '../components/Spinner/SpinnerCustom';


const PersonDetails = ({ title, user }) => {
    let content;
    const dispatch = useDispatch();
    const data = useSelector(state => state.personDetails.data);
    const stateStatus = useSelector(state => state.personDetails.status);

    if (stateStatus === 'loading') {
        content = <SpinnerCustom />
    }
    else if (stateStatus === 'succeeded') {
        content = <Fragment>
            {
                Object.keys(data).reverse().map((item, index) => {


                    return Object.keys(data[item]).map((i, ind) => {

                        return <InputCustom
                            key={`${ind}_${index}`}
                            labelText={data[item][i].label}
                            defValue={data[item][i].value}
                            path={data[item][i].path}
                            required={data[item][i].required}
                            user={user}
                        />
                    })
                })
            }
        </Fragment>
    }

    useEffect(() => {
        if (stateStatus === 'idle') {
            // fetch state
            dispatch(fetchPersonDetails(user));
        }
    }, [stateStatus, dispatch])

    return (
        <SectionContainer type={'grid'} headingTxt={title}>
            {content}
        </SectionContainer>
    );
};

export default PersonDetails;