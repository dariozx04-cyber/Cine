import { useState } from 'react';
import './App.css';

// Catálogo con al menos 20 películas o series y la palabra "año" corregida
const catalogoInicial = [
  { id: 1, titulo: "Interstellar", tipo: "Pelicula", genero: "Ciencia ficción", anio: 2014, duracion: "169 min", sinopsis: "Un grupo de científicos viaja a través de un agujero de gusano en busca de un nuevo hogar para la humanidad.", imagen: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
  { id: 2, titulo: "Coco", tipo: "Pelicula", genero: "Animación", anio: 2017, duracion: "105 min", sinopsis: "Miguel sueña con ser músico y emprende un viaje al colorido Mundo de los Muertos para descubrir los secretos de su familia.", imagen: "https://image.tmdb.org/t/p/w500/eKi8LeDW8VO0WzMUWzZtDq101iG.jpg" },
  { id: 3, titulo: "Stranger Things", tipo: "Serie", genero: "Misterio", anio: 2016, duracion: "4 Temporadas", sinopsis: "Un grupo de niños en un pueblo pequeño descubre experimentos secretos, fuerzas sobrenaturales y a una niña con extraños poderes.", imagen: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg" },
  { id: 4, titulo: "Inception", tipo: "Pelicula", genero: "Ciencia ficción", anio: 2010, duracion: "148 min", sinopsis: "Un ladrón que roba secretos corporativos a través del uso de la tecnología de los sueños recibe la tarea inversa de implantar una idea.", imagen: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg" },
  { id: 5, titulo: "Breaking Bad", tipo: "Serie", genero: "Drama", anio: 2008, duracion: "5 Temporadas", sinopsis: "Un profesor de química de secundaria diagnosticado con cáncer terminal se asocia con un ex alumno para fabricar y vender metanfetamina.", imagen: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg" },
  { id: 6, titulo: "The Batman", tipo: "Pelicula", genero: "Acción", anio: 2022, duracion: "176 min", sinopsis: "Batman se aventurará en el inframundo de Ciudad Gótica cuando un asesino deja un rastro de pistas crípticas.", imagen: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg" },
  { id: 7, titulo: "Avengers: Endgame", tipo: "Pelicula", genero: "Acción", anio: 2019, duracion: "181 min", sinopsis: "Los Vengadores restantes deben reunir fuerzas para deshacer las acciones de Thanos y restaurar el equilibrio en el universo.", imagen: "https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1rKDWQLNjBjhOk.jpg" },
  { id: 8, titulo: "The Witcher", tipo: "Serie", genero: "Fantasía", anio: 2019, duracion: "3 Temporadas", sinopsis: "Geralt de Rivia, un cazador de monstruos mutante, viaja hacia su destino en un mundo turbulento donde las personas suelen ser más malvadas que las bestias.", imagen: "https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg" },
  { id: 9, titulo: "Spider-Man: Across the Spider-Verse", tipo: "Pelicula", genero: "Animación", anio: 2023, duracion: "140 min", sinopsis: "Miles Morales es catapultado a través del Multiverso, donde se encuentra con un equipo de Spider-People encargados de proteger su propia existencia.", imagen: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg" },
  { id: 10, titulo: "Game of Thrones", tipo: "Serie", genero: "Fantasía", anio: 2011, duracion: "8 Temporadas", sinopsis: "Nueve familias nobles luchan por el control sobre las tierras de Westeros, mientras un antiguo enemigo regresa tras estar adormecido durante milenios.", imagen: "https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg" },
  { id: 11, titulo: "Joker", tipo: "Pelicula", genero: "Drama", anio: 2019, duracion: "122 min", sinopsis: "En Gotham City, el comediante mentalmente con problemas Arthur Fleck es ignorado y maltratado por la sociedad, embarcándose en una espiral descendente.", imagen: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg" },
  { id: 12, titulo: "The Mandalorian", tipo: "Serie", genero: "Ciencia ficción", anio: 2019, duracion: "3 Temporadas", sinopsis: "Las travesías de un cazarrecompensas solitario en los confines de la galaxia, lejos de la autoridad de la Nueva República.", imagen: "https://image.tmdb.org/t/p/w500/eU1i6eHXlzMOlEq0ku1Rzq7Y4tA.jpg" },
  { id: 13, titulo: "Toy Story", tipo: "Pelicula", genero: "Animación", anio: 1995, duracion: "81 min", sinopsis: "Un mundo donde los juguetes cobran vida cuando los humanos no están presentes, centrado en Woody y Buzz Lightyear.", imagen: "https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg" },
  { id: 14, titulo: "Dark", tipo: "Serie", genero: "Misterio", anio: 2017, duracion: "3 Temporadas", sinopsis: "La desaparición de un niño hace que cuatro familias desesperadas busquen respuestas mientras descubren un misterio retorcido de tres generaciones.", imagen: "https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg" },
  { id: 15, titulo: "Gladiator", tipo: "Pelicula", genero: "Acción", anio: 2000, duracion: "155 min", sinopsis: "Un general romano traicionado busca venganza contra el corrupto emperador que asesinó a su familia.", imagen: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg" },
  { id: 16, titulo: "Chernobyl", tipo: "Serie", genero: "Drama", anio: 2019, duracion: "1 Miniserie", sinopsis: "Dramatización de la catástrofe de la central nuclear de Chernóbil ocurrida en abril de 1986 y de los héroes que sacrificaron sus vidas.", imagen: "https://image.tmdb.org/t/p/w500/hlLXt2stDZhbRRX39A2Xq251d2p.jpg" },
  { id: 17, titulo: "Parasite", tipo: "Pelicula", genero: "Drama", anio: 2019, duracion: "132 min", sinopsis: "Toda la familia de Ki-taek está desempleada y se interesa mucho en los opulentos y acaudalados Park para ganarse la vida.", imagen: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg" },
  { id: 18, titulo: "Peaky Blinders", tipo: "Serie", genero: "Drama", anio: 2013, duracion: "6 Temporadas", sinopsis: "Una saga criminal ambientada en Birmingham (Inglaterra) en 1919, centrada en una pandilla mafiosa.", imagen: "https://image.tmdb.org/t/p/w500/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg" },
  { id: 19, titulo: "El Señor de los Anillos: La Comunidad del Anillo", tipo: "Pelicula", genero: "Fantasía", anio: 2001, duracion: "178 min", sinopsis: "Un joven hobbit, Frodo Bolsón, emprende un viaje con una valiente comunidad para destruir el Anillo Único.", imagen: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg" },
  { id: 20, titulo: "The Office", tipo: "Serie", genero: "Comedia", anio: 2005, duracion: "9 Temporadas", sinopsis: "Un falso documental sobre un grupo de empleados de oficina y sus vidas cotidianas bajo un jefe peculiar.", imagen: "https://image.tmdb.org/t/p/w500/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg" }
];

function App() {
  const [busqueda, setBusqueda] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('Todas');
  const [filtroGenero, setFiltroGenero] = useState('Todos');
  const [favoritos, setFavoritos] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [vistaFavoritos, setVistaFavoritos] = useState(false);

  const toggleFavorito = (item, e) => {
    e.stopPropagation();
    if (favoritos.some(fav => fav.id === item.id)) {
      setFavoritos(favoritos.filter(fav => fav.id !== item.id));
    } else {
      setFavoritos([...favoritos, item]);
    }
  };

  const listaBase = vistaFavoritos ? favoritos : catalogoInicial;
  const peliculasFiltradas = listaBase.filter(item => {
    const coincideTexto = item.titulo.toLowerCase().includes(busqueda.toLowerCase());
    const coincideTipo = filtroTipo === 'Todas' || item.tipo === filtroTipo;
    const coincideGenero = filtroGenero === 'Todos' || item.genero === filtroGenero;
    return coincideTexto && coincideTipo && coincideGenero;
  });

  return (
    <div className="app-container">
      <header className="header">
        <h1>CineSpot</h1>
        <button className="btn-fav-nav" onClick={() => setVistaFavoritos(!vistaFavoritos)}>
          {vistaFavoritos ? "🏠 Ver Catálogo Completo" : `⭐ Favoritos (${favoritos.length})`}
        </button>
      </header>

      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Buscar películas o series por título..." 
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="filters-container">
        <div className="filters">
          <button className={filtroTipo === 'Todas' ? 'active' : ''} onClick={() => setFiltroTipo('Todas')}>Todas</button>
          <button className={filtroTipo === 'Pelicula' ? 'active' : ''} onClick={() => setFiltroTipo('Pelicula')}>Películas</button>
          <button className={filtroTipo === 'Serie' ? 'active' : ''} onClick={() => setFiltroTipo('Serie')}>Series</button>
        </div>

        <select value={filtroGenero} onChange={(e) => setFiltroGenero(e.target.value)} className="select-genero">
          <option value="Todos">Todos los géneros</option>
          <option value="Ciencia ficción">Ciencia ficción</option>
          <option value="Animación">Animación</option>
          <option value="Misterio">Misterio</option>
          <option value="Drama">Drama</option>
          <option value="Acción">Acción</option>
          <option value="Fantasía">Fantasía</option>
          <option value="Comedia">Comedia</option>
        </select>
      </div>

      {vistaFavoritos && <h2 className="section-title">⭐ Tu Sección de Favoritos</h2>}

      <div className="grid-peliculas">
        {peliculasFiltradas.length > 0 ? (
          peliculasFiltradas.map(item => {
            const esFav = favoritos.some(fav => fav.id === item.id);
            return (
              <div key={item.id} className="card" onClick={() => setSeleccionado(item)}>
                <div className="card-img-container">
                  <img src={item.imagen} alt={item.titulo} />
                  <button className={`btn-fav ${esFav ? 'activo' : ''}`} onClick={(e) => toggleFavorito(item, e)}>
                    {esFav ? '⭐' : '☆'}
                  </button>
                </div>
                <div className="card-info">
                  <h3>{item.titulo}</h3>
                  <p>{item.genero} • <span>{item.tipo}</span></p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-results">No se encontraron elementos.</p>
        )}
      </div>

      {seleccionado && (
        <div className="modal-overlay" onClick={() => setSeleccionado(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSeleccionado(null)}>&times;</button>
            <img src={seleccionado.imagen} alt={seleccionado.titulo} />
            <div className="modal-details">
              <h2>{seleccionado.titulo}</h2>
              {/* Aquí se corrigió explícitamente a "Año" */}
              <p className="meta"><strong>Año:</strong> {seleccionado.anio} | <strong>Duración:</strong> {seleccionado.duracion} | <strong>Género:</strong> {seleccionado.genero}</p>
              <p><strong>Sinopsis:</strong> {seleccionado.sinopsis}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;