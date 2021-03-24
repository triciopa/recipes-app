import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getDiets } from '../../actions';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Form.css';

export const Form = (props) => {
  const [input, setInput] = React.useState({
    title: '',
    summary: '',
    score: '',
    health: '',
    instructions: '<ul><li></li><li></li></ul>',
    diets: [],
  });
  const [errors, setErrors] = React.useState({
    title: '',
    summary: '',
    score: '',
    health: '',
    instructions: '',
    diets: [''],
    status: true,
  });
  const [response, setResponse] = React.useState('');

  useEffect(() => {
    props.getDiets();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleCheckbox = (e) => {
    if (e.target.checked) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
    } else {
      setInput({
        ...input,
        diets: input.diets.filter((diet) => diet !== e.target.value),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.status === false) {
      alert('There are errors in your form, check again');
    } else if (!input.title) {
      alert('The recipe needs a title');
    } else {
      axios.post('http://localhost:3001/recipe', input).then((json) => {
        setResponse(`${json.data.title} has been created`);
        setInput({
          title: '',
          summary: '',
          score: '',
          health: '',
          instructions: '',
          diets: [],
        });
        let inputs = document.querySelectorAll('input[type=checkbox]');
        inputs.forEach((item) => {
          item.checked = false;
        });
      });
    }
  };

  return (
    <div id="formComponent">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div id="labels">
          <label>Title:</label>
          {errors.title && <p className="danger">{errors.title}</p>}
          <input
            className={`${errors.title && 'danger'}`}
            type="text"
            name="title"
            value={input.title}
            onChange={handleInputChange}
          />
          <label>Summary:</label>
          {errors.summary && <p className="danger">{errors.summary}</p>}
          <textarea
            className={`${errors.summary && 'danger'}`}
            type="text"
            name="summary"
            value={input.summary}
            onChange={handleInputChange}
          />
          <div id="scores">
            <label>Score:</label>
            <input
              className={`${errors.score && 'danger'}`}
              type="number"
              min="1"
              max="99"
              name="score"
              value={input.score}
              onChange={handleInputChange}
            />
            {errors.score && <p className="danger">{errors.score}</p>}
            <label>Health:</label>
            <input
              className={`${errors.health && 'danger'}`}
              type="number"
              min="1"
              max="99"
              name="health"
              value={input.health}
              onChange={handleInputChange}
            />
            {errors.health && <p className="danger">{errors.health}</p>}
          </div>
          <label>Instructions:</label>
          <textarea
            className={`${errors.instructions && 'danger'}`}
            type="text"
            name="instructions"
            value={input.instructions}
            onChange={handleInputChange}
          />
          {errors.instructions && (
            <p className="danger">{errors.instructions}</p>
          )}
        </div>
        <div id="dietBox">
          <ul>
            {props.diets.map((diet) => (
              <li>
                {diet}
                <input
                  key={diet}
                  type="checkbox"
                  value={diet}
                  onChange={handleCheckbox}
                />
              </li>
            ))}
          </ul>
        </div>
        <div id="buttons">
          <div id="submit">
            <button type="submit">Submit recipe</button>
          </div>
          <div id="back">
            <Link to="/main">
              <button>Go back</button>
            </Link>
          </div>
        </div>
      </form>
      {response && <p id="response">{response}</p>}
    </div>
  );
};

export function validate(input) {
  let errors = {};

  if (!input.title) {
    errors.title = 'Title is required';
    errors.status = false;
  } else {
    errors.status = true;
  }
  // else if (!/\S+@\S+\.\S+/.test(input.title)) {
  //   errors.title = 'Username is invalid';
  // }

  if (!input.summary) {
    errors.summary = 'Summary is required';
    errors.status = false;
  } else if (!input.title) {
    errors.status = false;
  } else {
    errors.status = true;
  }

  // Checking if score is between 1 and 99
  if (!input.score) {
    errors.score = 'Score is required ';
    errors.status = false;
  } else if (!/^(?!0)[0-9]{1,2}$/.test(input.score)) {
    errors.score = 'Score must be a number from 1 to 99';
    errors.status = false;
  } else if (!input.title || !input.summary) {
    errors.status = false;
  } else {
    errors.status = true;
  }

  // Checking if health is between 1 and 99
  if (!input.health) {
    errors.health = 'Health score is required ';
    errors.status = false;
  } else if (!/^(?!0)[0-9]{1,2}$/.test(input.health)) {
    errors.health = 'Health score must be a number from 1 to 99';
    errors.status = false;
  } else if (!input.title || !input.summary) {
    errors.status = false;
  } else if (!input.score || !/^(?!0)[0-9]{1,2}$/.test(input.score)) {
    errors.status = false;
  } else {
    errors.status = true;
  }

  return errors;
}

const mapStateToProps = (state) => {
  return {
    diets: state.diets,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDiets: () => dispatch(getDiets()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
