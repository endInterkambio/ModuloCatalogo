import { Form } from "react-bootstrap";
import Select from "react-select";
import { useBookStore } from "@/stores/useBookStore";
import ActiveFilters from "./ActiveFilters";

// Opciones
const precios = [
  { value: "0-50", label: "S/. 0 - S/. 50" },
  { value: "51-100", label: "S/. 51 - S/. 100" },
  { value: "101-200", label: "S/. 101 - S/. 200" },
  { value: "201+", label: "S/. 201 en adelante" },
];

const cantidades = [
  { value: "0", label: "Sin stock" },
  { value: "1-5", label: "1 - 5" },
  { value: "6-10", label: "6 - 10" },
  { value: "11-20", label: "11 - 20" },
  { value: "21+", label: "21 en adelante" },
];

const estantes = [...Array(17).keys()].map((i) => ({
  value: i + 1,
  label: `Estante ${i + 1}`,
}));

const pisos = [...Array(5).keys()].map((i) => ({
  value: i + 1,
  label: `Piso ${i + 1}`,
}));

const BookFilterSidebar = () => {
  const {
    sortOrder,
    selectedPrice,
    selectedStock,
    selectedShelf,
    selectedFloor,
    setSortOrder,
    setSelectedPrice,
    setSelectedStock,
    setSelectedShelf,
    setSelectedFloor,
  } = useBookStore();

  return (
    <div className="bg-light p-3 h-100 border-end">
      <h4 className="mb-4">Filtros</h4>

      <Form.Group className="mb-3">
        <Form.Label>Nombre</Form.Label>
        <Form.Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Seleccionar orden</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Precio</Form.Label>
        <Select
          options={precios}
          value={selectedPrice}
          onChange={setSelectedPrice}
          placeholder="Selecciona precio"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Stock</Form.Label>
        <Select
          options={cantidades}
          value={selectedStock}
          onChange={setSelectedStock}
          placeholder="Selecciona stock"
        />
      </Form.Group>

      <Form.Label>Ubicación</Form.Label>
      <Form.Group className="mb-3 d-flex flex-row gap-2">
        <Select
          options={estantes}
          value={selectedShelf}
          onChange={setSelectedShelf}
          placeholder="Estante"
        />
        <Select
          options={pisos}
          value={selectedFloor}
          onChange={setSelectedFloor}
          placeholder="Piso"
        />
      </Form.Group>

      <ActiveFilters />
    </div>
  );
};

export default BookFilterSidebar;
