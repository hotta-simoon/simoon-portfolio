"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { Work, WorkCategory } from "@/types/work";
import { CAT_LABELS, ALL_CATS } from "@/types/work";

const EMPTY_FORM = (): Omit<Work, "id"> => ({
  name: "",
  client: "",
  cats: [],
  year: String(new Date().getFullYear()),
  featured: false,
  thumbnail: "",
  url: "",
});

// ── styles ────────────────────────────────────────────────────────────────────

const S = {
  page: {
    minHeight: "100vh",
    background: "var(--bg)",
    color: "var(--text)",
    fontFamily: "var(--font-body)",
    padding: "40px",
  } as React.CSSProperties,

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "40px",
    paddingBottom: "24px",
    borderBottom: "1px solid var(--border)",
  } as React.CSSProperties,

  title: {
    fontFamily: "var(--font-display)",
    fontSize: "48px",
    lineHeight: 1,
    letterSpacing: "-0.01em",
  } as React.CSSProperties,

  addBtn: (active: boolean): React.CSSProperties => ({
    background: active ? "transparent" : "var(--text)",
    color: active ? "var(--text)" : "var(--bg)",
    border: "1px solid var(--text)",
    padding: "12px 24px",
    fontSize: "11px",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    cursor: "pointer",
    fontFamily: "var(--font-body)",
    fontWeight: 500,
    transition: "all 0.2s",
  }),

  form: {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    padding: "32px",
    marginBottom: "40px",
  } as React.CSSProperties,

  formTitle: {
    fontFamily: "var(--font-display)",
    fontSize: "24px",
    marginBottom: "24px",
    letterSpacing: "0.05em",
  } as React.CSSProperties,

  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginBottom: "16px",
  } as React.CSSProperties,

  fieldGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "6px",
  },

  label: {
    fontSize: "10px",
    letterSpacing: "0.25em",
    textTransform: "uppercase" as const,
    color: "var(--muted)",
  },

  input: {
    background: "var(--bg)",
    border: "1px solid var(--border)",
    color: "var(--text)",
    fontFamily: "var(--font-body)",
    fontSize: "14px",
    padding: "10px 12px",
    outline: "none",
    width: "100%",
  } as React.CSSProperties,

  catGrid: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "8px",
    marginBottom: "16px",
  },

  catBtn: (active: boolean): React.CSSProperties => ({
    background: active ? "var(--text)" : "transparent",
    color: active ? "var(--bg)" : "var(--muted)",
    border: `1px solid ${active ? "var(--text)" : "var(--border)"}`,
    padding: "6px 14px",
    fontSize: "10px",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    cursor: "pointer",
    fontFamily: "var(--font-body)",
    transition: "all 0.15s",
  }),

  formActions: {
    display: "flex",
    gap: "12px",
    marginTop: "24px",
    paddingTop: "24px",
    borderTop: "1px solid var(--border)",
  } as React.CSSProperties,

  submitBtn: {
    background: "var(--text)",
    color: "var(--bg)",
    border: "1px solid var(--text)",
    padding: "12px 32px",
    fontSize: "11px",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    cursor: "pointer",
    fontFamily: "var(--font-body)",
    fontWeight: 500,
  },

  cancelBtn: {
    background: "transparent",
    color: "var(--muted)",
    border: "1px solid var(--border)",
    padding: "12px 32px",
    fontSize: "11px",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    cursor: "pointer",
    fontFamily: "var(--font-body)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
  },

  th: {
    fontSize: "10px",
    letterSpacing: "0.25em",
    textTransform: "uppercase" as const,
    color: "var(--muted)",
    textAlign: "left" as const,
    padding: "12px 16px",
    borderBottom: "1px solid var(--border)",
    fontWeight: 400,
  },

  td: {
    padding: "14px 16px",
    borderBottom: "1px solid var(--border)",
    fontSize: "14px",
    verticalAlign: "middle" as const,
  },

  actionBtn: (danger = false): React.CSSProperties => ({
    background: "transparent",
    border: "1px solid var(--border)",
    color: "var(--muted)",
    padding: "5px 12px",
    fontSize: "10px",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    cursor: "pointer",
    fontFamily: "var(--font-body)",
    transition: "all 0.2s",
    marginRight: danger ? 0 : "8px",
  }),
};

// ── ThumbnailField ─────────────────────────────────────────────────────────────

function ThumbnailField({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const uploadFile = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/works/upload", { method: "POST", body: fd });
    const json = await res.json();
    if (json.url) onChange(json.url);
    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) uploadFile(file);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {/* Drop zone + preview */}
      <div
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        style={{
          border: `1px dashed ${dragOver ? "var(--text)" : "var(--border)"}`,
          background: dragOver ? "rgba(240,240,240,0.04)" : "var(--bg)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "120px",
          position: "relative",
          overflow: "hidden",
          transition: "border-color 0.2s",
        }}
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt="thumbnail"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)" }}>
            {uploading ? "UPLOADING..." : "クリックまたはドロップで画像をアップロード"}
          </span>
        )}
        {value && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(12,12,12,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
          >
            <span style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff" }}>
              {uploading ? "UPLOADING..." : "画像を変更"}
            </span>
          </div>
        )}
      </div>

      {/* URL input */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <input
          style={{ ...S.input, flex: 1 }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="または画像URLを直接入力"
        />
        {value && (
          <button
            type="button"
            style={{ ...S.cancelBtn, padding: "10px 16px", whiteSpace: "nowrap" }}
            onClick={() => onChange("")}
          >
            削除
          </button>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) uploadFile(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}

// ── WorkForm ──────────────────────────────────────────────────────────────────

function WorkForm({
  initial,
  onSave,
  onCancel,
  isEdit,
}: {
  initial: Omit<Work, "id">;
  onSave: (data: Omit<Work, "id">) => Promise<void>;
  onCancel: () => void;
  isEdit: boolean;
}) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  const toggleCat = (cat: WorkCategory) => {
    setForm((f) => ({
      ...f,
      cats: f.cats.includes(cat) ? f.cats.filter((c) => c !== cat) : [...f.cats, cat],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <div style={S.form}>
      <h2 style={S.formTitle}>{isEdit ? "EDIT WORK" : "ADD WORK"}</h2>
      <form onSubmit={handleSubmit}>
        <div style={S.grid2}>
          <div style={S.fieldGroup}>
            <label style={S.label}>タイトル *</label>
            <input
              style={S.input}
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="プロジェクト名"
              required
            />
          </div>
          <div style={S.fieldGroup}>
            <label style={S.label}>クライアント名</label>
            <input
              style={S.input}
              value={form.client}
              onChange={(e) => setForm((f) => ({ ...f, client: e.target.value }))}
              placeholder="株式会社〇〇"
            />
          </div>
        </div>

        <div style={{ ...S.grid2, marginBottom: "16px" }}>
          <div style={S.fieldGroup}>
            <label style={S.label}>年</label>
            <input
              style={S.input}
              value={form.year}
              onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
              placeholder="2025"
            />
          </div>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <div style={S.fieldGroup}>
            <label style={S.label}>サムネイル</label>
            <ThumbnailField
              value={form.thumbnail}
              onChange={(url) => setForm((f) => ({ ...f, thumbnail: url }))}
            />
          </div>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <div style={S.fieldGroup}>
            <label style={S.label}>リンク先 URL（クリック時の遷移先）</label>
            <input
              style={S.input}
              value={form.url}
              onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
              placeholder="https://..."
              type="url"
            />
          </div>
        </div>

        <div style={{ marginBottom: "8px" }}>
          <label style={S.label}>カテゴリ</label>
        </div>
        <div style={S.catGrid}>
          {ALL_CATS.map((cat) => (
            <button
              key={cat}
              type="button"
              style={S.catBtn(form.cats.includes(cat))}
              onClick={() => toggleCat(cat)}
            >
              {CAT_LABELS[cat]}
            </button>
          ))}
        </div>

        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
            style={{ width: "16px", height: "16px", accentColor: "var(--text)" }}
          />
          <span style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)" }}>
            Featured（大カード）
          </span>
        </label>

        <div style={S.formActions}>
          <button type="submit" style={S.submitBtn} disabled={saving}>
            {saving ? "SAVING..." : isEdit ? "UPDATE" : "ADD"}
          </button>
          <button type="button" style={S.cancelBtn} onClick={onCancel}>
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
}

// ── DraggableRow ──────────────────────────────────────────────────────────────

function DraggableRow({
  work,
  isDragOver,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onEdit,
  onDelete,
  isEditing,
}: {
  work: Work;
  isDragOver: boolean;
  onDragStart: () => void;
  onDragEnter: () => void;
  onDragEnd: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isEditing: boolean;
}) {
  const [confirming, setConfirming] = useState(false);

  return (
    <tr
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
      style={{
        background: isEditing
          ? "var(--surface)"
          : isDragOver
          ? "rgba(240,240,240,0.04)"
          : "transparent",
        borderTop: isDragOver ? "2px solid var(--text)" : undefined,
        transition: "background 0.15s",
      }}
    >
      {/* Drag handle — draggable はここだけ */}
      <td
        draggable
        onDragStart={onDragStart}
        style={{ ...S.td, width: "32px", color: "var(--border)", fontSize: "18px", userSelect: "none", paddingRight: 0, cursor: "grab" }}
      >
        ⠿
      </td>

      <td style={{ ...S.td, color: "var(--muted)", fontFamily: "var(--font-display)", fontSize: "13px" }}>
        {String(work.id).padStart(2, "0")}
      </td>

      <td style={S.td}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {work.thumbnail && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={work.thumbnail}
              alt=""
              style={{ width: "40px", height: "40px", objectFit: "cover", flexShrink: 0, background: "var(--surface)" }}
            />
          )}
          {work.name}
        </div>
      </td>

      <td style={{ ...S.td, color: "var(--muted)", fontSize: "13px" }}>
        {work.client || <span style={{ color: "var(--border)" }}>—</span>}
      </td>

      <td style={{ ...S.td, color: "var(--muted)", fontSize: "11px", letterSpacing: "0.08em" }}>
        {work.cats.map((c) => CAT_LABELS[c as WorkCategory]).join(", ")}
      </td>

      <td style={{ ...S.td, fontFamily: "var(--font-display)", fontSize: "14px", color: "var(--muted)" }}>
        {work.year}
      </td>

      <td style={{ ...S.td, color: work.featured ? "var(--text)" : "var(--muted)", fontSize: "11px" }}>
        {work.featured ? "★" : "—"}
      </td>

      <td style={{ ...S.td, fontSize: "11px", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {work.url ? (
          <a href={work.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--muted)", textDecoration: "none", letterSpacing: "0.05em" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
          >
            {work.url}
          </a>
        ) : (
          <span style={{ color: "var(--border)" }}>—</span>
        )}
      </td>

      <td style={{ ...S.td, whiteSpace: "nowrap" }}>
        {confirming ? (
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "10px", color: "var(--muted)", letterSpacing: "0.1em", marginRight: "4px" }}>本当に削除？</span>
            <button
              style={{ ...S.actionBtn(true), borderColor: "#ff4444", color: "#ff4444", marginRight: "6px" }}
              onClick={onDelete}
            >
              YES
            </button>
            <button
              style={{ ...S.actionBtn(), marginRight: 0 }}
              onClick={() => setConfirming(false)}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.borderColor = "var(--text)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
            >
              NO
            </button>
          </span>
        ) : (
          <>
            <button
              style={S.actionBtn()}
              onClick={onEdit}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.borderColor = "var(--text)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
            >
              Edit
            </button>
            <button
              style={{ ...S.actionBtn(true), borderColor: "transparent" }}
              onClick={() => setConfirming(true)}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#ff4444"; e.currentTarget.style.borderColor = "#ff4444"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "transparent"; }}
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
}

// ── AdminClient ───────────────────────────────────────────────────────────────

export default function AdminClient() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editTarget, setEditTarget] = useState<Work | null>(null);
  const dragIndex = useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const fetchWorks = useCallback(async () => {
    const res = await fetch("/api/works");
    setWorks(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchWorks(); }, [fetchWorks]);

  const handleAdd = async (data: Omit<Work, "id">) => {
    await fetch("/api/works", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setShowAdd(false);
    fetchWorks();
  };

  const handleUpdate = async (data: Omit<Work, "id">) => {
    if (!editTarget) return;
    await fetch(`/api/works/${editTarget.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setEditTarget(null);
    fetchWorks();
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/works/${id}`, { method: "DELETE" });
    fetchWorks();
  };

  // ── Drag & Drop ────────────────────────────────────────────────────────────

  const handleDragStart = (index: number) => {
    dragIndex.current = index;
  };

  const handleDragEnter = (index: number) => {
    if (dragIndex.current === index) return;
    setDragOverIndex(index);
  };

  const handleDragEnd = async () => {
    const from = dragIndex.current;
    const to = dragOverIndex;
    dragIndex.current = null;
    setDragOverIndex(null);

    if (from === null || to === null || from === to) return;

    const next = [...works];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setWorks(next); // optimistic update

    await fetch("/api/works/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: next.map((w) => w.id) }),
    });
  };

  return (
    <div style={S.page}>
      <div style={S.header}>
        <h1 style={S.title}>WORKS ADMIN</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <a
            href="/"
            style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
          >
            ← サイトに戻る
          </a>
          <button
            style={S.addBtn(showAdd)}
            onClick={() => { setShowAdd((v) => !v); setEditTarget(null); }}
          >
            {showAdd ? "CANCEL" : "+ ADD WORK"}
          </button>
        </div>
      </div>

      {showAdd && !editTarget && (
        <WorkForm initial={EMPTY_FORM()} onSave={handleAdd} onCancel={() => setShowAdd(false)} isEdit={false} />
      )}
      {editTarget && (
        <WorkForm
          initial={{ name: editTarget.name, client: editTarget.client ?? "", cats: editTarget.cats, year: editTarget.year, featured: editTarget.featured, thumbnail: editTarget.thumbnail, url: editTarget.url ?? "" }}
          onSave={handleUpdate}
          onCancel={() => setEditTarget(null)}
          isEdit
        />
      )}

      {loading ? (
        <p style={{ color: "var(--muted)", fontSize: "13px", letterSpacing: "0.1em" }}>Loading...</p>
      ) : (
        <table style={S.table}>
          <thead>
            <tr>
              <th style={{ ...S.th, width: "32px" }} />
              <th style={S.th}>ID</th>
              <th style={S.th}>タイトル</th>
              <th style={S.th}>クライアント</th>
              <th style={S.th}>カテゴリ</th>
              <th style={S.th}>年</th>
              <th style={S.th}>Featured</th>
              <th style={S.th}>URL</th>
              <th style={S.th}>操作</th>
            </tr>
          </thead>
          <tbody>
            {works.map((work, i) => (
              <DraggableRow
                key={work.id}
                work={work}
                isDragOver={dragOverIndex === i}
                isEditing={editTarget?.id === work.id}
                onDragStart={() => handleDragStart(i)}
                onDragEnter={() => handleDragEnter(i)}
                onDragEnd={handleDragEnd}
                onEdit={() => { setEditTarget(work); setShowAdd(false); }}
                onDelete={() => handleDelete(work.id)}
              />
            ))}
          </tbody>
        </table>
      )}

      <p style={{ marginTop: "32px", fontSize: "11px", color: "var(--muted)", letterSpacing: "0.1em" }}>
        {works.length} works — データは data/works.json に保存されます
      </p>
    </div>
  );
}
