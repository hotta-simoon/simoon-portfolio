import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { Work } from "@/types/work";

const DATA_PATH = path.join(process.cwd(), "data/works.json");

function readWorks(): Work[] {
  return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
}

function writeWorks(works: Work[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(works, null, 2));
}

export async function GET() {
  return NextResponse.json(readWorks());
}

export async function POST(req: Request) {
  const body = await req.json();
  const works = readWorks();
  const nextId = works.length > 0 ? Math.max(...works.map((w) => w.id)) + 1 : 1;
  const newWork: Work = {
    id: nextId,
    name: body.name ?? "",
    client: body.client ?? "",
    cats: body.cats ?? [],
    year: body.year ?? String(new Date().getFullYear()),
    featured: body.featured ?? false,
    thumbnail: body.thumbnail ?? "",
    url: body.url ?? "",
  };
  works.unshift(newWork);
  writeWorks(works);
  return NextResponse.json(newWork, { status: 201 });
}
