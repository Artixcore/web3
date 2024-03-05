const Services = () => {
  const services = [
    {
      id: 1,
      title: "Smart Contracts Development",
      description:
        "We offer expertise in developing smart contracts, self-executing contracts with the terms of the agreement between buyer and seller directly written into lines of code.",
      image: "https://i.ibb.co/DpMHgYL/smart-contracts.png",
    },
    {
      id: 2,
      title: "Decentralized Finance Solutions",
      description:
        "Our DeFi solutions provide decentralized alternatives to traditional finance services, including lending, borrowing, trading, and more, without intermediaries.",
      image: "https://i.ibb.co/yFnNKf2/decentralized.png",
    },
    {
      id: 3,
      title: "Blockchain Consulting",
      description:
        "Get expert advice on implementing blockchain technology into your business processes, from use case identification to implementation strategy.",
      image: "https://i.ibb.co/4jcjXpF/blockchain.png",
    },
    {
      id: 4,
      title: "Tokenization Services",
      description:
        "We help tokenize assets, enabling fractional ownership, increased liquidity, and streamlined transfer of ownership using blockchain technology.",
      image: "https://i.ibb.co/TMgHFS7/ico.png",
    },
    {
      id: 5,
      title: "Supply Chain Management Solutions",
      description:
        "Our blockchain-based supply chain solutions provide transparency, traceability, and efficiency across the entire supply chain, reducing fraud and optimizing operations.",
      image: "https://i.ibb.co/Kmtnrvp/supply-chain.png",
    },
    {
      id: 6,
      title: "Blockchain Identity Management",
      description:
        "Securely manage digital identities, providing individuals with control over their personal data while ensuring privacy and security using blockchain technology.",
      image: "https://i.ibb.co/tPS2rNF/transfer.png",
    },
  ];

  return (
    <section className="section-wrapper min-h-dvh flex items-center py-10 lg:py-0">
      <div className="w-full space-y-10">
        <div className="flex items-center justify-center flex-col space-y-2">
          <h2>
            <span className="text-blue-500">Services</span> We Offer
          </h2>
          <p>
            We offer the best services around - from installations to repairs,
            maintenance, and more!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((item) => (
            <div
              key={item?.id}
              className="shadow-md rounded-md border p-5 flex items-center justify-center flex-col space-y-5"
            >
              <img
                src={item?.image}
                alt={item?.title}
                className="h-10 w-10 mx-auto"
              />

              <div className="text-center">
                <h5>{item?.title}</h5>
                <p className="line-clamp-3">{item?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
