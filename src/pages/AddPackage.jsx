import FormSubmit from "@/components/forms/FormSubmit";
import FormWrapper from "@/components/forms/FormWrapper";
import PackageForm from "@/components/forms/PackageForm";
import pruneEmpty from "@/helpers/pruneEmpty";
import { useAddPackageMutation } from "@/redux/services/packageApi";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddPackage = () => {
  const [loading, setIsLoading] = useState(false);
  const [addPackage, { isError, isSuccess, data }] = useAddPackageMutation();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      packageName: "",
      package: [{ packageDetails: "" }],
      price: "",
      discount: "",
    },
  });

  const { fields, remove, append } = useFieldArray({
    control,
    name: "package",
  });

  const onSubmit = async (data) => {
    try {
      // Use the pruneEmpty function to remove empty properties
      const prunedObject = pruneEmpty(data);

      const detailValues = prunedObject?.package?.map(
        (item) => item?.packageDetails
      );

      const { packageName, price, discount } = prunedObject;

      const postData = {
        packageName,
        packageDetails: detailValues,
        price: parseFloat(price),
      };

      // Add discount to postData if it is available
      if (discount !== undefined && discount !== "") {
        postData.discount = parseFloat(discount);
      }

      const response = await addPackage(postData); // Attempt to add the data

      // Now, you must check if the response includes the 'data' property
      if ("data" in response && response?.data) {
        // Since we've confirmed 'data' exists, we can use it safely here
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.data?.message,
          showConfirmButton: false,
          timer: 1500,
        });
      } else if ("error" in response) {
        // Handle error case
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Submission Error",
          text: response?.error?.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      // Additional error handling, perhaps more specific than above
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "An unexpected error occurred",
        text: "Please try again later.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <main className="min-h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="max-w-xl p-10 shadow-md w-full">
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <PackageForm
            register={register}
            errors={errors}
            fields={fields}
            append={append}
            remove={remove}
          />
          <FormSubmit loading={loading} title="Submit" />
        </FormWrapper>
      </div>
    </main>
  );
};

export default AddPackage;
