import { getBlogs } from "@/lib/blogs"
import Image from "next/image"
import Link from "next/link"
import { use } from "react"



const getInitialBlogs = async () => {
  const fileNames = getBlogs()
  return fileNames
}



export default function Home() {
  const blogs = use(getInitialBlogs())

  return (
    <main>
      <h1 className='text-center py-6 text-2xl'>Blogs</h1>
      <div className="w-full border container grid grid-cols-fluid mx-auto gap-5">
        {
          blogs.map(blog => {
            return (
              <Link href={`/blog/${blog.slug}`} key={blog.slug}>
                <Image src={blog.coverImage} alt='img' width={200} height={200} className='w-full object-cover h-[200px]' />
                <span className='text-sm text-gray-400'>{blog.title}</span>
                <p>{blog.description}</p>
              </Link>
            )
          })
        }
      </div>
    </main>
  )
}
