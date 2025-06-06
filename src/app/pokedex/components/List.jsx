import { Link } from 'react-router';
import { usePagination } from '../../../hooks/usePagination';
import Item from './Item';
import Pagination from '../../../componetns/commons/Pagination';
import './List.css';

function List({ pokemons }) {
	const { content, page, totalPages, prev, next, itemPerPage } = usePagination(
		pokemons,
		12,
	);

	return (
		<div className="list">
			<div className="list_container">
				<div className="list_content">
					{content.map((pokemon) => (
						<Link key={pokemon.name} to={`/pokedex/${pokemon.name}`}>
							<Item url={pokemon.url} />
						</Link>
					))}
				</div>

				{content.length === 0 && (
					<p className="list_empty">No hay pokemons capturados</p>
				)}

				{itemPerPage < pokemons.length && (
					<Pagination
						page={page}
						totalPages={totalPages}
						prev={prev}
						next={next}
					/>
				)}
			</div>
		</div>
	);
}

export default List;
