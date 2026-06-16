import { useEffect, useState } from "react";
import api from "../services/api";

export default function Careers() {

  const [perfil, setPerfil] = useState("");
  const [carreras, setCarreras] = useState([]);

  useEffect(() => {

    const loadRecommendations = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await api.get(
          "/careers/recommendations",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setPerfil(response.data.perfil);
        setCarreras(response.data.carreras);

      } catch (error) {

        console.error(error);

      }

    };

    loadRecommendations();

  }, []);

  return (
    <div style={{ padding: "30px" }}>

      <h1>Carreras Recomendadas</h1>

      <h2>
        Perfil detectado:
        {" "}
        {perfil}
      </h2>

      <br />

      {
        carreras.map((carrera, index) => (

          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px"
            }}
          >
            <h3>{carrera}</h3>
          </div>

        ))
      }

    </div>
  );
}