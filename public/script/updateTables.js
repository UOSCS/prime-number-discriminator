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

        document.getElementById("input").value = ""
        document.getElementById("input").focus()

        if(!element.last) {
            throw new Error("Enter a positive integer")
        }
        else {
            updateRank(element.rank)
            updateLast(element.last)
        }
    })
    .catch (error => alert(error))
})