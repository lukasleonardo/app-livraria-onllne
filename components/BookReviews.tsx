'use client'
import { useState } from "react"
import { useSession } from "next-auth/react"
import { Star } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


interface Review {
    id: number
    userId: string
    userName: string
    rating: number
    comment: string
}
interface BookReviewsProps {
    bookId: number
}

const fetchReviews = async (bookId: number) => {
  // In a real app, this would be an API call
  return JSON.parse(localStorage.getItem(`reviews-${bookId}`) || "[]")
}

const addReview = async (bookId: number, review: Omit<Review, "id">):Promise<Review> => {
  const reviews = await fetchReviews(bookId)
  const newReview = { id: reviews.length + 1, ...review }
  const updateReview = [...reviews, newReview]
  localStorage.setItem(`reviews-${bookId}`, JSON.stringify(updateReview))
  return newReview
}
export default function BookReviews({bookId}:BookReviewsProps){
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const {data:session} = useSession()
    const queryClient = useQueryClient()
    const {data:reviews = [], isLoading} = useQuery(
      {
        queryKey: ["reviews", bookId],
        queryFn: () => fetchReviews(bookId),
        initialData: [],
      }
    )

    const addReviewMutation = useMutation({
      mutationFn: (newReview: Omit<Review, "id">) => addReview(bookId, newReview),
      onSuccess: () => {
        queryClient.invalidateQueries<any>(["reviews", bookId]);
        setRating(0);
        setComment('');
      },
    });

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault()
        if(!session){
            alert("You must be logged in to submit a review")
            return
        }
        addReviewMutation.mutate({
          userId: session.user?.id || "", 
          userName: session.user?.name || "", 
          rating, comment
        })
        

    }


    if(isLoading) return <div>Loading...</div>

    return (
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4 text-foreground">Customer Reviews</h3>
        {reviews.map((review:Review) => (
          <div key={review.id} className="mb-4 p-4 border rounded themed-bg">
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
              <span className="font-bold text-foreground">{review.userName}</span>
            </div>
            <p className="text-foreground">{review.comment}</p>
          </div>
        ))}
        {session && (
          <form onSubmit={handleSubmitReview} className="mt-4">
            <div className="mb-4">
              <label className="block mb-2 text-foreground">Your Rating:</label>
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
              <label htmlFor="comment" className="block mb-2 text-foreground">
                Your Review:
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 border rounded themed-input"
                rows={4}
              />
            </div>
            <button type="submit" className="themed-button py-2 px-4 rounded">
              Submit Review
            </button>
          </form>
        )}
      </div>
    )
}