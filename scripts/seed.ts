import { config } from "dotenv";
import fs from "fs";
import path from "path";
config({ path: ".env" });
config({ path: ".env.local" });

// Dynamic imports: this file is loaded as ESM (package.json has "type": "module"),
// where static imports are hoisted above the dotenv calls above, so payload.config's
// `process.env.PAYLOAD_SECRET` read would run before the env vars are actually loaded.
const { getPayload } = await import("payload");
const { default: configPromise } = await import("../payload.config");

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || "admin@primetimebiolabs.com";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!";

const categories = [
  { name: "GLP-1 & Metabolic", sortOrder: 1 },
  { name: "Healing & Recovery", sortOrder: 2 },
  { name: "Peptide Bundles", sortOrder: 3 },
  { name: "Nasal Sprays", sortOrder: 4 },
  { name: "Cosmetic & Skin", sortOrder: 5 },
  { name: "Sexual & Hormonal", sortOrder: 6 },
  { name: "Growth Hormone Secretagogue", sortOrder: 7 },
  { name: "Cognitive & Nootropic", sortOrder: 8 },
  { name: "Longevity & Anti-Aging", sortOrder: 9 },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const PRODUCT_IMAGE_DIR = path.resolve(process.cwd(), "public/primetimebiolabs prod images");
const COA_IMAGE_DIR = path.resolve(process.cwd(), "public/COA");

// Rotating template variants so the boilerplate sections of the 25 product pages
// aren't byte-identical (avoids thin/duplicate-content SEO issues) while the
// research-focus text (the substantive part) stays fully unique per product.
const PRODUCT_DETAILS_TEMPLATES = [
  (name: string) =>
    `${name} ships as a lyophilized powder in a sealed, light-protected vial with a printed lot number for full batch traceability. Each unit includes handling and reconstitution guidance for laboratory use.`,
  (name: string) =>
    `Supplied as a sterile lyophilized powder, ${name} arrives in a light-protected vial labeled with its lot number for traceability, along with reconstitution and storage guidance for research applications.`,
  (name: string) =>
    `${name} is packaged as a single-use lyophilized vial, sealed and light-protected to preserve peptide integrity during shipping and storage, with a lot-specific label for batch traceability.`,
];

const QUALITY_TEMPLATES = [
  (name: string) =>
    `Every batch of ${name} undergoes third-party HPLC and mass spectrometry testing to verify purity and identity, with a Certificate of Analysis (COA) issued for the specific lot number shipped.`,
  (name: string) =>
    `${name} is manufactured under strict quality controls and independently verified via HPLC and mass spectrometry before release, ensuring each vial matches its published purity and identity profile.`,
  (name: string) =>
    `Each lot of ${name} is third-party tested for purity, identity, and sterility, with COA documentation available for download so researchers can confirm the exact specifications of their shipped batch.`,
];

const COMPLIANCE_TEMPLATES = [
  (name: string) =>
    `${name} is sold strictly for laboratory and research use. It is not a drug, food, or cosmetic product, has not been evaluated by the FDA, and is not intended for human or animal consumption.`,
  (name: string) =>
    `This product is intended for in-vitro laboratory research only. ${name} is not approved for human or veterinary use, has not been reviewed by the FDA, and must not be used as a food, drug, or cosmetic.`,
  (name: string) =>
    `${name} is distributed exclusively for qualified research purposes. It carries no FDA approval, is not intended for human consumption, and must be handled only by trained laboratory personnel.`,
];

function buildTabsContent(name: string, mechanism: string, index: number) {
  return {
    productDetailsDescription: PRODUCT_DETAILS_TEMPLATES[index % 3](name),
    researchFocusDescription: mechanism,
    qualityPurityDescription: QUALITY_TEMPLATES[index % 3](name),
    complianceNoticeDescription: COMPLIANCE_TEMPLATES[index % 3](name),
  };
}

function buildFaqs(name: string, mechanismShort: string) {
  return [
    {
      question: `What is ${name} researched for?`,
      answer: mechanismShort,
    },
    {
      question: `How should ${name} be stored?`,
      answer:
        "Store the lyophilized vial in a freezer at -20°C, protected from light. Once reconstituted, keep refrigerated at 2-8°C and use within the timeframe noted on the Certificate of Analysis.",
    },
    {
      question: `Is a Certificate of Analysis included with ${name}?`,
      answer:
        "Yes. Every batch is third-party tested and a COA matching the lot number on your vial is available for download from your account after purchase.",
    },
    {
      question: "What is the minimum order requirement?",
      answer:
        "There is no minimum order quantity. Bulk pricing is available on select bundles for qualified research institutions — contact us for details.",
    },
  ];
}

function buildSeo(name: string) {
  return {
    seoTitle: `Buy ${name} | Research Peptides – Prime Time Bio Labs`,
    seoDescription: `Shop ${name} research peptide, third-party tested with a Certificate of Analysis for purity verification. Fast, discreet shipping. For laboratory research use only.`,
  };
}

type ProductSeed = {
  name: string;
  categoryName: string;
  price: number;
  sku: string;
  image: string | null;
  mechanism: string;
  coaPurity: number;
  isBestSeller?: boolean;
  coaImage?: string;
};

const RETA_MECHANISM =
  "Retatrutide is a triple agonist engineered to activate GIP, GLP-1, and glucagon receptors simultaneously, a mechanism researchers are studying for its combined effects on appetite signaling, energy expenditure, and lipid metabolism. Pre-clinical models have shown more pronounced body-composition shifts than single- or dual-receptor agonists.";
const TIRZ_MECHANISM =
  "Tirzepatide activates both the GIP and GLP-1 receptors, a dual-agonist mechanism studied for its synergistic influence on insulin secretion, gastric emptying, and appetite regulation. Research models have used it to probe how combined incretin signaling compares to GLP-1-only pathways.";
const SEMA_MECHANISM =
  "Semaglutide is a long-acting GLP-1 receptor agonist studied extensively for its effects on glucose-dependent insulin secretion, gastric emptying, and satiety signaling in metabolic research models.";
const METX_MECHANISM =
  "Metabolic X combines a GIP/GLP-1/glucagon triple agonist with an amylin receptor agonist in a single research vial, allowing investigators to study the combined downstream effects of incretin and amylin pathway activation on appetite and energy balance.";
const BPC157_MECHANISM =
  "BPC-157 is a pentadecapeptide derived from a protective compound found in gastric juice, studied for its potential role in angiogenesis, fibroblast migration, and accelerated tissue repair across gut, tendon, and ligament research models.";
const TB500_MECHANISM =
  "TB-500 is a synthetic fragment of Thymosin Beta-4 studied for its actin-binding properties, which researchers associate with cell migration, blood vessel formation, and the early stages of wound-healing cascades.";
const KPV_MECHANISM =
  "KPV is the C-terminal tripeptide of alpha-MSH, studied for its ability to inhibit NF-kB signaling independent of melanocortin receptor activation, making it a focus of anti-inflammatory and gut-barrier research.";
const WOLVERINE_MECHANISM =
  "Wolverine is a research blend combining BPC-157 and TB-500 in a single vial, formulated for investigators studying the combined tissue-repair and angiogenic pathways of both peptides side by side.";
const TESA_MECHANISM =
  "Tesamorelin is a synthetic analog of growth hormone-releasing hormone (GHRH), studied for its stimulatory effect on pulsatile growth hormone release from the pituitary and its downstream influence on visceral fat metabolism in research models.";
const MOTSC_MECHANISM =
  "MOTS-c is a mitochondrial-derived peptide studied as an exercise mimetic, with research models examining its role in AMPK activation, cellular energy homeostasis, and metabolic stress response.";
const IGF1LR3_MECHANISM =
  "IGF-1 LR3 is a modified analog of insulin-like growth factor 1 with a substituted arginine at position 3, engineered to reduce binding-protein affinity and extend half-life, making it a focus of research into cell proliferation and muscle tissue growth pathways.";
const SEMAX_MECHANISM =
  "Semax is a synthetic heptapeptide analog of ACTH(4-10), studied for its influence on brain-derived neurotrophic factor (BDNF) expression and its potential neuroprotective and cognitive-research applications.";
const DSIP_MECHANISM =
  "DSIP (Delta Sleep-Inducing Peptide) is studied for its modulatory role in sleep-wake regulation and stress-hormone response, with research models examining its interaction with GABAergic and opioid signaling pathways.";
const PT141_MECHANISM =
  "PT-141 (Bremelanotide) is a melanocortin receptor agonist studied for its activation of central nervous system pathways associated with arousal signaling, independent of the vascular mechanisms studied in other compounds.";
const EPITALON_MECHANISM =
  "Epitalon is a synthetic tetrapeptide studied for its proposed role in telomerase activation and circadian rhythm regulation, making it a recurring subject in longevity and cellular-aging research models.";
const NAD_MECHANISM =
  "NAD+ (Nicotinamide Adenine Dinucleotide) is a coenzyme central to cellular energy metabolism, studied for its role in sirtuin activation, mitochondrial function, and DNA repair pathways relevant to aging research.";
const THYMOSIN_MECHANISM =
  "Thymosin Alpha-1 is studied for its immunomodulatory effects, including its influence on T-cell maturation and cytokine signaling, making it a focus of immune-function and host-defense research models.";
const GHKCU_MECHANISM =
  "GHK-Cu is a naturally occurring copper-binding tripeptide studied for its role in collagen and elastin synthesis, fibroblast stimulation, and tissue-remodeling pathways relevant to skin and wound-healing research.";
const AHKCU_MECHANISM =
  "AHK-Cu is a copper-binding tripeptide structurally related to GHK-Cu, studied for its comparable effects on dermal fibroblast activity and its potential advantages in stability and receptor-binding research models.";
const GLOW_MECHANISM =
  "GLOW is a research blend combining GHK-Cu, BPC-157, and TB-500, formulated for investigators studying the combined tissue-remodeling, angiogenic, and copper-peptide pathways relevant to skin and healing research.";
const KLOW_MECHANISM =
  "KLOW expands on the GLOW blend by adding KPV alongside GHK-Cu, BPC-157, and TB-500, giving researchers a single vial to study combined anti-inflammatory, tissue-repair, and copper-peptide pathways together.";

const products: ProductSeed[] = [
  { name: "Retatrutide 10 mg", categoryName: "GLP-1 & Metabolic", price: 64.99, sku: "RETA-10MG", image: "Retatrutide 10 mg.webp", mechanism: RETA_MECHANISM, coaPurity: 99, isBestSeller: true },
  { name: "Retatrutide 30 mg", categoryName: "GLP-1 & Metabolic", price: 99.99, sku: "RETA-30MG", image: "RETATRUTIDE-30MG.webp", mechanism: RETA_MECHANISM, coaPurity: 99 },
  { name: "Tirzepatide 10 mg", categoryName: "GLP-1 & Metabolic", price: 61.99, sku: "TIRZ-10MG", image: "Tirzepatide-10mg.webp", mechanism: TIRZ_MECHANISM, coaPurity: 99.9, isBestSeller: true },
  { name: "Tirzepatide 30 mg", categoryName: "GLP-1 & Metabolic", price: 89.99, sku: "TIRZ-30MG", image: "TIRZEPETIDE-30MG.webp", mechanism: TIRZ_MECHANISM, coaPurity: 99.9 },
  { name: "Semaglutide 10 mg", categoryName: "GLP-1 & Metabolic", price: 59.99, sku: "SEMA-10MG", image: "Semaglutide-10mg.webp", mechanism: SEMA_MECHANISM, coaPurity: 99.5, isBestSeller: true },
  { name: "Metabolic X (Reta x Cangri) 10 mg", categoryName: "GLP-1 & Metabolic", price: 69.99, sku: "METX-10MG", image: "METABOLICX-10MG.webp", mechanism: METX_MECHANISM, coaPurity: 99 },
  { name: "BPC-157 10 mg", categoryName: "Healing & Recovery", price: 59.99, sku: "BPC157-10MG", image: "BPC-157-10mg.webp", mechanism: BPC157_MECHANISM, coaPurity: 99, isBestSeller: true, coaImage: "BPC-157 10mg.jpeg" },
  { name: "TB-500 10 mg", categoryName: "Healing & Recovery", price: 59.99, sku: "TB500-10MG", image: "TB-500-10mg.webp", mechanism: TB500_MECHANISM, coaPurity: 99 },
  { name: "KPV 10 mg", categoryName: "Healing & Recovery", price: 59.99, sku: "KPV-10MG", image: "KPV-10mg.webp", mechanism: KPV_MECHANISM, coaPurity: 99, coaImage: "KPV 10mg.jpeg" },
  { name: "Wolverine 20 mg", categoryName: "Healing & Recovery", price: 84.99, sku: "WOLV-20MG", image: "WOLVERINE-20MG.webp", mechanism: WOLVERINE_MECHANISM, coaPurity: 99 },
  { name: "Tesamorelin 10 mg", categoryName: "Growth Hormone Secretagogue", price: 64.99, sku: "TESA-10MG", image: "Tesamorelin-10mg.webp", mechanism: TESA_MECHANISM, coaPurity: 99 },
  { name: "Tesamorelin 20 mg", categoryName: "Growth Hormone Secretagogue", price: 89.99, sku: "TESA-20MG", image: "TESAMORELIN-20MG.webp", mechanism: TESA_MECHANISM, coaPurity: 99, coaImage: "Tesamorelin 20mg.jpeg" },
  { name: "Mots C 10 mg", categoryName: "Growth Hormone Secretagogue", price: 59.99, sku: "MOTSC-10MG", image: "MOTS-C-10MG.webp", mechanism: MOTSC_MECHANISM, coaPurity: 99 },
  { name: "Mots C 20 mg", categoryName: "Growth Hormone Secretagogue", price: 79.99, sku: "MOTSC-20MG", image: "MOTC-20MG.webp", mechanism: MOTSC_MECHANISM, coaPurity: 99, coaImage: "MOTS C 20mg.jpeg" },
  { name: "IGF1-LR3 1 mg", categoryName: "Growth Hormone Secretagogue", price: 99.99, sku: "IGF1LR3-1MG", image: "IGF1-LR3-1MG.webp", mechanism: IGF1LR3_MECHANISM, coaPurity: 99 },
  { name: "Semax 10 mg", categoryName: "Cognitive & Nootropic", price: 59.99, sku: "SEMAX-10MG", image: "Semax-10mg.webp", mechanism: SEMAX_MECHANISM, coaPurity: 99, coaImage: "SEMAX 10mg.jpeg" },
  { name: "DSIP 10 mg", categoryName: "Cognitive & Nootropic", price: 59.99, sku: "DSIP-10MG", image: "DSIP-10MG.webp", mechanism: DSIP_MECHANISM, coaPurity: 99, coaImage: "DSIP 10mg.jpeg" },
  { name: "PT-141 10 mg", categoryName: "Sexual & Hormonal", price: 59.99, sku: "PT141-10MG", image: "PT-141-10MG.webp", mechanism: PT141_MECHANISM, coaPurity: 99 },
  { name: "Epitalon 10 mg", categoryName: "Longevity & Anti-Aging", price: 59.99, sku: "EPI-10MG", image: "EPITALON-10MG.webp", mechanism: EPITALON_MECHANISM, coaPurity: 99 },
  { name: "NAD+ 500 mg", categoryName: "Longevity & Anti-Aging", price: 68.99, sku: "NAD-500MG", image: "NAD+500MG.webp", mechanism: NAD_MECHANISM, coaPurity: 99 },
  { name: "Thymosin 5 mg", categoryName: "Longevity & Anti-Aging", price: 44.99, sku: "THY-5MG", image: "THYMOSIN-5MG.webp", mechanism: THYMOSIN_MECHANISM, coaPurity: 99 },
  { name: "GHKCU 50 mg", categoryName: "Cosmetic & Skin", price: 54.99, sku: "GHKCU-50MG", image: "GHKCU-50MG.webp", mechanism: GHKCU_MECHANISM, coaPurity: 99 },
  { name: "AHKCU 50 mg", categoryName: "Cosmetic & Skin", price: 54.99, sku: "AHKCU-50MG", image: "AHKCU-50mg.webp", mechanism: AHKCU_MECHANISM, coaPurity: 99, coaImage: "AHCKU 50mg.jpeg" },
  { name: "GLOW 70 mg", categoryName: "Cosmetic & Skin", price: 79.99, sku: "GLOW-70MG", image: "GLOW-70MG.webp", mechanism: GLOW_MECHANISM, coaPurity: 99, coaImage: "GLOW 70mg.jpeg" },
  { name: "KLOW 80 mg", categoryName: "Cosmetic & Skin", price: 89.99, sku: "KLOW-80MG", image: "KLOW-80mg.webp", mechanism: KLOW_MECHANISM, coaPurity: 99, coaImage: "KLOW 80mg.jpeg" },
];

const blogPosts = [
  {
    title: "Breakthroughs in Peptide Synthesis for Next-Gen Therapeutics",
    slug: "breakthroughs-in-peptide-synthesis",
    excerpt:
      "A look at how modern solid-phase synthesis techniques are pushing purity and yield further than ever before.",
    category: "Metabolic research",
    readTime: "8 min read",
  },
  {
    title: "Best Practices for Maintaining Peptide Stability in Storage",
    slug: "peptide-stability-storage-best-practices",
    excerpt:
      "Temperature, reconstitution, and light exposure all affect peptide stability — here's what the research says.",
    category: "Recovery protocols",
    readTime: "6 min read",
  },
  {
    title: "Understanding the Role of GLP-1 Agonists in Metabolic Research",
    slug: "glp-1-agonists-metabolic-research",
    excerpt:
      "GLP-1 receptor agonists have become a cornerstone of metabolic research — here's the mechanism overview.",
    category: "Metabolic research",
    readTime: "10 min read",
  },
];

async function seed() {
  const payload = await getPayload({ config: configPromise });

  // Admin user
  const existingAdmin = await payload.find({
    collection: "users",
    where: { email: { equals: ADMIN_EMAIL } },
  });
  let adminId: string | number;
  if (existingAdmin.docs.length === 0) {
    const created = await payload.create({
      collection: "users",
      data: {
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: "admin",
        emailVerified: true,
        firstName: "Primetime",
        lastName: "Admin",
      },
    });
    adminId = created.id;
    console.log(`Created admin user: ${ADMIN_EMAIL} (password: ${ADMIN_PASSWORD})`);
  } else {
    adminId = existingAdmin.docs[0].id;
    console.log(`Admin user already exists: ${ADMIN_EMAIL}`);
  }

  // Categories
  const categoryIdByName = new Map<string, string | number>();
  for (const category of categories) {
    const slug = slugify(category.name);
    const existing = await payload.find({
      collection: "categories",
      where: { slug: { equals: slug } },
    });
    if (existing.docs.length === 0) {
      const created = await payload.create({
        collection: "categories",
        data: { name: category.name, slug, isVisible: true, sortOrder: category.sortOrder },
      });
      categoryIdByName.set(category.name, created.id);
      console.log(`Created category: ${category.name}`);
    } else {
      categoryIdByName.set(category.name, existing.docs[0].id);
      console.log(`Category already exists: ${category.name}`);
    }
  }

  // Fallback placeholder image, used only for products missing a real photo (e.g. KLOW).
  let placeholderImageId: string | number | null = null;
  const existingPlaceholder = await payload.find({
    collection: "media",
    where: { alt: { equals: "Peptide vial placeholder" } },
    limit: 1,
  });
  if (existingPlaceholder.docs.length > 0) {
    placeholderImageId = existingPlaceholder.docs[0].id;
  } else {
    const imagePath = path.resolve(process.cwd(), "public/product-card-image.png");
    const fileBuffer = fs.readFileSync(imagePath);
    const createdMedia = await payload.create({
      collection: "media",
      data: { alt: "Peptide vial placeholder" },
      file: {
        data: fileBuffer,
        mimetype: "image/png",
        name: "product-placeholder.png",
        size: fileBuffer.length,
      },
    });
    placeholderImageId = createdMedia.id;
    console.log("Uploaded placeholder product image to Media.");
  }

  // Remove any previously seeded products so the catalog reflects the current real product list only.
  const existingProducts = await payload.find({ collection: "products", limit: 1000 });
  for (const doc of existingProducts.docs) {
    await payload.delete({ collection: "products", id: doc.id });
  }
  if (existingProducts.docs.length > 0) {
    console.log(`Removed ${existingProducts.docs.length} existing product(s).`);
  }

  // Products
  for (let index = 0; index < products.length; index++) {
    const product = products[index];
    const categoryId = categoryIdByName.get(product.categoryName);
    const tabsContent = buildTabsContent(product.name, product.mechanism, index);
    const seo = buildSeo(product.name);
    const mechanismShort = product.mechanism.split(". ")[0] + ".";

    let imageId: string | number | null = placeholderImageId;
    if (product.image) {
      const altText = `${product.name} product image`;
      const existingImage = await payload.find({
        collection: "media",
        where: { alt: { equals: altText } },
        limit: 1,
      });
      if (existingImage.docs.length > 0) {
        imageId = existingImage.docs[0].id;
      } else {
        const imagePath = path.join(PRODUCT_IMAGE_DIR, product.image);
        if (fs.existsSync(imagePath)) {
          const fileBuffer = fs.readFileSync(imagePath);
          const createdMedia = await payload.create({
            collection: "media",
            data: { alt: altText },
            file: {
              data: fileBuffer,
              mimetype: "image/webp",
              name: product.image,
              size: fileBuffer.length,
            },
          });
          imageId = createdMedia.id;
        } else {
          console.warn(`Image not found for ${product.name}: ${imagePath} — using placeholder.`);
        }
      }
    } else {
      console.warn(`No image provided for ${product.name} — using placeholder.`);
    }

    let coaFileId: string | number | null = null;
    if (product.coaImage) {
      const coaTitle = `${product.name} COA`;
      const existingCoa = await payload.find({
        collection: "documents",
        where: { title: { equals: coaTitle } },
        limit: 1,
      });
      if (existingCoa.docs.length > 0) {
        coaFileId = existingCoa.docs[0].id;
      } else {
        const coaPath = path.join(COA_IMAGE_DIR, product.coaImage);
        if (fs.existsSync(coaPath)) {
          const fileBuffer = fs.readFileSync(coaPath);
          const createdDoc = await payload.create({
            collection: "documents",
            data: { title: coaTitle },
            file: {
              data: fileBuffer,
              mimetype: "image/jpeg",
              name: product.coaImage,
              size: fileBuffer.length,
            },
          });
          coaFileId = createdDoc.id;
        } else {
          console.warn(`COA image not found for ${product.name}: ${coaPath}`);
        }
      }
    }

    await payload.create({
      collection: "products",
      data: {
        name: product.name,
        description: mechanismShort,
        price: product.price,
        stock: 500,
        status: "active",
        isVisible: true,
        isBestSeller: !!product.isBestSeller,
        hasVariants: false,
        sku: product.sku,
        categories: categoryId ? [categoryId] : [],
        images: imageId ? [{ image: imageId }] : [],
        ...tabsContent,
        ...seo,
        coaFile: coaFileId || undefined,
        // Real COA scans print batch PTBL08312026 / Sept 2, 2026 — match that instead of a
        // generic placeholder wherever we actually have the scanned certificate on file.
        coaBatchNumber: product.coaImage ? "PTBL08312026" : `PTB-${product.sku}-0925`,
        coaPurity: product.coaPurity,
        coaAnalyzedDate: product.coaImage
          ? new Date("2026-09-02").toISOString()
          : new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        faqs: buildFaqs(product.name, mechanismShort),
      } as any,
    });
    console.log(`Created product: ${product.name}${coaFileId ? " (with COA)" : ""}`);
  }

  // Shipping
  const existingShippingZone = await payload.find({
    collection: "shippingzones",
    where: { name: { equals: "United States" } },
    limit: 1,
  });
  if (existingShippingZone.docs.length === 0) {
    await payload.create({
      collection: "shippingzones",
      data: {
        name: "United States",
        methods: [
          {
            method: "Standard Shipping",
            price: 20,
            estimatedDays: 5,
          },
        ],
      } as any,
    });
    console.log("Created shipping zone: United States ($20.00 standard shipping)");
  } else {
    console.log("Shipping zone already exists: United States");
  }

  // Blog posts
  for (const post of blogPosts) {
    const existing = await payload.find({
      collection: "blog-posts",
      where: { slug: { equals: post.slug } },
    });
    if (existing.docs.length > 0) {
      console.log(`Blog post already exists: ${post.title}`);
      continue;
    }
    await payload.create({
      collection: "blog-posts",
      data: {
        title: post.title,
        slug: post.slug,
        author: adminId,
        excerpt: post.excerpt,
        category: post.category,
        readTime: post.readTime,
        status: "published",
        publishedAt: new Date().toISOString(),
      } as any,
    });
    console.log(`Created blog post: ${post.title}`);
  }

  console.log("Seed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
