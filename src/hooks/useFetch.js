import axios from "axios"
import { useEffect, useState } from "react"

export function useFetch(url) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        const getUsers = async () => {
            setLoading(true)
            try {
                const res = await axios.get(url)
                setData(res.data)
                setLoading(false)
            } catch (e) {
                console.log(e)
                setLoading(false)
                setError(e)
            }
        }

        getUsers();
    }, [])
    return { data, loading, error }
}