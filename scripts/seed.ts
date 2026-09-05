import { config } from "dotenv";
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

const products = [
  {
    name: "Retatrutide",
    slug: "retatrutide",
    description:
      "Retatrutide is a triple GIP/GLP-1/glucagon receptor agonist under active investigation for its effects on metabolic pathways and body composition in research models.",
    price: 149.99,
    categoryName: "GLP-1 & Metabolic",
    isBestSeller: true,
    hasVariants: true,
    variants: [
      { sku: "RETA-10MG-1V", isKit: false, price: 149.99, stock: 200, options: [{ key: "Size", value: "10mg" }] },
    ],
  },
  {
    name: "Tirzepatide",
    slug: "tirzepatide",
    description:
      "Tirzepatide is a dual GIP and GLP-1 receptor agonist heavily researched for its synergistic effects on metabolic pathways and glucose homeostasis.",
    price: 129.99,
    categoryName: "GLP-1 & Metabolic",
    isBestSeller: true,
    hasVariants: true,
    variants: [
      { sku: "TIRZ-10MG-1V", isKit: false, price: 129.99, stock: 200, options: [{ key: "Size", value: "10mg" }] },
    ],
  },
  {
    name: "Semaglutide",
    slug: "semaglutide",
    description:
      "Semaglutide is a GLP-1 receptor agonist widely studied for its effects on glycemic control and weight management in metabolic research.",
    price: 99.99,
    categoryName: "GLP-1 & Metabolic",
    isBestSeller: true,
    hasVariants: true,
    variants: [
      { sku: "SEMA-5MG-1V", isKit: false, price: 99.99, stock: 200, options: [{ key: "Size", value: "5mg" }] },
    ],
  },
  {
    name: "BPC-157",
    slug: "bpc-157",
    description:
      "BPC-157 is a synthetic peptide derived from a protective protein found in the stomach, studied for its potential regenerative effects on tissue repair and gut healing.",
    price: 79.99,
    categoryName: "Healing & Recovery",
    isBestSeller: true,
    hasVariants: true,
    variants: [
      { sku: "BPC157-5MG-1V", isKit: false, price: 79.99, stock: 200, options: [{ key: "Size", value: "5mg" }] },
    ],
  },
  {
    name: "TB-500",
    slug: "tb-500",
    description:
      "TB-500 is a synthetic fraction of thymosin beta-4, present in virtually all human and animal cells, researched for its potential to promote healing and reduce inflammation.",
    price: 84.99,
    categoryName: "Healing & Recovery",
    hasVariants: true,
    variants: [
      { sku: "TB500-5MG-1V", isKit: false, price: 84.99, stock: 200, options: [{ key: "Size", value: "5mg" }] },
    ],
  },
  {
    name: "CJC-1295 / Ipamorelin Blend",
    slug: "cjc-1295-ipamorelin-blend",
    description:
      "A synergistic blend of CJC-1295 (without DAC) and Ipamorelin, studied together for amplified pulsatile growth hormone release in research models.",
    price: 89.99,
    categoryName: "Growth Hormone Secretagogue",
    hasVariants: true,
    variants: [
      { sku: "CJCIPA-1V", isKit: false, price: 89.99, stock: 200, options: [{ key: "Size", value: "5mg/5mg" }] },
    ],
  },
  {
    name: "Selank Nasal Spray",
    slug: "selank-nasal-spray",
    description:
      "Selank is a synthetic peptide analog studied for its anxiolytic and nootropic properties in a convenient nasal spray research format.",
    price: 64.99,
    categoryName: "Nasal Sprays",
    hasVariants: false,
  },
  {
    name: "Epithalon",
    slug: "epithalon",
    description:
      "Epithalon is a synthetic tetrapeptide studied for its potential role in telomerase activation and longevity research.",
    price: 74.99,
    categoryName: "Longevity & Anti-Aging",
    hasVariants: false,
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

  // Products
  for (const product of products) {
    const existing = await payload.find({
      collection: "products",
      where: { slug: { equals: product.slug } },
    });
    if (existing.docs.length > 0) {
      console.log(`Product already exists: ${product.name}`);
      continue;
    }
    const categoryId = categoryIdByName.get(product.categoryName);
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
        hasVariants: product.hasVariants,
        categories: categoryId ? [categoryId] : [],
        variants: product.hasVariants ? product.variants : undefined,
        sku: product.hasVariants ? undefined : slugify(product.name).toUpperCase(),
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
