import React, { useEffect, useState, useCallback } from 'react';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal'
const Ingredients = () => { //also can be written as: function Ingredients() {}

  const [userIngredients, setUserIngredients] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error,setError] = useState()

  useEffect(() => {
    console.log('Rendering ingredients!!', userIngredients)
  }, [userIngredients])

  const filteredIngredientsHandler = useCallback(filtered => {
    setUserIngredients(filtered)
  }, [])

  const addIngredientHandler = ingredient => {
    setIsLoading(true)
    fetch('https://react-hooks-example-25888-default-rtdb.firebaseio.com/ingredients.json',
      {
        method: 'POST',
        body: JSON.stringify(ingredient),
        headers: { 'Content-Type': 'application/json' }
      }).then(response => {
        setIsLoading(false)
        return response.json()
      }).then((responseData) => {
        setUserIngredients((prevIngredients) => {
          return [...prevIngredients, { id: responseData.name, ...ingredient }]
        })
      })

  }


  const removeIngredientHandler = ingredientId => {
    setIsLoading(true)
    fetch(`https://react-hooks-example-25888-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
      {
        method: 'DELETE',
      }).then( response => {
        setIsLoading(false)
        setUserIngredients(prevIngredients =>
          prevIngredients.filter((ingredient) => ingredient.id !== ingredientId) //will drop an item if the if statement returns true
        )
      }).catch(error => {
        setError('something went wrong')
        setIsLoading(false)
      })
  }

  const clearError = () => {
    setError(null)
    
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}
      >{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />


      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler} />

      </section>
    </div>
  );
}

export default Ingredients;
