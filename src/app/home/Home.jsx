import { Link } from 'react-router';
import { useName } from '../../hooks/useName';
import Form from './components/Form';
import './Home.css';
import { CLEARNAME } from '../../providers/NameProvider';

function Home() {
	const [state, dispatch] = useName();
	return (
		<div className="home">
			<div className="home__con">
				<h1>POKÉDEX</h1>
				{state.name ? (
					<>
						<h2>Hola de nuevo, {state.name} </h2>
						<Link to="/pokedex" className="home__link">
							Ir a la Pokédex
						</Link>{' '}
						<span>o</span>{' '}
						<button
							className="home__btn"
							onClick={() => dispatch({ type: CLEARNAME })}
						>
							Salir
						</button>
					</>
				) : (
					<>
						<h2>¡Hola entrenador!</h2>
						<p>Para poder comenzar, dame un nombre</p>
						<Form />
					</>
				)}
			</div>
		</div>
	);
}

export default Home;
