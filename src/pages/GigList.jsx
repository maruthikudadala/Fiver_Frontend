import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/apiPath";

const GigList = () => {
  const [gigs, setGigs] = useState([]);
  const [filteredGigs, setFilteredGigs] = useState([]);

  // Filter states
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [serviceOptions, setServiceOptions] = useState([]);
  const [sellerLevels, setSellerLevels] = useState([]);
  const [budgetRange, setBudgetRange] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [openDropdown, setOpenDropdown] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/gigs/getAllGigs`)
      .then((res) => res.json())
      .then((data) => {
        setGigs(data);
        setFilteredGigs(data);
      });
  }, []);

  const handleToggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? "" : name));
  };

  const handleCheckboxChange = (setter, currentValues, value) => {
    if (currentValues.includes(value)) {
      setter(currentValues.filter((v) => v !== value));
    } else {
      setter([...currentValues, value]);
    }
  };

  const handleBudgetChange = (value) => {
    setBudgetRange(budgetRange === value ? "" : value);
  };

  const handleDeliveryChange = (value) => {
    setDeliveryTime(deliveryTime === value ? "" : value);
  };

  useEffect(() => {
    let result = [...gigs];

    // Search
    if (search.trim()) {
      result = result.filter((gig) =>
        gig.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category
    if (category) {
      result = result.filter((gig) => gig.category === category);
    }

    // Service Options
    if (serviceOptions.length > 0) {
      result = result.filter((gig) => serviceOptions.includes(gig.category));
    }

    // Seller Details
    if (sellerLevels.length > 0) {
      result = result.filter((gig) => sellerLevels.includes(gig.sellerLevel));
    }

    // Budget
    if (budgetRange) {
      result = result.filter((gig) => {
        if (budgetRange === "under300") return gig.price < 300;
        if (budgetRange === "midrange") return gig.price >= 300 && gig.price <= 800;
        if (budgetRange === "above900") return gig.price > 900;
        return true;
      });
    }

    // Delivery Time
    if (deliveryTime) {
      result = result.filter((gig) => {
        if (!gig.deliveryTime) return false;
        if (deliveryTime === "24hr") return gig.deliveryTime <= 1;
        if (deliveryTime === "3days") return gig.deliveryTime <= 3;
        if (deliveryTime === "7days") return gig.deliveryTime <= 7;
        return true;
      });
    }

    setFilteredGigs(result);
  }, [search, category, gigs, serviceOptions, sellerLevels, budgetRange, deliveryTime]);

  const renderDropdown = (name, label, options, state, setter) => (
    <div className="relative">
      <button
        onClick={() => handleToggleDropdown(name)}
        className="border px-4 py-2 rounded bg-white shadow"
      >
        {label}
      </button>
      {openDropdown === name && (
        <div className="absolute bg-white shadow-lg border mt-2 w-56 p-4 z-10 rounded">
          {options.map((opt) => (
            <label key={opt.value} className="block text-sm capitalize">
              <input
                type="checkbox"
                checked={state.includes ? state.includes(opt.value) : state === opt.value}
                onChange={() =>
                  setter.length !== undefined
                    ? handleCheckboxChange(setter, state, opt.value)
                    : setter(opt.value)
                }
                className="mr-2"
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">All Gigs</h2>

      {/* Search & Category Filter */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Search gigs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 w-full md:w-1/3 rounded shadow-sm"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full md:w-1/4 shadow-sm"
        >
          <option value="">All Categories</option>
          <option value="Web Development">Web Development</option>
          <option value="Graphic Design">Graphic Design</option>
          <option value="SEO">SEO</option>
        </select>
      </div>

      {/* Dropdown Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {renderDropdown(
          "service",
          "Service Options",
          [
            { value: "e-commerce", label: "E-commerce" },
            { value: "business", label: "Business" },
            { value: "social media", label: "Social Media" },
            { value: "portfolio", label: "Portfolio" },
            { value: "education", label: "Education" },
          ],
          serviceOptions,
          setServiceOptions
        )}

        {renderDropdown(
          "seller",
          "Seller Details",
          [
            { value: "top rated seller", label: "Top Rated Seller" },
            { value: "level-1", label: "Level-1" },
            { value: "level-2", label: "Level-2" },
            { value: "new seller", label: "New Seller" },
          ],
          sellerLevels,
          setSellerLevels
        )}

        {renderDropdown(
          "budget",
          "Budget",
          [
            { value: "under300", label: "Under ₹300" },
            { value: "midrange", label: "₹300 - ₹800" },
            { value: "above900", label: "Above ₹900" },
          ],
          budgetRange,
          setBudgetRange
        )}

        {renderDropdown(
          "delivery",
          "Delivery Time",
          [
            { value: "24hr", label: "Express 24 Hr" },
            { value: "3days", label: "Up to 3 Days" },
            { value: "7days", label: "Up to 7 Days" },
            { value: "", label: "Anytime" },
          ],
          deliveryTime,
          setDeliveryTime
        )}
      </div>

      {/* Gig Cards */}
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {filteredGigs.length > 0 ? (
          filteredGigs.map((gig) => (
            <div key={gig._id} className="w-[260px] border rounded-lg shadow bg-white">
              {gig.images?.[0] && (
                <img
                  src={gig.images[0]}
                  alt="Gig"
                  className="w-full h-[160px] object-cover rounded-t-lg"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{gig.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{gig.description}</p>
                <p className="text-green-600 font-medium mt-1 mb-2">₹ {gig.price}</p>
                <Link
                  to={`/gig/${gig._id}`}
                  className="text-blue-600 text-sm hover:underline"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-10">No gigs match the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default GigList;
