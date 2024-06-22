"use Client";

import Image from "next/image";
import { FunctionComponent } from "react";

export const HomepageHero: FunctionComponent = () => {
  return (
    <div className=" items-center justify-between mt-12 md:mt-16 mb-12 text-sm text-muted-foreground">
      <div>
        {" "}
        <Image
          alt="Welcome"
          src="/images/homehero.jpg"
          width={500}
          height={500}
          layout="responsive"
          loading="lazy"
        />
      </div>
    <div className=" items-center justify-between mt-12 md:mt-16 mb-12 text-sm text-muted-foreground"> 
    <h2 className="  text-2xl md:text-5xl font-bold tracking-tighter leading-tight">
        Explore Your Passion.
      </h2>
    </div>

    </div>
  );
};
