// Import necessary components and icons
import { FiX } from "react-icons/fi";
import { useBookStore } from "@/stores/useBookStore";
import { Button } from "react-bootstrap";

// Component that displays active filters and allows clearing them
const ActiveFilters = () => {
  // Get filter state and setter functions from the store
  const {
    sortOrder,
    selectedStock,
    selectedShelf,
    selectedFloor,
    selectedCondition,
    manualPriceMin,
    manualPriceMax,
    setSortOrder,
    setSelectedStock,
    setSelectedShelf,
    setSelectedFloor,
    setManualPriceMin,
    setManualPriceMax,
    setSelectedCondition,
  } = useBookStore();

  // Check if any filters are currently active
  const hasFilters =
    sortOrder ||
    selectedStock ||
    selectedShelf ||
    selectedFloor ||
    manualPriceMin !== null ||
    manualPriceMax !== null ||
    selectedCondition;

  // Return null if no filters are active
  if (!hasFilters) return null;

  // Styles for filter tags
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
          {/* Sort order filter tag */}
          {sortOrder && (
            <span className={tagStyle}>
              Orden: {sortOrder}
              <FiX onClick={() => setSortOrder("")} style={iconStyle} />
            </span>
          )}

          {/* Condition filter tag */}
          {selectedCondition && (
            <span className={tagStyle}>
              Condición: {selectedCondition.label}
              <FiX
                onClick={() => setSelectedCondition(null)}
                style={iconStyle}
              />
            </span>
          )}

          {/* Manual price range filter tag */}
          {(manualPriceMin !== null || manualPriceMax !== null) && (
            <span className={tagStyle}>
              Precio: {manualPriceMin !== null ? `S/. ${manualPriceMin}` : "-"}{" "}
              {" - "} {manualPriceMax !== null ? `S/. ${manualPriceMax}` : "-"}
              <FiX
                onClick={() => {
                  setManualPriceMin(null);
                  setManualPriceMax(null);
                }}
                style={iconStyle}
              />
            </span>
          )}

          {/* Stock quantity filter tag */}
          {selectedStock && (
            <span className={tagStyle}>
              Stock: {selectedStock.label}
              <FiX onClick={() => setSelectedStock(null)} style={iconStyle} />
            </span>
          )}
          {/* Shelf filter tag */}
          {selectedShelf && (
            <span className={tagStyle}>
              Estante: {selectedShelf.label}
              <FiX onClick={() => setSelectedShelf(null)} style={iconStyle} />
            </span>
          )}
          {/* Floor filter tag */}
          {selectedFloor && (
            <span className={tagStyle}>
              Piso: {selectedFloor.label}
              <FiX onClick={() => setSelectedFloor(null)} style={iconStyle} />
            </span>
          )}
        </div>

        {/* Clear all filters button */}
        <Button
          variant="outline-danger"
          className="mt-2 mb-4"
          onClick={() => {
            setSortOrder("");
            setSelectedStock(null);
            setSelectedShelf(null);
            setSelectedFloor(null);
            setManualPriceMin(null);
            setManualPriceMax(null);
            setSelectedCondition(null);
          }}
        >
          Limpiar todos los filtros
        </Button>
      </div>
    </>
  );
};

export default ActiveFilters;
