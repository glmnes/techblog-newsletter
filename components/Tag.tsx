import Link from 'next/link'

interface TagProps {
  tag: string
  count?: number
  isActive?: boolean
}

export default function Tag({ tag, count, isActive = false }: TagProps) {
  return (
    <Link
      href={`/blog?tag=${encodeURIComponent(tag)}`}
      className={`
        inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium
        transition-all duration-200 hover:scale-105
        ${isActive 
          ? 'bg-indigo-600 text-white shadow-md' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }
      `}
    >
      <span>{tag}</span>
      {count !== undefined && (
        <span className={`
          text-xs px-1.5 py-0.5 rounded-full
          ${isActive ? 'bg-indigo-500' : 'bg-gray-200'}
        `}>
          {count}
        </span>
      )}
    </Link>
  )
}
