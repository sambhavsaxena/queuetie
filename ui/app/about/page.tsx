import { Header } from "@/components/header";
import { Footer } from "@/components/layout/footer";
import { cookies } from "next/headers";
import Image from "next/image";

export default function About() {
  const token = cookies().get("token")?.value ?? "";

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header token={token} />
      <main className="flex-1">
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
            <p className="text-lg text-muted-foreground">
              Solving real problems, one simple solution at a time.
            </p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="https://cdn.statically.io/gh/thatsameguyokay/images/main/desk.jpg"
                alt="Desk"
                width={600}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Yep, at my desk, that&apos;s where it started;
              </h2>
              <p className="mb-4 text-muted-foreground">
                Whether I was tinkering with pure software ideas or diving into
                tangible goods businesses, one constant frustration kept
                surfacing: the sheer <strong>volume of email management</strong>. I always
                found myself searching for a quick, efficient solution to reduce
                that overhead.
              </p>
              <p className="text-muted-foreground">
                I looked everywhere, but a truly satisfying answer just wasn&apos;t
                out there. So, driven by that persistent need, I decided to
                build it myself. What started as a personal quest for efficiency
                evolved into creating something that could help others
                streamline their email lives too.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-semibold mb-6">My Philosophy</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              I believe in creating practical, intuitive solutions that
              directly address everyday pain points. My focus is on simplicity
              and effectiveness, cutting through the noise to deliver tools that
              genuinely make a difference.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Milestones
            </h2>
            <div className="space-y-8">
              {[
                {
                  year: "November 2024",
                  title: "The Frustration",
                  desc: "I needed to create a verification microservice within a week, realized that half the time would go into setting up an email server, domain mapping, SMPT configuration, yada yada, felt the universal need for better email management while building various ventures.",
                },
                {
                  year: "March 2025",
                  title: "The Blueprint",
                  desc: "Began sketching out a minimalist solution to tackle email overhead, while I got stuck into more and more projects, facing the same problem over and over again.",
                },
                {
                  year: "May 2025",
                  title: "Created MVP",
                  desc: "Launched v1, focusing on core features to bring immediate relief. To be honest, I made it for my personal use, but then I thought maybe there are many others facing the exact same issue. But at the same time, I didn't wish to create something like Blockchain, `A solution looking for a problem`.",
                }
              ].map((item, i) => (
                <div key={i} className="border-l-4 border-primary pl-4">
                  <div className="text-sm text-muted-foreground">
                    {item.year}
                  </div>
                  <div className="text-lg font-medium">{item.title}</div>
                  <div className="text-muted-foreground">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
