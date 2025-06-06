import { useEffect, useState } from 'react';
import axios from 'axios';
import List from './components/List';
import Form from './components/Form';
import './Pokedex.css';
import { useName } from '../../hooks/useName';
import { Link } from 'react-router';

const url = 'https://pokeapi.co/api/v2/pokemon?limit=649';

function Pokedex() {
	const [pokemons, setPokemons] = useState(null);
	const [search, setSearch] = useState('');
	const [type, setType] = useState('');
	const [typeFiltered, setTypeFiltered] = useState([]);
	const [state] = useName();

	useEffect(() => {
		axios.get(url).then(({ data }) => {
			setPokemons(data.results);
		});
	}, []);

	if (!pokemons) {
		return (
			<div>
				<p>Cargando...</p>
			</div>
		);
	}

	const filteredPokemons = (type ? typeFiltered : pokemons).filter((pokemon) =>
		pokemon.name.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<div className="pokedex">
			<Form
				stock={pokemons}
				value={search}
				type={type}
				onType={setType}
				onSearch={setSearch}
				onFiltered={setTypeFiltered}
			/>
			<div className="link__container">
				<Link className="link__return" to="/">
					<h3 className="link__text">
Ir al Home
					</h3>
					
				</Link>
			</div>
			<p className="info__name">
				Hola entrenador {state.name}, aqui encontraras tus pokémones favoritos
			</p>
			<div>
				<List pokemons={filteredPokemons} />
			</div>
			<footer className="pokedex__footer">
				<p>© 2025 Pokédex App - Todos los derechos reservados
					
				</p>
				<p>By Angel Guaricuco</p>
			</footer>
		</div>
	);
}

export default Pokedex;
