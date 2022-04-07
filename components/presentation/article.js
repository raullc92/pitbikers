import React from "react"

export function Article({ title, description, image, data, tags, likes }) {
  const badgeStyles = [
    "info",
    "success",
    "warning",
    "error",
    "accent",
    "primary",
  ]

  return (
    <div className="card w-72 md:w-96 shadow-xl ">
      <figure>
        <img
          src="https://api.lorem.space/image/shoes?w=400&h=225"
          alt="Shoes"
        />
      </figure>
      <h3 className="card-title bg-primary py-3 px-4 text-2xl uppercase">
        {title}
      </h3>
      <div className="card-body h-64 py-3">
        <p className="font-light text-sm">{data}</p>
        <p className="text-lg overflow-ellipsis overflow-hidden">
          {description}
        </p>
      </div>
      <div className="card-actions justify-end my-1 px-4">{likes} Likes</div>
      <div className="card-actions justify-end my-5 px-4">
        {tags.map((tag, index) => (
          <div className={`badge badge-${badgeStyles[index]} px-2 py-2`}>
            {tag}
          </div>
        ))}
      </div>
    </div>
  )
}
