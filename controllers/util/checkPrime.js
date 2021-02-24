module.exports = function (num) {
    let result = ""

    if(num != parseInt(num) || num < 1)
        result = null
    else if(num == 1)
        result = "False"
    else if(num <= 3)
        result = "True"
    else {
        let check = true
        
        const squareRoot = parseInt(Math.sqrt(num))
        for(let i = 2; i <= squareRoot; i++) {
            if((num % i) == 0) {
                check = false
                break
            }
        }
        if(check)
            result = "True"
        else
            result = "False"
    }

    return result
}