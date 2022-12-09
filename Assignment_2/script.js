let expr = ''

function solve(e){
    let bot = document.getElementById("bottombar")
    let top = document.getElementById("expr")

    expr = bot.innerText

    top.innerText = expr + "="

    function filter(e){
        e = e.replace("x", '*')
        e = e.replace("sin(", "sin(deg ")
        e = e.replace("cos(", "cos(deg ")
        e = e.replace("tan(", "tan(deg ")
        e = e.replace("E", "*10^")
        console.log(e)
        let new_e = ""
        let stack = []
        let l, r = 0
        for(let i=0;i<e.length;i++){
            if(e[i] == "n" && i>0 && e[i-1] == "l"){
                new_e += "og"
                stack.push((l, r))
                l = 1
                r = 0
                continue
            }else if(e[i]==")"){
                r++
                if(r==l){
                    l,r = stack.pop()
                    new_e += ", e)"
                    continue
                }
            }else if(e[i]=="("){
                l++
            }
            new_e += e[i]
        }

        return new_e
    }

    try {
        let ans = math.eval(filter(expr))
        bot.innerText = ans
        expr = ans
    } catch (error) {
        bot.innerText = "ERROR"
        expr = ""
    }   
}

function onClick(input){
    let top = document.getElementById("expr")
    let bot = document.getElementById("bottombar")
    if(input=="AC" && bot.innerText=="") {
        top.innerText = expr
    }else if(input=="AC"){
        expr = ""
        bot.innerText = expr
    }else{
        expr+=input
        bot.innerText = expr
    }
}