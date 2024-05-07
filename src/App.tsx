import { useState, useEffect } from 'react'
import './App.css'

const useImageURL = () => {
  const [imageURL, setImageURL] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Realizar ambas solicitudes simultáneamente utilizando Promise.all
        const responses = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/photos/1", { mode: "cors" }),
          fetch("https://jsonplaceholder.typicode.com/photos/2", { mode: "cors" })
        ]);

        const data = await Promise.all(responses.map(response => {
          if (!response.ok) {
            throw new Error("Server error!!");
          }
          return response.json();
        }));

        // Establecer las URLs de las imágenes
        setImageURL(data[0].url); // Utilizamos la URL de la primera imagen
        setLoading(false); // Indicar que la carga ha terminado

      } catch (error) {
        setError(error); // Capturar cualquier error y establecer el estado de error
        setLoading(false); // Indicar que la carga ha terminado (independientemente del resultado)
      }
    };

    fetchImages(); // Llamar a la función para iniciar las solicitudes de imagen al montar el componente

  }, []);

  return { imageURL, error, loading };
};

function App() {
  const { imageURL, error, loading } = useImageURL();

  if (loading) return <p>Loading...</p>
  if (error) return <p>A network error was encountered!</p>

  return (
    imageURL && (
      <>
        <h1>An image</h1>
        <img src={imageURL} alt={"placeholder text"} />
      </>
    )
  )
}

export default App;