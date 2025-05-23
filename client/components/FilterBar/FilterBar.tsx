// components/FilterBar.tsx
import Link from "next/link";
import { useState } from "react";

const sortFieldOptions = ["_id", "modified.time", "year"];
const sortOrderOptions = ["asc", "desc"];
const sortLangOptions = ["vietsub", "thuyetminh", "long-tieng"];
const categoryOptions = [
  "hanh-dong",
  "mien-tay",
  "tre-em",
  "lich-su",
  "co-trang",
  "chien-tranh",
  "vien-tuong",
  "kinh-di",
  "tai-lieu",
  "bi-an",
  "phim-18",
  "tinh-cam",
  "tam-ly",
  "the-thao",
  "phieu-luu",
  "am-nhac",
  "gia-dinh",
  "hoc-duong",
  "hai-huoc",
  "hinh-su",
  "vo-thuat",
  "khoa-hoc",
  "than-thoai",
  "chinh-kich",
  "kinh-dien",
];

const countryOptions = [
  "viet-nam",
  "trung-quoc",
  "thai-lan",
  "hong-kong",
  "phap",
  "duc",
  "ha-lan",
  "mexico",
  "thuy-dien",
  "philippines",
  "dan-mach",
  "thuy-si",
  "ukraina",
  "han-quoc",
  "au-my",
  "an-do",
  "canada",
  "tay-ban-nha",
  "indonesia",
  "ba-lan",
  "malaysia",
  "bo-dao-nha",
  "uae",
  "chau-phi",
  "a-rap-xe-ut",
  "nhat-ban",
  "dai-loan",
  "anh",
  "quoc-gia-khac",
  "tho-nhi-ky",
  "nga",
  "uc",
  "brazil",
  "y",
  "na-uy",
];

const sortOptions = [
  { value: "year_desc", label: "Newest - Oldest" },
  { value: "year_asc", label: "Oldest - Newest" },
];

export default function FilterBar({
  currentFilters,
  setSelectedCategory,
}: {
  currentFilters: {
    page?: number;
    category: string;
    country?: string;
    year?: string;
    sortedField?: string;
    sortedType?: string;
    sortedLang?: string;
    limit?: number;
    sub_category?: string;
  };
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortByTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-6">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Category Filter */}
        <div>
          <label className="block text-xl text-gray-300 mb-1">Categories</label>
          <select
            value={currentFilters.category}
            onChange={handleCategoryChange}
            className="bg-gray-700 text-white text-lg rounded px-3 py-2"
          >
            <option value="">Tất cả</option>
            <option value="hanh-dong">Action</option>
            <option value="mien-tay">Western</option>
            <option value="tre-em">Kid</option>
            <option value="lich-su">History</option>
            <option value="co-trang">Costume Drama</option>
            <option value="chien-tranh">War</option>
            <option value="vien-tuong">Fiction</option>
            <option value="kinh-di">Horror</option>
            <option value="tai-lieu">Documentary</option>
            <option value="bi-an">Mystery</option>
            <option value="phim-18">Adult (18+)</option>
            <option value="tinh-cam">Romance</option>
            <option value="tam-ly">Psychological</option>
            <option value="the-thao">Sports</option>
            <option value="phieu-luu">Adventure</option>
            <option value="am-nhac">Music</option>
            <option value="gia-dinh">Family</option>
            <option value="hoc-duong">School</option>
            <option value="hai-huoc">Comedy</option>
            <option value="hinh-su">Crime</option>
            <option value="vo-thuat">Martial Arts</option>
            <option value="khoa-hoc">Science</option>
            <option value="than-thoai">Mythology</option>
            <option value="chinh-kich">Political Drama / Political</option>
            <option value="kinh-dien">Classic</option>
          </select>
        </div>

        {/* Sort Dropdown */}
        {/* <div>
          <label className="block text-sm text-gray-300 mb-1">Sắp xếp</label>
          <select
            // defaultValue={currentFilters.sort}
            onChange={handleSortByTimeChange}
            className="bg-gray-700 text-white rounded px-3 py-2 text-sm"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div> */}
      </div>
    </div>
  );
}
