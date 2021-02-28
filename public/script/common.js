function updateRank(factors) {
    const parent = document.getElementById("rank")
    let ranking = 1

    parent.innerHTML = ""

    factors.forEach((element) => {
        const newTr = document.createElement("tr")
        const newRankingTd = document.createElement("td")
        const newNumTd = document.createElement("td")
        const newOutcomeTd = document.createElement("td")
        const newCountTd = document.createElement("td")
        const newFactorsTd = document.createElement("td")
        const newCheckbox = document.createElement("input")
        const rankingTdText = document.createTextNode(ranking)
        const numTdText = document.createTextNode(element.num)
        const outcomeTdText = document.createTextNode(element.outcome)
        const countTdText = document.createTextNode(element.count)

        newRankingTd.appendChild(rankingTdText)
        newNumTd.appendChild(numTdText)
        newOutcomeTd.appendChild(outcomeTdText)
        newCountTd.appendChild(countTdText)
        newCheckbox.setAttribute("class", "checkbox")
        newCheckbox.setAttribute("type", "checkbox")
        newCheckbox.setAttribute("value", element.num)
        addEventLis(newCheckbox)
        newFactorsTd.appendChild(newCheckbox)

        newTr.appendChild(newRankingTd)
        newTr.appendChild(newNumTd)
        newTr.appendChild(newOutcomeTd)
        newTr.appendChild(newCountTd)
        newTr.appendChild(newFactorsTd)

        parent.appendChild(newTr)

        ranking = ranking + 1
    })
}

function updateLast(element) {
    const parent = document.getElementById("last")
    const newTr = document.createElement("tr")
    const newTimeTd = document.createElement("td")
    const newNumTd = document.createElement("td")
    const newOutcomeTd = document.createElement("td")
    const newFactorsTd = document.createElement("td")
    const newCheckbox = document.createElement("input")
    const timeTdText = document.createTextNode(element.time.slice(11, 16))
    const numTdText = document.createTextNode(element.num)
    const outcomeTdText = document.createTextNode(element.outcome)
    const firstChild = document.querySelector("#last > tr")
    const lastChild = document.querySelector("#last > tr:last-child")

    newTimeTd.appendChild(timeTdText)
    newNumTd.appendChild(numTdText)
    newOutcomeTd.appendChild(outcomeTdText)
    newCheckbox.setAttribute("class", "checkbox")
    newCheckbox.setAttribute("type", "checkbox")
    newCheckbox.setAttribute("value", element.num)
    addEventLis(newCheckbox)
    newFactorsTd.appendChild(newCheckbox)
    newTr.appendChild(newTimeTd)
    newTr.appendChild(newNumTd)
    newTr.appendChild(newOutcomeTd)
    newTr.appendChild(newFactorsTd)

    parent.insertBefore(newTr, firstChild)
    parent.removeChild(lastChild)
}

function factorize(num) {
    const factors = []

    while((num % 2) == 0) {
        num /= 2
        factors.push(2)
    }

    for(let i = 3; num != 1; i += 2) {
        if((num % i) == 0) {
            num /= i
            factors.push(i)
            i -= 2
        }
    }

    return factors
}

function popUpFactors(e) {
    const factors = factorize(e.target.defaultValue)
    const uniqueArr = [...new Set(factors)]
    const expoOfFactors = []
    const parent = e.path[3]
    const newTr = document.createElement("tr")
    const newTd = document.createElement("td")
    let html = `${e.target.defaultValue} = 1`

    uniqueArr.forEach(factor => {
        expoOfFactors.push(factors.filter(element => factor === element).length)
    })

    for(let i = 0; i < uniqueArr.length; i++) {
        if(expoOfFactors[i] != 1) {
            html += `×${uniqueArr[i]}<sup>${expoOfFactors[i]}</sup>`
        } else {
            html += `×${uniqueArr[i]}`
        }
    }

    newTd.setAttribute("colspan", e.path[2].cells.length)
    newTd.classList.add("fatorization")
    newTd.innerHTML = html
    newTr.appendChild(newTd)
    parent.insertBefore(newTr, e.path[2].nextSibling)
}

function removePopUp(e) {
    e.path[2].nextSibling.remove()
}

function addEventLis(element) {
    element.addEventListener("change", function (e) {
        if(this.checked) {
            popUpFactors(e)
        } else {
            removePopUp(e)
        }
    })
}