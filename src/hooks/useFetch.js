import { useState, useCallback, useEffect} from 'react';
import axios from 'axios';

// Custom useFetch Hook
export const useFetch = (url, options) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCourseDetail = useCallback(
        async (url, opt) => {
            setIsLoading(true);
          try {
            const res = await axios(url, {}, opt);
            setResponse(res.data);
            setIsLoading(false);
          } catch (error) {
            console.log(error.response);
            setError(error.response);
          }
        }, 
        []
    )

    useEffect(() => {
        fetchCourseDetail(url, options)
    }, [])

    return { response, error, isLoading }

}