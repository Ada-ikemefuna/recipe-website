import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';

const Cuisine = () => {
  
      const [cuisine, setCuisine] = useState([]);
      let params = useParams();

      useEffect(() => {
        const abortCont = new AbortController();
        getCuisine(params.type, {signal: abortCont.signal})
        return () => abortCont.abort();
        
    }, [params])


          const getCuisine = async (name) => {
            //local storage
            const check = localStorage.getItem("cusine");


            if(check) {
               setCuisine(JSON.parse(check));
             } else{
            // api request
            const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`)
            const recipe = await data.json()

            localStorage.setItem("cuisine", JSON.stringify(recipe.results));
            setCuisine(recipe.results)
          }
  
        }

      
        
      
  return (
        <Grid
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.5}}
        >
          {cuisine.map((item) => {
            return (
              <Card key={item.id}>
                <Link to={"/recipe/" + item.id}>
                  <img src={item.image} alt={item.title} />
                  <h4>{item.title}</h4>
                </Link>
              </Card>
            )
          })}
        </Grid>
  )
}

const Grid = styled(motion.div)`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
      grid-gap: 3rem;
`;
const Card = styled.div`
      img{
        width: 100%;
        border-radius: 2rem;
      }
      a{
        text-decoration: none;
      }
      h4{
        text-align: center;
        padding: 1rem
      }
`;

export default Cuisine