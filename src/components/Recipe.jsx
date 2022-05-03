import React, {useState, useEffect, useCallback} from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Recipe = () => {
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState("instructions");
    let params = useParams();


    const fetchDetails = useCallback(async () =>{
        const data = await fetch(
            `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
        )
        const detailData = await data.json();
        setDetails(detailData);
    }, [params.name])  

    useEffect(() => {
      fetchDetails()
    }, [fetchDetails])

  return (
    <DetailWrapper>
        <div>
            <h2>{details.title}</h2>
            <img src={details.image} alt={details.title} />
        </div>
        <Info>
            <Button className={activeTab === "instructions" ? "active" : "" } onClick={() => setActiveTab("instructions")}>Instructions</Button>
            <Button className={activeTab === "ingredients" ? "active" : "" } onClick={() => setActiveTab("ingredients")}>Ingredients</Button>
            {activeTab === "instructions" && (
                <div>
                    <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
                    <h2 style={{textDecoration: "underline"}}>How To Prepare</h2>
                    <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
                </div>
            )}

            {activeTab === "ingredients" && (
                <div>
                    <ul>
                        {details.extendedIngredients.map(ingredient =>(
                            <li key={ingredient.id}>{ingredient.original}</li>
                        ))}
                    </ul>
                </div>
            )}


            
            
        </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
        margin-top: 5rem;
        margin-bottom: 5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .active{
            background: linear-gradient( 35deg, #494949, #313131);
            color: white;
        }
        h2{
            margin-bottom: 2rem;
        }
        li{
            font-size: 1.2rem;
            line-height: 2.5rem;
        }
        ul{
            margin-top: 2rem;
        }

        @media only screen and (max-width: 600px){
            img{
                height:300px;
                width: 400px;
            }
        }
`;
const Button = styled.button`
        padding: 1rem 2rem;
        color: #313131;
        background: white;
        border: 2px solid #313131;
        font-weight: 600;
        margin-right: 2rem;
        margin-top: 2rem;
`
const Info = styled.div`
        margin-left: 0rem;
`

export default Recipe;