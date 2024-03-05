const NFTs = () => {
  const data = [
    {
      id: 1,
      imgUrl:
        "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg",
      name: "Forbes Monkey",
    },
    {
      id: 2,
      imgUrl: "https://forkast.news/wp-content/uploads/2022/03/NFT-Avatar.png",
      name: "Forkast Avatar",
    },
    {
      id: 3,
      imgUrl:
        "https://codespaceinc.co/images/uploads/https___specials-images.forbesimg.com_imageserve_6170e01f8d7639b95a7f2eeb_sotheby-s-nft-natively-digital-1-2-sale-bored-ape-yacht-club-8817-by-yuga-labs_0x0.png",
      name: "Sotheby's Bored Ape Club",
    },
    {
      id: 4,
      imgUrl:
        "https://media.istockphoto.com/id/1313353553/photo/concept-cryptographic-nft-on-a-hundred-dollar-bill-franklin-in-glasses.jpg?s=612x612&w=0&k=20&c=DvL35r6GgocA8bCG7kqW0WUtOFV3BKtQp95YVKnSElQ=",
      name: "Cryptographic $100 Bill",
    },
    {
      id: 5,
      imgUrl:
        "https://cdn.pixabay.com/photo/2022/03/01/02/51/galaxy-7040416_1280.png",
      name: "Galaxy NFT",
    },
    {
      id: 6,
      imgUrl:
        "https://static.wixstatic.com/media/20309c_7c4d01ebcff0407787aac3647a04b2fa~mv2.webp",
      name: "WixStatic NFT",
    },
  ];

  return (
    <main className="section-wrapper py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {data?.map((item) => (
        <div
          key={item?.id}
          className="rounded-sm shadow-md border p-5 space-y-3"
        >
          <img
            src={item?.imgUrl}
            alt={item?.name}
            className="size-60 w-full object-cover rounded-md"
          />
          <p className="text-base font-semibold">{item?.name}</p>
        </div>
      ))}
    </main>
  );
};

export default NFTs;
