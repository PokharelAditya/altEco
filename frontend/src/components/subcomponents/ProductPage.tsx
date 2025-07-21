import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Heart, Clock, X } from 'lucide-react';

function ProductPage() {
  const { id } = useParams();
  const [count, setCount] = useState(0);
  const startTimeRef = useRef(0);
  const intervalRef = useRef(0);
  const location = useLocation();
  const product = location.state?.product;
  const isFirstRender = useRef(true);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const navigate = useNavigate();
  const ratingRef = useRef(null); // Initialize with null
  const [isFavorited, setIsFavorited] = useState(false);
  const [isReviewLater, setIsReviewLater] = useState(false);
  const [isNotInterested, setIsNotInterested] = useState(false);
  
  // Loading states for buttons
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false);
  const [isLoadingReviewLater, setIsLoadingReviewLater] = useState(false);
  const [isLoadingNotInterested, setIsLoadingNotInterested] = useState(false);

  // Fallback image URL
  const fallbackImageUrl = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop";

  const formatEcoScore = (score) => {
    if (score == null || score == undefined || isNaN(Number(score)))
      return 'N/A';
    return Number(score).toFixed(1)
  }

  const getEcoScoreColor = (score) => {
    if (!score || score < 0) return '#9ca3af'; // Gray for invalid scores
    if (score >= 9) return '#22c55e'; // Green
    if (score >= 7) return '#84cc16'; // Light green
    if (score >= 5) return '#eab308'; // Yellow
    return '#ef4444'; // Red
  };

  function increaseCount() {
    setCount((count) => count + 1);
  }

  useEffect(()=>{
    const getCharacteristics = async () => {
      try{
        const response = await fetch(`/api/check-characteristics?productId=${product.product_id}`)
        const data = await response.json()
        setIsReviewLater(data.reviewLater)
        setIsFavorited(data.favorites)
      }
      catch(err){
        console.error(err)
      }
    } 
    getCharacteristics()
  },[])

  // API functions for favorites
  const addToFavorites = async (productId) => {
    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productId
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add to favorites')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error adding to favorites:', error)
      throw error
    }
  }

  const removeFromFavorites = async (productId) => {
    try {
      const response = await fetch(`/api/favorites`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productId
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to remove from favorites')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error removing from favorites:', error)
      throw error
    }
  }

  // API functions for review later
  const addToReviewLater = async (productId) => {
    try {
      const response = await fetch(`/api/review-later`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productId
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add to review later')
      }
      
      return await response.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const removeFromReviewLater = async (productId) => {
    try {
      const response = await fetch(`/api/review-later`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productId
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to remove from review later')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error removing from review later:', error)
      throw error
    }
  }

  // API function for not interested
  const addToNotInterested = async (productId) => {
    try {
      const response = await fetch(`/api/not-interested`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productId
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add to not interested')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error adding into not interested:', error)
      throw error
    }
  }

  // Button handlers
  const handleFavoriteClick = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isLoadingFavorite) return
    
    setIsLoadingFavorite(true)
    
    try {
      if (isFavorited) {
        await removeFromFavorites(product.product_id)
        setIsFavorited(false)
      } else {
        await addToFavorites(product.product_id)
        setIsFavorited(true)
      }
    } catch (error) {
      console.error('Failed to update favorite status:', error)
    } finally {
      setIsLoadingFavorite(false)
    }
  }

  const handleReviewLater = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isLoadingReviewLater) return
    
    setIsLoadingReviewLater(true) 
    try {
      if (isReviewLater) {
        await removeFromReviewLater(product.product_id)
        setIsReviewLater(false)
      } else {
        await addToReviewLater(product.product_id)
        setIsReviewLater(true)
      }
    } catch (error) {
      console.error('Failed to update review later status:', error)
    } finally {
      setIsLoadingReviewLater(false)
    } 
  }

  const handleNotInterestedClick = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isLoadingNotInterested) return
    
    setIsLoadingNotInterested(true)
    
    try {
      if (!isNotInterested) {
        await addToNotInterested(product.product_id)
        setIsNotInterested(true)
        // Navigate to home after marking as not interested
        navigate("/home")
      }
    } catch (error) {
      console.error('Failed to update not interested status:', error)
    } finally {
      setIsLoadingNotInterested(false)
    }
  }

  // Send analytics data to server
  const sendAnalytics = async (duration, currentRating) => {
    try {
      const response = await fetch(`/api/product/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          duration: duration,
          action: "viewed",
          rating: currentRating
        }),
      });
      const responseData = await response.text();
    } catch (error) {
      console.error("Error sending duration", error);
    }
  };

  // Initialize timer
  useEffect(() => {
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(increaseCount, 1000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  // Sync rating state with ref
  useEffect(() => {
    ratingRef.current = rating;
  }, [rating]);

  // Fetch existing rating on component mount
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await fetch(`/api/product/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        if (data.rating) {
          setRating(data.rating);
        }
      } catch (error) {
        console.error('Error fetching rating:', error);
      }
    };
    fetchRating();
  }, [id]);

  // Handle explicit submit
  const handleSubmit = async () => {
    const endTime = Date.now();
    const duration = (endTime - startTimeRef.current) / 1000;
    
    // Send analytics with current rating before navigating
    await sendAnalytics(duration, rating);
    
    // Clear interval
    clearInterval(intervalRef.current);
    
    // Navigate to home
    navigate("/home");
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Product not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image Section */}
            <div className="space-y-4">
              <div className="relative group">
                <div className="aspect-square w-full bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <img 
                    src={product.image_url || fallbackImageUrl}
                    alt={product.name || 'Product image'}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {e.target.src = fallbackImageUrl}}
                  />
                </div>
                
                {/* Eco Score Badge on Image */}
                <div 
                  className="absolute top-4 left-4 text-white px-3 py-2 rounded-lg font-bold text-lg shadow-lg backdrop-blur-sm"
                  style={{ backgroundColor: getEcoScoreColor((product.ecoscore || product.eco_score)/10) }}
                >
                  Eco Score: {formatEcoScore((product.ecoscore || product.eco_score)/10)}/10
                </div>

                {/* Action Buttons on Image */}
                <div className="absolute top-4 right-4 flex flex-col gap-3">
                  {/* Favorite Button */}
                  <button
                    onClick={handleFavoriteClick}
                    disabled={isLoadingFavorite}
                    className={`p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isFavorited 
                        ? 'bg-red-500 text-white shadow-lg' 
                        : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500 shadow-md'
                    }`}
                    title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    {isLoadingFavorite ? (
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                    )}
                  </button>

                  {/* Review Later Button */}
                  <button
                    onClick={handleReviewLater}
                    disabled={isLoadingReviewLater}
                    className={`p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isReviewLater 
                        ? 'bg-blue-500 text-white shadow-lg' 
                        : 'bg-white/90 text-gray-600 hover:bg-white hover:text-blue-500 shadow-md'
                    }`}
                    title={isReviewLater ? 'Remove from review later' : 'Add to review later'}
                  >
                    {isLoadingReviewLater ? (
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Clock className="w-5 h-5" />
                    )}
                  </button>

                  {/* Not Interested Button */}
                  <button
                    onClick={handleNotInterestedClick}
                    disabled={isLoadingNotInterested}
                    className={`p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isNotInterested 
                        ? 'bg-gray-500 text-white shadow-lg' 
                        : 'bg-white/90 text-gray-600 hover:bg-white hover:text-gray-500 shadow-md'
                    }`}
                    title={isNotInterested ? 'Marked as not interested' : 'Mark as not interested'}
                  >
                    {isLoadingNotInterested ? (
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <X className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="space-y-6">
              {/* Brand */}
              <div className="text-blue-600 dark:text-blue-400 text-sm font-medium uppercase tracking-wide">
                {product.brand || product.brands || 'Unknown Brand'}
              </div>

              {/* Product Title */}
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                {product.name || product.product_name || 'Product Name Not Available'}
              </h1>

              {/* Eco Score Section */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">Eco Score:</span>
                  <div 
                    className="px-3 py-1 rounded-full text-white font-bold text-sm"
                    style={{ backgroundColor: getEcoScoreColor((product.ecoscore || product.eco_score)/10) }}
                  >
                    {formatEcoScore((product.ecoscore || product.eco_score)/10)}/10
                  </div>
                </div>
              </div>

              {/* Action Status Indicators */}
              <div className="flex items-center gap-4">
                {isFavorited && (
                  <div className="flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
                    <Heart className="fill-current w-4 h-4" />
                    <span className="text-sm font-medium">Favorited</span>
                  </div>
                )}
                {isReviewLater && (
                  <div className="flex items-center gap-2 text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">Review Later</span>
                  </div>
                )}
              </div>

              {/* Product Description */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Product Description</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                  {product.description || 'No description available for this product.'}
                </p>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <span className="text-gray-600 dark:text-gray-400 font-medium">Category:</span>
                <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium border border-green-200 dark:border-green-700 ml-2">
                  {product.category || 'Uncategorized'}
                </span>
              </div>

              {/* Rating Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Rate this Product</h3>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((star, idx) => {
                    const ratingValue = idx + 1;
                    return (
                      <label key={idx} className="cursor-pointer">
                        <FaStar
                          className="transition-colors duration-200 hover:scale-110"
                          color={ratingValue <= (hover || rating) ? "#fbbf24" : "#d1d5db"}
                          size={32}
                          onMouseEnter={() => setHover(ratingValue)}
                          onMouseLeave={() => setHover(null)}
                        />
                        <input
                          type="radio"
                          name="rating"
                          className="hidden"
                          value={ratingValue}
                          onChange={() => {
                            setRating(ratingValue);
                          }}
                        />
                      </label>
                    );
                  })}
                  {rating && (
                    <span className="ml-3 text-gray-600 dark:text-gray-400 text-sm">
                      {rating} out of 5 stars
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Submit Rating
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;