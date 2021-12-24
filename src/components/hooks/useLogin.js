import { useQuery, gql } from "@apollo/client";

const GET_USER = gql`
        query loginUser($username: String, $password: String) 
            {
                loginUser(credintialInput: {username: $username, password: $password}) {
                    _id,
                    username,
                    token,
                    userRole {
                        name
                    }
            }
        }`;

export const useLogin = (username, password) => {
    const {error, data, loading} = useQuery(GET_USER, {
        variables: {
            username,
            password
        }
    });

    return {
        error,
        data,
        loading,
    }
};
