import Image from "next/image"

export function ArticleCard({ title, description, image, date, tags, likes }) {
  const badgeStyles = [
    "info",
    "success",
    "warning",
    "error",
    "accent",
    "primary",
  ]

  return (
    <div className="card w-72 md:w-96 shadow-lg shadow-primary">
      <figure>
        <img
          //src="https://api.lorem.space/image/shoes?w=400&h=225"
          src={image}
          alt={`imagen-${title}`}
        />
      </figure>
      <h3 className="card-title bg-primary py-3 px-4 text-2xl uppercase">
        {title}
      </h3>
      <div className="card-body max-h-64 py-3">
        <p className="font-light text-sm">{date}</p>
        <p className="text-lg overflow-ellipsis overflow-hidden">
          {description}
        </p>
      </div>
      <div className="card-actions justify-end my-1 px-4">
        {likes} <Image src="/icons/vs.png" width={24} height={24} />
      </div>
      <div className="card-actions justify-end my-5 px-4">
        <div className="hidden badge-accent badge-warning badge-info badge-success badge-error badge-primary"></div>
        {tags.map((tag, index) => (
          <div
            className={`badge badge-${badgeStyles[index]} px-2 py-2`}
            key={tag}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  )
}
