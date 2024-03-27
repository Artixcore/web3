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

const ManagePackages = () => {
  const { isPending, error, data } = useFetchData({
    queryKey: "packages",
    url: "https://organic-life-server.vercel.app/api/v1/packages",
  });

  if (error)
    return (
      <div className="flex items-center justify-center min-h-[calc(100dvh-52px)]">
        An error occurred: {error.message}
      </div>
    );

  return (
    <main className="p-5 lg:p-10 space-y-5">
      {isPending ? (
        Array.from({ length: 3 }).map((_, index) => (
          <div key={index}>
            <Skeleton height={100} className="rounded-md mb-1" />
          </div>
        ))
      ) : (
        <>
          <div className="flex justify-end">
            <Link to="/add-package">
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
                    <Button
                      // onClick={() => handleUpdate(item)}
                      size="sm"
                    >
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
    </main>
  );
};

export default ManagePackages;
