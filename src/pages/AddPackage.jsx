import FormSubmit from "@/components/forms/FormSubmit";
import FormWrapper from "@/components/forms/FormWrapper";
import PackageForm from "@/components/forms/PackageForm";
import pruneEmpty from "@/helpers/pruneEmpty";
import axios from "axios";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const AddPackage = () => {
  const [loading, setIsLoading] = useState(false);

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
    // Use the pruneEmpty function to remove empty properties
    const prunedObject = pruneEmpty(data);

    const detailValues = prunedObject?.package?.map(
      (item) => item.packageDetails
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

    axios.post("http://localhost:5000/api/v1/packages/create", postData);
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
