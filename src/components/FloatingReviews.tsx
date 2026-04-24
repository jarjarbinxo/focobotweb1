import { floatingReviews } from '../data/copy'
import type { Lang } from '../data/copy'

interface FloatingReviewsProps {
  lang: Lang
}

function ReviewCard({ review }: { review: typeof floatingReviews[number] }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3 flex-shrink-0">
      {/* stars */}
      <div className="flex gap-0.5 text-orange text-xs">
        {'★'.repeat(review.stars)}
      </div>
      {/* quote */}
      <p className="text-gray-600 text-sm leading-relaxed">"{review.text}"</p>
      {/* attribution */}
      <div className="border-t border-gray-50 pt-3">
        <div className="text-gray-900 font-semibold text-xs">{review.name}</div>
        <div className="text-gray-400 text-xs">{review.company}</div>
      </div>
    </div>
  )
}

export default function FloatingReviews({ lang }: FloatingReviewsProps) {
  const heading = lang === 'ar' ? 'ماذا يقولون عن فوكوبوت' : 'What businesses say'

  const all = [...floatingReviews]
  const col1 = all.slice(0, 8)
  const col2 = all.slice(8, 16)
  const col3 = all.slice(16, 24)

  return (
    <section className="py-24 px-6 bg-[#f9f8f6] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 text-center">
          {heading}
        </h2>

        <div className="relative mt-16" style={{ height: '500px' }}>
          {/* gradient masks top + bottom for fade effect */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#f9f8f6] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f9f8f6] to-transparent z-10 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full overflow-hidden">
            {[
              { items: col1, duration: 60 },
              { items: col2, duration: 80 },
              { items: col3, duration: 50 },
            ].map((col, ci) => (
              <div
                key={ci}
                className={`${ci === 1 ? '' : ci === 2 ? 'hidden md:block' : ''} overflow-hidden`}
              >
                <div
                  className="reviews-col flex flex-col gap-4"
                  style={{ animationDuration: `${col.duration}s` }}
                >
                  {[...col.items, ...col.items].map((review, i) => (
                    <ReviewCard key={i} review={review} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
