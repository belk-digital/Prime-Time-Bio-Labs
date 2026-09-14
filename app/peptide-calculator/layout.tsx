import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://primetimebiolabs.com";
const TITLE = "Peptide Reconstitution Calculator | PrimeTime BioLabs";
const DESCRIPTION =
  "Free peptide reconstitution calculator. Enter vial size, diluent volume and target quantity to get exact concentration and syringe units. Laboratory use only.";
const PAGE_URL = `${SITE_URL}/peptide-calculator`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Peptide Reconstitution Calculator",
    description:
      "Enter vial size, diluent volume and target quantity to get exact working concentration and syringe graduations, with the full reconstitution method explained. For laboratory research use only.",
    url: PAGE_URL,
    siteName: "PrimeTime BioLabs",
    type: "website",
    images: [{ url: `${SITE_URL}/cta-banner.png` }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/cta-banner.png`],
  },
};

const RECONSTITUTION_STEPS = [
  {
    name: "Prepare both vials",
    text: "Wipe the rubber stopper on the peptide vial and on the bacteriostatic water with an alcohol swab, then wait thirty seconds for the surface to dry. Alcohol needs contact time to work, and piercing a wet stopper carries residue into the vial.",
  },
  {
    name: "Transfer the diluent",
    text: "Draw the exact volume of bacteriostatic water the calculator returned and inject it into the peptide vial slowly, aiming the stream at the glass wall rather than directly onto the powder. Directing the stream at the lyophilised cake drives mechanical stress through the peptide chain.",
  },
  {
    name: "Dissolve without agitation",
    text: "Do not shake. Swirl the vial gently in a circular motion until the powder dissolves completely and the solution runs clear. Shaking introduces shear force and foaming, and both degrade peptide structure. Full dissolution can take several minutes with a larger vial.",
  },
];

const FAQ_ITEMS = [
  {
    q: "How much bacteriostatic water should I use to reconstitute a peptide?",
    a: "Two to three millilitres suits most vials. More diluent lowers the concentration and raises the volume you draw, which improves measurement precision. Less diluent concentrates the solution and makes small measurement errors proportionally larger.",
  },
  {
    q: "What is the peptide reconstitution formula?",
    a: "Divide the target quantity in micrograms by the total peptide in the vial in micrograms, then multiply by the diluent volume in millilitres. The result is the volume to draw. For a 5 mg vial in 2 mL, drawing 250 mcg: (250 divided by 5,000) multiplied by 2 equals 0.1 mL.",
  },
  {
    q: "What is the difference between bacteriostatic and sterile water?",
    a: "Bacteriostatic water contains 0.9% benzyl alcohol, which suppresses bacterial growth and allows a vial to be drawn from repeatedly. Sterile water contains no preservative, so it suits single-use preparation only. Using sterile water in a multi-use vial lets contamination grow.",
  },
  {
    q: "Why should you never shake a reconstituted peptide vial?",
    a: "Shaking applies shear force and introduces foaming, and both damage peptide structure. The resulting degradation shows up as reduced purity in any subsequent analysis. Swirl the vial gently instead, and allow several minutes for a larger vial to dissolve fully.",
  },
  {
    q: "How long does a reconstituted peptide last?",
    a: "Refrigerated at 4 degrees Celsius and kept away from light, reconstituted research peptides typically hold for 20 to 30 days. That range is indicative rather than universal, because stability depends heavily on the sequence, the solvent and how often the vial has been handled.",
  },
  {
    q: "Can you freeze a reconstituted peptide?",
    a: "No. Freezing forms ice crystals that disrupt peptide structure, and thawing does not reverse the damage. Refrigerate reconstituted solution at 4 degrees Celsius instead. Lyophilised powder, by contrast, freezes at minus 20 degrees Celsius without issue and stores that way for years.",
  },
  {
    q: "How many units is 0.1 mL on a U-100 syringe?",
    a: "Ten. A U-100 scale divides one millilitre into 100 graduations, so 0.1 mL reads as 10, 0.25 mL as 25 and 0.5 mL as 50. A U-40 scale divides the same millilitre into 40 graduations, so the same numbered mark holds 2.5 times as much. Check the scale printed on the barrel.",
  },
  {
    q: "Are these products intended for human consumption?",
    a: "No. PrimeTime BioLabs supplies every product strictly for laboratory and in-vitro research by qualified professionals. These compounds are not drugs, dietary supplements or cosmetics. They are not intended for human or animal consumption, and they are not for diagnostic or therapeutic use of any kind. This calculator performs dilution arithmetic for laboratory preparation only.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${PAGE_URL}#app`,
      name: "Peptide Reconstitution Calculator",
      url: PAGE_URL,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any modern web browser",
      browserRequirements: "Requires JavaScript",
      description:
        "Free calculator that converts a lyophilised peptide vial into a working solution of known concentration. Enter vial quantity, diluent volume and target quantity per aliquot to obtain the resulting concentration and the volume to draw. For laboratory research use only.",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@id": `${SITE_URL}/#organization` },
      featureList: [
        "Working concentration in mg/mL and mcg/mL",
        "Volume to draw in millilitres",
        "Syringe graduation equivalent on a U-100 scale",
        "Supports any vial size and diluent volume",
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: TITLE,
      description: DESCRIPTION,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: { "@id": `${PAGE_URL}#app` },
      inLanguage: "en-US",
      breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Peptide Calculator", item: PAGE_URL },
      ],
    },
    {
      "@type": "HowTo",
      "@id": `${PAGE_URL}#howto`,
      name: "How to reconstitute a research peptide",
      description:
        "The three-step laboratory method for returning a lyophilised research peptide to solution without contamination or mechanical damage to the peptide chain.",
      totalTime: "PT5M",
      supply: [
        { "@type": "HowToSupply", name: "Lyophilised research peptide vial" },
        { "@type": "HowToSupply", name: "Bacteriostatic water" },
        { "@type": "HowToSupply", name: "Alcohol swabs" },
      ],
      tool: [{ "@type": "HowToTool", name: "Graduated syringe" }],
      step: RECONSTITUTION_STEPS.map((step, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: step.name,
        text: step.text,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function PeptideCalculatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
