fetch("/last")
.then(async (response) => {
    const result = await response.json()
    const parent = document.getElementById("last")
    
    getLast(parent, result)
})

fetch("/rank")
.then(async (response) => {
    const result = await response.json()
    const parent = document.getElementById("rank")

    getRank(result, parent)
})

const resultBtn = document.getElementById("btn")

resultBtn
.addEventListener("click", () => {
    const text = document.getElementById("input").value
    // POST
    fetch("/update_last", {
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
        if(typeof(element) == 'string')
            throw element
        const parent = document.getElementById("last")

        updateLast(parent, element)
    })
    .then(() => {
        fetch("/rank")
        .then(async (response) => {
            const result = await response.json()
            const parent = document.getElementById("rank")

            parent.innerHTML = ""

            getRank(result, parent)
        })
    })
    .catch (err => alert(err))
})