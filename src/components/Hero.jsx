import bannerImg from "../assets/images/banner.png";

const Hero = () => {
  return (
    <section className="section-wrapper min-h-[calc(100dvh-64px)] flex items-center py-10 lg:py-0">
      <div className="w-full flex items-center justify-between flex-col lg:flex-row gap-5">
        <div className="flex-1 space-y-5">
          <h1>WEALTH FREE LIFE</h1>
          <p>
            Experience the revolution of financial freedom with multi-income
            streams. Wealth Free Life, the ultimate all-in-one platform for your
            financial success. Access a variety of decentralized finance
            features in our user friendly portal to gain wealth and the
            financial freedom everyone deserves.
          </p>
        </div>

        <div className="flex-1 flex justify-end">
          <img src={bannerImg} alt="Banner Image" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
