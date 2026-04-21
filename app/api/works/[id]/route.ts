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

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const works = readWorks();
  const idx = works.findIndex((w) => w.id === Number(id));
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  works[idx] = { ...works[idx], ...body, id: works[idx].id };
  writeWorks(works);
  return NextResponse.json(works[idx]);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const works = readWorks();
  const filtered = works.filter((w) => w.id !== Number(id));
  if (filtered.length === works.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
  writeWorks(filtered);
  return NextResponse.json({ ok: true });
}
