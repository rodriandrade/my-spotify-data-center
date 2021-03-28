import React, {useContext, useState, useEffect} from 'react'

const TokenContext = React.createContext()
const TokenUpdateContext = React.createContext()

export function useToken(){
    return useContext(TokenContext)
}

export function useUpdateToken(){
    return useContext(TokenUpdateContext)
}

export function TokenProvider({children}){

    //const router = useRouter()
    const [updateToken, setUpdateToken] = useState('')
    const [token, setToken] = useState(updateToken ? updateToken : '');
    const [refreshToken, setRefreshToken] = useState('');


    function getHashParams() {
        if (typeof window !== "undefined") {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
        }
    }

    var params = getHashParams();

    // Get Token
    useEffect(() => {
        const getToken = () =>{
        // token from URL
        if(params.access_token){
            const access_token = params.access_token;
            const refresh_token = params.refresh_token;
            setToken(access_token)
            setRefreshToken(refresh_token)
        } /*else if(router.query.access_token){
            // token from query (link)
            const token = router.query.access_token
            const refreshToken = router.query.refresh_token
            setToken(token)
            setRefreshToken(refreshToken)
        }
        */
        }
        getToken();
    }, [/*router.query.access_token*/])

    console.log("ESTOY EN CONTEXT Y EL TOKEN ES --->" + " " + token)

    function tokenUpdate(){
        console.log(token)
        setUpdateToken(token)
        console.log("El token se actualizo globalmente a --->" + token )
    }
    

    return(
        <TokenContext.Provider value={token}>
            <TokenUpdateContext.Provider value={tokenUpdate}>
                {children}
            </TokenUpdateContext.Provider>
        </TokenContext.Provider>
    )
}