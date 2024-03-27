const PackageForm = ({ register, errors, data }) => {
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
            <div className="flex items-center justify-center gap-5">
              <input
                type="text"
                className="w-full rounded px-3 py-2 focus:outline-none border"
                defaultValue={data?.packageDetails}
                {...register(`package.${index}.packageDetails`, {
                  required: true,
                })}
              />

              {fields.length > 1 && (
                <button type="button" onClick={() => remove(index)}>
                  <IoIosRemoveCircle className="size-4" />
                </button>
              )}
            </div>

            <div>
              {errors?.package?.[index]?.packageDetails && (
                <span className="text-red-500 text-sm">
                  Package Details is required.
                </span>
              )}
            </div>
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

      <Button type="submit">Submit</Button>
    </div>
  );
};

export default PackageForm;
