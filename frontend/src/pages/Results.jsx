export default function Results() {

  const data = JSON.parse(
    localStorage.getItem("resultado")
  );
    

  if (!data) {
    return <h2>No hay resultados</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>

      <h1>Resultado Vocacional</h1>

      <h2>
        Perfil:
        {" "}
        {data.perfilDominante}
      </h2>

      <pre>
        {
          JSON.stringify(
            data.scores,
            null,
            2
          )
        }
      </pre>
      <button
    onClick={() =>
    window.location.href = "/careers"
    }
    >
    Ver Carreras Recomendadas
    </button>

    </div>
  );
}