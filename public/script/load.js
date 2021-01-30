fetch("/last")
.then(async (response) => {
    const result = await response.json()
    const parent = document.getElementById("last")
    result.forEach((element) => {
        const newTr = document.createElement("tr")
        const newTimeTd = document.createElement("td")
        const newNumTd = document.createElement("td")
        const newOutcomeTd = document.createElement("td")
        const timeTdText = document.createTextNode(element.time.slice(11, 16))
        const numTdText = document.createTextNode(element.num)
        const outcomeTdText = document.createTextNode(element.outcome)

        newTimeTd.appendChild(timeTdText)
        newNumTd.appendChild(numTdText)
        newOutcomeTd.appendChild(outcomeTdText)
        newTr.appendChild(newTimeTd)
        newTr.appendChild(newNumTd)
        newTr.appendChild(newOutcomeTd)

        parent.appendChild(newTr)
    })
})

fetch("/rank")
.then(async (response) => {
    const result = await response.json()
    const parent = document.getElementById("rank")

    updateRank(result, parent)
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
        const newTr = document.createElement("tr")
        const newTimeTd = document.createElement("td")
        const newNumTd = document.createElement("td")
        const newOutcomeTd = document.createElement("td")
        const timeTdText = document.createTextNode(element.time.slice(11, 16))
        const numTdText = document.createTextNode(element.num)
        const outcomeTdText = document.createTextNode(element.outcome)
        const parent = document.getElementById("last")
        const firstChild = document.querySelector("#last > tr")
        const lastChild = document.querySelectorAll("#last > tr")[9]

        newTimeTd.appendChild(timeTdText)
        newNumTd.appendChild(numTdText)
        newOutcomeTd.appendChild(outcomeTdText)
        newTr.appendChild(newTimeTd)
        newTr.appendChild(newNumTd)
        newTr.appendChild(newOutcomeTd)

        parent.insertBefore(newTr, firstChild)
        parent.removeChild(lastChild)
    })
    .catch (err => alert(err))
    .then(() => {
        const parent = document.getElementById("rank")

        while (parent.hasChildNodes())
            parent.removeChild(parent.firstChild)

        fetch("/rank")
        .then(async (response) => {
            const result = await response.json()
            
            updateRank(result, parent)
        })
    })
})

function updateRank(result, parent) {
    let ranking = 1
    result.forEach((element) => {
        const newTr = document.createElement("tr")
        const newRankingTd = document.createElement("td")
        const newNumTd = document.createElement("td")
        const newOutcomeTd = document.createElement("td")
        const newCountTd = document.createElement("td")
        const rankingTdText = document.createTextNode(ranking)
        const numTdText = document.createTextNode(element.num)
        const outcomeTdText = document.createTextNode(element.outcome)
        const countTdText = document.createTextNode(element.count)

        newRankingTd.appendChild(rankingTdText)
        newNumTd.appendChild(numTdText)
        newOutcomeTd.appendChild(outcomeTdText)
        newCountTd.appendChild(countTdText)

        newTr.appendChild(newRankingTd)
        newTr.appendChild(newNumTd)
        newTr.appendChild(newOutcomeTd)
        newTr.appendChild(newCountTd)

        parent.appendChild(newTr)

        ranking = ranking + 1
    })
}