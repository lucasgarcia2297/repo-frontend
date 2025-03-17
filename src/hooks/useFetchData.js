import { useEffect, useState } from "react";

export const useFetchData = (apiUrl, fallbackData) => {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, { signal: controller.signal });
        if (!response.ok) {
          console.log(response.ok);
          
          throw new Error(`Error al obtener datos de ${apiUrl}`);
        }
        const result = await response.json();
       
        setData(result?.member ? result.member : fallbackData);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(`Error al obtener los datos de ${apiUrl}`, err);
          setError(err);
          setData(fallbackData);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      controller.abort();
     };
  }, [apiUrl]);

  return { data, loading, error };
};
