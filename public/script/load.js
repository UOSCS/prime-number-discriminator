const resultBtn = document.getElementById("btn")

resultBtn
.addEventListener("click", () => {
    const text = document.getElementById("input").value
    // POST
    fetch("/result", {
        method: "POST",
        body: JSON.stringify({
            text: text,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(async (response) => {
        const element = await response.json()
        const last = document.getElementById("last")
        const rank = document.getElementById("rank")

        if(!element.last)
            throw new Error("Enter a positive integer")
        else {
            rank.innerHTML = ""
            updateRank(rank, element.rank)
            updateLast(last, element.last)
        }
    })
    .catch (error => alert(error))
})