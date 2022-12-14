import React from "react";
import { dogData } from "../../utilities/interfaces";
import Dog from "../Dog/Dog";
import "./FeaturedDogs.css";

const FeaturedDogs = ({
  dogs,
  onToggleFavorite,
}: {
  dogs: dogData[];
  onToggleFavorite: (id: number, event: any) => void;
}): any => {
  const randomDogs = dogs.sort(() => 0.5 - Math.random()).slice(0, 8);

  const showFeaturedDogs = randomDogs.map((dog: dogData) => {
    return (
      <Dog
        key={dog.id}
        image={dog.image.url}
        breed={dog.name}
        id={dog.id}
        isFavorite={false}
        onToggleFavorite={onToggleFavorite}
      />
    );
  });

  return <div className="featured-dogs-container">
    <h2 className ="featured-dogs-header">Featured Dogs</h2>
      <div className="featured-dog-cards">{showFeaturedDogs}</div>
      </div>;
};

export default FeaturedDogs;
