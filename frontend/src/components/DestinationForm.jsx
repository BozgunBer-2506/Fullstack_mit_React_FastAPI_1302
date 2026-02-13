import { useState } from "react";

function DestinationForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    continent: "",
    note: "",
    tags: "",
  });

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name.trim() || !formData.country.trim()) return;

    onAdd({
      name: formData.name.trim(),
      country: formData.country.trim(),
      continent: formData.continent.trim(),
      note: formData.note.trim(),
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });

    setFormData({ name: "", country: "", continent: "", note: "", tags: "" });
  }

  return (
    <form className="destination-form" onSubmit={handleSubmit}>
      <h2>Add Destination</h2>

      <div className="form-group">
        <label>City / Place *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Kyoto"
          required
        />
      </div>

      <div className="form-group">
        <label>Country *</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="e.g. Japan"
          required
        />
      </div>

      <div className="form-group">
        <label>Continent</label>
        <select name="continent" value={formData.continent} onChange={handleChange}>
          <option value="">Select continent</option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="South America">South America</option>
          <option value="Oceania">Oceania</option>
          <option value="Antarctica">Antarctica</option>
        </select>
      </div>

      <div className="form-group">
        <label>Note</label>
        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
          placeholder="Why do you want to go there?"
          rows={3}
        />
      </div>

      <div className="form-group">
        <label>Tags (comma separated)</label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="e.g. food, culture, nature"
        />
      </div>

      <button type="submit" className="btn-add">
        + Add Destination
      </button>
    </form>
  );
}

export default DestinationForm;