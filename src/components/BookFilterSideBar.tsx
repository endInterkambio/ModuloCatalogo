// Import necessary components
import { Button, Form } from "react-bootstrap";
import Select from "react-select";
import { useBookStore } from "@/stores/useBookStore";
import { booksData } from "@/data/booksData";
import ActiveFilters from "@components/ActiveFilters";

// Filter options configuration

// Stock quantity ranges for filtering
const cantidades = [
  { value: "0", label: "Sin stock" },
  { value: "1-5", label: "1 - 5" },
  { value: "6-10", label: "6 - 10" },
  { value: "11-20", label: "11 - 20" },
  { value: "21+", label: "21 en adelante" },
];

// Generate shelf options (1-17)
const estantes = [...Array(17).keys()].map((i) => ({
  value: i + 1,
  label: `Estante ${i + 1}`,
}));

// Generate floor options (1-5)
const pisos = [...Array(5).keys()].map((i) => ({
  value: i + 1,
  label: `Piso ${i + 1}`,
}));

// Book filter sidebar component
const BookFilterSidebar = () => {
  // Obtener condiciones únicas de los libros
  const conditionOptions = Array.from(
    new Set(
      booksData
        .map((b) => b.Condition)
        .filter((c): c is string => typeof c === "string" && c.length > 0)
        .sort((a, b) => a.localeCompare(b))
    )
  ).map((cond) => ({ value: cond, label: cond }));
  const {
    sortOrder,
    selectedStock,
    selectedShelf,
    selectedFloor,
    selectedCondition,
    setSortOrder,
    setSelectedStock,
    setSelectedShelf,
    setSelectedFloor,
    selectAllBooks,
    selectCurrentPageBooks,
    resetCurrentPageSelection,
    resetSelection,
    manualPriceMin,
    manualPriceMax,
    setManualPriceMin,
    setManualPriceMax,
    setSelectedCondition,
  } = useBookStore();

  return (
    <div className="bg-light p-3 h-100 border-end">
      {/* Active filters display */}
      <h4 className="mb-4">Filtros</h4>
      <ActiveFilters />

      {/* Sort order selection */}
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

      <Form.Label>Condición</Form.Label>
      <Form.Group className="mb-3">
        <Select
          options={conditionOptions}
          value={selectedCondition}
          onChange={setSelectedCondition}
          placeholder="Selecciona condición"
          isClearable
        />
      </Form.Group>

      {/* Price range filter */}
      <Form.Group className="mb-3">
        <Form.Label>Precio</Form.Label>
        <div className="d-flex gap-2 mt-2">
          <Form.Control
            type="number"
            min={0}
            placeholder="Mínimo"
            value={manualPriceMin ?? ""}
            onChange={(e) =>
              setManualPriceMin(
                e.target.value === "" ? null : Number(e.target.value)
              )
            }
          />
          <Form.Control
            type="number"
            min={0}
            placeholder="Máximo"
            value={manualPriceMax ?? ""}
            onChange={(e) =>
              setManualPriceMax(
                e.target.value === "" ? null : Number(e.target.value)
              )
            }
          />
        </div>
      </Form.Group>

      {/* Stock quantity filter */}
      <Form.Group className="mb-3">
        <Form.Label>Stock</Form.Label>
        <Select
          options={cantidades}
          value={selectedStock}
          onChange={setSelectedStock}
          placeholder="Selecciona stock"
        />
      </Form.Group>

      {/* Shelf filter */}
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

      {/* Book selection buttons */}
      <div className="py-3">
        <Button onClick={selectCurrentPageBooks} className="btn-custom">
          Seleccionar vista actual
        </Button>
      </div>
      <div className="py-3">
        <Button onClick={resetCurrentPageSelection} className="btn-danger">
          Deseleccionar vista actual
        </Button>
      </div>
      <div className="py-3">
        <Button onClick={selectAllBooks} className="btn-custom">
          Seleccionar todos los resultados
        </Button>
      </div>
      <div className="py-3">
        <Button onClick={resetSelection} className="btn-danger">
          Quitar toda la selección
        </Button>
      </div>
      {/* Book selected counter*/}
      <div className="mt-4 ">
        <h5 className="d-inline">Libros seleccionados:</h5>{" "}
        <span>{useBookStore.getState().selectedBooks.length}</span>
      </div>
    </div>
  );
};

export default BookFilterSidebar;
