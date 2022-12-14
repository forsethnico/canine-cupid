import "./MoodCard.css";
import { personalityState } from "../../utilities/interfaces";
import React from "react";

const MoodCard = ({
  personality,
  selectDog,
}: {
  personality: personalityState;
  selectDog: Function;
}) => {
  return (
    <div
      style={{ borderColor: `${personality.color}` }}
      className="mood-card"
      onClick={() => {
        selectDog(personality);
      }}
    >
      <h2 className="personality-name">{personality.name}</h2>
      <p>{personality.description}</p>
    </div>
  );
};

export default MoodCard;
