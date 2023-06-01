import React from 'react'
import styled from "styled-components";

const NiveauCard = styled.p`
 top: -16px;
 left: -6px;
    position: absolute;
 font-size: 8px;
`;

const CardLogo = styled.div`
    background-image: linear-gradient(194deg, rgb(114,116,122),rgb(253,255,243));
    width: 25px;
    height: 25px;
    border-radius: 25% 10%;
    border: 1px solid rgb(179,179,178);
`;

const TextNiveau = styled.div`
    background-image: linear-gradient(194deg, rgb(114,116,122),rgb(253,255,243));
    width: 25px;
    height: 10px;
    border-radius: 100px;
    border: 1px solid rgb(179,179,178);
    font-size: 3px;
    display: flex;
    align-self: center;
`;

const Niveau = () => {
    return (
        <NiveauCard>
            <TextNiveau>
               <span>Niveau 1</span>
            </TextNiveau>
            <CardLogo>
                <img src="" alt="" />
            </CardLogo>
        </NiveauCard>
    )
}

export default Niveau
