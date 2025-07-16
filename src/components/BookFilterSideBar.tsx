import { Form } from "react-bootstrap";
import Select, { type SingleValue, type StylesConfig } from "react-select";

// Tipos específicos para evitar conflicto de tipos
type StringOption = { value: string; label: string };
type NumberOption = { value: number; label: string };

interface Props {
  sortOrder: string;
  setSortOrder: (value: string) => void;
  selectedPrice: SingleValue<StringOption>;
  setSelectedPrice: (value: SingleValue<StringOption>) => void;
  selectedStock: SingleValue<StringOption>;
  setSelectedStock: (value: SingleValue<StringOption>) => void;
  selectedShelf: SingleValue<NumberOption>;
  setSelectedShelf: (value: SingleValue<NumberOption>) => void;
  selectedFloor: SingleValue<NumberOption>;
  setSelectedFloor: (value: SingleValue<NumberOption>) => void;
}

// Estilos comunes
const selectStylesString: StylesConfig<StringOption, false> = {
  container: (base) => ({ ...base, width: "100%" }),
  control: (base) => ({ ...base, minHeight: 50, height: 50 }),
  singleValue: (base) => ({
    ...base,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
};

const selectStylesNumber: StylesConfig<NumberOption, false> = {
  container: (base) => ({ ...base, width: "100%" }),
  control: (base) => ({ ...base, minHeight: 50, height: 50 }),
  singleValue: (base) => ({
    ...base,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
};

const BookFilterSidebar = ({
  sortOrder,
  setSortOrder,
  selectedPrice,
  setSelectedPrice,
  selectedStock,
  setSelectedStock,
  selectedShelf,
  setSelectedShelf,
  selectedFloor,
  setSelectedFloor,
}: Props) => {
  const precios: StringOption[] = [
    { value: "0-50", label: "S/. 0 - S/. 50" },
    { value: "51-100", label: "S/. 51 - S/. 100" },
    { value: "101-200", label: "S/. 101 - S/. 200" },
    { value: "201+", label: "S/. 201 en adelante" },
  ];

  const cantidades: StringOption[] = [
    { value: "0", label: "Sin stock" },
    { value: "1-5", label: "1 - 5" },
    { value: "6-10", label: "6 - 10" },
    { value: "11-20", label: "11 - 20" },
    { value: "21+", label: "21 en adelante" },
  ];

  const estantes: NumberOption[] = [...Array(17).keys()].map((i) => ({
    value: i + 1,
    label: `Estante ${i + 1}`,
  }));

  const pisos: NumberOption[] = [...Array(5).keys()].map((i) => ({
    value: i + 1,
    label: `Piso ${i + 1}`,
  }));

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
          styles={selectStylesString}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Stock</Form.Label>
        <Select
          options={cantidades}
          value={selectedStock}
          onChange={setSelectedStock}
          placeholder="Selecciona stock"
          styles={selectStylesString}
        />
      </Form.Group>

      <Form.Label>Ubicación</Form.Label>
      <Form.Group className="mb-3 d-flex flex-row gap-2">
        <Select
          options={estantes}
          value={selectedShelf}
          onChange={setSelectedShelf}
          placeholder="Estante"
          styles={selectStylesNumber}
        />
        <Select
          options={pisos}
          value={selectedFloor}
          onChange={setSelectedFloor}
          placeholder="Piso"
          styles={selectStylesNumber}
        />
      </Form.Group>
    </div>
  );
};

export default BookFilterSidebar;
