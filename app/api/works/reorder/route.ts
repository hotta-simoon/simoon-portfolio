import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { Work } from "@/types/work";

const DATA_PATH = path.join(process.cwd(), "data/works.json");

export async function POST(req: Request) {
  const { ids } = await req.json() as { ids: number[] };
  if (!Array.isArray(ids)) return NextResponse.json({ error: "ids required" }, { status: 400 });

  const works: Work[] = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
  const map = new Map(works.map((w) => [w.id, w]));
  const reordered = ids.map((id) => map.get(id)).filter(Boolean) as Work[];

  // Append any works not in the ids list at the end (safety)
  works.forEach((w) => { if (!ids.includes(w.id)) reordered.push(w); });

  fs.writeFileSync(DATA_PATH, JSON.stringify(reordered, null, 2));
  return NextResponse.json({ ok: true });
}
