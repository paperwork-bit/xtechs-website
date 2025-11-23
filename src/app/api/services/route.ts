import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

const DATA_DIR = path.join(process.cwd(), "src", "data");
const DATA_FILE = path.join(DATA_DIR, "services.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

async function ensureStorage() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    const initial = {
      services: [
        { title: "Residential Solar", image: "", overlayImage: "", href: "/solar/residential" },
        { title: "Commercial Solar", image: "", overlayImage: "", href: "/solar/business" },
        { title: "SolarFold", image: "", overlayImage: "", href: "/solarfold" },
        { title: "Off-grid Systems", image: "", overlayImage: "", href: "/solar/off-grid" },
        { title: "Solar Batteries", image: "", overlayImage: "", href: "/solar/residential" },
        { title: "EV Chargers", image: "", overlayImage: "", href: "/solar/residential" },
      ],
    };
    await fs.writeFile(DATA_FILE, JSON.stringify(initial, null, 2), "utf8");
  }
}

export async function GET() {
  await ensureStorage();
  const json = await fs.readFile(DATA_FILE, "utf8");
  return NextResponse.json(JSON.parse(json));
}

export async function POST(request: NextRequest) {
  await ensureStorage();

  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    // Support simple JSON updates: { index, image?, overlayImage? }
    const body = await request.json();
    const { index, image, overlayImage } = body as {
      index: number;
      image?: string;
      overlayImage?: string;
    };
    if (typeof index !== "number" || index < 0 || index > 5) {
      return NextResponse.json({ error: "Invalid index" }, { status: 400 });
    }
    const data = JSON.parse(await fs.readFile(DATA_FILE, "utf8"));
    data.services[index] = {
      ...data.services[index],
      ...(image ? { image } : {}),
      ...(overlayImage ? { overlayImage } : {}),
    };
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
    return NextResponse.json({ ok: true, service: data.services[index] });
  }

  // Multipart form-data for file uploads
  const form = await request.formData();
  const indexRaw = form.get("index");
  const index = Number(indexRaw);
  if (!Number.isFinite(index)) {
    return NextResponse.json({ error: "Missing index" }, { status: 400 });
  }

  const image = form.get("image") as unknown as File | null;
  const overlay = form.get("overlayImage") as unknown as File | null;

  const data = JSON.parse(await fs.readFile(DATA_FILE, "utf8"));
  const service = data.services[index] ?? {};

  async function saveFile(file: File | null) {
    if (!file) return "";
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;
    const filePath = path.join(UPLOADS_DIR, safeName);
    await fs.writeFile(filePath, buffer);
    return `/uploads/${safeName}`;
  }

  const savedImage = await saveFile(image);
  const savedOverlay = await saveFile(overlay);

  data.services[index] = {
    ...service,
    ...(savedImage ? { image: savedImage } : {}),
    ...(savedOverlay ? { overlayImage: savedOverlay } : {}),
  };
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
  return NextResponse.json({ ok: true, service: data.services[index] });
}



