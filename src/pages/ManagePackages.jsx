import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Skeleton from "react-loading-skeleton";
import { Modal } from "antd";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import FormWrapper from "@/components/forms/FormWrapper";
import PackageForm from "@/components/forms/PackageForm";
import FormSubmit from "@/components/forms/FormSubmit";
import {
  useDeletePackageMutation,
  useGetAllPackagesQuery,
} from "@/redux/services/packageApi";
import Swal from "sweetalert2";

const ManagePackages = () => {
  const [modalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setIsLoading] = useState(false);

  const { data, isLoading, error, refetch } = useGetAllPackagesQuery();
  const [deletePackage] = useDeletePackageMutation();

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      packageName: data?.packageName,
      package: [{ packageDetails: data?.packageDetails }],
      price: data?.price,
      discount: data?.discount,
    },
  });

  const { fields, remove, append } = useFieldArray({
    control,
    name: "package",
  });

  const handleUpdate = (data) => {
    setIsModalOpen(true);
    setSelectedItem(data);
  };

  const handleCancel = () => {
    reset();
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const res = await deletePackage(id);

        if (res?.data?.success === true) {
          // If delete is successful, show success message
          await Swal.fire({
            title: "Deleted!",
            text: "Selected item has been deleted.",
            icon: "success",
          });

          // Now refetch data after successful deletion
          refetch();
        } else {
          // If delete fails or success is not true, show error message
          await Swal.fire({
            title: "Error!",
            text: "Failed to delete item.",
            icon: "error",
          });
        }
      }
    } catch (error) {
      // Catch any errors that occur during the process
      Swal.fire({
        title: "Error!",
        text: "An error occurred while deleting the item.",
        icon: "error",
      });
    }
  };

  if (error)
    return (
      <div className="flex items-center justify-center min-h-[calc(100dvh-52px)]">
        An error occurred: {error?.message}
      </div>
    );

  return (
    <main className="p-5 lg:p-10 space-y-5">
      {isLoading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <div key={index}>
            <Skeleton height={100} className="rounded-md" />
          </div>
        ))
      ) : (
        <>
          <div className="flex justify-end">
            <Link to="/dashboard/add-package">
              <Button size="sm">Add Package</Button>
            </Link>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Serial N.</TableHead>
                <TableHead>Package Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Action</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>

            {data?.data?.map((item, index) => (
              <TableBody key={item?._id}>
                <TableRow>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">
                    {item.packageName}
                  </TableCell>
                  <TableCell className="font-medium">${item.price}</TableCell>

                  <TableCell>
                    <Button onClick={() => handleUpdate(item)} size="sm">
                      Update
                    </Button>
                  </TableCell>

                  <TableCell>
                    <Button
                      onClick={() => handleDelete(item?._id)}
                      variant="destructive"
                      size="sm"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </>
      )}

      <Modal title="Update Package" open={modalOpen} onCancel={handleCancel}>
        {selectedItem && (
          <FormWrapper onSubmit={handleSubmit(onSubmit)}>
            <PackageForm
              register={register}
              errors={errors}
              data={selectedItem}
              fields={fields}
              append={append}
              remove={remove}
            />
            <FormSubmit loading={loading} title="Update" />
          </FormWrapper>
        )}
      </Modal>
    </main>
  );
};

export default ManagePackages;
