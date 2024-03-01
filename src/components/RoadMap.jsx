const RoadMap = () => {
  const roadMap = [
    {
      id: 1,
      title: "Phase 1: Research and Planning",
      description:
        "Conduct market research, gather user feedback, and define project goals and requirements.",
    },
    {
      id: 2,
      title: "Phase 2: Development",
      description:
        "Design and develop the core features of the product, focusing on functionality and user experience.",
    },
    {
      id: 3,
      title: "Phase 3: Testing and Iteration",
      description:
        "Conduct extensive testing to identify and fix bugs, gather user feedback for improvements, and iterate on features.",
    },
    {
      id: 4,
      title: "Phase 4: Launch and Growth",
      description:
        "Officially launch the product, implement marketing strategies, and focus on user acquisition and growth.",
    },
  ];

  return (
    <section className="bg-gray-100">
      <div className="section-wrapper min-h-dvh flex items-center py-10 lg:py-0">
        <div className="w-full space-y-10">
          <div className="flex items-center justify-center flex-col space-y-2">
            <h2>
              Product <span className="text-blue-500">Roadmap</span>
            </h2>
            <p>
              A product roadmap shows the path ahead, helps teams plan, and
              guides the delivery of the product.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-5">
            {roadMap.map((item) => (
              <div key={item?.id} className="shadow-md rounded-md border p-5">
                <h5>{item?.title}</h5>
                <p className="line-clamp-3">{item?.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadMap;
