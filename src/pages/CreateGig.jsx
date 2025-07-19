import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/apiPath";

const CreateGig = () => {
  const { register, handleSubmit ,reset} = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < data.images.length; i++) {
          formData.append("images", data.images[i]);
        }
      } else {
        formData.append(key, data[key]);
      }
    });

    const res = await fetch(`${API_URL}/api/gigs/createGig`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    const result = await res.json();
    if (res.ok) {
      alert("Gig created!");
      reset(); 
      navigate("/freelancer/gigs"); 
    } else {
      alert(result.msg);
    }
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[600px] bg-white border border-gray-300 rounded-lg shadow-lg p-10 flex flex-col items-center">
        <h2 className="text-[28px] font-medium text-gray-800 mb-6 text-center">
          Create a New Gig
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center w-full"
        >
          {/* Title */}
          <div className="mb-4 w-full max-w-[480px]">
            <label className="block text-[18px] font-bold mb-1">Title</label>
            <input
              {...register("title")}
              placeholder="Title"
              className="w-full h-[40px] px-4 border border-gray-300 rounded text-[16px] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4 w-full max-w-[480px]">
            <label className="block text-[18px] font-bold mb-1">Description</label>
            <textarea
              {...register("description")}
              placeholder="Description"
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded text-[16px] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Price */}
          <div className="mb-4 w-full max-w-[480px]">
            <label className="block text-[18px] font-bold mb-1">Price (₹)</label>
            <input
              type="number"
              {...register("price")}
              placeholder="Enter price"
              className="w-full h-[40px] px-4 border border-gray-300 rounded text-[16px] focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Delivery Time */}
          <div className="mb-4 w-full max-w-[480px]">
            <label className="block text-[18px] font-bold mb-1">Delivery Time (Days)</label>
            <input
              type="number"
              {...register("deliveryTime")}
              placeholder="Delivery time in days"
              className="w-full h-[40px] px-4 border border-gray-300 rounded text-[16px] focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Category */}
          <div className="mb-4 w-full max-w-[480px]">
            <label className="block text-[18px] font-bold mb-1">Category</label>
            <input
              {...register("category")}
              placeholder="e.g. Web Development"
              className="w-full h-[40px] px-4 border border-gray-300 rounded text-[16px] focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mb-6 w-full max-w-[480px]">
            <label className="block text-[18px] font-bold mb-1">Images</label>
            <input
              type="file"
              {...register("images")}
              multiple
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn text-white bg-purple-600 hover:bg-purple-700 text-[18px] leading-[26px] font-semibold rounded-[8px] py-[10px] px-[20px] w-full max-w-[480px]"
          >
            Create Gig
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGig;
