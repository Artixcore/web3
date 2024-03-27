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
import useFetchData from "@/hooks/useFetchData";
import Skeleton from "react-loading-skeleton";
import { Modal } from "antd";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import FormWrapper from "@/components/forms/FormWrapper";
import PackageForm from "@/components/forms/PackageForm";
import FormSubmit from "@/components/forms/FormSubmit";
import { useGetAllPackagesQuery } from "@/redux/services/packageApi";

const ManagePackages = () => {
  const [modalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setIsLoading] = useState(false);

  const { isLoading, error, data } = useGetAllPackagesQuery();

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

  if (error)
    return (
      <div className="flex items-center justify-center min-h-[calc(100dvh-52px)]">
        An error occurred: {error.message}
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
                      // onClick={() => handleDelete(item?._id)}
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
