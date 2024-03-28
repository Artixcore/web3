import { useGetAllPackagesQuery } from "@/redux/services/packageApi";
import Skeleton from "react-loading-skeleton";

const Pricings = () => {
  const { data, isLoading, error } = useGetAllPackagesQuery();

  if (error)
    return (
      <div className="flex items-center justify-center min-h-dvh">
        An error occurred: {error?.message}
      </div>
    );

  return (
    <section className="section-wrapper min-h-dvh flex items-center py-10 lg:py-0">
      <div className="w-full space-y-10">
        <div className="flex items-center justify-center flex-col space-y-2">
          <h2>
            Our <span className="text-blue-500">Pricings</span> Plan
          </h2>
          <p>
            We offer the best pricings around - from installations to repairs,
            maintenance, and more!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div key={index}>
                  <Skeleton height={50} className="rounded-md mb-1" />
                  <Skeleton height={200} className="rounded-md" />
                </div>
              ))
            : data?.map((item) => (
                <div
                  key={item?._id}
                  className="shadow-md rounded-md border p-5 space-y-5"
                >
                  <div className="space-y-1">
                    <p>{item?.packageName}</p>
                    <h5>{item?.price} / Monthly</h5>
                  </div>

                  <div className="space-y-2">
                    {item?.packageDetails?.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default Pricings;
