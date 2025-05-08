import React, { useState } from "react";
import "./CategoryCards.css";

const data = {
  flowers: [
    {
      "name": "Rose",
      "url": "/rose.jpeg",
      "alt": "Close-up of a vibrant red rose with dew drops on its petals."
    },
    {
      "name": "Lily",
      "url": "/lily.jpeg",
      "alt": "A delicate white lily flower with soft petals and a subtle fragrance."
    },
    {
      "name": "Tulip",
      "url": "tulips.jpg",
      "alt": "A close-up of a bright yellow tulip with intricate petal details."
    },
    {
      "name": "Sunflower",
      "url": "Sunflower.jpeg",
      "alt": "A close-up of a sunflower with its golden petals and dark center."
    },
    {
      "name": "Daisy",
      "url": "Daisy.jpeg",
      "alt": "A cheerful white daisy with a yellow center and soft petals."
    },
    {
      "name": "Orchid",
      "url": "Orchid.webp",
      "alt": "A close-up of a pink orchid with delicate petals and intricate patterns."
    },
    {
      "name": "Marigold",
      "url": "Marigold.jpg",
      "alt": "A vibrant orange marigold flower with layered petals."
    },
    {
      "name": "Lavender",
      "url": "Lavender.jpg",
      "alt": "A close-up of lavender flowers with purple spikes and green stems."
    },
    {
      "name": "Jasmine",
      "url": "Jasmine.jpeg",
      "alt": "A close-up of a white jasmine flower with five petals and a sweet fragrance."
    },
    {
      "name": "Daffodil",
      "url": "Daffodil.webp",
      "alt": "A close-up of a yellow daffodil with a trumpet-shaped center."
    }
  ],
  fruits: [
    {
      "name": "Apple",
      "url": "https://www.istockphoto.com/photos/apple-close-up",
      "alt": "Close-up of a fresh red apple with droplets of water on its skin."
    },
    {
      "name": "Banana",
      "url": "https://www.istockphoto.com/photos/banana-close-up",
      "alt": "Close-up of a ripe banana with a smooth yellow peel."
    },
    {
      "name": "Orange",
      "url": "https://www.istockphoto.com/photos/orange-fruit-close-up",
      "alt": "Close-up of a vibrant orange with textured peel and droplets of water."
    },
    {
      "name": "Mango",
      "url": "https://www.istockphoto.com/photos/mango-close-up",
      "alt": "Close-up of a ripe mango with a smooth skin and subtle color gradient."
    },
    {
      "name": "Grapes",
      "url": "https://unsplash.com/s/photos/grape",
      "alt": "Close-up of a bunch of fresh grapes with dewdrops on the skin."
    },
    {
      "name": "Pineapple",
      "url": "https://www.istockphoto.com/photos/pineapple-close-up",
      "alt": "Close-up of a pineapple's textured skin and spiky crown."
    },
    {
      "name": "Strawberry",
      "url": "https://www.istockphoto.com/photos/strawberry-close-up",
      "alt": "Close-up of a ripe strawberry with seeds visible on its red surface."
    },
    {
      "name": "Blueberry",
      "url": "https://unsplash.com/s/photos/blueberries",
      "alt": "Close-up of fresh blueberries with a soft bloom on their skin."
    },
    {
      "name": "Papaya",
      "url": "https://www.freepik.com/free-photos-vectors/papaya-closeup",
      "alt": "Close-up of a sliced papaya revealing its vibrant orange flesh and black seeds."
    },
    {
      "name": "Watermelon",
      "url": "https://unsplash.com/s/photos/watermelon",
      "alt": "Close-up of a watermelon slice with visible seeds and juicy red flesh."
    }
  ],
  vegetables: [
    {
      "name": "Carrot",
      "url": "https://unsplash.com/s/photos/carrot",
      "alt": "Close-up of fresh carrots with bright orange color and green tops."
    },
    {
      "name": "Broccoli",
      "url": "https://www.freeimages.com/search/broccoli",
      "alt": "Close-up of broccoli florets with a rich green color."
    },
    {
      "name": "Spinach",
      "url": "https://unsplash.com/s/photos/spinach",
      "alt": "Close-up of fresh spinach leaves with a deep green hue."
    },
    {
      "name": "Potato",
      "url": "https://www.freepik.com/free-photos-vectors/potato-vegetable",
      "alt": "Close-up of a raw potato with earthy brown skin."
    },
    {
      "name": "Tomato",
      "url": "https://pixabay.com/images/search/tomatoes%20close-up/",
      "alt": "Close-up of a ripe tomato with droplets of water on its red surface."
    },
    {
      "name": "Cabbage",
      "url": "https://www.istockphoto.com/photos/cabbage-close-up",
      "alt": "Close-up of a cabbage with tightly packed green leaves."
    },
    {
      "name": "Peas",
      "url": "https://www.istockphoto.com/photos/peas-close-up",
      "alt": "Close-up of fresh green peas in their pods."
    },
    {
      "name": "Onion",
      "url": "https://www.istockphoto.com/photos/onion-close-up",
      "alt": "Close-up of a sliced onion revealing its layered structure."
    },
    {
      "name": "Garlic",
      "url": "https://www.istockphoto.com/photos/garlic-close-up",
      "alt": "Close-up of garlic cloves with papery white skin."
    },
    {
      "name": "Cucumber",
      "url": "https://www.istockphoto.com/photos/cucumber-close-up",
      "alt": "Close-up of a fresh cucumber with a bumpy green skin."
    }
  ],
};

const CategoryCards = ({ setWord }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleItemClick = (item) => {
    setWord?.(item); // call parent if provided
  };

  return (
    <div className="category-wrapper">
      {!activeCategory ? (
        <div className="category-cards-container">
          {Object.keys(data).map((category) => (
            <div
              key={category}
              className="category-card"
              onClick={() => handleCategoryClick(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </div>
          ))}
        </div>
      ) : (
        <div className="items-container">
        {data[activeCategory].map((item) => (
          <div
            key={item.name}
            className="item-card"
            onClick={() => handleItemClick(item.name)}
          >
            <img src={item.url} alt={item.alt} className="item-image" />
            <div className="item-name">{item.name}</div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default CategoryCards;
