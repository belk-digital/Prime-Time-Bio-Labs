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

function buildVariants(skuPrefix: string, dosageOptions: string[], price: number) {
  return dosageOptions.map((dosage, index) => ({
    sku: `${skuPrefix}-${slugify(dosage).toUpperCase()}`,
    isKit: false,
    price,
    stock: 200 - index * 20,
    options: [{ key: "Dosage", value: dosage }],
  }));
}

function buildTabsContent(name: string, categoryName: string) {
  return {
    productDetailsDescription: `${name} is supplied as a lyophilized powder in a sealed, light-protected vial, synthesized to research-grade standards with a printed lot number for full batch traceability. Each unit ships with handling and reconstitution guidance for laboratory use.`,
    researchFocusDescription: `${name} is under active investigation within ${categoryName.toLowerCase()} research, with published literature exploring its receptor activity and downstream signaling pathways across in-vitro and pre-clinical models.`,
    qualityPurityDescription: `Every batch of ${name} is verified via third-party HPLC and mass spectrometry testing to confirm purity, with a Certificate of Analysis available for the specific lot number shipped.`,
    complianceNoticeDescription: `${name} is sold strictly for laboratory research use. It is not a drug, food, or cosmetic, has not been evaluated by the FDA, and is not intended for human or animal consumption.`,
  };
}

function buildFaqs(name: string) {
  return [
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

const products = [
  {
    name: "Retatrutide",
    slug: "retatrutide",
    description:
      "Retatrutide is a triple GIP/GLP-1/glucagon receptor agonist under active investigation for its effects on metabolic pathways and body composition in research models.",
    price: 149.99,
    categoryName: "GLP-1 & Metabolic",
    isBestSeller: true,
    dosageOptions: ["5MG", "10MG", "15MG"],
    coaPurity: 99,
  },
  {
    name: "Tirzepatide",
    slug: "tirzepatide",
    description:
      "Tirzepatide is a dual GIP and GLP-1 receptor agonist heavily researched for its synergistic effects on metabolic pathways and glucose homeostasis.",
    price: 129.99,
    categoryName: "GLP-1 & Metabolic",
    isBestSeller: true,
    dosageOptions: ["5MG", "10MG", "15MG"],
    coaPurity: 99.9,
  },
  {
    name: "Semaglutide",
    slug: "semaglutide",
    description:
      "Semaglutide is a GLP-1 receptor agonist widely studied for its effects on glycemic control and weight management in metabolic research.",
    price: 99.99,
    categoryName: "GLP-1 & Metabolic",
    isBestSeller: true,
    dosageOptions: ["2MG", "5MG", "10MG"],
    coaPurity: 99.5,
  },
  {
    name: "BPC-157",
    slug: "bpc-157",
    description:
      "BPC-157 is a synthetic peptide derived from a protective protein found in the stomach, studied for its potential regenerative effects on tissue repair and gut healing.",
    price: 79.99,
    categoryName: "Healing & Recovery",
    isBestSeller: true,
    dosageOptions: ["5MG", "10MG"],
    coaPurity: 99,
  },
  {
    name: "TB-500",
    slug: "tb-500",
    description:
      "TB-500 is a synthetic fraction of thymosin beta-4, present in virtually all human and animal cells, researched for its potential to promote healing and reduce inflammation.",
    price: 84.99,
    categoryName: "Healing & Recovery",
    isBestSeller: false,
    dosageOptions: ["5MG", "10MG"],
    coaPurity: 99,
  },
  {
    name: "CJC-1295 / Ipamorelin Blend",
    slug: "cjc-1295-ipamorelin-blend",
    description:
      "A synergistic blend of CJC-1295 (without DAC) and Ipamorelin, studied together for amplified pulsatile growth hormone release in research models.",
    price: 89.99,
    categoryName: "Growth Hormone Secretagogue",
    isBestSeller: false,
    dosageOptions: ["5/5MG", "10/10MG"],
    coaPurity: 99,
  },
  {
    name: "Selank Nasal Spray",
    slug: "selank-nasal-spray",
    description:
      "Selank is a synthetic peptide analog studied for its anxiolytic and nootropic properties in a convenient nasal spray research format.",
    price: 64.99,
    categoryName: "Nasal Sprays",
    isBestSeller: false,
    dosageOptions: ["10ML"],
    coaPurity: 99,
  },
  {
    name: "Epithalon",
    slug: "epithalon",
    description:
      "Epithalon is a synthetic tetrapeptide studied for its potential role in telomerase activation and longevity research.",
    price: 74.99,
    categoryName: "Longevity & Anti-Aging",
    isBestSeller: false,
    dosageOptions: ["10MG", "20MG"],
    coaPurity: 99,
  },
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

  // Product placeholder image — uploaded once to Media, reused across every seeded product.
  let placeholderImageId: string | number | null = null;
  const existingMedia = await payload.find({
    collection: "media",
    where: { alt: { equals: "Peptide vial placeholder" } },
    limit: 1,
  });
  if (existingMedia.docs.length > 0) {
    placeholderImageId = existingMedia.docs[0].id;
    console.log("Placeholder product image already exists in Media.");
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

  // Remove any previously seeded products so the catalog reflects the current mock data only.
  const existingProducts = await payload.find({ collection: "products", limit: 1000 });
  for (const doc of existingProducts.docs) {
    await payload.delete({ collection: "products", id: doc.id });
  }
  if (existingProducts.docs.length > 0) {
    console.log(`Removed ${existingProducts.docs.length} existing product(s).`);
  }

  // Products
  for (const product of products) {
    const categoryId = categoryIdByName.get(product.categoryName);
    const skuPrefix = slugify(product.name).toUpperCase().slice(0, 12);
    const tabsContent = buildTabsContent(product.name, product.categoryName);

    await payload.create({
      collection: "products",
      data: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        stock: 500,
        status: "active",
        isVisible: true,
        isBestSeller: !!product.isBestSeller,
        hasVariants: true,
        categories: categoryId ? [categoryId] : [],
        variants: buildVariants(skuPrefix, product.dosageOptions, product.price),
        images: placeholderImageId ? [{ image: placeholderImageId }] : [],
        ...tabsContent,
        coaBatchNumber: `PTB-${skuPrefix}-0925`,
        coaPurity: product.coaPurity,
        coaAnalyzedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        faqs: buildFaqs(product.name),
      } as any,
    });
    console.log(`Created product: ${product.name}`);
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
