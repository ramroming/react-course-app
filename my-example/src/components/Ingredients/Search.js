import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {

  const { onLoadIngredients } = props
  const [enteredFilter, setEnteredFilter] = useState('')
  const inputRef = useRef()

  useEffect(() => {

    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`
        fetch('https://react-hooks-example-25888-default-rtdb.firebaseio.com/ingredients.json' + query).then(
          response => response.json()).then(responseData => {
            const loadedIngredients = [];
            for (const key in responseData) {
              loadedIngredients.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount
              });
            }
            onLoadIngredients(loadedIngredients)
          })
      }
    }, 500)

    //a cleanUP function that will run right before the useEffect functin runs next time 
    //this ensures we only have one timer
    return () => {
      clearTimeout(timer)
    } 

  }, [enteredFilter, onLoadIngredients, inputRef])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={enteredFilter} ref={inputRef}
            onChange={event => setEnteredFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
