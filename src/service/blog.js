import Api from '@/utils/api.js'

class BlogServices {
    async getBlog() {
        const res = await Api.doGet(`v1/public_blog/index`)
        // console.debug('GET FETCH', res)
        return res
    }

    async detailBlog({
        id
    }) {
        const res = await Api.doGet(`v1/public_blog/detail/${id}`)
        return res
    }

    async createBlog({
        payload
    }) {
        const formData = new FormData()
        formData.append('judul', payload.judul)
        formData.append('short_content', payload.short_content)
        formData.append('entry', payload.entry)
        formData.append('image', payload.image[0])

        const res = await Api.doPost(`v1/blog/create`, formData)
        return res
    }

    async updateBlog({
        id,
        payload
    }) {

        const formData = new FormData()
        formData.append('judul', payload.judul)
        formData.append('short_content', payload.short_content)
        formData.append('entry', payload.entry)
        formData.append('image', payload.image[0])

        const res = await Api.doPost(`v1/blog/update/${id}`, payload)
        return res
    }

    async deleteBlog({
        id
    }) {
        const res = await Api.doPost(`v1/blog/delete/${id}`)
        return res
    }
}

export default new BlogServices()