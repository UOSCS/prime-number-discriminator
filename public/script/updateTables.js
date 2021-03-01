const resultBtn = document.getElementById("btn")

resultBtn
.addEventListener("click", () => {
    const text = document.getElementById("input").value
    
    document.getElementById("input").value = ""
    document.getElementById("input").focus()

    if(text > Number.MAX_SAFE_INTEGER) {
        alert(`Error: A safe range of integer: 1 ~ ${Number.MAX_SAFE_INTEGER}`)
    } else {
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
    
            if(!element.last) {
                throw new Error("Enter a positive integer")
            }
            else {
                updateRank(element.rank)
                updateLast(element.last)
            }
        })
        .catch (error => alert(error))
    }
})