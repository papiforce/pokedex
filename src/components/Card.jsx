import React from 'react'
import styled from "styled-components";
import imagePoke from '../assets/images/Screenshot_3.jpg'
import Niveau from './Niveau';


const CardContainer = styled.div`
  background-image: radial-gradient(circle at 77% 26%, rgba(175, 175, 175,0.06) 0%, rgba(175, 175, 175,0.06) 4%,transparent 4%, transparent 100%),radial-gradient(circle at 37% 90%, rgba(129, 129, 129,0.06) 0%, rgba(129, 129, 129,0.06) 55%,transparent 55%, transparent 100%),radial-gradient(circle at 7% 92%, rgba(53, 53, 53,0.06) 0%, rgba(53, 53, 53,0.06) 39%,transparent 39%, transparent 100%),radial-gradient(circle at 65% 17%, rgba(128, 128, 128,0.06) 0%, rgba(128, 128, 128,0.06) 60%,transparent 60%, transparent 100%),radial-gradient(circle at 100% 39%, rgba(75, 75, 75,0.06) 0%, rgba(75, 75, 75,0.06) 20%,transparent 20%, transparent 100%),radial-gradient(circle at 92% 34%, rgba(205, 205, 205,0.06) 0%, rgba(205, 205, 205,0.06) 35%,transparent 35%, transparent 100%),radial-gradient(circle at 63% 90%, rgba(98, 98, 98,0.06) 0%, rgba(98, 98, 98,0.06) 62%,transparent 62%, transparent 100%),radial-gradient(circle at 93% 74%, rgba(130, 130, 130,0.06) 0%, rgba(130, 130, 130,0.06) 65%,transparent 65%, transparent 100%),linear-gradient(90deg, rgb(18, 233, 78),rgb(160, 239, 92));
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  width: 230px;
  height: 360px;
  border: 5px rgb(255,225,101) solid;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  color: black;
  display: flex;
  justify-content: space-between;
//   margin-left: 24px;
`;

const CardImage = styled.img`
  width: 100%;
  margin-bottom: 10px;
  border: 3px solid grey, 
`;

const CardDescription = styled.p`
  font-size: 10px;
  color: black;
`;

const TextHealth = styled.span`
    font-size: 10px;
`;

const Move = styled.p`
    font-size: 13px;
    font-weight: bold;
    color: rgb(162,70,30);
    text-align: center;
`;

const ImageContainer = styled.div`
    position: relative;
    background-color: white;
    border: 3px solid grey;
    padding: 8px;
`;

const Card = () => {

    return (
        <CardContainer>
            <CardTitle>  Pikachu  <div><TextHealth>pv</TextHealth> 90</div></CardTitle>
            <ImageContainer>
                <CardImage src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/519.svg" alt="Pikachu" />
                {/* <Niveau></Niveau> */}
            </ImageContainer>

            <CardDescription>
                <Move>Toile Dissimulée</Move>
            </CardDescription>
        </CardContainer>
    )
}

export default Card