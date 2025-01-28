'use client'
import { useState } from "react"
import { useSession } from "next-auth/react"
import { Star } from "lucide-react"

interface Review {
    id: number
    userId: number
    userName: string
    rating: number
    comment: string
}
interface BookReviewsProps {
    bookId: number
    initialReviews: Review[]
}

export default function BookReviews({bookId,initialReviews}:BookReviewsProps){
    const [reviews, setReviews] = useState<Review[]>(initialReviews)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const {data:session} = useSession()

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault()
        if(!session){
            alert("You must be logged in to submit a review")
            return
        }

        const response = await fetch("/api/reviews", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bookId, rating, comment }),
        })

        if (response.ok) {
            const newReview = await response.json()
            setReviews([...reviews, newReview])
            setRating(0)
            setComment('')
        }else {
            alert("Error submitting review")
        }

    }


    return(
        <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
      {reviews.map((review) => (
        <div key={review.id} className="mb-4 p-4 border rounded">
          <div className="flex items-center mb-2">
            <div className="flex mr-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={star <= review.rating ? "text-yellow-400" : "text-gray-300"}
                  fill={star <= review.rating ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="font-bold">{review.userName}</span>
          </div>
          <p>{review.comment}</p>
        </div>
      ))}
      {session && (
        <form onSubmit={handleSubmitReview} className="mt-4">
          <div className="mb-4">
            <label className="block mb-2">Your Rating:</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={star <= rating ? "text-yellow-400 cursor-pointer" : "text-gray-300 cursor-pointer"}
                  fill={star <= rating ? "currentColor" : "none"}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block mb-2">
              Your Review:
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              rows={4}
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Submit Review
          </button>
        </form>
      )}
    </div>
    )
}