let ultimaSenha = null;

const urlParams = new URLSearchParams(window.location.search);
const empresa_id = urlParams.get("empresa") || 1;

async function carregarEmpresa() {
    const res = await fetch("api/listar_empresas.php");
    const empresas = await res.json();
    const empresa = empresas.find(e => e.id == empresa_id);

    if (!empresa) return;

    document.getElementById("nomeEmpresa").innerText = empresa.nome;

    if (empresa.logo) {
        document.getElementById("logoEmpresa").src = empresa.logo;
    } else {
        document.getElementById("logoEmpresa").style.display = "none";
    }
}

async function atualizarPainel() {
    const res = await fetch("api/listar_fila.php?empresa_id=" + empresa_id);
    const fila = await res.json();

    const chamados = fila.filter(f => f.status === "chamado");
    const aguardando = fila.filter(f => f.status === "aguardando");

    const senhaAtual = document.getElementById("senhaAtual");
    const proximosLista = document.getElementById("proximosLista");

    if (chamados.length > 0) {
        const atual = chamados[chamados.length - 1];

        if (ultimaSenha !== atual.id) {
            document.getElementById("somNotificacao").play();
            senhaAtual.classList.add("piscar");
            setTimeout(() => senhaAtual.classList.remove("piscar"), 1000);
            ultimaSenha = atual.id;
        }

        senhaAtual.innerText = atual.nome;
    } else {
        senhaAtual.innerText = "---";
    }

    proximosLista.innerHTML = "";
    aguardando.slice(0,5).forEach(p => {
        const li = document.createElement("li");
        li.innerText = p.nome;
        proximosLista.appendChild(li);
    });
}

setInterval(atualizarPainel, 3000);
carregarEmpresa();
atualizarPainel();