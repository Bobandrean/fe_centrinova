import {
    ref,
    computed
} from 'vue'
import {
    defineStore
} from 'pinia'
import SERVICE from "@/service/blog.js"

export const useBlogStore = defineStore('blog', () => {
    const blog = ref([])
    const detailBlog = ref({});

    const getBlog = computed(() => blog.value)
    const getDetailBlog = computed(() => detailBlog.value)

    const setBlog = (data) => {
        blog.value = data
    }

    const setDetailBlog = (data) => {
        detailBlog.value = data
    }

    async function fetchBlog() {
        try {

            const res = await SERVICE.getBlog()

            setBlog(res.data)

        } catch (error) {
            console.error(error)
        }
    }

    async function fetchDetailBlog(id) {
        try {

            const res = await SERVICE.detailBlog({
                id
            })

            setDetailBlog(res.data)

        } catch (error) {
            console.error(error)
        }
    }

    async function createBlog(payload) {
        try {

            const res = await SERVICE.createBlog({
                payload
            })

            return res

        } catch (error) {
            console.error(error)
        }
    }

    async function updateBlog(id, payload) {
        try {

            const res = await SERVICE.updateBlog({
                id,
                payload
            })

            return res

        } catch (error) {
            console.error(error)
        }
    }

    async function deleteBlog(id) {
        try {

            const res = await SERVICE.deleteBlog({
                id
            })

            return res

        } catch (error) {
            console.error(error)
        }
    }

    return {
        getBlog,
        getDetailBlog,
        fetchBlog,
        fetchDetailBlog,
        createBlog,
        deleteBlog,
        updateBlog
    }
})