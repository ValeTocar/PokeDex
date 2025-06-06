import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import axios from 'axios';
import './Details.css';
import { defaulTypesEs } from '../../lib/utils';

function Details() {
	const { name } = useParams();
	const [pokemon, setPokemon] = useState(null);

	useEffect(() => {
		axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then(({ data }) => {
			const types = data.types.map(
				(t) => defaulTypesEs[t.type.name] || t.type.name,
			);

			const height = data.height / 10;
			const weight = data.weight / 10;

			const ps = data.stats[0].base_stat;
			const attack = data.stats[1].base_stat;
			const defense = data.stats[2].base_stat;
			const specialAttack = data.stats[3].base_stat;
			const speciasDefense = data.stats[4].base_stat;
			const speed = data.stats[5].base_stat;

			setPokemon({
				...data,
				types,
				height,
				weight,
				stats: {
					ps,
					attack,
					defense,
					specialAttack,
					speciasDefense,
					speed,
				},
			});
		});
	}, [name]);

	if (!pokemon) {
		return <div>Cargando...</div>;
	}

	return (
		<div className="details">
			<div className="details__container">
				<div className="details__header">
					<h2 className="details__name">{pokemon.name}</h2>
					<p className="details__id">{`Nº ${pokemon.id
						.toString()
						.padStart(3, '0')}`}</p>
				</div>

				<div className="details__content">
					<div className="details__img">
						<img
							src={pokemon.sprites.other.dream_world.front_default}
							alt={pokemon.name}
						/>
					</div>
					<div className="details__type">
						<h3>Tipo</h3>
						<p className="type__img">
							{pokemon.types.map((t) => (
								<span
									key={t}
									className={`item__type type--${t.toLowerCase()} `}
								>
									{' '}
									{t}{' '}
								</span>
							))}
						</p>
					</div>
					<div className="summoners">
						<ul className="details_summoners">
							<li>PS: {pokemon.stats.ps} </li>
							<li>Ataque:{pokemon.stats.attack} </li>
							<li>Defensa:{pokemon.stats.defense} </li>
							<li>Ataque especial:{pokemon.stats.specialAttack} </li>
							<li>Defensa especial:{pokemon.stats.speciasDefense} </li>
							<li>Velocidad:{pokemon.stats.speed} </li>
						</ul>
						<div className="description">
							<h3>Altura</h3>
							<p> {pokemon.height} M</p>

							<h3>Peso</h3>
							<p>{pokemon.weight} Km</p>
						</div>
					</div>
				</div>
				<Link className="link__btn" to="/pokedex">
					Ir a la Pokedex
				</Link>
			</div>
		</div>
	);
}

export default Details;
