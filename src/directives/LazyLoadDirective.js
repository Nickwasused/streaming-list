// https://css-tricks.com/lazy-loading-images-with-vue-js-directives-and-intersection-observer/
export default {
    mounted: function(el) {
        function loadImage() {
            const imageElement = Array.from(el.children).find(
                (el) => el.nodeName === "IMG"
            )
            if (imageElement) {
                imageElement.addEventListener("load", () => {
                    setTimeout(() => el.classList.add("loaded"), 100)
                })
                imageElement.addEventListener("error", (e) =>
                    console.log(`error while handling image: ${e}`)
                )
                
                if (imageElement.dataset.url !== undefined) {
                    imageElement.src = imageElement.dataset.url
                }
            }
        }

        function handleIntersect(entries, observer) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    loadImage()
                    observer.unobserve(el)
                }
            })
        }

        function createObserver() {
            const options = {
                root: null,
                threshold: "0",
            }
            const observer = new IntersectionObserver(handleIntersect, options)
            observer.observe(el)
        }

        if (window["IntersectionObserver"]) {
            createObserver()
        } else {
            loadImage()
        }
    },
    updated: function(el) {
        function loadImage() {
            const imageElement = Array.from(el.children).find(
                (el) => el.nodeName === "IMG"
            )
            if (imageElement) {
                imageElement.addEventListener("load", () => {
                    setTimeout(() => el.classList.add("loaded"), 100)
                })
                
                imageElement.addEventListener("error", () =>
                    console.log("error")
                )

                if (imageElement.dataset.url !== undefined) {
                    imageElement.src = imageElement.dataset.url
                }
            }
        }

        function handleIntersect(entries, observer) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    loadImage()
                    observer.unobserve(el)
                }
            })
        }

        function createObserver() {
            const options = {
                root: null,
                threshold: "0",
            }
            const observer = new IntersectionObserver(handleIntersect, options)
            observer.observe(el)
        }

        if (window["IntersectionObserver"]) {
            createObserver()
        } else {
            loadImage()
        }
    },
}
