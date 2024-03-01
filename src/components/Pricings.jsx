const Pricings = () => {
  const pricings = [
    {
      id: 1,
      price: "$99/ Monthly",
      title: "Basic Plan",
      details: [
        "Basic features included",
        "Limited support",
        "Access to community forums",
        "Monthly newsletter subscription",
        "Online documentation",
      ],
    },
    {
      id: 2,
      price: "$299/ Monthly",
      title: "Standard Plan",
      details: [
        "Advanced features included",
        "Priority support",
        "Access to premium content library",
        "Quarterly webinar series",
        "Phone support available during business hours",
      ],
    },
    {
      id: 3,
      price: "$599/ Monthly",
      title: "Enterprise Plan",
      details: [
        "Tailored solutions for large enterprises",
        "Comprehensive features",
        "Custom development",
        "Dedicated support",
        "24/7 phone support",
        "On-site training sessions",
        "Service level agreements (SLAs) included",
      ],
    },
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pricings.map((item) => (
            <div
              key={item?.id}
              className="shadow-md rounded-md border p-5 space-y-5"
            >
              <div className="space-y-1">
                <p>{item?.title}</p>
                <h5>{item?.price}</h5>
              </div>

              <div className="space-y-2">
                {item.details.map((item, index) => (
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
