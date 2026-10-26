// Atividade 1 - Calendário de feriados com a BrasilAPI
// Aluno(a): ________________________

const campoAno = document.getElementById('ano')
const tabela = document.getElementById('tabelaFeriados')
const mensagem = document.getElementById('mensagem')
const total = document.getElementById('total')

const diasDaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

campoAno.value = new Date().getFullYear()


function consultarFeriados() {
    const ano = campoAno.value
    tabela.innerHTML = ''
    mensagem.innerHTML = ''
    total.innerHTML = ''
    proximo.innerHTML = ''

    fetch(`https://brasilapi.com.br/api/feriados/v1/${ano}`)
        .then(resposta => {
            if (!resposta.ok){
                throw new Error('Não foi possível encontrar feriados para esse ano')
            }
            return resposta.json()
        })
        .then(feriados => {
            total.textContent = 'Total de feriado: ${feriados.length}'

            feriados.forEach(feriado => {
                const data = new Date(feriado.date + 'T12:00:00')
                const dataFormatada = data.toLocalDateString('pt-BR')
                const diaSemana = diasDaSemana[data.getDay()]
                const fimDeSemana = data.getDay() === 0 || data.getDay() === 6

                tabela.innerHTML += `
                    <tr>
                        <td class="${fimDeSemana ? 'fim-de-semana': ''} : ''}">
                        <td>${dataFormatada}</td>
                        <td>${diaSemana}</td>
                        <td>${feriado.name}</td>
                    </tr>`
            })
        })
        .catch(erro => {
            mensagem.textContent = erro.message
            mensagem.classList.add('erro')
        })
}

functionmostrarProximoFeriado(feriados) {
    const hoje = new Date()
    hoje.setHours (0,0,0,0)

    const proximoFeriados = feriados
        .map(feriado => new Date(feriado.date + 'T12:00:00'))
        .filter(data => data>= hoje)
        .sort((a,b) => a - b)

    if (proximosFeriados.length === 0){
        return
    }

    const dataProximo = proximosFeriado[0]
    const feriadoProximo = feriados.find(feriado => feriado.date === dataProximo.toISOString().slice(0, 10))
    const diasFaltando = Math.round((dataProximo - hoje) / (1000 * 60 * 60 * 24))

    proximo.textContent = 'Próximo feriado: ${feriadoProximo.name} em ${dataProximo.toLocaleDateString('pt-BR')} (faltam ${diasFaltando} dias)' 
}
document.getElementById('btnConsultar').addEventListener('click', consultarFeriados)
