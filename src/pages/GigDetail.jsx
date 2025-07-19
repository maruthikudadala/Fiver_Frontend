import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MockPayButton from "./MockPayButton";
import FreelancerLayout from "../components/FreelancerLayout";
import { API_URL } from "../utils/apiPath";

const GigDetail = () => {
  const { id } = useParams();
  const [gig, setGig] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchGig = async () => {
      const res = await fetch(`${API_URL}/api/gigs/getGigById/${id}`);
      const data = await res.json();
      setGig(data);
    };

    const fetchReviews = async () => {
      const res = await fetch(`${API_URL}/api/reviews/${id}`);
      const data = await res.json();
      setReviews(data);
    };

    fetchGig();
    fetchReviews();
  }, [id]);

  if (!gig) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      <FreelancerLayout  />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-[90px] px-4">
        <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-6">
          {gig.images && gig.images.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={`Gig ${index}`}
              className="w-full h-auto mb-4 rounded"
            />
          ))}
          <h1 className="text-2xl font-bold mb-4">{gig.title}</h1>
          <p className="mb-2 text-gray-600">Category: {gig.category}</p>
          <p className="mb-4 text-gray-800">{gig.description}</p>

          <p className="font-semibold mb-2">Delivery: {gig.deliveryTime} days</p>
          <p className="text-xl font-bold text-green-600 mb-4">₹{gig.price}</p>

          <p className="text-gray-700 mb-2">By: {gig.createdBy?.name} ({gig.createdBy?.role})</p>

          <MockPayButton gigId={gig._id} price={gig.price} />

          <Link
            to={`/chat/${gig.createdBy?._id}`}
            className="text-blue-600 underline mt-4 inline-block"
          >
            Chat with Freelancer
          </Link>

          {/* ⭐ REVIEWS SECTION */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-3">Reviews</h3>
            {reviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              reviews.map((review) => (
                <div key={review._id} className="mb-4 border-b pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{review.userId?.name || "User"}</span>
                    <span className="text-yellow-500">
                      {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GigDetail;
