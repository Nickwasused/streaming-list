import { ref, customRef } from "vue"

// https://theroadtoenterprise.com/blog/how-to-create-a-debounced-ref-in-vue-3-using-composition-api

const debounce = (fn, delay = 0, immediate = false) => {
    let timeout: number
    return (...args) => {
        if (immediate && !timeout) fn(...args)
        clearTimeout(timeout)

        timeout = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

const useDebouncedRef = (initialValue, delay, immediate) => {
    const state = ref(initialValue)
    const debouncedRef = customRef((track, trigger) => ({
        get() {
            track()
            return state.value
        },
        set: debounce(
            (value) => {
                state.value = value
                trigger()
            },
            delay,
            immediate
        ),
    }))
    return debouncedRef
}

export default useDebouncedRef
