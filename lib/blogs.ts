import { join } from "path"
import fs from 'fs'
import matter from "gray-matter"
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'



/*------markdownToHtml------*/
const markdownToHtml = async (markdown: string) => {
    const result = await remark().use(html).use(remarkGfm).process(markdown)
    return result.toString()
}

/*------getDir------*/
const getDir = (path:string) => join(process.cwd(), path)
const BLOG_DIR = getDir("/contents/blogs")

/*------getFileNames------*/
const getFileNames = (dir: string) => {
    return fs.readdirSync(dir)
}

/*------getBlogFileNames------*/
const getBlogFileNames = () => {
    return getFileNames(BLOG_DIR)
}

/*------getItemInPath------*/
const getItemInPath = (filePath: string) => {
    const fileContent = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContent)
    return {...data, content} as Blog
}

/*------getBlog------*/
const getBlog = (name: string) => {
    const blog = getItemInPath(join(BLOG_DIR, name))
    blog.slug = name.replace(/\.md$/, "")
    return blog
}

/*------getBlogs------*/
const getBlogs = (): Blog[] => {
    const names = getBlogFileNames()
    const items = names.map(getBlog)
    return items
}

/*------getBlogBySlug------*/
const getBlogBySlug = async (slug: string) => {
    const fileName = slug + '.md'
    const blog = getBlog(fileName)
    blog.content = await markdownToHtml(blog.content)
    return blog
}


export {
    getBlogFileNames,
    getBlogs,
    getBlogBySlug
}