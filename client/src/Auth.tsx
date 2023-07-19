import {Navigate} from "react-router-dom"
import axios from "axios"
import {useState, useEffect} from "react"

export const Auth = ({children}) => {

    const [user,setUser] = useState(0);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const verify = async () => {
            try{
                if(token){

                    const resp = await axios.post("http://localhost:5000/verify-token",{},{
                    headers: {
                        "Authorization": token,
                        "content-type": "application/json"
                    }

                    

                });

                if(await resp.data === 200){
                    setUser(1);
                }

                }

            }
            catch(e){
                setUser(2);
                
            }
            
        }

        verify();
        

    },[]);


    if(user === 1){
        return children;
    }else if(user === 2){   
    return <Navigate replace to={"/login"} />
    }
        

    



};