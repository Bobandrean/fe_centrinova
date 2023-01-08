import {
    ref,
    computed
} from 'vue'
import {
    defineStore
} from 'pinia'
import SERVICE from "@/service/comment.js"

export const useCommentStore = defineStore('comment', () => {
    const comment = ref([])

    const getComment = computed(() => comment.value)

    const setComment = (data) => {
        comment.value = data
    }

    async function fetchComment(id) {
        try {

            const res = await SERVICE.getComment({
                id
            })

            setComment(res.data)

        } catch (error) {
            console.error(error)
        }
    }

    async function createComment(id, payload) {
        try {

            const res = await SERVICE.createComment({
                id,
                payload
            })
            return res;

        } catch (error) {
            console.error(error)
        }
    }

    async function deleteComment(id, id_blog) {
        try {

            const res = await SERVICE.deleteComment({
                id,
                id_blog
            })
            return res;

        } catch (error) {
            console.error(error)
        }
    }

    return {
        fetchComment,
        createComment,
        getComment,
        deleteComment
    }
})