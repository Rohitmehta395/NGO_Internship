import { useEffect, useState } from "react";
import { Image, Upload, X, Trash2, Type, ListOrdered } from "lucide-react";
import { IMAGE_BASE_URL } from "../../../utils/constants.js";

const emptyForm = {
  name: "",
  description: "",
  order: 0,
  isActive: true,
  image: null,
  preview: null,
};

const PartnerForm = ({ onSubmit, initialData, onCancel }) => {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!initialData) {
      setForm(emptyForm);
      return;
    }

    let previewUrl = null;
    const dbPath = initialData.imageUrl;

    if (dbPath) {
      if (dbPath.startsWith("http")) {
        previewUrl = dbPath;
      } else {
        let cleanPath = dbPath.replace(/^uploads\//, "");
        if (cleanPath.startsWith("/")) cleanPath = cleanPath.slice(1);
        previewUrl = `${IMAGE_BASE_URL}/uploads/${cleanPath}`;
      }
    }

    setForm({
      name: initialData.name || "",
      description: initialData.description || "",
      order: initialData.order ?? 0,
      isActive: initialData.isActive ?? true,
      image: null,
      preview: previewUrl,
    });
  }, [initialData]);

  const handleChange = (key) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  //  Client-side size validation
  if (file.size > 1 * 1024 * 1024) {
    alert("Image size must be less than 1 MB");
    e.target.value = ""; // reset file input
    return;
  }

  setForm((prev) => ({
    ...prev,
    image: file,
    preview: URL.createObjectURL(file),
  }));
};

  const removeImage = () => {
    setForm((prev) => ({
      ...prev,
      image: null,
      preview: null,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
      if (form.image && form.image.size > 1 * 1024 * 1024) {
        alert("Image size must be less than 1 MB");
        return;
      }

    onSubmit({
      name: form.name,
      description: form.description,
      order: Number(form.order),
      isActive: form.isActive,
      image: form.image,
    });

    if (!initialData) setForm(emptyForm);
  };

  const handleCancel = () => {
    setForm(emptyForm);
    onCancel?.();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow border-t-4 border-orange-500">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-bold">
          {initialData ? "✏️ Edit Partner" : "🤝 Add Partner"}
        </h2>
        {onCancel && (
          <button type="button" onClick={handleCancel}>
            <X />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* NAME */}
        <div>
          <label className="font-semibold flex gap-2">
            <Type className="text-gray-500" /> Partner Name
          </label>
          <input
            className="w-full border p-2 rounded mt-1"
            value={form.name}
            onChange={handleChange("name")}
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            className="w-full border p-2 rounded mt-1"
            value={form.description}
            onChange={handleChange("description")}
            rows="3"
            required
          />
        </div>

        {/* ORDER + ACTIVE */}
        <div className="grid grid-cols-2 gap-4">

          <div className="flex items-center gap-3 mt-6">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={handleChange("isActive")}
              className="w-4 h-4"
            />
            <span className="font-medium">Active</span>
          </div>
        </div>

        {/* IMAGE */}
        <div>
          <label className="font-semibold flex gap-2 mb-2">
            <Image className="text-gray-500" /> Partner Image
          </label>

          {!form.preview ? (
            <label className="border-2 border-dashed border-gray-300 p-8 flex flex-col items-center justify-center rounded-lg cursor-pointer hover:bg-gray-50">
              <Upload className="text-gray-400 mb-2" size={32} />
              <span className="text-gray-600 font-medium">
                Click to Upload Image
              </span>
              <input
                type="file"
                hidden
                onChange={handleImageChange}
                accept="image/*"
              />
            </label>
          ) : (
            <div className="relative inline-block mt-2">
              <img
                src={form.preview}
                alt="Partner preview"
                className="rounded-lg object-cover w-full max-w-sm h-40 border"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-orange-600 text-white px-8 py-2.5 rounded hover:bg-orange-700"
          >
            {initialData ? "Update Partner" : "Create Partner"}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={handleCancel}
              className="border px-6 py-2.5 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PartnerForm;
