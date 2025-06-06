import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useName } from '../../../hooks/useName';
import { SETNAME } from '../../../providers/NameProvider';
import './Form.css';

function Form() {
	const inputReft = useRef(null);
	const [error, setError] = useState(false);
	const [, dispatch] = useName();
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		setError(false); // Reset error state
		const value = inputReft.current.value;
		if (value.trim() === '') {
			setError('Escribe un nombre');
			return;
		}
		dispatch({ type: SETNAME, payload: value });
		navigate('/pokedex'); // Navigate to Pokedex page
		inputReft.current.value = ''; // Clear input field
	};

	return (
		<div className="form__container">
			<form className="form__input" onSubmit={handleSubmit}>
				<input
					className="form__home"
					type="text"
					placeholder="Tu nombre..."
					ref={inputReft}
				/>
				<button className="home__btn" type="submit">
					Comenzar
				</button>

				{error && <p className="error">{error}</p>}
			</form>
		</div>
	);
}

export default Form;
