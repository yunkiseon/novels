import React, { useState } from "react";
import type { Novel, NovelUpSert } from "../../types/book";
import { genres } from "../../utils/novelUtil";

// add, update 모두 NovelForm 사용. 그 구별은 id 값으로

const NovelForm = ({ novel, onCancel, onSubmit }: NovelUpSert) => {
  const [formData, setFormData] = useState<Novel>(novel);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const { name } = target;

    // 폼의 변화가 일어나면
    setFormData({
      ...formData,
      [name]:
        target instanceof HTMLInputElement && target.type === "checkbox"
          ? target.checked
          : target.value,
    });
  };

  return (
    <form
      className="mt-6 flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
    >
      <input
        name="title"
        placeholder="Title"
        required
        className="rounded-xs border-2 border-stone-300 p-2"
        value={formData.title || ""}
        onChange={handleChange}
      />
      <input
        name="author"
        placeholder="Author"
        required
        className="rounded-xs border-2 border-stone-300 p-2"
        value={formData.author || ""}
        onChange={handleChange}
      />
      <select
        name="gid"
        className="rounded-xs border-2 border-stone-300 p-2"
        value={formData.gid || ""}
        onChange={handleChange}
      >
        <option value="">Select Genre</option>
        {genres.map((genre, idx) => (
          <option key={idx} value={idx + 1}>
            {genre}
          </option>
        ))}
      </select>
      <input
        name="publishedDate"
        type="date"
        placeholder="Published Date"
        required
        className="rounded-xs border-2 border-stone-300 p-2"
        value={formData.publishedDate || ""}
        onChange={handleChange}
      />
      <input
        name="rating"
        type="number"
        placeholder="Rating (1-5)"
        min="0"
        max="5"
        className="rounded-xs border-2 border-stone-300 p-2"
        value={formData.rating || 0}
        onChange={handleChange}
      />
      <label>
        <input
          name="available"
          type="checkbox"
          className="mr-1.5 rounded-xs border-2 border-stone-300 p-2"
          checked={formData.available}
          onChange={handleChange}
        />
        Available
      </label>
      <div className="p-2 text-center">
        <button
          type="submit"
          className="mx-1 my-6 rounded-[3px] bg-sky-500 px-4.5 py-3 text-[1.2em] text-white hover:bg-sky-800"
        >
          {formData.id ? "Update" : "Add"}
        </button>
        <button
          type="button"
          className="mx-1 my-6 rounded-[3px] bg-red-700 px-4.5 py-3 text-[1.2em] text-white hover:bg-red-900"
          onClick={() => onCancel(formData.id)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NovelForm;
