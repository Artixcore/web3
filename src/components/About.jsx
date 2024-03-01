import aboutImg from "../assets/images/about.png";

const About = () => {
  return (
    <section className="bg-gray-100">
      <div className="section-wrapper min-h-dvh flex items-center py-10 lg:py-0">
        <div className="w-full flex items-center justify-between flex-col lg:flex-row gap-5">
          <div className="flex-1 space-y-5">
            <h2 className="pb-5">
              EMBRACE THE <br /> POWER OF{" "}
              <span className="text-blue-500">PASSIVE</span> INCOME
            </h2>

            <div className="space-y-2">
              <h4>REFERRAL REVOLUTION</h4>
              <p>
                Unlock the Wealth Generator, tap into never ending money
                streams, invite friends and earn up to 90% recurring income from
                their participation.
              </p>
            </div>

            <div className="space-y-2">
              <h4>REFERRAL REVOLUTION</h4>
              <p>
                Unlock the Wealth Generator, tap into never ending money
                streams, invite friends and earn up to 90% recurring income from
                their participation.
              </p>
            </div>

            <div className="space-y-2">
              <h4>REFERRAL REVOLUTION</h4>
              <p>
                Unlock the Wealth Generator, tap into never ending money
                streams, invite friends and earn up to 90% recurring income from
                their participation.
              </p>
            </div>
          </div>

          <div className="flex-1 flex justify-end">
            <img src={aboutImg} alt="About Image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
