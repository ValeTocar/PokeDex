import { useEffect } from 'react';
import axios from 'axios';
import { defaulTypesEs } from '../../../lib/utils';
import './Form.css';
import { Link } from 'react-router';

function Form({ value, onSearch, type, onType, stock, onFiltered }) {
	useEffect(() => {
		if (!type) {
			onFiltered([]);
			return;
		}
		axios.get(`https://pokeapi.co/api/v2/type/${type}`).then(({ data }) => {
			const results = data.pokemon.map((p) => p.pokemon.name);
			onFiltered(stock.filter((p) => results.includes(p.name)));
		});
	}, [type, stock]);

	return (
		<>
		<div className="form">
		</div>
			<div className="link__container">
				<Link className="link__return" to="/">
					<h3 className="link__text">
Ir al Home
					</h3>
					
				</Link>
			</div>
		<div className='form__center'>

			<div className="form_container">
				<input
					type="text"
					placeholder="Buscar..."
					className="form_input"
					value={value}
					onChange={(e) => onSearch(e.target.value)}
				/>

				<select
					className="form_select"
					value={type}
					onChange={(e) => onType(e.target.value)}
				>
					<option value="">Todos</option>
					{Object.keys(defaulTypesEs).map((type) => (
						<option key={type} value={type}>
							{defaulTypesEs[type]}
						</option>
					))}
				</select>
			</div>
		</div>
		
		</>
	);
}

export default Form;
