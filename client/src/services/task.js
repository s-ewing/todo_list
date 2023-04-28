export const getTasks = async (axios, accessToken) => {

    try {
        const res = await axios.get("/tasks", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const tasks = res.data;
        return tasks;
    } catch(err) {
        console.error(err);
    }
}