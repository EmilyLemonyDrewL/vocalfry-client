import React, { useEffect, useState } from 'react';
import CategoryCard from '../../components/Cards/CategoryCard';
import { getCategories } from '../../api/categoryData';

const CategoriesPage = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    getCategories().then((data) => setCats(data));
  }, []);

  return (
    <div
      className="container"
      style={{ marginTop: '40px' }}
    >
      <h4>Search for actors via categories</h4>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {cats.map((category) => (
          <div key={`category--${category.id}`} className="cat-col">
            <CategoryCard label={category.label} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
