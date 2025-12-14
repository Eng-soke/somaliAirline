
import { Link, useNavigate} from "react-router-dom"
import axios from "axios"
import { useState } from "react"

function AdminRegist(){
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const navigate = useNavigate()
    const getRegister = (e)=>{
        e.preventDefault()
        axios.post("https://somaliairlinebackend.onrender.com/admin/create",{
            "username": username,
            "password": password,
        }).then(()=>{
            alert("created has been succesfully")
            navigate("/dash")
        }).catch((error)=> console.log(error))
    }


    return <div className="flex justify-center sm:my-16 my-20">


            <form className="bg-sky-400 sm:w-[400px] w-[350px] h-[450px] sm:px-10 sm:py-10 px-5 py-10 rounded">
                <input value={username} onChange={(event)=> setUsername(event.target.value)} className="w-[300px] rounded border-2 p-2" type="text" placeholder="Enter Name" />
                <br />
                <br />
                <input value={password} onChange={(event)=> setPassword(event.target.value)} className="w-[300px] border-2 rounded p-2" type="text" placeholder="Enter password" />
                <br />
                <br />
                <button onClick={getRegister} className="bg-blue-700 text-white w-[300px] rounded border-2 py-2 mt-10">Register</button>
                <p className="text-white pt-10">Dont't have account yet? <Link to="/admin">Login here</Link></p>
            </form>

</div>

}


export default AdminRegist