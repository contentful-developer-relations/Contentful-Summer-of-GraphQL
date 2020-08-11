import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

const query = `query{
  food (id: "5dUVVIfVC9Ze3Z4r4LedoR") {
    foodName
    picture{
      url(transform: {width:600, cornerRadius: 1000, format:PNG} )
      description
    }
  }
}`;

function App() {
  const [data, setData] = useState(null);

  useEffect(()=> {
    window.fetch('https://graphql.contentful.com/content/v1/spaces/69qc09r1b31n/?access_token=-1dsnun-jy-tEy1ZpRN6izl5CBr0EKv3yuRAzqqzpLc',
    {headers:{
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({query}),
    })
    .then(response => response.json())
    .then(json => setData(json.data));
  },[]);
  if (!data) return <span>Loading :(</span>;
  return (
    <div className="App">
      <header className="App-header">
        <img src={data.food.picture.url} className="App-logo" alt={data.food.picture.description} />
        <p>
          {data.food.foodName}
        </p>
      </header>
    </div>
  );
}

export default App;
