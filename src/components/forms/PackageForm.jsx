import { IoMdAddCircle, IoIosRemoveCircle } from "react-icons/io";

const PackageForm = ({ register, errors, data, fields, append, remove }) => {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <label>Package Name</label>
        <input
          type="text"
          className="w-full rounded px-3 py-2 focus:outline-none border"
          defaultValue={data?.packageName}
          {...register("packageName", { required: true })}
        />

        {errors?.packageName && (
          <span className="text-red-500 text-sm">
            Package Name is required.
          </span>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label>Package Details</label>

          {/* Add More button with maximum limit check */}
          {fields.length < 6 && (
            <button
              className="flex justify-center items-center gap-1"
              type="button"
              onClick={() => append({ packageDetails: "" })}
            >
              <p>Add More</p>
              <IoMdAddCircle className="size-4" />
            </button>
          )}
        </div>

        {fields.map(({ id }, index) => (
          <div key={id} className="space-y-1">
            <div className="flex items-center justify-between gap-5">
              <input
                type="text"
                className="w-full rounded px-3 py-2 focus:outline-none border"
                // defaultValue={data?.packageDetails[index]}
                {...register(`package.${index}.packageDetails`, {
                  required: true,
                })}
              />

              <button type="button" onClick={() => remove(index)}>
                <IoIosRemoveCircle className="size-4" />
              </button>
            </div>

            {errors?.package?.[index]?.packageDetails && (
              <span className="text-red-500 text-sm">
                Package Details is required.
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-1">
        <label>Price</label>
        <input
          type="number"
          className="w-full rounded px-3 py-2 focus:outline-none border"
          defaultValue={data?.price}
          {...register("price", { required: true })}
        />

        {errors?.price && (
          <span className="text-red-500 text-sm">Price Name is required.</span>
        )}
      </div>

      <div className="space-y-1">
        <label>Discount</label>
        <input
          type="number"
          className="w-full rounded px-3 py-2 focus:outline-none border"
          defaultValue={data?.discount}
          {...register("discount")}
        />
      </div>
    </div>
  );
};

export default PackageForm;
