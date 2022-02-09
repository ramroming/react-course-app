import React, { useEffect, useState, useCallback } from 'react';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';

const Ingredients = () => { //also can be written as: function Ingredients() {}

  const [userIngredients, setUserIngredients] = useState([])

  // useEffect( () => {
  //   fetch('https://react-hooks-example-25888-default-rtdb.firebaseio.com/ingredients.json').then(
  //   response =>  response.json()).then(responseData => {
  //     const loadedIngredients = [];
  //     for(const key in responseData){
  //       loadedIngredients.push({
  //         id: key,
  //         title: responseData[key].title,
  //         amount: responseData[key].amount
  //       });
  //     }
  //     setUserIngredients(loadedIngredients)
  //   })
  // }, [])


  useEffect( () => {
    console.log('Rendering ingredients!!',userIngredients)
  },[userIngredients])
  
  const filteredIngredientsHandler = useCallback(filtered => {
    setUserIngredients(filtered)
  }, [])

  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-example-25888-default-rtdb.firebaseio.com/ingredients.json',
      {
        method: 'POST',
        body: JSON.stringify(ingredient),
      headers: {'Content-Type' : 'application/json'}
    }).then( response => {
      return response.json()}).then((responseData) => {
        setUserIngredients ((prevIngredients) =>{
          return [...prevIngredients,{ id: responseData.name, ...ingredient }]
        })
      })
        
  }

  
  const removeIngredientHandler = ingredientId => {
    setUserIngredients(prevIngredients =>
      prevIngredients.filter((ingredient) => ingredient.id !== ingredientId) //will drop an item if the if statement returns true
    )
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />


      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler} />

      </section>
    </div>
  );
}

export default Ingredients;
