import { getBlogBySlug, getBlogs } from "@/lib/blogs"
import Image from "next/image";
import { use } from "react"


type Props = {
    params: {
        slug: string;
    }
}

const getInitialBlog = async (slug: string) => {
    const blog = getBlogBySlug(slug)
    return blog
}


const page = ({ params}: Props) => {
  const blog = use(getInitialBlog(params.slug))

  return (
    <div className="w-2/3 m-auto py-8">

        <h1 className="py-3 text-2xl">{blog.title}</h1>

        <Image src={blog.coverImage} alt='img' width={800} height={400} className="object-cover" />

        <article className="prose lg:prose-xl">
            <div dangerouslySetInnerHTML={{__html: blog.content}} />
        </article>
        
    </div>
  )
}

export const generateStaticParams = async () => {
    const blogs = getBlogs()
    return blogs.map(blog => ({
        slug: blog.slug
    }))
}
export default page