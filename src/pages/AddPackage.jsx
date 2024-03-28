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
  const [addPackage] = useAddPackageMutation();

  const {
    register,
    control,
    handleSubmit,
    reset,
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
    // Set loading state to true to indicate form submission is in progress
    setIsLoading(true);

    try {
      // Use the pruneEmpty function to remove empty properties
      const prunedObject = pruneEmpty(data);

      // Extract package details from the pruned object
      const detailValues = prunedObject?.package?.map(
        (item) => item?.packageDetails
      );

      // Destructure relevant properties from the pruned object
      const { packageName, price, discount } = prunedObject;

      // Prepare the data object to be sent to the server
      const postData = {
        packageName,
        packageDetails: detailValues,
        price: parseFloat(price),
      };

      // Add discount to postData if it is available
      if (discount !== undefined && discount !== "") {
        postData.discount = parseFloat(discount);
      }

      // Attempt to add the package data using the addPackage function
      const res = await addPackage(postData);

      // Check if the response includes the 'data' property
      if (res?.data?.success === true) {
        // If successful, set loading state to false
        setIsLoading(false);

        // Show success message to the user
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: res.data?.message,
          showConfirmButton: false,
          timer: 1500,
        });

        // Reset the form after successful submission
        reset();
      } else {
        // If there was an error in the response, set loading state to false
        setIsLoading(false);

        // Show error message to the user
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Submission Error",
          text: res?.error?.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      // Catch any unexpected errors and set loading state to false
      setIsLoading(false);

      // Show error message to the user
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
