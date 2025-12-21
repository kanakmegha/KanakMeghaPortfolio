import { EXPERIENCE } from "@/lib/data";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-card">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Work Experience</h2>
            <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My professional journey and key accomplishments.
            </p>
          </div>
        </div>
        <div className="relative mt-12 max-w-3xl mx-auto">
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
          {EXPERIENCE.map((item, index) => (
            <div key={index} className="relative mb-8">
              <div className="absolute left-1/2 top-3 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2"></div>
              <div
                className={`flex items-center ${
                  index % 2 === 0 ? "flex-row-reverse" : ""
                } w-full`}
              >
                <div className="w-1/2"></div>
                <div className="w-1/2 px-4 py-2">
                  <div className="bg-card p-6 rounded-lg shadow-md border">
                    <h3 className="text-lg font-bold text-primary">{item.role}</h3>
                    <p className="font-semibold">{item.company}</p>
                    <p className="text-sm text-muted-foreground mb-2">{item.date}</p>
                    <p className="text-sm text-foreground/90">{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
