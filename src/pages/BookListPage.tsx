import { useState } from 'react';
import FilterSidebar from "@components/FilterSideBar";

const allProducts = [
  { id: 1, name: 'Camisa', price: 30 },
  { id: 2, name: 'Pantalón', price: 50 },
  { id: 3, name: 'Zapatos', price: 80 },
  { id: 4, name: 'Camisa', price: 60 },
];

const ProductListPage = () => {
  const [filters, setFilters] = useState([
    {
      key: 'name',
      label: 'Nombre',
      value: '',
      options: ['Camisa', 'Pantalón', 'Zapatos'],
    },
    {
      key: 'price',
      label: 'Precio',
      value: '',
      options: ['30', '50', '60', '80'],
    },
  ]);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) =>
      prevFilters.map((f) => (f.key === key ? { ...f, value } : f))
    );
  };

  const filteredProducts = allProducts.filter((product) => {
    return filters.every((filter) => {
      if (!filter.value) return true;
      return String(product[filter.key]) === filter.value;
    });
  });

  return (
    <div className="flex">
      <FilterSidebar filters={filters} onChange={handleFilterChange} />
      <main className="p-6 flex-1">
        <h1 className="text-2xl font-bold mb-4">Productos</h1>
        <ul className="space-y-2">
          {filteredProducts.map((product) => (
            <li key={product.id} className="p-4 border rounded">
              <p><strong>{product.name}</strong></p>
              <p>Precio: ${product.price}</p>
            </li>
          ))}
          {filteredProducts.length === 0 && (
            <p className="text-gray-500">No se encontraron productos con los filtros seleccionados.</p>
          )}
        </ul>
      </main>
    </div>
  );
};

export default ProductListPage;
