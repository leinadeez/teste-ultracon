init()

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
    let list = document.querySelector('#listaFilmes')
    console.log(atracoes)
    document.querySelector('#tituloCategoria').innerHTML = atracoes[2].title
    atracoes[2].movies.forEach((obj, i) => {
        list.innerHTML += `<li><a href="..."><img class="cover" src="${obj.images[0].url}" /></a><img class="${obj.isBlocked ? 'lock': ''}" src="./dist/images/lock.svg" /></li>`
    })
    list.style.width = `${(154 * atracoes[2].movies.length)}px`
    
    //document.querySelector('#contemFilmes')
}
