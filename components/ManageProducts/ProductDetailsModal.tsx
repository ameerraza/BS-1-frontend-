import React from "react";
import ModalLayout from "../common/ModelLayout";

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  if (!product) return null;

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Product Details">
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="font-semibold">Category:</p>
                <p>{product.category?.name || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Condition:</p>
                <p>{product.condition}</p>
              </div>
              <div>
                <p className="font-semibold">Buy Price:</p>
                <p>{product.price ? `$${product.price}` : "Not for sale"}</p>
              </div>
              <div>
                <p className="font-semibold">Rent Price:</p>
                <p>
                  {product.rentPrice
                    ? `$${product.rentPrice}/day`
                    : "Not for rent"}
                </p>
              </div>
              <div>
                <p className="font-semibold">Location:</p>
                <p>{product.location}</p>
              </div>
              <div>
                <p className="font-semibold">Status:</p>
                <p>{product.status}</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-semibold">Images:</p>
            <div className="grid grid-cols-2 gap-2">
              {product.images.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-32 object-cover rounded"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default ProductDetailsModal;
