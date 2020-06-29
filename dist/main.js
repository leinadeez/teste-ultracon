init()

let contraste = false
let textSize = 16

function reduzTexto() {
    if (textSize > 10) {
        textSize--
        document.querySelector('html').style.fontSize = textSize + "px"
    }    
}

function ampliaTexto() {
    if (textSize < 22) {
        textSize++
        document.querySelector('html').style.fontSize = textSize + "px"
    }    
}

function toggleContraste() {
    if (contraste) {
        contraste = false
        document.querySelector('body').classList.remove('contraste')
    } else {
        contraste = true
        document.querySelector('body').classList.add('contraste')
    }
    
}

function avancaSlide(lista) {
    let margin = parseInt(lista.style.marginLeft.slice(0,-2))
    let coverPerScreen = Math.floor(window.innerWidth / 154) 

    if (margin > -((lista.childElementCount - coverPerScreen+1) * 154)) {
        margin -= 154 
    }
    lista.style.marginLeft = margin + "px"
}

function voltaSlide(lista) {
    let margin = parseInt(lista.style.marginLeft.slice(0,-2))

    if (margin < 0) {
        margin += 154        
    } else if (margin < 0 && margin > -154) {
        margin = 0
    }    
    lista.style.marginLeft = margin + "px"
}

async function init() {
    let atracoes = await buscaAtracoes()
    popula(atracoes)    
}

async function buscaAtracoes() {
    let data
    try {
        await fetch(
            'https://sky-frontend.herokuapp.com/movies',
            {
                method: 'GET',
            }).then((response) => {                
                if(response.ok) {
                    console.log('Requisição respondida!')
                    data = response.json()
                }
            })
    } catch(error) {
        console.log('Erro na requisição:', error)
    } finally {
        console.log('Requisição concluída.')
    }    
    return data
}

const popula = (atracoes) => {
    let categorias = []
    
    atracoes[2].movies.forEach((obj) => {
        let movieCategories = obj.categories.split(', ') 
         movieCategories.forEach((cat) => {
            categorias.push(cat)
        })        
    })
    
    const categoriasFinais = ([...new Set(categorias)])

    const secaoCategoria = document.querySelector('#listaCategorias')

    categoriasFinais.forEach((obj,i) => {
        secaoCategoria.innerHTML += `<div class="categoria"><h2 id="tituloCategoria">${obj}</h2><div class="contemFilmes"><button class="backSlide" onclick="voltaSlide(lista_${i})"><span></span></button><ul class="listaFilmes" id="lista_${i}"></ul><button class="forwardSlide" onclick="avancaSlide(lista_${i})"><span></span></button></div></div>`
    })
    
    atracoes[2].movies.forEach((movie) => {
        let movieCats = movie.categories.split(', ')
        movieCats.forEach((cat) => {
            let indexCat = categoriasFinais.indexOf(cat)
            document.querySelector(`#lista_${indexCat}`).innerHTML += `<li><a href="#"><img class="cover" src="${movie.images[0].url}" /></a><img class="${movie.isBlocked ? 'lock': 'unlock'}" src="./dist/images/lock.svg" /></li>`
        })
    })

    let contemListas = document.querySelectorAll('.listaFilmes')

    contemListas.forEach((node) => {
        node.style.width = (node.childElementCount)*154 +"px"
        node.style.marginLeft = 0
    })

}
