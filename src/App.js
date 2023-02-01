import { useEffect, useState } from 'react';
import Collection from './components/Collections';
import './index.scss';

const categories = [
  {
    name: 'All',
  },
  {
    name: 'Furniture',
  },
  {
    name: 'Shoes',
  },
  {
    name: 'Watches',
  },
  {
    name: 'Pizza',
  },
  {
    name: 'Fashion',
  },
  {
    name: 'Games',
  },
  {
    name: 'Movies',
  },
  {
    name: 'Cars',
  },
  {
    name: 'Random',
  },
];

function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : '';
    const pagination = `page=${page + 1}&limit=6`;

    fetch(`https://63d7be755dbd7232442bfd2e.mockapi.io/Collections/?${pagination}&${category}`)
      .then((res) => res.json())
      .then((data) => setCollections(data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);
  return (
    <div className="App">
      <h1>Collections</h1>
      <hr className="hr" />
      <div className="top">
        <ul className="tags">
          {categories.map((obj, idx) => (
            <li
              key={obj.name}
              onClick={() => setCategoryId(idx)}
              className={categoryId === idx ? 'active' : ''}>
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          className="search-input"
          placeholder="Search here"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h1 className="loading">Please wait loading data...</h1>
        ) : (
          collections
            .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((obj, index) => <Collection key={index} name={obj.name} images={obj.photos} />)
        )}
      </div>
      <ul className="pagination">
        {[...Array(3)].map((_, idx) => (
          <li onClick={() => setPage(idx)} key={idx} className={page === idx ? 'active' : ''}>
            {idx + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
