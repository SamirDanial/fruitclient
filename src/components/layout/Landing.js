import React, {useEffect} from "react";
import { useLazyQuery } from '@apollo/client';
import { MY_PROFILE } from '../hooks/Customer';
import { customerActions } from '../../store/customer';
import { useDispatch, useSelector } from 'react-redux';

const Landing = () => {
  const isAuth = useSelector((state) => state.auth.authenticated);
  const dispatch = useDispatch();
    const [query] = useLazyQuery(MY_PROFILE, {
        onCompleted: data => {
            return data;
        }
    });
    
    useEffect(() => {
      if(isAuth) {
        query().then(res => {
            const data = res.data;
            console.log(data);
            if(data) {
                dispatch(customerActions.getCustomerProfile({
                    ...data.getCustomerProfile
                }));
            }
        });
      }
    }, [query, dispatch, isAuth])
  return (
    <section>
      
    </section>
  );
};

export default Landing;
