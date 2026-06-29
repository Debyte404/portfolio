"use client";

import { useEffect, useMemo, useState } from "react";

const tabs = ["Projects", "Skills", "Certificates", "Typography", "Raw JSON"];

const defaultTypography = {
  heroTitle: 12.5,
  heroSubtitle: 1.45,
  sectionTitle: 8,
  storyTitle: 3.2,
  body: 1,
  projectTitle: 3.4,
  skillTitle: 3.2,
  skillItem: 1,
  certificateTitle: 3.2,
};

const typographyFields = [
  ["heroTitle", "Hero title", 3.5, 16, 0.1],
  ["heroSubtitle", "Hero subtitle", 0.8, 3, 0.05],
  ["sectionTitle", "Section titles", 2, 12, 0.1],
  ["storyTitle", "Story/proof titles", 1.2, 6, 0.1],
  ["body", "Body copy", 0.75, 1.8, 0.05],
  ["projectTitle", "Project titles", 1.4, 6, 0.1],
  ["skillTitle", "Skill headings", 1.2, 6, 0.1],
  ["skillItem", "Skill items", 0.75, 1.8, 0.05],
  ["certificateTitle", "Certificate titles", 1.2, 6, 0.1],
];

const blankProject = {
  title: "New build",
  eyebrow: "Fresh project",
  description: "Describe what this thing does and why it matters.",
  story: "One cinematic sentence about the build.",
  tags: ["Next.js", "Design"],
  image: "",
  imageAlt: "Project preview image",
  imageCrop: { x: 50, y: 50, zoom: 1 },
  href: "https://github.com/Debyte404",
  sourceHref: "",
  accent: "var(--acid)",
};

const blankSkillStack = {
  title: "New Stack",
  subtitle: "A short subheading that explains this group.",
  items: ["Tool one", "Tool two"],
};

const blankCertificate = {
  title: "New proof slot",
  note: "Reserved proof frame",
  image: "",
  imageCrop: { x: 50, y: 50, zoom: 1 },
};

function normalizeContent(content) {
  return {
    ...(content || {}),
    projects: Array.isArray(content?.projects) ? content.projects : [],
    skillStacks: Array.isArray(content?.skillStacks) ? content.skillStacks : [],
    certificates: Array.isArray(content?.certificates) ? content.certificates : [],
    typography: { ...defaultTypography, ...(content?.typography || {}) },
  };
}

function getCrop(crop) {
  return {
    x: Number.isFinite(Number(crop?.x)) ? Number(crop.x) : 50,
    y: Number.isFinite(Number(crop?.y)) ? Number(crop.y) : 50,
    zoom: Number.isFinite(Number(crop?.zoom)) ? Number(crop.zoom) : 1,
  };
}

function csvToList(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function listToCsv(value) {
  return Array.isArray(value) ? value.join(", ") : "";
}

function moveItemInList(list, index, direction) {
  const next = [...list];
  const target = index + direction;
  if (target < 0 || target >= next.length) return next;
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

function cropStyle(crop) {
  const safeCrop = getCrop(crop);
  return {
    objectPosition: `${safeCrop.x}% ${safeCrop.y}%`,
    transform: `scale(${safeCrop.zoom})`,
  };
}

function AdminField({ label, children }) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function FontSizeField({ field, value, onChange }) {
  const [key, label, min, max, step] = field;
  const numeric = Number.isFinite(Number(value)) ? Number(value) : defaultTypography[key];

  return (
    <div className="admin-font-control">
      <AdminField label={`${label} Font Size`}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={numeric}
          onChange={(event) => onChange(key, Number(event.target.value))}
        />
      </AdminField>
      <input
        aria-label={`${label} font size value`}
        type="number"
        min={min}
        max={max}
        step={step}
        value={numeric}
        onChange={(event) => onChange(key, Number(event.target.value))}
      />
      <span>rem</span>
    </div>
  );
}

function TypographyEditor({ typography, onChange }) {
  return (
    <div className="admin-list">
      <div className="admin-section-head">
        <h2>Typography</h2>
        <span>Font Size controls feed the live portfolio CSS variables.</span>
      </div>
      <article className="admin-panel">
        <div className="admin-font-grid">
          {typographyFields.map((field) => (
            <FontSizeField
              key={field[0]}
              field={field}
              value={typography[field[0]]}
              onChange={onChange}
            />
          ))}
        </div>
      </article>
    </div>
  );
}

function ImageEditor({ image, imageCrop, label, onImageChange, onCropChange, onUpload }) {
  const crop = getCrop(imageCrop);
  const [uploading, setUploading] = useState(false);

  const updateCrop = (patch) => {
    onCropChange({ ...crop, ...patch });
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uploadedUrl = await onUpload(file);
    if (uploadedUrl) onImageChange(uploadedUrl);
    event.target.value = "";
    setUploading(false);
  };

  return (
    <div className="admin-image-tools">
      <AdminField label={`${label} Image URL`}>
        <input
          value={image || ""}
          onChange={(event) => onImageChange(event.target.value)}
          placeholder="https://... or /uploads/image.png"
        />
      </AdminField>
      <AdminField label="Upload image">
        <input type="file" accept="image/*" onChange={handleUpload} />
      </AdminField>
      <div className="admin-preview" aria-label={`${label} preview`}>
        {image ? <img src={image} alt="" style={cropStyle(crop)} /> : <span>No image yet</span>}
      </div>
      <div className="admin-crop-grid">
        <AdminField label="Crop X">
          <input
            type="range"
            min="0"
            max="100"
            value={crop.x}
            onChange={(event) => updateCrop({ x: Number(event.target.value) })}
          />
        </AdminField>
        <AdminField label="Crop Y">
          <input
            type="range"
            min="0"
            max="100"
            value={crop.y}
            onChange={(event) => updateCrop({ y: Number(event.target.value) })}
          />
        </AdminField>
        <AdminField label="Zoom">
          <input
            type="range"
            min="1"
            max="2.5"
            step="0.05"
            value={crop.zoom}
            onChange={(event) => updateCrop({ zoom: Number(event.target.value) })}
          />
        </AdminField>
      </div>
      {uploading ? <p className="admin-hint">Uploading image...</p> : null}
    </div>
  );
}

function ProjectEditor({ project, index, onChange, onRemove, onMove, onUpload }) {
  return (
    <article className="admin-panel">
      <div className="admin-panel-head">
        <strong>{String(index + 1).padStart(2, "0")} / {project.title}</strong>
        <div className="admin-actions">
          <button type="button" onClick={() => onMove(index, -1)}>Up</button>
          <button type="button" onClick={() => onMove(index, 1)}>Down</button>
          <button type="button" className="admin-danger" onClick={() => onRemove(index)}>Remove</button>
        </div>
      </div>
      <div className="admin-grid">
        <AdminField label="Title">
          <input value={project.title || ""} onChange={(event) => onChange(index, { title: event.target.value })} />
        </AdminField>
        <AdminField label="Eyebrow">
          <input value={project.eyebrow || ""} onChange={(event) => onChange(index, { eyebrow: event.target.value })} />
        </AdminField>
        <AdminField label="Accent">
          <input value={project.accent || ""} onChange={(event) => onChange(index, { accent: event.target.value })} />
        </AdminField>
        <AdminField label="Open / Source URL">
          <input value={project.href || ""} onChange={(event) => onChange(index, { href: event.target.value })} />
        </AdminField>
        <AdminField label="Optional source URL">
          <input value={project.sourceHref || ""} onChange={(event) => onChange(index, { sourceHref: event.target.value })} />
        </AdminField>
        <AdminField label="Image alt">
          <input value={project.imageAlt || ""} onChange={(event) => onChange(index, { imageAlt: event.target.value })} />
        </AdminField>
      </div>
      <AdminField label="Story">
        <textarea value={project.story || ""} onChange={(event) => onChange(index, { story: event.target.value })} rows={2} />
      </AdminField>
      <AdminField label="Description">
        <textarea value={project.description || ""} onChange={(event) => onChange(index, { description: event.target.value })} rows={4} />
      </AdminField>
      <AdminField label="Tags, comma separated">
        <input value={listToCsv(project.tags)} onChange={(event) => onChange(index, { tags: csvToList(event.target.value) })} />
      </AdminField>
      <ImageEditor
        image={project.image}
        imageCrop={project.imageCrop}
        label="Project"
        onImageChange={(image) => onChange(index, { image })}
        onCropChange={(imageCrop) => onChange(index, { imageCrop })}
        onUpload={onUpload}
      />
    </article>
  );
}

function SkillEditor({ stack, index, onChange, onRemove, onMove }) {
  return (
    <article className="admin-panel">
      <div className="admin-panel-head">
        <strong>{String(index + 1).padStart(2, "0")} / {stack.title}</strong>
        <div className="admin-actions">
          <button type="button" onClick={() => onMove(index, -1)}>Up</button>
          <button type="button" onClick={() => onMove(index, 1)}>Down</button>
          <button type="button" className="admin-danger" onClick={() => onRemove(index)}>Remove</button>
        </div>
      </div>
      <AdminField label="Heading">
        <input value={stack.title || ""} onChange={(event) => onChange(index, { title: event.target.value })} />
      </AdminField>
      <AdminField label="Sub heading">
        <input value={stack.subtitle || ""} onChange={(event) => onChange(index, { subtitle: event.target.value })} />
      </AdminField>
      <AdminField label="Items, comma separated">
        <textarea value={listToCsv(stack.items)} onChange={(event) => onChange(index, { items: csvToList(event.target.value) })} rows={3} />
      </AdminField>
    </article>
  );
}

function CertificateEditor({ certificate, index, onChange, onRemove, onMove, onUpload }) {
  return (
    <article className="admin-panel">
      <div className="admin-panel-head">
        <strong>{String(index + 1).padStart(2, "0")} / {certificate.title}</strong>
        <div className="admin-actions">
          <button type="button" onClick={() => onMove(index, -1)}>Up</button>
          <button type="button" onClick={() => onMove(index, 1)}>Down</button>
          <button type="button" className="admin-danger" onClick={() => onRemove(index)}>Remove</button>
        </div>
      </div>
      <AdminField label="Title">
        <input value={certificate.title || ""} onChange={(event) => onChange(index, { title: event.target.value })} />
      </AdminField>
      <AdminField label="Fallback note">
        <input value={certificate.note || ""} onChange={(event) => onChange(index, { note: event.target.value })} />
      </AdminField>
      <ImageEditor
        image={certificate.image}
        imageCrop={certificate.imageCrop}
        label="Certificate"
        onImageChange={(image) => onChange(index, { image })}
        onCropChange={(imageCrop) => onChange(index, { imageCrop })}
        onUpload={onUpload}
      />
    </article>
  );
}

export default function AdminDashboard({ initialAuthenticated = false, initialContent }) {
  const [authenticated, setAuthenticated] = useState(initialAuthenticated);
  const [activeTab, setActiveTab] = useState("Projects");
  const [passcode, setPasscode] = useState("");
  const [content, setContent] = useState(() => normalizeContent(initialContent));
  const [rawJson, setRawJson] = useState(() => JSON.stringify(normalizeContent(initialContent), null, 2));
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const summary = useMemo(
    () => [
      `${content.projects.length} projects`,
      `${content.skillStacks.length} skill stacks`,
      `${content.certificates.length} proof slots`,
      "typography controls",
    ],
    [content],
  );

  useEffect(() => {
    setRawJson(JSON.stringify(content, null, 2));
  }, [content]);

  const replaceContent = (updater) => {
    setContent((current) => {
      return normalizeContent(typeof updater === "function" ? updater(current) : updater);
    });
  };

  const updateListItem = (section, index, patch) => {
    replaceContent((current) => ({
      ...current,
      [section]: current[section].map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)),
    }));
  };

  const addItem = (section, item) => {
    replaceContent((current) => ({ ...current, [section]: [...current[section], item] }));
  };

  const removeItem = (section, index) => {
    replaceContent((current) => ({ ...current, [section]: current[section].filter((_, itemIndex) => itemIndex !== index) }));
  };

  const moveItem = (section, index, direction) => {
    replaceContent((current) => ({ ...current, [section]: moveItemInList(current[section], index, direction) }));
  };

  const updateTypography = (key, value) => {
    replaceContent((current) => ({
      ...current,
      typography: {
        ...defaultTypography,
        ...current.typography,
        [key]: value,
      },
    }));
  };

  const login = async (event) => {
    event.preventDefault();
    setMessage("Checking passcode...");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passcode }),
    });

    if (!response.ok) {
      setMessage("Passcode rejected.");
      return;
    }

    setAuthenticated(true);
    setPasscode("");
    setMessage("Admin unlocked.");

    const contentResponse = await fetch("/api/admin/content");
    if (contentResponse.ok) {
      const payload = await contentResponse.json();
      replaceContent(payload.content);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setMessage("Admin locked.");
  };

  const saveContent = async () => {
    setSaving(true);
    setMessage("Saving portfolio...");

    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    const payload = await response.json().catch(() => ({}));
    setSaving(false);

    if (!response.ok) {
      setMessage(payload.error || "Save failed.");
      return;
    }

    replaceContent(payload.content);
    setMessage("Portfolio saved.");
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      setMessage(payload.error || "Upload failed.");
      return "";
    }

    setMessage("Image uploaded.");
    return payload.url;
  };

  const applyRawJson = () => {
    try {
      replaceContent(JSON.parse(rawJson));
      setMessage("Raw JSON applied.");
    } catch (error) {
      setMessage(`JSON error: ${error.message}`);
    }
  };

  if (!authenticated) {
    return (
      <main className="admin-page">
        <section className="admin-login">
          <p>Debyte Expo control room</p>
          <h1>Admin passcode</h1>
          <form onSubmit={login}>
            <input
              type="password"
              value={passcode}
              onChange={(event) => setPasscode(event.target.value)}
              placeholder="Enter passcode"
              autoComplete="current-password"
            />
            <button type="submit">Unlock</button>
          </form>
          {message ? <span className="admin-message">{message}</span> : null}
        </section>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <header className="admin-shell admin-header">
        <div>
          <p>Portfolio Manager</p>
          <h1>Debyte Expo admin</h1>
          <span>{summary.join(" / ")}</span>
        </div>
        <div className="admin-actions">
          <a href="/" target="_blank" rel="noreferrer">View site</a>
          <button type="button" onClick={saveContent} disabled={saving}>{saving ? "Saving..." : "Save portfolio"}</button>
          <button type="button" className="admin-danger" onClick={logout}>Lock</button>
        </div>
      </header>

      <section className="admin-shell">
        <div className="admin-tabs" role="tablist" aria-label="Admin sections">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {message ? <p className="admin-message">{message}</p> : null}

        {activeTab === "Projects" ? (
          <div className="admin-list">
            <div className="admin-section-head">
              <h2>Projects</h2>
              <button type="button" onClick={() => addItem("projects", blankProject)}>Add project</button>
            </div>
            {content.projects.map((project, index) => (
              <ProjectEditor
                key={`${project.title}-${index}`}
                project={project}
                index={index}
                onChange={(itemIndex, patch) => updateListItem("projects", itemIndex, patch)}
                onRemove={(itemIndex) => removeItem("projects", itemIndex)}
                onMove={(itemIndex, direction) => moveItem("projects", itemIndex, direction)}
                onUpload={uploadImage}
              />
            ))}
          </div>
        ) : null}

        {activeTab === "Skills" ? (
          <div className="admin-list">
            <div className="admin-section-head">
              <h2>Skills</h2>
              <button type="button" onClick={() => addItem("skillStacks", blankSkillStack)}>Add skill stack</button>
            </div>
            {content.skillStacks.map((stack, index) => (
              <SkillEditor
                key={`${stack.title}-${index}`}
                stack={stack}
                index={index}
                onChange={(itemIndex, patch) => updateListItem("skillStacks", itemIndex, patch)}
                onRemove={(itemIndex) => removeItem("skillStacks", itemIndex)}
                onMove={(itemIndex, direction) => moveItem("skillStacks", itemIndex, direction)}
              />
            ))}
          </div>
        ) : null}

        {activeTab === "Certificates" ? (
          <div className="admin-list">
            <div className="admin-section-head">
              <h2>Certificates</h2>
              <button type="button" onClick={() => addItem("certificates", blankCertificate)}>Add proof slot</button>
            </div>
            {content.certificates.map((certificate, index) => (
              <CertificateEditor
                key={`${certificate.title}-${index}`}
                certificate={certificate}
                index={index}
                onChange={(itemIndex, patch) => updateListItem("certificates", itemIndex, patch)}
                onRemove={(itemIndex) => removeItem("certificates", itemIndex)}
                onMove={(itemIndex, direction) => moveItem("certificates", itemIndex, direction)}
                onUpload={uploadImage}
              />
            ))}
          </div>
        ) : null}

        {activeTab === "Typography" ? (
          <TypographyEditor typography={content.typography} onChange={updateTypography} />
        ) : null}

        {activeTab === "Raw JSON" ? (
          <div className="admin-list">
            <div className="admin-section-head">
              <h2>Raw JSON</h2>
              <button type="button" onClick={applyRawJson}>Apply JSON</button>
            </div>
            <textarea
              className="admin-json"
              value={rawJson}
              onChange={(event) => setRawJson(event.target.value)}
              spellCheck="false"
            />
          </div>
        ) : null}
      </section>
    </main>
  );
}
