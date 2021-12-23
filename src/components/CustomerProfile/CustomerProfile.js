import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';

import classes from './CustomerProfile.module.css';

const {REACT_APP_SERVER_URL} = process.env

const CustomerProfile = () => {
    const [customer, setCustomer] = useState({});
    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        let graphqlQuery = {
            query: `
                    {
                        getCustomerProfile {
                        _id,
                        name,
                        lastName,
                        active,
                        photoUrl,
                        physicalAddress,
                        phoneNumber,
                        emailAddress,
                        coordinates,
                        favoriteCategories {
                            _id,
                            name,
                            description,
                        },
                        userId {
                            _id,
                            username,
                            userRole {
                            _id,
                            name,
                            description,
                            },
                        },
                        
                        }
                    }
            `
        }

        axios.post(REACT_APP_SERVER_URL, JSON.stringify(graphqlQuery), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res.data);
        })
    }, [token])
    return (
        <div className={classes.container2}>
            <h1>User Profile</h1>
        </div>
    )
}

export default CustomerProfile;
