import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CategoryCard from '../../components/Cards/CategoryCard';
import { getCategories } from '../../api/categoryData';

const CategoriesPage = () => {
  const [cats, setCats] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getCategories().then((data) => setCats(data));
  }, []);

  const handleCatClick = (categoryId) => {
    router.push(`Profile/ProfilesByCategory/${categoryId}`);
  };

  return (
    <div
      className="container"
      style={{ marginTop: '40px' }}
    >
      <h4>Search for actors via categories</h4>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {cats.map((category) => (
          <div key={`category--${category.id}`} className="cat-col">
            <CategoryCard
              label={category.label}
              onClick={() => handleCatClick(category.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
