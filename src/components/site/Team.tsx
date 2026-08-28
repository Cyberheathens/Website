import { useRef } from "react";
import { Mail } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

interface Member {
  name: string;
  role: string;
  email?: string;
  bio: string;
  tags: string[];
  photo: string;
}

const faculty: Member = {
  name: "Dr. Haroon Rashid Lone",
  role: "Faculty Advisor",
  bio: "Assistant Professor in the Department of EECS at IISER Bhopal. I direct the Systems and Informatics Research Lab (SIRL), where my research lives at the intersection of Human-Centered AI, Ubiquitous Computing, and Privacy-Aware Intelligent Systems. I build sensing and machine-learning technologies that run on personal, mobile, and edge devices to tackle challenges in digital wellbeing and smart environments.",
  tags: ["Human-Centered AI", "Ubiquitous Computing", "Edge ML"],
  photo: "/team/haroon-rashid-lone.webp",
};

const coordinators: Member[] = [
  {
    name: "Shafwan Safi",
    role: "Coordinator",
    bio: "I build across AI, systems and robotics, with a bias toward ambitious ideas, fast execution, and turning experiments into things that actually work.",
    tags: ["AI", "Systems", "Robotics"],
    photo: "/team/shafwan-safi.webp",
  },
  {
    name: "Abhishek Singh",
    role: "Coordinator",
    email: "asingh24@iiserb.ac.in",
    bio: "Money moves and machines learn. I keep the club's budgets ruthlessly balanced by day and train GenAI models by night. Finance is my ledger, AI is my playground.",
    tags: ["Finance", "GenAI"],
    photo: "/team/abhishek-singh.webp",
  },
];

const members: Member[] = [
  {
    name: "Shubham Upadhyay",
    role: "Member",
    email: "shubhamu25@iiserb.ac.in",
    bio: '50% Engineer, 20% Researcher, 15% "let me just try this one more time", 10% UI designer, 5% fighting errors at 2 AM.',
    tags: ["Engineering", "Research", "UI Design"],
    photo: "/team/shubham-upadhyay.webp",
  },
  {
    name: "Shashwat Choubey",
    role: "Member",
    email: "shashwat25@iiserb.ac.in",
    bio: "Loves anything that connects software to hardware, building things from scratch and learning the depth of the whys and whats.",
    tags: ["Hardware × Software", "Building"],
    photo: "/team/shashwat-choubey.webp",
  },
  {
    name: "Pradyuman Sain",
    role: "Member",
    email: "pradyuman25@iiserb.ac.in",
    bio: "I build generative AI that dreams in code and web experiences that feel alive, shipping models and interfaces people actually love to use.",
    tags: ["Gen AI", "Web Dev"],
    photo: "/team/pradyuman-sain.webp",
  },
  {
    name: "Rounak Singha Roy",
    role: "Member",
    email: "rounak24@iiserb.ac.in",
    bio: "I live where math meets markets: training models, grinding Codeforces, and turning chaos into alpha. Quant is just machine learning with stakes.",
    tags: ["AI/ML", "CP", "Quant"],
    photo: "/team/rounak-singha-roy.webp",
  },
  {
    name: "Krushna Mohod",
    role: "Member",
    email: "krushna24@iiserb.ac.in",
    bio: "By day I bend algorithms to my will; by night I smash shuttlecocks and binge anime. Competitive programming is my sport, and I play to win.",
    tags: ["CP", "Badminton", "Anime"],
    photo: "/team/krushna-mohod.webp",
  },
  {
    name: "Akshit Pandey",
    role: "Member",
    email: "akshit25@iiserb.ac.in",
    bio: "Math is my native language. I turn theorems into transformers and proofs into production code. Give me a hard problem and I'll bring the elegance.",
    tags: ["Math", "ML", "DSA"],
    photo: "/team/akshit-pandey.webp",
  },
  {
    name: "Omkaar Sandhibigraha",
    role: "Member",
    email: "omkaar25@iiserb.ac.in",
    bio: "ECE major with eyes on the stars. I wire control systems, breathe life into embedded boards, and teach silicon to think. Hardware today, aerospace tomorrow.",
    tags: ["ECE", "Embedded", "ML"],
    photo: "/team/omkaar-sandhibigraha.webp",
  },
  {
    name: "Mayukh Saha",
    role: "Member",
    email: "mayukhk25@iiserb.ac.in",
    bio: "Half algorithm wizard, half model whisperer. I bend data structures to my will and coax neural networks into doing what the textbooks call impossible.",
    tags: ["CP", "AI/ML"],
    photo: "/team/mayukh-saha.webp",
  },
];

function RoleBadge({ role }: { role: string }) {
  return (
    <span className="chip !border-magenta/30 !text-magenta !px-2.5 !py-1 !text-[10px]">{role}</span>
  );
}

function MailButton({ email, name }: { email?: string; name: string }) {
  if (!email) return null;
  return (
    <a
      href={`mailto:${email}`}
      aria-label={`Email ${name}`}
      className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-[#0d0812]/80 text-text-secondary backdrop-blur transition hover:text-flame"
    >
      <Mail className="h-4 w-4" />
    </a>
  );
}

export function Team() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-team-head]",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
        },
      );
      gsap.fromTo(
        "[data-faculty]",
        { opacity: 0, y: 56 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: "[data-faculty]", start: "top 82%" },
        },
      );
      gsap.fromTo(
        "[data-coordinator]",
        { opacity: 0, y: 56 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: { trigger: "[data-coordinators]", start: "top 82%" },
        },
      );
      gsap.fromTo(
        "[data-member]",
        { opacity: 0, y: 56 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power4.out",
          stagger: 0.07,
          scrollTrigger: { trigger: "[data-team-grid]", start: "top 82%" },
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="team" className="relative overflow-hidden py-28 md:py-36">
      <div data-team-head className="mx-auto max-w-7xl px-6">
        <p className="chip">Team</p>
        <h2 className="font-display mt-6 max-w-3xl text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
          Humans behind the <span className="text-ramp-y">commits.</span>
        </h2>
        <p className="mt-5 max-w-xl text-lg text-text-secondary">
          The people building Cyberheathens. Say hi at the next event.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-7xl px-6">
        {/* Faculty advisor */}
        <div
          data-faculty
          data-cursor
          className="spotlight-card panel group grid grid-cols-1 overflow-hidden rounded-3xl md:grid-cols-[0.85fr_1.35fr]"
        >
          <div className="relative self-start overflow-hidden md:self-stretch">
            <img
              src={faculty.photo}
              alt={`Portrait of ${faculty.name}`}
              width={640}
              height={800}
              loading="lazy"
              decoding="async"
              className="h-full max-h-[26rem] w-full object-cover object-top md:max-h-none md:aspect-4/5 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-ramp-y opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-20"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0d0812] to-transparent"
              aria-hidden="true"
            />
          </div>

          <div className="flex flex-col justify-center p-7 md:p-12">
            <div className="flex flex-wrap items-center gap-3">
              <RoleBadge role={faculty.role} />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
                IISER Bhopal · Dept. of EECS
              </span>
            </div>
            <h3 className="font-display mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
              {faculty.name}
            </h3>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
              {faculty.bio}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {faculty.tags.map((t) => (
                <span key={t} className="chip !px-3 !py-1.5 !text-[11px] !normal-case">
                  {t}
                </span>
              ))}
              <span className="ml-auto">
                <MailButton email={faculty.email} name={faculty.name} />
              </span>
            </div>
          </div>
        </div>

        {/* Coordinators */}
        <div data-coordinators className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          {coordinators.map((m) => (
            <article
              key={m.name}
              data-coordinator
              data-cursor
              className="spotlight-card panel group grid grid-cols-[0.9fr_1.1fr] overflow-hidden rounded-2xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={m.photo}
                  alt={`Portrait of ${m.name}`}
                  width={640}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="h-full min-h-56 w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-ramp-y opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-25"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0d0812] to-transparent"
                  aria-hidden="true"
                />
              </div>

              <div className="flex flex-col justify-center p-5 md:p-6">
                <RoleBadge role={m.role} />
                <h3 className="font-display mt-3 text-xl font-semibold tracking-tight md:text-2xl">
                  {m.name}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-text-secondary">{m.bio}</p>
                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  {m.tags.map((t) => (
                    <span key={t} className="chip !px-2.5 !py-1 !text-[10px] !normal-case">
                      {t}
                    </span>
                  ))}
                  <span className="ml-auto">
                    <MailButton email={m.email} name={m.name} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Members */}
        <div
          data-team-grid
          className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {members.map((m) => (
            <article
              key={m.name}
              data-member
              data-cursor
              className="spotlight-card panel group overflow-hidden rounded-2xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={m.photo}
                  alt={`Portrait of ${m.name}`}
                  width={640}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="aspect-4/5 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-ramp-y opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-25"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0d0812] to-transparent"
                  aria-hidden="true"
                />
                <span className="absolute bottom-3 right-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <MailButton email={m.email} name={m.name} />
                </span>
              </div>

              <div className="p-6">
                <RoleBadge role={m.role} />
                <h3 className="font-display mt-3 text-xl font-semibold tracking-tight">{m.name}</h3>
                <p className="mt-2 min-h-[3.75rem] text-sm leading-relaxed text-text-secondary">
                  {m.bio}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {m.tags.map((t) => (
                    <span key={t} className="chip !px-2.5 !py-1 !text-[10px] !normal-case">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
