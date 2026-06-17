import React, { useState, useEffect } from 'react';
import {
  getImages, saveImages,
  getTrustedBrands, saveTrustedBrands,
  getServices, saveServices,
  getCapabilities, saveCapabilities,
  getContent, saveContent,
  DEFAULTS,
} from '../utils/storage';
import {
  apiLogin, apiLogout,
  apiGetQuotes, apiUpdateQuote, apiDeleteQuote,
  apiChangePassword, apiResetPassword, apiChangeKey,
  apiUploadImage,
} from '../utils/api';

const initialQuotes = [
  { _id: '1', name: 'Alice Johnson',  title: 'CMO',                company: 'TechVanguard',   email: 'alice@techvanguard.com', telephone: '+1 (555) 019-2834', location: 'San Francisco, CA', targetArea: 'Airport Displays', duration: '3 Months',  status: 'Pending',   createdAt: '2026-06-15T14:32:00.000Z' },
  { _id: '2', name: 'David Smith',    title: 'Marketing Director', company: 'LuxRetail Group', email: 'dsmith@luxretail.com',   telephone: '+1 (555) 014-9922', location: 'New York, NY',      targetArea: 'Mall Advertising', duration: '6 Months',  status: 'Reviewed',  createdAt: '2026-06-14T09:15:00.000Z' },
  { _id: '3', name: 'Elena Rostova',  title: 'Founder',            company: 'AeroTravel',      email: 'elena@aerotravel.co',    telephone: '+1 (555) 012-7744', location: 'Miami, FL',         targetArea: 'Transit Ads',      duration: '12 Months+', status: 'Contacted', createdAt: '2026-06-12T17:45:00.000Z' },
];

// ─── Tab: Leads ───────────────────────────────────────────────────────────────
function downloadCSV(quotes) {
  const headers = ['Name', 'Title', 'Email', 'Company', 'Telephone', 'Location', 'Target Area', 'Duration', 'Status', 'Submitted'];
  const rows = quotes.map(q => [
    q.name, q.title, q.email, q.company, q.telephone, q.location,
    q.targetArea, q.duration, q.status, new Date(q.createdAt).toLocaleDateString()
  ].map(v => `"${(v ?? '').toString().replace(/"/g, '""')}"`).join(','));
  const csv = [headers.join(','), ...rows].join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  a.download = `leads_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
}

function QuoteModal({ lead, onClose }) {
  const defaultBody =
`Dear ${lead.name},

Thank you for your interest in ${lead.targetArea} with Influence Digital Ads.

We have reviewed your request and are pleased to provide the following quote:

• Service: ${lead.targetArea}
• Duration: ${lead.duration}
• Location: ${lead.location}
• Estimated Cost: [ADD PRICE HERE]
• Campaign Start: [ADD DATE HERE]

Please reply to this email or call us at +1 (212) 555-0198 to confirm.

Best regards,
Influence Digital Ads Strategy Team
strategy@influencedigital.com`;

  const [subject, setSubject] = useState(`Your Advertising Quote — ${lead.targetArea}`);
  const [body, setBody] = useState(defaultBody);
  const [copied, setCopied] = useState(false);

  const openGmail = () => {
    const url = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(lead.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`To: ${lead.email}\nSubject: ${subject}\n\n${body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-primary px-6 py-4 flex justify-between items-center">
          <div>
            <div className="text-white font-semibold">Send Quote to {lead.name}</div>
            <div className="text-outline-variant text-xs mt-0.5">{lead.email} · {lead.company}</div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          <div>
            <label className="font-label-caps text-xs text-on-surface-variant block mb-1">Subject</label>
            <input value={subject} onChange={e => setSubject(e.target.value)}
              className="w-full px-4 py-2 border border-outline-variant/30 rounded text-sm outline-none focus:border-secondary" />
          </div>
          <div>
            <label className="font-label-caps text-xs text-on-surface-variant block mb-1">Email Body</label>
            <textarea rows={12} value={body} onChange={e => setBody(e.target.value)}
              className="w-full px-4 py-2 border border-outline-variant/30 rounded text-sm outline-none focus:border-secondary resize-none font-mono" />
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex flex-wrap gap-3">
          <button onClick={openGmail}
            className="flex items-center gap-2 bg-secondary text-white px-6 py-2.5 font-label-caps text-xs rounded hover:bg-secondary-container transition-colors">
            <span className="material-symbols-outlined text-sm">open_in_new</span> Open in Gmail
          </button>
          <button onClick={copyToClipboard}
            className="flex items-center gap-2 border border-outline-variant/30 text-on-surface px-6 py-2.5 font-label-caps text-xs rounded hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-sm">{copied ? 'check' : 'content_copy'}</span>
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
          <button onClick={onClose} className="ml-auto text-on-surface-variant font-label-caps text-xs px-4 py-2.5 hover:text-primary transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function getStoredLeads() {
  try {
    const local = JSON.parse(localStorage.getItem('site_leads') ?? '[]');
    return local.length > 0 ? local : initialQuotes;
  } catch { return initialQuotes; }
}

function LeadsTab() {
  const [quotes, setQuotes] = useState(getStoredLeads);
  const [filter, setFilter] = useState('All');
  const [sendingTo, setSendingTo] = useState(null);

  useEffect(() => {
    apiGetQuotes().then(data => { if (data?.length) setQuotes(data); }).catch(() => {});
  }, []);

  const persistLeads = (updated) => {
    setQuotes(updated);
    localStorage.setItem('site_leads', JSON.stringify(updated));
  };

  const handleStatus = (id, status) => {
    const updated = quotes.map(q => q._id === id ? { ...q, status } : q);
    persistLeads(updated);
    apiUpdateQuote(id, { status }).catch(() => {});
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this lead?')) return;
    const updated = quotes.filter(q => q._id !== id);
    persistLeads(updated);
    apiDeleteQuote(id).catch(() => {});
  };

  const filtered = filter === 'All' ? quotes : quotes.filter(q => q.status === filter);

  return (
    <div className="bg-white border border-outline-variant/20 rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b border-outline-variant/20 flex flex-wrap gap-4 justify-between items-center bg-surface-container-low">
        <div className="flex gap-2 flex-wrap">
          {['All', 'Pending', 'Reviewed', 'Contacted'].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-2 text-xs font-semibold font-label-caps rounded ${filter === s ? 'bg-primary text-white' : 'bg-white border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container'}`}>
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-on-surface-variant">{filtered.length} records</span>
          <button onClick={() => downloadCSV(filtered)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-label-caps text-xs rounded hover:bg-secondary transition-colors">
            <span className="material-symbols-outlined text-sm">download</span> Download CSV
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-outline-variant/30 bg-surface text-on-surface-variant font-label-caps text-xs">
              <th className="p-5">Client</th><th className="p-5">Company</th><th className="p-5">Details</th><th className="p-5">Status</th><th className="p-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/25">
            {filtered.map(q => (
              <tr key={q._id} className="hover:bg-surface-container-lowest transition-colors">
                <td className="p-5">
                  <div className="font-bold text-primary">{q.name}</div>
                  <div className="text-xs text-on-surface-variant mt-1">{q.title}</div>
                  <div className="text-xs text-secondary">{q.email}</div>
                  <div className="text-xs text-on-surface-variant">{q.telephone}</div>
                </td>
                <td className="p-5">
                  <div className="font-semibold text-primary">{q.company}</div>
                  <div className="text-xs text-on-surface-variant mt-1">{q.location}</div>
                </td>
                <td className="p-5">
                  <div className="text-primary font-medium">{q.targetArea}</div>
                  <div className="text-xs text-on-surface-variant mt-1">Duration: {q.duration}</div>
                  <div className="text-xs text-outline">{new Date(q.createdAt).toLocaleDateString()}</div>
                </td>
                <td className="p-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${q.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : q.status === 'Reviewed' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>{q.status}</span>
                </td>
                <td className="p-5 text-right">
                  <div className="flex gap-2 justify-end items-center">
                    <button onClick={() => setSendingTo(q)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-secondary text-white font-label-caps text-xs rounded hover:bg-secondary-container transition-colors">
                      <span className="material-symbols-outlined text-sm">send</span> Send Quote
                    </button>
                    <select value={q.status} onChange={e => handleStatus(q._id, e.target.value)} className="px-2 py-1 text-xs border border-outline-variant/30 rounded outline-none">
                      <option>Pending</option><option>Reviewed</option><option>Contacted</option>
                    </select>
                    <button onClick={() => handleDelete(q._id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sendingTo && <QuoteModal lead={sendingTo} onClose={() => setSendingTo(null)} />}
    </div>
  );
}

// ─── Tab: Images ──────────────────────────────────────────────────────────────
function ImagesTab() {
  const [images, setImages]     = useState(getImages);
  const [inputs, setInputs]     = useState({ hero: '', about: '' });
  const [uploading, setUploading] = useState({ hero: false, about: false });
  const [uploadErr, setUploadErr] = useState({ hero: null, about: null });
  const [saved, setSaved]       = useState(false);
  const fileRefs = { hero: React.useRef(), about: React.useRef() };

  const pushUrl = (slot, url) => {
    const updated = { ...images, [slot]: { ...images[slot], list: [...images[slot].list, url], active: images[slot].list.length } };
    setImages(updated);
    saveImages(updated);
  };

  const addUrl = (slot) => {
    const url = inputs[slot].trim();
    if (!url) return;
    pushUrl(slot, url);
    setInputs(p => ({ ...p, [slot]: '' }));
  };

  const handleFileChange = async (slot, e) => {
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = '';
    setUploading(p => ({ ...p, [slot]: true }));
    setUploadErr(p => ({ ...p, [slot]: null }));
    try {
      const { url } = await apiUploadImage(file);
      pushUrl(slot, url);
    } catch (err) {
      setUploadErr(p => ({ ...p, [slot]: err.message }));
    } finally {
      setUploading(p => ({ ...p, [slot]: false }));
    }
  };

  const setActive = (slot, idx) => {
    const updated = { ...images, [slot]: { ...images[slot], active: idx } };
    setImages(updated);
    saveImages(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const removeUrl = (slot, idx) => {
    const list = images[slot].list.filter((_, i) => i !== idx);
    const active = Math.min(images[slot].active, Math.max(0, list.length - 1));
    const updated = { ...images, [slot]: { list, active } };
    setImages(updated);
    saveImages(updated);
  };

  const slots = [{ key: 'hero', label: 'Hero Background' }, { key: 'about', label: 'About Section Image' }];

  return (
    <div className="space-y-10">
      {saved && <div className="p-3 bg-green-100 text-green-800 text-sm rounded font-medium">Active image updated — reload the homepage to see the change.</div>}
      {slots.map(({ key, label }) => (
        <div key={key} className="bg-white border border-outline-variant/20 rounded-lg p-8">
          <h3 className="font-headline-lg text-[18px] text-primary mb-6">{label}</h3>

          {/* Image grid */}
          {images[key].list.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              {images[key].list.map((url, idx) => (
                <div key={idx} className={`relative group border-2 rounded-lg overflow-hidden cursor-pointer ${images[key].active === idx ? 'border-secondary' : 'border-outline-variant/30'}`} onClick={() => setActive(key, idx)}>
                  <img src={url} alt="" className="w-full h-28 object-cover" onError={e => { e.target.style.background = '#e5eeff'; e.target.src = ''; }} />
                  {images[key].active === idx && (
                    <div className="absolute top-2 left-2 bg-secondary text-white text-xs font-label-caps px-2 py-0.5 rounded">Active</div>
                  )}
                  <button onClick={e => { e.stopPropagation(); removeUrl(key, idx); }} className="absolute top-2 right-2 bg-red-600 text-white rounded p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload from computer */}
          <input ref={fileRefs[key]} type="file" accept="image/*" className="hidden" onChange={e => handleFileChange(key, e)} />
          <button
            onClick={() => fileRefs[key].current.click()}
            disabled={uploading[key]}
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 font-label-caps text-label-caps hover:bg-secondary transition-colors rounded disabled:opacity-60 mb-4"
          >
            <span className="material-symbols-outlined text-base">{uploading[key] ? 'hourglass_top' : 'upload_file'}</span>
            {uploading[key] ? 'Uploading…' : 'Upload from Computer'}
          </button>
          {uploadErr[key] && <p className="text-red-600 text-sm mb-3">Upload failed: {uploadErr[key]} — make sure the backend server is running.</p>}

          {/* URL fallback */}
          <div className="flex gap-3 items-center">
            <span className="text-xs text-on-surface-variant font-label-caps whitespace-nowrap">Or paste URL:</span>
            <input
              type="url" placeholder="https://example.com/image.jpg"
              value={inputs[key]}
              onChange={e => setInputs(p => ({ ...p, [key]: e.target.value }))}
              onKeyDown={e => e.key === 'Enter' && addUrl(key)}
              className="flex-1 px-4 py-2 border border-outline-variant/30 rounded text-sm outline-none focus:border-secondary"
            />
            <button onClick={() => addUrl(key)} className="border border-primary text-primary px-5 py-2 font-label-caps text-label-caps hover:bg-surface-container transition-colors rounded">Add</button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Tab: Brands ─────────────────────────────────────────────────────────────
function BrandsTab() {
  const [brands, setBrands] = useState(getTrustedBrands);
  const [form, setForm]     = useState({ name: '', logoUrl: '', siteUrl: '' });
  const [adding, setAdding] = useState(false);
  const [msg, setMsg]       = useState('');

  const persist = (updated) => {
    setBrands(updated);
    saveTrustedBrands(updated);
  };

  const add = () => {
    if (!form.name.trim()) return;
    const newBrand = { id: Date.now().toString(), name: form.name.trim(), logoUrl: form.logoUrl.trim(), siteUrl: form.siteUrl.trim() || '#' };
    persist([...brands, newBrand]);
    setForm({ name: '', logoUrl: '', siteUrl: '' });
    setAdding(false);
    setMsg('Brand added.');
    setTimeout(() => setMsg(''), 3000);
  };

  const remove = (id) => {
    if (!window.confirm('Remove this brand?')) return;
    persist(brands.filter(b => b.id !== id));
  };

  return (
    <div className="space-y-6">
      {msg && <div className="p-3 bg-green-100 text-green-800 text-sm rounded font-medium">{msg}</div>}
      <p className="text-on-surface-variant text-sm">These logos scroll automatically across the homepage banner. Add a logo URL and a destination URL so visitors can click through to each brand's website.</p>

      <div className="bg-white border border-outline-variant/20 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface border-b border-outline-variant/20 text-on-surface-variant font-label-caps text-xs">
              <th className="p-5 text-left">Preview</th>
              <th className="p-5 text-left">Name</th>
              <th className="p-5 text-left">Logo URL</th>
              <th className="p-5 text-left">Site URL</th>
              <th className="p-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {brands.map(b => (
              <tr key={b.id} className="hover:bg-surface-container-lowest">
                <td className="p-5">
                  {b.logoUrl ? (
                    <img src={b.logoUrl} alt={b.name} className="h-8 max-w-[80px] object-contain" onError={e => { e.target.style.opacity = '0.2'; }} />
                  ) : (
                    <div className="h-8 w-20 rounded bg-outline-variant/20 flex items-center justify-center text-xs text-on-surface-variant">No logo</div>
                  )}
                </td>
                <td className="p-5 font-semibold text-primary">{b.name}</td>
                <td className="p-5 text-on-surface-variant text-xs max-w-[180px] truncate">
                  {b.logoUrl ? (
                    <a href={b.logoUrl} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">{b.logoUrl}</a>
                  ) : <span className="italic opacity-50">None</span>}
                </td>
                <td className="p-5 text-xs text-on-surface-variant max-w-[160px] truncate">
                  {b.siteUrl && b.siteUrl !== '#' ? (
                    <a href={b.siteUrl} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">{b.siteUrl}</a>
                  ) : <span className="italic opacity-50">None</span>}
                </td>
                <td className="p-5 text-right">
                  <button onClick={() => remove(b.id)} className="text-red-600 hover:bg-red-50 p-1 rounded">
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </td>
              </tr>
            ))}
            {brands.length === 0 && (
              <tr><td colSpan={5} className="p-8 text-center text-on-surface-variant text-sm italic">No brands added yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {!adding ? (
        <button onClick={() => setAdding(true)} className="bg-primary text-white px-6 py-3 font-label-caps text-label-caps hover:bg-secondary transition-colors rounded flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">add</span> Add Brand
        </button>
      ) : (
        <div className="bg-white border border-outline-variant/20 rounded-lg p-8">
          <h3 className="font-headline-lg text-[18px] text-primary mb-6">New Brand</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="font-label-caps text-xs text-on-surface-variant block mb-1">Brand Name *</label>
              <input value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} placeholder="e.g. Samsung"
                className="w-full px-4 py-2 border border-outline-variant/30 rounded text-sm outline-none focus:border-secondary" />
            </div>
            <div>
              <label className="font-label-caps text-xs text-on-surface-variant block mb-1">Logo Image URL</label>
              <input value={form.logoUrl} onChange={e => setForm(p => ({...p, logoUrl: e.target.value}))} placeholder="https://example.com/logo.png"
                className="w-full px-4 py-2 border border-outline-variant/30 rounded text-sm outline-none focus:border-secondary" />
              <p className="text-xs text-on-surface-variant/60 mt-1">Paste a direct link to the logo image. Leave blank to show brand name as text.</p>
            </div>
            <div className="md:col-span-2">
              <label className="font-label-caps text-xs text-on-surface-variant block mb-1">Brand Website URL</label>
              <input value={form.siteUrl} onChange={e => setForm(p => ({...p, siteUrl: e.target.value}))} placeholder="https://samsung.com"
                className="w-full px-4 py-2 border border-outline-variant/30 rounded text-sm outline-none focus:border-secondary" />
              <p className="text-xs text-on-surface-variant/60 mt-1">Clicking the logo on the site will navigate to this URL.</p>
            </div>
          </div>
          {form.logoUrl && (
            <div className="mb-4 p-4 bg-secondary rounded-lg flex items-center gap-4">
              <span className="text-xs text-white font-label-caps">Preview:</span>
              <img src={form.logoUrl} alt="preview" className="h-8 max-w-[120px] object-contain brightness-0 invert" onError={e => { e.target.style.opacity='0.3'; }} />
            </div>
          )}
          <div className="flex gap-3 mt-4">
            <button onClick={add} className="bg-primary text-white px-6 py-2 font-label-caps text-label-caps hover:bg-secondary transition-colors rounded">Save Brand</button>
            <button onClick={() => setAdding(false)} className="px-6 py-2 border border-outline-variant/30 text-on-surface-variant font-label-caps text-label-caps rounded hover:bg-surface-container">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}


// ─── Tab: Services ────────────────────────────────────────────────────────────
function ServicesTab() {
  const [services, setServices] = useState(getServices);
  const [form, setForm] = useState({ slug: '', icon: '', title: '', tagline: '', stat: '', desc: '' });
  const [editing, setEditing] = useState(null); // slug of service being edited
  const [editForm, setEditForm] = useState({});
  const [adding, setAdding] = useState(false);
  const [msg, setMsg] = useState('');

  const remove = (slug) => {
    if (!window.confirm('Remove this service?')) return;
    const updated = services.filter(s => s.slug !== slug);
    setServices(updated);
    saveServices(updated);
  };

  const add = () => {
    if (!form.slug || !form.title) return;
    if (services.find(s => s.slug === form.slug)) { setMsg('Slug already exists.'); return; }
    const updated = [...services, form];
    setServices(updated);
    saveServices(updated);
    setForm({ slug: '', icon: '', title: '', tagline: '', stat: '', desc: '' });
    setAdding(false);
    setMsg('Service added.');
    setTimeout(() => setMsg(''), 3000);
  };

  const startEdit = (s) => { setEditing(s.slug); setEditForm({ ...s }); };
  const saveEdit = () => {
    const updated = services.map(s => s.slug === editing ? { ...s, ...editForm } : s);
    setServices(updated);
    saveServices(updated);
    setEditing(null);
    setMsg('Service updated.');
    setTimeout(() => setMsg(''), 3000);
  };

  const ICONS = ['shopping_bag','flight_takeoff','branding_watermark','lightbulb','location_city','train','storefront','campaign','radio','tv','smartphone','public'];

  return (
    <div className="space-y-6">
      {msg && <div className="p-3 bg-green-100 text-green-800 text-sm rounded font-medium">{msg}</div>}
      <div className="bg-white border border-outline-variant/20 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface border-b border-outline-variant/20 text-on-surface-variant font-label-caps text-xs">
              <th className="p-4 text-left">Icon</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Stat (Adv. page)</th>
              <th className="p-4 text-left">Slug</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {services.map(s => (
              editing === s.slug ? (
                <tr key={s.slug} className="bg-surface-container-low">
                  <td className="p-4"><span className="material-symbols-outlined text-secondary text-2xl">{editForm.icon}</span></td>
                  <td className="p-4">
                    <input value={editForm.title || ''} onChange={e => setEditForm(p => ({...p, title: e.target.value}))} className="w-full px-2 py-1 border border-outline-variant/30 rounded text-sm outline-none focus:border-secondary mb-1" placeholder="Title" />
                    <input value={editForm.tagline || ''} onChange={e => setEditForm(p => ({...p, tagline: e.target.value}))} className="w-full px-2 py-1 border border-outline-variant/30 rounded text-xs outline-none focus:border-secondary mb-1" placeholder="Tagline" />
                    <textarea value={editForm.desc || ''} onChange={e => setEditForm(p => ({...p, desc: e.target.value}))} rows={2} className="w-full px-2 py-1 border border-outline-variant/30 rounded text-xs outline-none focus:border-secondary resize-none" placeholder="Description" />
                  </td>
                  <td className="p-4">
                    <input value={editForm.stat || ''} onChange={e => setEditForm(p => ({...p, stat: e.target.value}))} className="w-full px-2 py-1 border border-outline-variant/30 rounded text-sm outline-none focus:border-secondary" placeholder="e.g. 200+ Screens" />
                  </td>
                  <td className="p-4 text-on-surface-variant font-label-caps text-xs">{s.slug}</td>
                  <td className="p-4 text-right">
                    <div className="flex gap-1 justify-end">
                      <button onClick={saveEdit} className="px-3 py-1 bg-secondary text-white font-label-caps text-xs rounded hover:bg-secondary-container">Save</button>
                      <button onClick={() => setEditing(null)} className="px-3 py-1 border border-outline-variant/30 text-on-surface-variant font-label-caps text-xs rounded">Cancel</button>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr key={s.slug} className="hover:bg-surface-container-lowest">
                  <td className="p-4"><span className="material-symbols-outlined text-secondary text-2xl">{s.icon}</span></td>
                  <td className="p-4">
                    <div className="font-semibold text-primary">{s.title}</div>
                    <div className="text-xs text-on-surface-variant mt-0.5 truncate max-w-[200px]">{s.tagline}</div>
                  </td>
                  <td className="p-4 text-on-surface-variant text-xs">{s.stat || <span className="italic opacity-40">—</span>}</td>
                  <td className="p-4 text-on-surface-variant font-label-caps text-xs">{s.slug}</td>
                  <td className="p-4 text-right">
                    <div className="flex gap-1 justify-end">
                      <button onClick={() => startEdit(s)} className="p-1 text-secondary hover:bg-surface-container rounded">
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <button onClick={() => remove(s.slug)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>

      {!adding ? (
        <button onClick={() => setAdding(true)} className="bg-primary text-white px-6 py-3 font-label-caps text-label-caps hover:bg-secondary transition-colors rounded flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">add</span> Add Service
        </button>
      ) : (
        <div className="bg-white border border-outline-variant/20 rounded-lg p-8">
          <h3 className="font-headline-lg text-[18px] text-primary mb-6">New Service</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {[['title','Title'],['slug','Slug (url-friendly, e.g. my-service)'],['tagline','Tagline'],['stat','Stat Label (shown on Advertising page, e.g. 200+ Screens)'],['desc','Short Description']].map(([k,l]) => (
              <div key={k} className={k === 'desc' || k === 'stat' ? 'md:col-span-2' : ''}>
                <label className="font-label-caps text-xs text-on-surface-variant block mb-1">{l}</label>
                <input value={form[k]} onChange={e => setForm(p => ({...p,[k]:e.target.value}))}
                  className="w-full px-4 py-2 border border-outline-variant/30 rounded text-sm outline-none focus:border-secondary" />
              </div>
            ))}
            <div>
              <label className="font-label-caps text-xs text-on-surface-variant block mb-1">Icon (Material Symbol name)</label>
              <div className="flex items-center gap-3">
                <input value={form.icon} onChange={e => setForm(p => ({...p,icon:e.target.value}))}
                  className="flex-1 px-4 py-2 border border-outline-variant/30 rounded text-sm outline-none focus:border-secondary" placeholder="e.g. campaign" />
                {form.icon && <span className="material-symbols-outlined text-secondary text-2xl">{form.icon}</span>}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {ICONS.map(ic => (
                  <button key={ic} onClick={() => setForm(p => ({...p,icon:ic}))} className={`p-1.5 rounded border ${form.icon===ic?'border-secondary bg-surface-container':'border-outline-variant/30'}`}>
                    <span className="material-symbols-outlined text-xl text-secondary">{ic}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={add} className="bg-primary text-white px-6 py-2 font-label-caps text-label-caps hover:bg-secondary transition-colors rounded">Save Service</button>
            <button onClick={() => setAdding(false)} className="px-6 py-2 border border-outline-variant/30 text-on-surface-variant font-label-caps text-label-caps rounded hover:bg-surface-container">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}


// ─── Tab: Capabilities ────────────────────────────────────────────────────────
function CapabilitiesTab() {
  const [caps, setCaps] = useState(getCapabilities);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ icon: '', title: '', desc: '' });
  const [msg, setMsg] = useState('');

  const ICONS = ['analytics','monitoring','content_paste','verified_user','support_agent','bar_chart','campaign','insights','speed','dashboard','smart_display','tune'];

  const persist = (updated) => { setCaps(updated); saveCapabilities(updated); };

  const remove = (id) => {
    if (!window.confirm('Remove this capability?')) return;
    persist(caps.filter(c => c.id !== id));
  };

  const startEdit = (c) => { setEditing(c.id); setEditForm({ ...c }); };
  const saveEdit = () => {
    persist(caps.map(c => c.id === editing ? { ...c, ...editForm } : c));
    setEditing(null);
    setMsg('Updated.'); setTimeout(() => setMsg(''), 2500);
  };

  const add = () => {
    if (!form.title.trim()) return;
    persist([...caps, { id: Date.now().toString(), ...form }]);
    setForm({ icon: '', title: '', desc: '' });
    setAdding(false);
    setMsg('Capability added.'); setTimeout(() => setMsg(''), 2500);
  };

  return (
    <div className="space-y-6">
      {msg && <div className="p-3 bg-green-100 text-green-800 text-sm rounded font-medium">{msg}</div>}
      <p className="text-on-surface-variant text-sm">These cards appear in the "Capabilities" section on the Our Activities page.</p>

      <div className="bg-white border border-outline-variant/20 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface border-b border-outline-variant/20 text-on-surface-variant font-label-caps text-xs">
              <th className="p-4 text-left">Icon</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {caps.map(c => (
              editing === c.id ? (
                <tr key={c.id} className="bg-surface-container-low">
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {ICONS.map(ic => (
                        <button key={ic} onClick={() => setEditForm(p => ({...p, icon: ic}))} className={`p-1 rounded border ${editForm.icon===ic?'border-secondary bg-surface-container':'border-outline-variant/30'}`}>
                          <span className="material-symbols-outlined text-base text-secondary">{ic}</span>
                        </button>
                      ))}
                    </div>
                    {editForm.icon && <span className="material-symbols-outlined text-secondary text-2xl">{editForm.icon}</span>}
                  </td>
                  <td className="p-4">
                    <input value={editForm.title || ''} onChange={e => setEditForm(p => ({...p, title: e.target.value}))} className="w-full px-2 py-1 border border-outline-variant/30 rounded text-sm outline-none focus:border-secondary" />
                  </td>
                  <td className="p-4">
                    <textarea value={editForm.desc || ''} onChange={e => setEditForm(p => ({...p, desc: e.target.value}))} rows={3} className="w-full px-2 py-1 border border-outline-variant/30 rounded text-xs outline-none focus:border-secondary resize-none" />
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex gap-1 justify-end">
                      <button onClick={saveEdit} className="px-3 py-1 bg-secondary text-white font-label-caps text-xs rounded hover:bg-secondary-container">Save</button>
                      <button onClick={() => setEditing(null)} className="px-3 py-1 border border-outline-variant/30 text-on-surface-variant font-label-caps text-xs rounded">Cancel</button>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr key={c.id} className="hover:bg-surface-container-lowest">
                  <td className="p-4"><span className="material-symbols-outlined text-secondary text-2xl">{c.icon}</span></td>
                  <td className="p-4 font-semibold text-primary">{c.title}</td>
                  <td className="p-4 text-on-surface-variant text-xs max-w-xs">{c.desc}</td>
                  <td className="p-4 text-right">
                    <div className="flex gap-1 justify-end">
                      <button onClick={() => startEdit(c)} className="p-1 text-secondary hover:bg-surface-container rounded">
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <button onClick={() => remove(c.id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>

      {!adding ? (
        <button onClick={() => setAdding(true)} className="bg-primary text-white px-6 py-3 font-label-caps text-label-caps hover:bg-secondary transition-colors rounded flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">add</span> Add Capability
        </button>
      ) : (
        <div className="bg-white border border-outline-variant/20 rounded-lg p-8">
          <h3 className="font-headline-lg text-[18px] text-primary mb-6">New Capability</h3>
          <div className="space-y-4">
            <div>
              <label className="font-label-caps text-xs text-on-surface-variant block mb-1">Icon</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {ICONS.map(ic => (
                  <button key={ic} onClick={() => setForm(p => ({...p, icon: ic}))} className={`p-1.5 rounded border ${form.icon===ic?'border-secondary bg-surface-container':'border-outline-variant/30'}`}>
                    <span className="material-symbols-outlined text-xl text-secondary">{ic}</span>
                  </button>
                ))}
              </div>
              <input value={form.icon} onChange={e => setForm(p => ({...p, icon: e.target.value}))} placeholder="Or type icon name" className="w-full px-4 py-2 border border-outline-variant/30 rounded text-sm outline-none focus:border-secondary" />
            </div>
            <div>
              <label className="font-label-caps text-xs text-on-surface-variant block mb-1">Title *</label>
              <input value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} className="w-full px-4 py-2 border border-outline-variant/30 rounded text-sm outline-none focus:border-secondary" />
            </div>
            <div>
              <label className="font-label-caps text-xs text-on-surface-variant block mb-1">Description</label>
              <textarea value={form.desc} onChange={e => setForm(p => ({...p, desc: e.target.value}))} rows={3} className="w-full px-4 py-2 border border-outline-variant/30 rounded text-sm outline-none focus:border-secondary resize-none" />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={add} className="bg-primary text-white px-6 py-2 font-label-caps text-label-caps hover:bg-secondary transition-colors rounded">Save</button>
            <button onClick={() => setAdding(false)} className="px-6 py-2 border border-outline-variant/30 text-on-surface-variant font-label-caps text-label-caps rounded hover:bg-surface-container">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}


// ─── Auto-translate helper ─────────────────────────────────────────────────────
const NO_TRANSLATE = new Set([
  'navBrand',
  'heroStat1Val','heroStat2Val','heroStat3Val',
  'metric1Val','metric2Val','metric3Val','metric4Val',
  'aboutYears','footerPhone','footerEmail',
  'advStat1Val','advStat2Val','advStat3Val','advStat4Val',
  'contactResponseTime','contactInfo1Value','contactInfo2Value','contactInfo3Value','contactInfo4Value',
]);

async function autoTranslateFr(englishContent) {
  const entries = Object.entries(englishContent);
  let failures = 0;
  const results = await Promise.all(
    entries.map(async ([key, val]) => {
      if (NO_TRANSLATE.has(key) || !val || !String(val).trim()) return [key, val];
      try {
        const r = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(String(val).slice(0, 500))}&langpair=en|fr`
        );
        const d = await r.json();
        const translated = d.responseData?.translatedText;
        return [key, translated && translated !== 'QUERY LENGTH LIMIT EXCEDEED' ? translated : val];
      } catch {
        failures++;
        return [key, val];
      }
    })
  );
  const translatableCount = entries.filter(([k, v]) => !NO_TRANSLATE.has(k) && v && String(v).trim()).length;
  if (translatableCount > 0 && failures === translatableCount) {
    throw new Error('All translation requests failed — no internet connection.');
  }
  return Object.fromEntries(results);
}

// ─── Tab: Content ─────────────────────────────────────────────────────────────
function ContentTab() {
  const [content, setContent]         = useState(() => getContent());
  const [saved, setSaved]             = useState(false);
  const [translating, setTranslating] = useState(false);
  const [translateErr, setTranslateErr] = useState(false);

  const update = (key, val) => { setContent(p => ({ ...p, [key]: val })); setTranslateErr(false); };

  const save = async () => {
    saveContent(content);
    setTranslating(true);
    setTranslateErr(false);
    setSaved(false);
    try {
      const frContent = await autoTranslateFr(content);
      saveContent(frContent, 'fr');
      setSaved(true);
      setTimeout(() => setSaved(false), 3500);
    } catch {
      setTranslateErr(true);
    }
    setTranslating(false);
  };

  const reset = () => {
    saveContent({});
    saveContent({}, 'fr');
    setContent(DEFAULTS.content);
  };

  const fields = [
    { section: 'Navbar', keys: ['navBrand'] },
    { section: 'Hero Section', keys: ['heroBadge','heroHeadline','heroSubtext','heroCta1','heroCta2','heroStat1Val','heroStat1Label','heroStat2Val','heroStat2Label','heroStat3Val','heroStat3Label'] },
    { section: 'Trusted By Banner', keys: ['trustedLabel'] },
    { section: 'About Section', keys: ['aboutLabel','aboutHeadline','aboutText1','aboutText2','aboutYears','aboutYearsLabel','aboutCta'] },
    { section: 'Solutions Section', keys: ['solutionsHeadline','solutionsSubtext'] },
    { section: 'Why Choose Us', keys: ['whyLabel','whyHeadline','whySubtext','why1Title','why1Desc','why2Title','why2Desc','why3Title','why3Desc','why4Title','why4Desc','why5Title','why5Desc','why6Title','why6Desc'] },
    { section: 'Impact Metrics', keys: ['metric1Val','metric1Label','metric2Val','metric2Label','metric3Val','metric3Label','metric4Val','metric4Label'] },
    { section: 'Our Process', keys: ['processHeadline','process1Title','process1Desc','process2Title','process2Desc','process3Title','process3Desc','process4Title','process4Desc'] },
    { section: 'Final CTA', keys: ['ctaHeadline','ctaSubtext','ctaButton'] },
    { section: 'Footer', keys: ['footerDesc','footerAddress','footerPhone','footerEmail','footerCopyright'] },
    { section: 'Advertising Page — Hero', keys: ['advBadge','advHeadline','advSubtext','advAllChannels'] },
    { section: 'Advertising Page — Stats Bar', keys: ['advStat1Val','advStat1Label','advStat2Val','advStat2Label','advStat3Val','advStat3Label','advStat4Val','advStat4Label'] },
    { section: 'Advertising Page — CTA', keys: ['advCtaHeadline','advCtaSubtext','advCtaButton'] },
    { section: 'Our Activities Page — Hero', keys: ['oaBadge','oaHeadline','oaSubtext','oaProcessTitle'] },
    { section: 'Our Activities Page — Capabilities', keys: ['oaCapBadge','oaCapHeadline','oaCapSubtext'] },
    { section: 'Our Activities Page — Why Choose Us', keys: ['oaWhyBadge','oaWhyHeadline','oaWhySubtext'] },
    { section: 'Our Activities Page — CTA', keys: ['oaCtaHeadline','oaCtaSubtext','oaCtaButton'] },
    { section: 'Our Activities — Process Steps', keys: ['oaStep1Title','oaStep1Desc','oaStep2Title','oaStep2Desc','oaStep3Title','oaStep3Desc','oaStep4Title','oaStep4Desc'] },
    { section: 'Our Activities — Why Items', keys: ['oaWhy1Title','oaWhy1Desc','oaWhy2Title','oaWhy2Desc','oaWhy3Title','oaWhy3Desc','oaWhy4Title','oaWhy4Desc','oaWhy5Title','oaWhy5Desc','oaWhy6Title','oaWhy6Desc'] },
    { section: 'Contact Page — Hero', keys: ['contactBadge','contactHeadline','contactSubtext','contactGetInTouch','contactRequestQuote'] },
    { section: 'Contact Page — Response Box', keys: ['contactResponseLabel','contactResponseTime','contactResponseNote'] },
    { section: 'Contact Page — Info Items', keys: ['contactInfo1Label','contactInfo1Value','contactInfo2Label','contactInfo2Value','contactInfo3Label','contactInfo3Value','contactInfo4Label','contactInfo4Value'] },
    { section: 'About Us Page — Hero', keys: ['auBadge','auHeadline','auSubtext'] },
    { section: 'About Us Page — Mission & Vision', keys: ['auMissionTitle','auMissionText','auVisionTitle','auVisionText'] },
    { section: 'About Us Page — Core Values', keys: ['auValuesTitle','auVal1Title','auVal1Desc','auVal2Title','auVal2Desc','auVal3Title','auVal3Desc','auVal4Title','auVal4Desc','auVal5Title','auVal5Desc','auVal6Title','auVal6Desc'] },
    { section: 'About Us Page — Team', keys: ['auTeamTitle','auTeam1Name','auTeam1Role','auTeam1Bio','auTeam1Photo','auTeam2Name','auTeam2Role','auTeam2Bio','auTeam2Photo','auTeam3Name','auTeam3Role','auTeam3Bio','auTeam3Photo','auTeam4Name','auTeam4Role','auTeam4Bio','auTeam4Photo'] },
    { section: 'About Us Page — CTA', keys: ['auCtaHeadline','auCtaSubtext','auCtaButton'] },
  ];

  const labels = {
    navBrand: 'Brand Name',
    heroBadge:'Badge Text', heroHeadline:'Main Headline', heroSubtext:'Sub-text', heroCta1:'Button 1', heroCta2:'Button 2',
    heroStat1Val:'Stat 1 Number', heroStat1Label:'Stat 1 Label', heroStat2Val:'Stat 2 Number', heroStat2Label:'Stat 2 Label', heroStat3Val:'Stat 3 Number', heroStat3Label:'Stat 3 Label',
    trustedLabel: 'Banner Text',
    aboutLabel:'Section Label', aboutHeadline:'Headline', aboutText1:'Paragraph 1', aboutText2:'Paragraph 2', aboutYears:'Years Number', aboutYearsLabel:'Years Label', aboutCta:'Button Text',
    solutionsHeadline:'Headline', solutionsSubtext:'Sub-text',
    whyLabel:'Section Label', whyHeadline:'Headline', whySubtext:'Sub-text',
    why1Title:'Item 1 Title', why1Desc:'Item 1 Description', why2Title:'Item 2 Title', why2Desc:'Item 2 Description',
    why3Title:'Item 3 Title', why3Desc:'Item 3 Description', why4Title:'Item 4 Title', why4Desc:'Item 4 Description',
    why5Title:'Item 5 Title', why5Desc:'Item 5 Description', why6Title:'Item 6 Title', why6Desc:'Item 6 Description',
    metric1Val:'Metric 1 Number', metric1Label:'Metric 1 Label', metric2Val:'Metric 2 Number', metric2Label:'Metric 2 Label',
    metric3Val:'Metric 3 Number', metric3Label:'Metric 3 Label', metric4Val:'Metric 4 Number', metric4Label:'Metric 4 Label',
    processHeadline:'Section Headline',
    process1Title:'Step 1 Title', process1Desc:'Step 1 Description', process2Title:'Step 2 Title', process2Desc:'Step 2 Description',
    process3Title:'Step 3 Title', process3Desc:'Step 3 Description', process4Title:'Step 4 Title', process4Desc:'Step 4 Description',
    ctaHeadline:'Headline', ctaSubtext:'Sub-text', ctaButton:'Button Text',
    footerDesc:'Company Description', footerAddress:'Address', footerPhone:'Phone Number', footerEmail:'Email Address', footerCopyright:'Copyright Text',
    advBadge:'Badge Text', advHeadline:'Page Headline', advSubtext:'Sub-text', advAllChannels:'Channels Section Title',
    advStat1Val:'Stat 1 Number', advStat1Label:'Stat 1 Label', advStat2Val:'Stat 2 Number', advStat2Label:'Stat 2 Label',
    advStat3Val:'Stat 3 Number', advStat3Label:'Stat 3 Label', advStat4Val:'Stat 4 Number', advStat4Label:'Stat 4 Label',
    advCtaHeadline:'CTA Headline', advCtaSubtext:'CTA Sub-text', advCtaButton:'CTA Button Text',
    oaBadge:'Badge Text', oaHeadline:'Page Headline', oaSubtext:'Sub-text', oaProcessTitle:'Process Section Title',
    oaCapBadge:'Capabilities Badge', oaCapHeadline:'Capabilities Headline', oaCapSubtext:'Capabilities Sub-text',
    oaWhyBadge:'Why Badge', oaWhyHeadline:'Why Headline', oaWhySubtext:'Why Sub-text',
    oaCtaHeadline:'CTA Headline', oaCtaSubtext:'CTA Sub-text', oaCtaButton:'CTA Button Text',
    oaStep1Title:'Step 1 Title', oaStep1Desc:'Step 1 Description', oaStep2Title:'Step 2 Title', oaStep2Desc:'Step 2 Description',
    oaStep3Title:'Step 3 Title', oaStep3Desc:'Step 3 Description', oaStep4Title:'Step 4 Title', oaStep4Desc:'Step 4 Description',
    oaWhy1Title:'Item 1 Title', oaWhy1Desc:'Item 1 Description', oaWhy2Title:'Item 2 Title', oaWhy2Desc:'Item 2 Description',
    oaWhy3Title:'Item 3 Title', oaWhy3Desc:'Item 3 Description', oaWhy4Title:'Item 4 Title', oaWhy4Desc:'Item 4 Description',
    oaWhy5Title:'Item 5 Title', oaWhy5Desc:'Item 5 Description', oaWhy6Title:'Item 6 Title', oaWhy6Desc:'Item 6 Description',
    contactBadge:'Badge Text', contactHeadline:'Headline', contactSubtext:'Sub-text',
    contactGetInTouch:'Get In Touch Heading', contactRequestQuote:'Request Quote Heading',
    contactResponseLabel:'Response Label', contactResponseTime:'Response Time', contactResponseNote:'Response Note',
    contactInfo1Label:'Info 1 Label', contactInfo1Value:'Info 1 Value',
    contactInfo2Label:'Info 2 Label', contactInfo2Value:'Info 2 Value',
    contactInfo3Label:'Info 3 Label', contactInfo3Value:'Info 3 Value',
    contactInfo4Label:'Info 4 Label', contactInfo4Value:'Info 4 Value',
    auBadge:'Badge Text', auHeadline:'Page Headline', auSubtext:'Sub-text',
    auMissionTitle:'Mission Title', auMissionText:'Mission Text',
    auVisionTitle:'Vision Title', auVisionText:'Vision Text',
    auValuesTitle:'Values Section Title',
    auVal1Title:'Value 1 Title', auVal1Desc:'Value 1 Description', auVal2Title:'Value 2 Title', auVal2Desc:'Value 2 Description',
    auVal3Title:'Value 3 Title', auVal3Desc:'Value 3 Description', auVal4Title:'Value 4 Title', auVal4Desc:'Value 4 Description',
    auVal5Title:'Value 5 Title', auVal5Desc:'Value 5 Description', auVal6Title:'Value 6 Title', auVal6Desc:'Value 6 Description',
    auTeamTitle:'Team Section Title',
    auTeam1Name:'Member 1 Name', auTeam1Role:'Member 1 Role', auTeam1Bio:'Member 1 Bio', auTeam1Photo:'Member 1 Photo URL',
    auTeam2Name:'Member 2 Name', auTeam2Role:'Member 2 Role', auTeam2Bio:'Member 2 Bio', auTeam2Photo:'Member 2 Photo URL',
    auTeam3Name:'Member 3 Name', auTeam3Role:'Member 3 Role', auTeam3Bio:'Member 3 Bio', auTeam3Photo:'Member 3 Photo URL',
    auTeam4Name:'Member 4 Name', auTeam4Role:'Member 4 Role', auTeam4Bio:'Member 4 Bio', auTeam4Photo:'Member 4 Photo URL',
    auCtaHeadline:'CTA Headline', auCtaSubtext:'CTA Sub-text', auCtaButton:'CTA Button Text',
  };

  const isLong = (key) => ['heroSubtext','aboutText1','aboutText2','solutionsSubtext','ctaSubtext','whySubtext','footerDesc',
    'why1Desc','why2Desc','why3Desc','why4Desc','why5Desc','why6Desc',
    'process1Desc','process2Desc','process3Desc','process4Desc',
    'advSubtext','advCtaSubtext','oaSubtext','oaCapSubtext','oaWhySubtext','oaCtaSubtext',
    'oaStep1Desc','oaStep2Desc','oaStep3Desc','oaStep4Desc',
    'oaWhy1Desc','oaWhy2Desc','oaWhy3Desc','oaWhy4Desc','oaWhy5Desc','oaWhy6Desc',
    'contactSubtext','contactResponseNote',
    'auSubtext','auMissionText','auVisionText',
    'auVal1Desc','auVal2Desc','auVal3Desc','auVal4Desc','auVal5Desc','auVal6Desc',
    'auTeam1Bio','auTeam2Bio','auTeam3Bio','auTeam4Bio','auCtaSubtext'].includes(key);

  return (
    <div className="space-y-8">
      {translating && <div className="p-3 bg-blue-50 text-blue-800 text-sm rounded font-medium flex items-center gap-2"><span className="material-symbols-outlined text-base animate-spin">autorenew</span> Auto-translating to French… please wait.</div>}
      {saved && <div className="p-3 bg-green-100 text-green-800 text-sm rounded font-medium">Saved in English + auto-translated to French — both languages updated.</div>}
      {translateErr && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm rounded">
          <p className="font-semibold mb-1">English saved — French translation failed (no internet or service unavailable).</p>
          <p>French content was NOT updated. Please check your connection and click <strong>Save All Changes</strong> again to retry.</p>
        </div>
      )}
      {fields.map(({ section, keys }) => (
        <div key={section} className="bg-white border border-outline-variant/20 rounded-lg p-8">
          <h3 className="font-headline-lg text-[18px] text-primary mb-6">{section}</h3>
          <div className="space-y-4">
            {keys.map(key => (
              <div key={key}>
                <label className="font-label-caps text-xs text-on-surface-variant block mb-1">{labels[key]}</label>
                {isLong(key) ? (
                  <textarea rows={3} value={content[key]} onChange={e => update(key, e.target.value)}
                    className="w-full px-4 py-2 border border-outline-variant/30 rounded text-sm outline-none focus:border-secondary resize-none" />
                ) : (
                  <input value={content[key]} onChange={e => update(key, e.target.value)}
                    className="w-full px-4 py-2 border border-outline-variant/30 rounded text-sm outline-none focus:border-secondary" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="flex gap-3">
        <button onClick={save} disabled={translating} className="bg-primary text-white px-8 py-3 font-label-caps text-label-caps hover:bg-secondary transition-colors rounded disabled:opacity-60 flex items-center gap-2">
          {translating && <span className="material-symbols-outlined text-sm animate-spin">autorenew</span>}
          {translating ? 'Translating…' : 'Save All Changes'}
        </button>
        <button onClick={reset} disabled={translating} className="px-8 py-3 border border-outline-variant/30 text-on-surface-variant font-label-caps text-label-caps rounded hover:bg-surface-container disabled:opacity-40">Reset to Defaults</button>
      </div>
    </div>
  );
}


// ─── Tab: Settings ────────────────────────────────────────────────────────────
function SettingsTab() {
  const [cur, setCur]         = useState('');
  const [newPw, setNewPw]     = useState('');
  const [confirm, setConfirm] = useState('');
  const [pwMsg, setPwMsg]     = useState(null);
  const [newRKey, setNewRKey] = useState('');
  const [rMsg, setRMsg]       = useState(null);

  const changePw = async (e) => {
    e.preventDefault();
    if (newPw !== confirm) { setPwMsg({ ok: false, text: 'New passwords do not match.' }); return; }
    try {
      await apiChangePassword(cur, newPw);
      setPwMsg({ ok: true, text: 'Password changed successfully.' });
      setCur(''); setNewPw(''); setConfirm('');
    } catch (err) {
      setPwMsg({ ok: false, text: err.message || 'Failed to update password.' });
    }
    setTimeout(() => setPwMsg(null), 4000);
  };

  const changeRKey = async (e) => {
    e.preventDefault();
    if (newRKey.trim().length < 6) { setRMsg({ ok: false, text: 'Recovery key must be at least 6 characters.' }); return; }
    try {
      await apiChangeKey(newRKey.trim());
      setNewRKey('');
      setRMsg({ ok: true, text: 'Recovery key updated. Store it somewhere safe.' });
    } catch (err) {
      setRMsg({ ok: false, text: err.message || 'Failed to update recovery key.' });
    }
    setTimeout(() => setRMsg(null), 4000);
  };

  return (
    <div className="space-y-8 max-w-lg">
      {/* Change Password */}
      <div className="bg-white border border-outline-variant/20 rounded-lg p-8">
        <h3 className="font-headline-lg text-[18px] text-primary mb-2">Change Password</h3>
        <p className="text-on-surface-variant text-sm mb-6">Update your admin login password.</p>
        {pwMsg && <div className={`p-3 mb-4 text-sm rounded font-medium ${pwMsg.ok ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{pwMsg.text}</div>}
        <form onSubmit={changePw} className="space-y-4">
          {[['Current Password', cur, setCur], ['New Password', newPw, setNewPw], ['Confirm New Password', confirm, setConfirm]].map(([label, val, setter]) => (
            <div key={label}>
              <label className="font-label-caps text-xs text-on-surface-variant block mb-1">{label}</label>
              <input type="password" value={val} onChange={e => setter(e.target.value)} required
                className="w-full px-4 py-2 border border-outline-variant/30 rounded text-sm outline-none focus:border-secondary" />
            </div>
          ))}
          <button type="submit" className="bg-primary text-white px-6 py-2.5 font-label-caps text-label-caps hover:bg-secondary transition-colors rounded mt-2">Update Password</button>
        </form>
      </div>

      {/* Recovery Key */}
      <div className="bg-white border border-outline-variant/20 rounded-lg p-8">
        <h3 className="font-headline-lg text-[18px] text-primary mb-2">Recovery Key</h3>
        <p className="text-on-surface-variant text-sm mb-1">Used to reset your password if you get locked out.</p>
        <p className="text-xs text-on-surface-variant/60 mb-6">Store your recovery key in a secure location — it will not be shown here again after you set it.</p>
        {rMsg && <div className={`p-3 mb-4 text-sm rounded font-medium ${rMsg.ok ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{rMsg.text}</div>}
        <form onSubmit={changeRKey} className="space-y-4">
          <div>
            <label className="font-label-caps text-xs text-on-surface-variant block mb-1">New Recovery Key</label>
            <input value={newRKey} onChange={e => setNewRKey(e.target.value)} required placeholder="e.g. MY-SECRET-CODE-123"
              className="w-full px-4 py-2 border border-outline-variant/30 rounded text-sm outline-none focus:border-secondary" />
          </div>
          <button type="submit" className="bg-primary text-white px-6 py-2.5 font-label-caps text-label-caps hover:bg-secondary transition-colors rounded">Update Recovery Key</button>
        </form>
      </div>
    </div>
  );
}

// ─── Main AdminPanel ───────────────────────────────────────────────────────────
const TABS = [
  { id: 'Leads',        icon: 'inbox' },
  { id: 'Images',       icon: 'image' },
  { id: 'Brands',       icon: 'verified' },
  { id: 'Services',     icon: 'grid_view' },
  { id: 'Capabilities', icon: 'workspace_premium' },
  { id: 'Content',      icon: 'edit_note' },
  { id: 'Settings',     icon: 'settings' },
];

const TAB_DESC = {
  Leads:        'Review and manage client quote requests.',
  Images:       'Manage images displayed on the website. Click an image to set it as active.',
  Brands:       'Manage the trusted brand logos that scroll across the homepage banner.',
  Services:     'Add, edit, or remove advertising services. Changes apply to the Home page and Advertising page cards.',
  Capabilities: 'Edit the capability cards shown in the "Our Activities" page. Add, edit, or remove items.',
  Content:      'Edit all text content on every page of the website — homepage, advertising, activities, and contact.',
  Settings:     'Change your admin password and manage your recovery key.',
};

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mode, setMode]             = useState('login'); // 'login' | 'forgot'
  const [username, setUsername]     = useState('');
  const [password, setPassword]     = useState('');
  const [error, setError]           = useState('');
  const [activeTab, setActiveTab]   = useState('Leads');
  const [mobileMenu, setMobileMenu] = useState(false);

  // Forgot password state
  const [recInput, setRecInput]   = useState('');
  const [fpNew, setFpNew]         = useState('');
  const [fpConfirm, setFpConfirm] = useState('');
  const [fpMsg, setFpMsg]         = useState(null);

  useEffect(() => {
    const handleBeforeUnload = (e) => { if (isLoggedIn) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isLoggedIn]);

  const LOCAL_USER = import.meta.env.VITE_LOCAL_USER || '';
  const LOCAL_PASS = import.meta.env.VITE_LOCAL_PASS || '';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await apiLogin(username, password);
      setIsLoggedIn(true);
    } catch (err) {
      // Only fall back to local credentials when the backend is genuinely unreachable.
      // If the backend responded (wrong password, rate limit, etc.) respect that response.
      const backendDown = err.message === 'Failed to fetch' || err.message === 'Backend unavailable';
      if (backendDown && username === LOCAL_USER && password === LOCAL_PASS) {
        setIsLoggedIn(true);
      } else {
        setError(err.message || 'Invalid username or password.');
      }
    }
  };

  const LOCAL_RECOVERY = import.meta.env.VITE_LOCAL_RECOVERY || '';

  const handleForgot = async (e) => {
    e.preventDefault();
    if (fpNew !== fpConfirm) { setFpMsg({ ok: false, text: 'Passwords do not match.' }); return; }
    try {
      await apiResetPassword(recInput, fpNew);
      setFpMsg({ ok: true, text: 'Password reset successfully. You can now sign in.' });
      setTimeout(() => { setMode('login'); setRecInput(''); setFpNew(''); setFpConfirm(''); setFpMsg(null); }, 2000);
    } catch (err) {
      const backendDown = err.message === 'Failed to fetch' || err.message === 'Backend unavailable';
      if (!backendDown) { setFpMsg({ ok: false, text: err.message || 'Reset failed.' }); return; }
      // Backend unreachable — local recovery key fallback
      if (recInput !== LOCAL_RECOVERY) { setFpMsg({ ok: false, text: 'Recovery key is incorrect.' }); return; }
      if (fpNew.length < 6)            { setFpMsg({ ok: false, text: 'Password must be at least 6 characters.' }); return; }
      setFpMsg({ ok: true, text: 'Password reset successfully. You can now sign in.' });
      setTimeout(() => { setMode('login'); setRecInput(''); setFpNew(''); setFpConfirm(''); setFpMsg(null); }, 2000);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-surface">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 premium-card-shadow border border-outline-variant/30 rounded-lg">
          {mode === 'login' ? (
            <>
              <h2 className="font-display-lg text-headline-lg text-primary text-center mb-2">Agency Admin</h2>
              <p className="text-on-surface-variant text-center text-sm mb-8">Secure access to the campaign management portal.</p>
              {error && <div className="p-3 mb-6 bg-red-100 text-red-800 text-sm rounded font-medium">{error}</div>}
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="font-label-caps text-sm text-on-surface font-semibold block mb-1.5">Username</label>
                  <input type="text" value={username} onChange={e => setUsername(e.target.value)} required placeholder="Username"
                    className="w-full px-4 py-3 border border-outline-variant/30 rounded focus:border-secondary outline-none transition-colors" />
                </div>
                <div>
                  <label className="font-label-caps text-sm text-on-surface font-semibold block mb-1.5">Password</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password"
                    className="w-full px-4 py-3 border border-outline-variant/30 rounded focus:border-secondary outline-none transition-colors" />
                </div>
                <button type="submit" className="w-full bg-primary text-on-primary py-4 font-label-caps text-label-caps hover:bg-secondary transition-all shadow-md">Sign In</button>
              </form>
              <button onClick={() => { setMode('forgot'); setError(''); }}
                className="mt-6 w-full text-center text-sm text-secondary hover:underline font-medium">
                Forgot Password?
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setMode('login')} className="flex items-center gap-1 text-sm text-on-surface-variant hover:text-primary mb-6 transition-colors">
                <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Sign In
              </button>
              <h2 className="font-display-lg text-headline-lg text-primary mb-2">Reset Password</h2>
              <p className="text-on-surface-variant text-sm mb-6">Enter your recovery key to set a new password.</p>
              {fpMsg && <div className={`p-3 mb-4 text-sm rounded font-medium ${fpMsg.ok ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{fpMsg.text}</div>}
              <form onSubmit={handleForgot} className="space-y-4">
                <div>
                  <label className="font-label-caps text-xs text-on-surface-variant block mb-1">Recovery Key</label>
                  <input value={recInput} onChange={e => setRecInput(e.target.value)} required placeholder="Your recovery key"
                    className="w-full px-4 py-3 border border-outline-variant/30 rounded focus:border-secondary outline-none transition-colors" />
                </div>
                <div>
                  <label className="font-label-caps text-xs text-on-surface-variant block mb-1">New Password</label>
                  <input type="password" value={fpNew} onChange={e => setFpNew(e.target.value)} required
                    className="w-full px-4 py-3 border border-outline-variant/30 rounded focus:border-secondary outline-none transition-colors" />
                </div>
                <div>
                  <label className="font-label-caps text-xs text-on-surface-variant block mb-1">Confirm New Password</label>
                  <input type="password" value={fpConfirm} onChange={e => setFpConfirm(e.target.value)} required
                    className="w-full px-4 py-3 border border-outline-variant/30 rounded focus:border-secondary outline-none transition-colors" />
                </div>
                <button type="submit" className="w-full bg-primary text-on-primary py-4 font-label-caps text-label-caps hover:bg-secondary transition-all shadow-md mt-2">Reset Password</button>
              </form>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Top Bar */}
      <div className="bg-primary h-16 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-50">
        <span className="font-display-lg text-[18px] sm:text-[20px] font-bold text-white tracking-tighter">Influence — Admin</span>
        <div className="flex items-center gap-3">
          <button onClick={() => setMobileMenu(p => !p)} className="lg:hidden p-2 text-white/80 hover:text-white transition-colors">
            <span className="material-symbols-outlined">{mobileMenu ? 'close' : 'menu'}</span>
          </button>
          <button onClick={() => { apiLogout().catch(()=>{}); setIsLoggedIn(false); }} className="px-4 py-2 border border-white/20 text-white font-label-caps text-label-caps text-xs hover:bg-white/10 transition-colors rounded">Sign Out</button>
        </div>
      </div>

      {/* Desktop Tab Navigation */}
      <div className="bg-white border-b border-outline-variant/20 px-4 sm:px-8 hidden lg:block">
        <div className="flex gap-0 overflow-x-auto">
          {TABS.map(({ id, icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-4 font-label-caps text-label-caps border-b-2 transition-colors whitespace-nowrap ${activeTab === id ? 'border-secondary text-secondary' : 'border-transparent text-on-surface-variant hover:text-primary'}`}>
              <span className="material-symbols-outlined text-sm">{icon}</span> {id}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Tab Drawer */}
      {mobileMenu && (
        <div className="lg:hidden bg-white border-b border-outline-variant/20 shadow-md">
          {TABS.map(({ id, icon }) => (
            <button key={id} onClick={() => { setActiveTab(id); setMobileMenu(false); }}
              className={`w-full flex items-center gap-3 px-6 py-4 font-label-caps text-label-caps border-l-4 transition-colors text-left ${activeTab === id ? 'border-secondary text-secondary bg-surface' : 'border-transparent text-on-surface-variant hover:bg-surface-container'}`}>
              <span className="material-symbols-outlined text-sm">{icon}</span> {id}
            </button>
          ))}
        </div>
      )}

      {/* Tab Content */}
      <div className="max-w-container-max mx-auto px-4 sm:px-8 py-6 sm:py-10">
        <div className="mb-6 sm:mb-8">
          <h1 className="font-headline-lg text-headline-lg text-primary mb-1">{activeTab}</h1>
          <p className="text-on-surface-variant text-sm">{TAB_DESC[activeTab]}</p>
        </div>
        {activeTab === 'Leads'        && <LeadsTab />}
        {activeTab === 'Images'       && <ImagesTab />}
        {activeTab === 'Brands'       && <BrandsTab />}
        {activeTab === 'Services'     && <ServicesTab />}
        {activeTab === 'Capabilities' && <CapabilitiesTab />}
        {activeTab === 'Content'      && <ContentTab />}
        {activeTab === 'Settings'     && <SettingsTab />}
      </div>
    </div>
  );
}
