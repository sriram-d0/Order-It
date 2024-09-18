import React, { useDeferredValue, useEffect } from 'react'
import { getRestaurants } from '../../actions/restaurantAction';
import { useDispatch, useSelector } from 'react-redux';

export default function CountRestaurents() {
  const dispatch=useDispatch();
  const{loading,error,count, showVegOnly, pureVegRestaurantsCount}=
  useSelector(state=>state.restaurants);


  useEffect(()=>{
    dispatch(getRestaurants());
  },[])
  return (
    <div>
      {loading?(
        <p>Loading Restaurant count...</p>
      ):error?(
      <p>Error: {error}</p>
    ):(
      <p className="NumOfRestro">
        {showVegOnly ? pureVegRestaurantsCount:count} {" "}
        <span className='Restro'>
          {showVegOnly
          ?pureVegRestaurantsCount===1
          ?"Restaurant"
          :"Restaurants"
          :count===1
          ?"Restaurant"
          :"Restaurants"
        }</span>
      </p>
      )}
      <hr/>
    </div>
  );
}
