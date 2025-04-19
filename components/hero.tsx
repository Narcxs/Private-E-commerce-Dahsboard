import { AuroraText } from "@/components/magicui/aurora-text";

const HeroSection = () => {
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl text-center">
        iDash<AuroraText>Book</AuroraText>
      </h1>
      <p className="text-center text-base text-muted-foreground max-w-xs mx-auto sm:max-w-sm md:max-w-md md:text-lg lg:max-w-xl lg:text-xl mt-4">
        iDashBook est une plateforme qui vous permet de créer et gérer
        facilement votre page Facebook professionnelle
      </p>
    </>
  );
};

export default HeroSection;
