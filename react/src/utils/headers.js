export const headersApplication = async() => {
    try {
        const header = {
            "Authorization": sessionStorage?.getItem("auth"),
            "Content-Type": "application/json"
        }
        return header
    } catch (error) {
        console.log(error)
    }
}