import React, { useEffect } from 'react'
import CountRestaurents from './CountRestaurents'
import Restaurent from './Restaurent'
import { getRestaurants, sortByRatings, sortByReviews, toggleVegOnly } from '../../actions/restaurantAction'
import { useDispatch, useSelector } from 'react-redux';
import Loader from "./Loader";
import Message from './Message';
export default function Home() {
const dispatch=useDispatch();

const {loading : restaurantsLoading,
  error : restaurantsError,
  restaurants,
  showVegOnly,
}=useSelector((state)=>state.restaurants);

useEffect(()=>{
  dispatch(getRestaurants());
},[dispatch]);

const handleSortByReview=()=>{
  dispatch(sortByReviews());
};

const handleSortByRatings=()=>{
  dispatch(sortByRatings());
};

const handleToggleVegOnly=()=>{
  dispatch(toggleVegOnly());
};
  return (
    <>
      <CountRestaurents/>
      {restaurantsLoading ? (
        <Loader/>
      ) : restaurantsError ? (
      <Message  variant=
      "danger">{restaurantsError}</Message>
    ):(
        <>
        <section>
        <div className="sort">
             <button className="sort_veg p-3" onClick={handleToggleVegOnly}>
              {showVegOnly ? "Show All": "Pure Veg"}
              </button>
             <button className="sort_rev p-3" onClick={handleSortByReview}>
              Sort By Review
              </button>
             <button className="sort_rate p-3" onClick={handleSortByRatings}>
              Sort By Ratings
              </button>             
        </div>
        <div className="row mt-4">
          {restaurants?(
            restaurants.map((restaurant)=>
            !showVegOnly || (showVegOnly && restaurant.isVeg) ?(
            <Restaurent key={restaurant._id} restaurant={restaurant} />          
            ):null
          )            
            ):(
            <Message variant="info">No Restaurant Found</Message>
          )}
        </div>
      </section>
        </>

      )}
      
    </>
  );
}
