"use client";

import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotals, setProductsFromMeta, updateField } from "./priceOffer.slice";
import { useProductMetaData } from "./useProductMetaData";

export default function PriceOfferTable() {
	const dispatch = useDispatch();
	const { products } = useTypedSelector((state) => state.priceOffer);
	const { data: metaData, isSuccess } = useProductMetaData();
	
	useEffect(() => {
		if (isSuccess && metaData) {
			dispatch(setProductsFromMeta(metaData));
		}
	}, [isSuccess, metaData, dispatch]);

	const handleInputChange = (
		index: number,
		field: string,
		value: string | number
	) => {
		dispatch(updateField({ index, field, value }));
	};

	const formattedData = {
    date: new Date().toISOString().split("T")[0], // أو أي تاريخ تختاريه
    available_qty: products.map((p) => p.availableQuantity),
    unit_price: products.map((p) => p.salesUnit),
    discount: products.map((p) => p.discount),
    tax: products.map((p) => p.tax),
    description: products.map((p) => p.description),
    measure_unit_id: products.map((p) => p.measureUnitId),
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className="bg-emerald-100">
            <th className="border text-nowrap py-3 border-gray-300  bg-emerald-500 text-white">
              كود المنتج
            </th>
            <th className="border text-nowrap py-3 border-gray-300  bg-emerald-500 text-white">
              فئة المنتج
            </th>
            <th className="border text-nowrap py-3 border-gray-300  bg-emerald-500 text-white">
              اسم المنتج
            </th>
            <th className="border text-nowrap py-3 border-gray-300  bg-emerald-500 text-white">
              وحدة البيع
            </th>
            <th className="border text-nowrap py-3 border-gray-300  bg-emerald-500 text-white">
              الكمية المطلوبة
            </th>
            <th className="border text-nowrap py-3 border-gray-300 ">
              الكمية المتاحة
            </th>
            <th className="border text-nowrap py-3 border-gray-300 ">
              سعر الوحده
            </th>
            <th className="border text-nowrap py-3 border-gray-300 ">خصم</th>
            <th className="border text-nowrap py-3 border-gray-300 ">ضريبة</th>

            <th className="border text-nowrap py-3 border-gray-300 ">
              الأجمالي
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {/* كود المنتج */}
              <td className="border border-gray-300 p-2 text-nowrap text-center">
                {product.productCode}
              </td>

              {/* فئة المنتج */}
              <td className="border border-gray-300 p-2 text-nowrap text-center">
                {product.productCategory}
              </td>

              {/* اسم المنتج */}
              <td className="border border-gray-300 p-2 text-nowrap text-center">
                {product.productName}
              </td>

              {/* وحدة البيع */}
              <td className="border border-gray-300 p-2 text-nowrap text-center">
                {product.measureUnitId}
              </td>

              {/* الكمية المطلوبة */}
              <td className="border border-gray-300 p-2 text-nowrap text-center">
                {product.requiredQuantity}
              </td>

              {/* الكمية المتاحة - Editable */}
              <td className="border border-gray-300 p-2 text-nowrap">
                <input
                  type="number"
                  value={product.availableQuantity}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "availableQuantity",
                      e.target.value
                    )
                  }
                  className="w-full p-1 border-none rounded"
                />
              </td>

              {/* سعر الوحدة - Editable */}
              <td className="border border-gray-300 p-2 text-nowrap">
                <input
                  type="number"
                  value={product.salesUnit}
                  onChange={(e) =>
                    handleInputChange(index, "salesUnit", e.target.value)
                  }
                  className="w-full p-1 border-none rounded"
                />
              </td>

              {/* خصم - Editable */}
              <td className="border border-gray-300 p-2 text-nowrap">
                <input
                  type="number"
                  value={product.discount}
                  onChange={(e) =>
                    handleInputChange(index, "discount", e.target.value)
                  }
                  className="w-full p-1 border-none rounded"
                />
              </td>

              {/* ضريبة - Editable */}
              <td className="border border-gray-300 p-2 text-nowrap">
                <input
                  type="number"
                  value={product.tax}
                  onChange={(e) =>
                    handleInputChange(index, "tax", e.target.value)
                  }
                  className="w-full p-1 border-none rounded"
                />
              </td>

              {/* الإجمالي */}
              <td className="border border-gray-300 p-2 text-nowrap text-center font-bold">
                {product.total}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr className="">
            {Array.from({
              length: 9,
            }).map((el) => (
              <td className="border border-gray-300 p-2 text-nowrap text-center"></td>
            ))}
            <td className="border border-gray-300 p-2 text-nowrap text-center font-bold bg-[#02140D] text-white">
              {products.reduce((sum, product) => sum + (product.total || 0), 0)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}