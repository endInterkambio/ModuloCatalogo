import { FiX } from "react-icons/fi";
import { useBookStore } from "@/stores/useBookStore";

const ActiveFilters = () => {
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

  const hasFilters =
    sortOrder || selectedPrice || selectedStock || selectedShelf || selectedFloor;

  if (!hasFilters) return null;

  const tagStyle =
    "d-inline-flex align-items-center bg-light border rounded px-2 py-1 me-2 mb-2 text-dark";
  const iconStyle = {
    cursor: "pointer",
    marginLeft: "0.5rem",
    fontSize: "1rem",
  };

  return (
    <>
      <hr />
      <div>
        <strong className="d-block mb-2">Filtros aplicados:</strong>
        <div className="d-flex flex-wrap">
          {sortOrder && (
            <span className={tagStyle}>
              Orden: {sortOrder}
              <FiX onClick={() => setSortOrder("")} style={iconStyle} />
            </span>
          )}
          {selectedPrice && (
            <span className={tagStyle}>
              Precio: {selectedPrice.label}
              <FiX onClick={() => setSelectedPrice(null)} style={iconStyle} />
            </span>
          )}
          {selectedStock && (
            <span className={tagStyle}>
              Stock: {selectedStock.label}
              <FiX onClick={() => setSelectedStock(null)} style={iconStyle} />
            </span>
          )}
          {selectedShelf && (
            <span className={tagStyle}>
              Estante: {selectedShelf.label}
              <FiX onClick={() => setSelectedShelf(null)} style={iconStyle} />
            </span>
          )}
          {selectedFloor && (
            <span className={tagStyle}>
              Piso: {selectedFloor.label}
              <FiX onClick={() => setSelectedFloor(null)} style={iconStyle} />
            </span>
          )}
        </div>

        <button
          className="btn btn-sm btn-outline-danger mt-2"
          onClick={() => {
            setSortOrder("");
            setSelectedPrice(null);
            setSelectedStock(null);
            setSelectedShelf(null);
            setSelectedFloor(null);
          }}
        >
          Limpiar todos los filtros
        </button>
      </div>
    </>
  );
};

export default ActiveFilters;
