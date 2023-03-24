import React from "react"

interface MediaCardProps {
  title: string
  description: string
  kind: string
}

const MediaCard = ({ title, description, kind }: MediaCardProps) => {
  return (
    <div className="rounded-lg border border-gray-800 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-900 px-5 py-3">
      <h2 className="pb-2 pt-10 text-left text-xl font-bold text-gray-300">
        {title}
      </h2>
      <p className="text-justify">{description}</p>
    </div>
  )
}

export default MediaCard
