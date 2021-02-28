function updateRank(parent, result) {
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

function updateLast(parent, element) {
    const newTr = document.createElement("tr")
    const newTimeTd = document.createElement("td")
    const newNumTd = document.createElement("td")
    const newOutcomeTd = document.createElement("td")
    const timeTdText = document.createTextNode(element.time.slice(11, 16))
    const numTdText = document.createTextNode(element.num)
    const outcomeTdText = document.createTextNode(element.outcome)
    const firstChild = document.querySelector("#last > tr")
    const lastChild = document.querySelector("#last > tr:last-child")

    newTimeTd.appendChild(timeTdText)
    newNumTd.appendChild(numTdText)
    newOutcomeTd.appendChild(outcomeTdText)
    newTr.appendChild(newTimeTd)
    newTr.appendChild(newNumTd)
    newTr.appendChild(newOutcomeTd)

    parent.insertBefore(newTr, firstChild)
    parent.removeChild(lastChild)
}