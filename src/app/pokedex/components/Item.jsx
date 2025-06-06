import { useEffect, useState } from 'react';
import axios from 'axios';
import './Item.css';
import { defaulTypesEs } from '../../../lib/utils';

function Item({ url }) {
	const [pokemon, setPokemon] = useState(null);

	useEffect(() => {
		axios.get(url).then(({ data }) => {
			const types = data.types.map((t) => defaulTypesEs[t.type.name]);
			const id = `Nº ${data.id.toString().padStart(3, '0')}`;
			setPokemon({
				id,
				name: data.name,
				image: data.sprites.other.dream_world.front_default,
				types,
			});
		});
	}, []);

	if (!pokemon) {
		return (
			<div>
				<p>Cargando tarjeta...</p>
			</div>
		);
	}
	return (
		<div className="item">
			<img className="item__img" src={pokemon.image} alt={pokemon.name} />
			<span className="item__id">{pokemon.id}</span>
			<h2 className="item__name">{pokemon.name}</h2>
			<p className="item__types">
				{pokemon.types.map((t) => (
					<span key={t} className={`item__type type--${t.toLowerCase()} `}>
						{' '}
						{t}{' '}
					</span>
				))}
			</p>
		</div>
	);
}

export default Item;
