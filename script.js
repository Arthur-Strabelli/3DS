document.addEventListener("DOMContentLoaded", function () {

    iniciarContador();
    iniciarJogo();
    iniciarAulas();
    carregarAlbum();

});



// CONTADOR


function iniciarContador() {

    const contador = document.getElementById("contador");
    if (!contador) return;

    const dataFinal = new Date("2026-12-31T23:59:59").getTime();
    const formatar = n => String(n).padStart(2, '0');

    setInterval(() => {

        const agora = new Date().getTime();
        const diferenca = dataFinal - agora;

        if (diferenca < 0) {
            contador.innerHTML = "CHEGOU O DIA!";
            return;
        }

        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

        contador.innerHTML = `
            <div style="display:flex; gap:30px; justify-content:center;">
                <div><div style="font-size:50px;font-weight:bold;">${formatar(dias)}</div><small>Dias</small></div>
                <div><div style="font-size:50px;font-weight:bold;">${formatar(horas)}</div><small>Horas</small></div>
                <div><div style="font-size:50px;font-weight:bold;">${formatar(minutos)}</div><small>Min</small></div>
                <div><div style="font-size:50px;font-weight:bold;">${formatar(segundos)}</div><small>Seg</small></div>
            </div>
        `;

    }, 1000);
}




// 3DLE


function iniciarJogo() {

    const input = document.getElementById("input");
    const sugestoesDiv = document.getElementById("sugestoes");
    const resultado = document.getElementById("resultado");
    const mensagem = document.getElementById("mensagem");

    if (!input || !sugestoesDiv || !resultado) return;

    const pessoas = [

        { nome: "Arthur Srabelli", tipo: "Aluno", genero: "Masculino", altura: 1.75, idade: 16, imagem: "Imgs/ArthurStrabelliImg.jpeg" },
        { nome: "Eduardo Soares", tipo: "Aluno", genero: "Masculino", altura: 1.77, idade: 16, imagem: "Imgs/EduardoSoaresImg.jpeg" },
        { nome: "Pietro Garcia", tipo: "Aluno", genero: "Masculino", altura: 1.74, idade: 17, imagem: "Imgs/PietroGarciaImg.jpeg" },
        { nome: "Luis Guilherme", tipo: "Aluno", genero: "Masculino", altura: 1.78, idade: 17, imagem: "Imgs/LuisGuilhermeImg.jpeg" },
        { nome: "Murilo Reis", tipo: "Aluno", genero: "Masculino", altura: 1.74, idade: 17, imagem: "Imgs/MuriloReisImg.jpeg" },
        { nome: "Gustavo Augusto", tipo: "Aluno", genero: "Masculino", altura: 1.70, idade: 17, imagem: "Imgs/GustavoAugustoImg.jpeg" },
        { nome: "Ana Maria", tipo: "Aluno", genero: "Feminino", altura: 1.50, idade: 17, imagem: "Imgs/AnaMariaImg.jpeg" },
        { nome: "Isabela", tipo: "Aluno", genero: "Feminino", altura: 1.64, idade: 17, imagem: "Imgs/IsabelaImg.jpeg" },
        { nome: "Célio(Dz)", tipo: "Aluno", genero: "Masculino", altura: 1.75, idade: 17, imagem: "Imgs/DzImg.jpeg" },
        { nome: "Nicole Rúbia", tipo: "Aluno", genero: "Feminino", altura: 1.58, idade: 16, imagem: "Imgs/NicoleRubiaImg.jpeg" },
        { nome: "Vinícius Dos Reis", tipo: "Aluno", genero: "Masculino", altura: 1.68, idade: 16, imagem: "Imgs/ViniciusDosReisImg.jpeg" },
        { nome: "Victor Reis", tipo: "Aluno", genero: "Masculino", altura: 1.62, idade: 17, imagem: "Imgs/VictorReisImg.jpeg" },
        { nome: "Valentin", tipo: "Aluno", genero: "Masculino", altura: 1.96, idade: 16, imagem: "Imgs/ValentinImg.jpeg" },
        { nome: "Luis Fernando(Mil Grau)", tipo: "Aluno", genero: "Masculino", altura: 1.78, idade: 16, imagem: "Imgs/LuisFernandoImg.jpeg" },
        { nome: "Luis Fernando(LF)", tipo: "Professor", genero: "Masculino", altura: 1.78, idade: 57, imagem: "Imgs/ProfLFImg.png" },
        { nome: "Charles", tipo: "Aluno", genero: "Masculino", altura: 1.75, idade: 17, imagem: "Imgs/CharlesImg.jpeg" },
        { nome: "Murillo Berchelli", tipo: "Aluno", genero: "Masculino", altura: 1.69, idade: 16, imagem: "Imgs/MurilloBerchelliImg.jpeg" },
        { nome: "Luis Felipe", tipo: "Aluno", genero: "Masculino", altura: 1.70, idade: 17, imagem: "Imgs/LuisFelipeImg.jpeg" },
        { nome: "Borges", tipo: "Aluno", genero: "Masculino", altura: 1.67, idade: 17, imagem: "Imgs/BorgesImg.jpeg" },
        { nome: "Raphaela", tipo: "Aluno", genero: "Feminino", altura: 1.56, idade: 17, imagem: "Imgs/RaphaelaImg.jpeg" },
        { nome: "Yasmin", tipo: "Aluno", genero: "Feminino", altura: 1.59, idade: 17, imagem: "Imgs/YasminImg.jpeg" },
        { nome: "Maria Rita", tipo: "Aluno", genero: "Feminino", altura: 1.55, idade: 17, imagem: "Imgs/MariaRitaImg.jpeg" },
        { nome: "Paola", tipo: "Aluno", genero: "Feminino", altura: 1.60, idade: 17, imagem: "Imgs/PaolaImg.jpeg" },
        { nome: "Adrian", tipo: "Aluno", genero: "Masculino", altura: 1.78, idade: 16, imagem: "Imgs/AdrianImg.jpeg" },

         


    ];

    

    function gerarIndiceDiario() {
        const hoje = new Date();
        const base = new Date(2024, 0, 1);
        const diff = Math.floor((hoje - base) / (1000 * 60 * 60 * 24));
        return diff % pessoas.length;
    }

    const secreto = pessoas[gerarIndiceDiario()];
    const palpitesFeitos = new Set();

    input.addEventListener("input", () => {

        const valor = input.value.toLowerCase();
        sugestoesDiv.innerHTML = "";

        if (!valor) return;

        const filtrados = pessoas.filter(p =>
            p.nome.toLowerCase().includes(valor)
        );

        filtrados.forEach(p => {
            const div = document.createElement("div");
            div.classList.add("sugestao");
            div.textContent = p.nome;

            div.onclick = () => {
                input.value = p.nome;
                sugestoesDiv.innerHTML = "";
                verificar();
            };

            sugestoesDiv.appendChild(div);
        });
    });

    window.verificar = function () {

        const nome = input.value.trim();
        const pessoa = pessoas.find(p =>
            p.nome.toLowerCase() === nome.toLowerCase()
        );

        if (!pessoa) {
            alert("Pessoa não encontrada!");
            return;
        }

        if (palpitesFeitos.has(pessoa.nome)) {
        mensagem.innerHTML = "⚠️ Você já tentou essa pessoa!";
        return;
        }
        palpitesFeitos.add(pessoa.nome);

        mostrarResultado(pessoa);

        if (pessoa.nome === secreto.nome) {
            soltarConfete();
            mensagem.innerHTML = "🎉 Você acertou!";
        } 
        else {
            mensagem.innerHTML = "❌ Não é essa pessoa!";
        }

        input.value = "";
        sugestoesDiv.innerHTML = "";
    };

    function mostrarResultado(p) {

        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <img src="${p.imagem}" alt="${p.nome}">
            ${criarBox("Tipo", p.tipo, secreto.tipo)}
            ${criarBox("Gênero", p.genero, secreto.genero)}
            ${compararNumero("Altura", p.altura, secreto.altura)}
            ${compararNumero("Idade", p.idade, secreto.idade)}
        `;

        resultado.appendChild(div);
    }

    function criarBox(titulo, valor, secretoValor) {
        let classe = valor === secretoValor ? "green" : "gray";
        return `
            <div class="box ${classe}">
                <div class="titulo">${titulo}</div>
                <div>${valor}</div>
            </div>
        `;
    }

    function compararNumero(titulo, valor, secretoValor) {
        let classe = "gray";
        let simbolo = "";

        if (valor === secretoValor) classe = "green";
        else if (valor < secretoValor) simbolo = "🔺";
        else simbolo = "🔻";

        return `
            <div class="box ${classe}">
                <div class="titulo">${titulo}</div>
                <div>${valor} ${simbolo}</div>
            </div>
        `;
    }

    function soltarConfete() {
        for (let i = 0; i < 150; i++) {
            const confete = document.createElement("div");
            confete.classList.add("confete");
            confete.style.left = Math.random() * 100 + "vw";
            confete.style.animationDuration = (Math.random() * 2 + 2) + "s";
            document.body.appendChild(confete);

            setTimeout(() => confete.remove(), 4000);
        }
    }
}




// AULAS


function iniciarAulas() {

    const turmaSelect = document.getElementById("turmaSelect");
    const colunas = document.querySelectorAll(".coluna");

    if (!turmaSelect || colunas.length === 0) return;

    const aulas = [  
        
        //SEGUNDA 

        { turma: "A", dia: "segunda", hora: "07:10", materia: "Qualidade e Teste de Software", professor: "Messias Goncalves Pessinato" },
        { turma: "B", dia: "segunda", hora: "07:00", materia: "Física (B)", professor: "Roberto" },

        { turma: "A", dia: "segunda", hora: "08:00", materia: "Qualidade e Teste de Software", professor: "Messias Goncalves Pessinato" },
        { turma: "B", dia: "segunda", hora: "08:00", materia: "Física (B)", professor: "Roberto" },

        { turma: "A", dia: "segunda", hora: "08:50", materia: "TCC", professor: "Luis Fernando" },
        { turma: "B", dia: "segunda", hora: "08:50", materia: "Física (B)", professor: "Roberto" },

        { turma: "Ambas", dia: "segunda", hora: "09:40", materia: "Recreio", professor: "N/A" },

        { turma: "A", dia: "segunda", hora: "10:00", materia: "Estudos Avançados em Matemática", professor: "André Luis (Poderoso)" },
        { turma: "B", dia: "segunda", hora: "10:00", materia: "Química (B)", professor: "Sandra" },

        { turma: "A", dia: "segunda", hora: "10:50", materia: "Sistemas Embarcados", professor: "N/A" },
        { turma: "B", dia: "segunda", hora: "10:50", materia: "Física", professor: "Roberto" },

        { turma: "Ambas", dia: "segunda", hora: "11:40", materia: "Almoço", professor: "N/A" },

        { turma: "A", dia: "segunda", hora: "12:40", materia: "CNA", professor: "Fernando Bertoncini" },
        { turma: "B", dia: "segunda", hora: "12:40", materia: "Física", professor: "Roberto" },

        { turma: "Ambas", dia: "segunda", hora: "13:30", materia: "Filosofia", professor: "Daniela Aparecida" },
        { turma: "Ambas", dia: "segunda", hora: "14:20", materia: "Biologia", professor: "Verginia Angela" },

        //TERÇA 

        { turma: "Ambas", dia: "terca", hora: "07:10", materia: "Língua Espanhola", professor: "Roberta Tahan" },
        { turma: "Ambas", dia: "terca", hora: "08:00", materia: "Língua Portuguesa", professor: "Silvio Gargano" },
        { turma: "Ambas", dia: "terca", hora: "08:50", materia: "Matemática", professor: "Roberta Bernades" },

        { turma: "Ambas", dia: "terca", hora: "09:40", materia: "Recreio", professor: "N/A" },

        { turma: "A", dia: "terca", hora: "10:00", materia: "CNA", professor: "Fernando Bertoncini" },
        { turma: "B", dia: "terca", hora: "10:00", materia: "Física", professor: "Roberto" },

        { turma: "Ambas", dia: "terca", hora: "10:50", materia: "Biologia", professor: "Verginia Angela" },

        { turma: "Ambas", dia: "terca", hora: "11:40", materia: "Almoço", professor: "N/A" },

        { turma: "A", dia: "terca", hora: "12:40", materia: "TCC", professor: "Luis Fernando" },
        { turma: "B", dia: "terca", hora: "12:40", materia: "Física", professor: "Roberto" },

        { turma: "A", dia: "terca", hora: "13:30", materia: "Programação Web I, II e III", professor: "Alexandre Bueno (ABA)" },
        { turma: "B", dia: "terca", hora: "13:30", materia: "Filosofia", professor: "Daniela Aparecida" },

        //QUARTA

        { turma: "Ambas", dia: "quarta", hora: "07:10", materia: "Geografia", professor: "Fernando Vicente" },
        { turma: "Ambas", dia: "quarta", hora: "08:00", materia: "Inglês", professor: "Maria Aparecida" },

        { turma: "A", dia: "quarta", hora: "08:50", materia: "TCC", professor: "Luis Fernando" },
        { turma: "B", dia: "quarta", hora: "08:50", materia: "Física (B)", professor: "Roberto" },

        { turma: "Ambas", dia: "quarta", hora: "09:40", materia: "Recreio", professor: "N/A" },

        { turma: "A", dia: "quarta", hora: "10:00", materia: "Estudos Avançados em Matemática", professor: "André Luis (Poderoso)" },
        { turma: "B", dia: "quarta", hora: "10:00", materia: "Química (B)", professor: "Sandra" },

        { turma: "A", dia: "quarta", hora: "10:50", materia: "CNA", professor: "Fernando Bertoncini" },
        { turma: "B", dia: "quarta", hora: "10:50", materia: "Física (B)", professor: "Roberto" },

        { turma: "Ambas", dia: "quarta", hora: "11:40", materia: "Almoço", professor: "N/A" },

        { turma: "A", dia: "quarta", hora: "12:40", materia: "Internet, Protocolos e Segurança", professor: "Valnei Henrique" },
        { turma: "B", dia: "quarta", hora: "12:40", materia: "Física", professor: "Roberto" },

        { turma: "A", dia: "quarta", hora: "13:30", materia: "Programação de Aplicativos Mobile I e II", professor: "Luis Fernando" },
        { turma: "B", dia: "quarta", hora: "13:30", materia: "Física", professor: "Roberto" },

        //QUINTA

        { turma: "A", dia: "quinta", hora: "07:10", materia: "Programação Web I, II e III", professor: "Alexandre Bueno (ABA)" },
        { turma: "B", dia: "quinta", hora: "07:10", materia: "Física", professor: "Roberto" },

        { turma: "A", dia: "quinta", hora: "08:00", materia: "Estudos Avançados em Matemática", professor: "André Luis (Poderoso)" },
        { turma: "B", dia: "quinta", hora: "08:00", materia: "Química (B)", professor: "Sandra" },

        { turma: "A", dia: "quinta", hora: "08:50", materia: "Internet, Protocolos e Segurança", professor: "Valnei Henrique" },
        { turma: "B", dia: "quinta", hora: "08:50", materia: "Física (B)", professor: "Roberto" },

        { turma: "Ambas", dia: "quinta", hora: "09:40", materia: "Recreio", professor: "N/A" },

        { turma: "Ambas", dia: "quinta", hora: "10:00", materia: "Sociologia", professor: "Daniela Aparecida" },
        { turma: "Ambas", dia: "quinta", hora: "10:50", materia: "Língua Inglesa", professor: "Maria Aparecida" },

        { turma: "Ambas", dia: "quinta", hora: "11:40", materia: "Almoço", professor: "N/A" },
        
        { turma: "Ambas", dia: "quinta", hora: "12:40", materia: "Matemática", professor: "Roberta Bernadis" },

        { turma: "A", dia: "quinta", hora: "13:30", materia: "Programação de Aplicativos Mobile", professor: "Luis Fernando" },
        { turma: "B", dia: "quinta", hora: "13:30", materia: "Filosofia", professor: "Daniela Aparecida" },

        //SEXTA

        { turma: "Ambas", dia: "sexta", hora: "07:10", materia: "Filosofia", professor: "Daniela Aparecida" },
        { turma: "Ambas", dia: "sexta", hora: "08:00", materia: "Geografia", professor: "Fernando Vicente" },
        { turma: "Ambas", dia: "sexta", hora: "08:50", materia: "Língua Espanhola", professor: "Roberta Tahan" },

        { turma: "Ambas", dia: "sexta", hora: "09:40", materia: "Recreio", professor: "N/A" },

        { turma: "A", dia: "sexta", hora: "10:00", materia: "Sistemas Embarcados", professor: "N/A" },
        { turma: "B", dia: "sexta", hora: "10:00", materia: "Biologia (B)", professor: "Verginia Angela" },

        { turma: "Ambas", dia: "sexta", hora: "10:50", materia: "Sociologia", professor: "Daniela Aparecida" },

        { turma: "Ambas", dia: "sexta", hora: "11:40", materia: "Almoço", professor: "N/A" },

        { turma: "Ambas", dia: "sexta", hora: "12:40", materia: "Língua Portuguesa", professor: "Silvio Gargano" },
        { turma: "Ambas", dia: "sexta", hora: "13:30", materia: "Matemática", professor: "Roberta Bernades" } ];

    function renderizarAulas() {

        const turmaSelecionada = turmaSelect.value;

        colunas.forEach(coluna => {
            const titulo = coluna.querySelector("h2");
            coluna.innerHTML = "";
            if (titulo) coluna.appendChild(titulo);
        });

        const aulasFiltradas = aulas.filter(aula =>
            aula.turma === turmaSelecionada || aula.turma === "Ambas"
        );

        aulasFiltradas.forEach(aula => {
            const divAula = document.createElement("div");
            divAula.classList.add("aula");
            divAula.textContent = aula.materia;

            divAula.onclick = function () {
                abrirModalAula(aula);
            };

            document.getElementById(aula.dia)?.appendChild(divAula);
        });
    }

    turmaSelect.addEventListener("change", renderizarAulas);
    renderizarAulas();
}

function abrirModalAula(aula) {
    document.getElementById("modalMateria").textContent = aula.materia;
    document.getElementById("modalHora").textContent = aula.hora;
    document.getElementById("modalProfessor").textContent = aula.professor;
    document.getElementById("modalAula").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modalAula").style.display = "none";
}




// TERCEIRINHO


const alunos = [
    {
        nome: "Arthur Strabelli",
        nasc: "18/09/2009",
        sonho: "Ser Policial",
        musica: "Black - Pearl Jam",
        filme: "Rocky Balboa 4",
        insta: "@arthur_strabelli",
        foto: "ImgsTerceirinho/ArthurTerceirinhoImg.jpeg"
    },

    {
        nome: "Pietro 'Peletoyt' Garcia",
        nasc: "18/08/2008",
        sonho: "Ser Militar",
        musica: "Rises of the moon - liana flores",
        filme: "Chainsaw man",
        insta: "@peletoyt",
        foto: "ImgsTerceirinho/PietroTerceirinhoImg.jpeg"
    },

    {
        nome: "Murilo Reis",
        nasc: "14/02/2009",
        sonho: "Ser Astronauta",
        musica: "Tek it - Cafuné",
        filme: "Neon Genesis Evangelion",
        insta: "@murilo_reisk",
        foto: "ImgsTerceirinho/MuriloReisTerceirinhoImg.jpeg"
    },

    {
        nome: "Murillo 'Conguitos' Belcieli",
        nasc: "14/06/2009",
        sonho: "Ser Lutador de UFC",
        musica: "Dias de luta, dias de glória - Charlie Brown Jr",
        filme: "Os vingadores",
        insta: "@Murillo_Belcieli",
        foto: "ImgsTerceirinho/MurilloTerceirinhoImg.jpg"
    },

    {
        nome: "Luis Guilherme",
        nasc: "22/12/2008",
        sonho: "Ter um Foguete",
        musica: "My hero - Foo Fighters",
        filme: "Scott Pilgrim Contra o Mundo",
        insta: "@luisg_violin",
        foto: "ImgsTerceirinho/LuisGuilhermeTerceirinhoImg.jpg"
    },

        {
        nome: "Isabela",
        nasc: "11/06/2008",
        sonho: "Ser Rica",
        musica: "Mary On Cross - Ghost",
        filme: "Blue Period",
        insta: "@__isa._.bela__",
        foto: "ImgsTerceirinho/IsaTerceirinhoImg.jpg"
    },

    {
        nome: "Luis Felipe",
        nasc: "11/06/2008",
        sonho: "Ser Policial",
        musica: "Rats - Ghost",
        filme: "Hajime no Ippo",
        insta: "@luisfelipe.mm._",
        foto: "ImgsTerceirinho/LuisFelipeTerceirinhoImg.jpg"
    },

    {
        nome: "Eduardo Soares",
        nasc: "18/05/2009",
        sonho: "Ser Veterinário",
        musica: "Extraordinária - Ebony",
        filme: "Steven Universo",
        insta: "@eudu_soares",
        foto: "ImgsTerceirinho/EduardoTerceirinhoImg.jpeg"
    },

    
    {
        nome: "Gustavo Augusto",
        nasc: "14/12/2008",
        sonho: "Ser cientista",
        musica: "Sucker for pain - neverbadagain",
        filme: "Tropa de elite",
        insta: "@gustavo_augusto014",
        foto: "ImgsTerceirinho/GustavoAugustoTerceirinhoImg.jpg"
    },

    {
        nome: "Ana Maria",
        nasc: "22/08/2008",
        sonho: "Ser Veterinária",
        musica: "Dandelions - Ruth B",
        filme: "The Mentalist",
        insta: "@anamazzooliveira",
        foto: "ImgsTerceirinho/AnaMariaTerceirinhoImg.jpg"
    },

    {
        nome: "Célio 'Dz'",
        nasc: "23/04/2008",
        sonho: "Ser Vaqueiro",
        musica: "Yes Indeed - Lil Baby & Drake",
        filme: "Hells paradise",
        insta: "@___dzz9",
        foto: "ImgsTerceirinho/CelioTerceirinhoImg.jpg"
    },

    {
        nome: "Charles",
        nasc: "17/04/2008",
        sonho: "Ser Dj",
        musica: "te amo minha mãe - teto",
        filme: "Baby Driver",
        insta: "@chlsz_y2k",
        foto: "ImgsTerceirinho/CharlesTerceirinhoImg.jpg"
    },

    {
        nome: "Nicole Rúbia",
        nasc: "31/03/2009",
        sonho: "ter um salsicha mofado (Dachshund)",
        musica: "Still Loving You - Scorpions",
        filme: "Supernatural",
        insta: "@nicoleerubia",
        foto: "ImgsTerceirinho/NicoleTerceirinhoImg.jpeg"
    },

    {
        nome: "Vinicius",
        nasc: "27/04/2009",
        sonho: "Ir pro japão",
        musica: "Black - Pearl Jam",
        filme: "Fullmetal Alchemist Brotherhood",
        insta: "@zyn0_vini",
        foto: "ImgsTerceirinho/ViniciusTerceirinhoImg.jpg"
    },

    {
        nome: "Victor 'vitão'",
        nasc: "03/02/2009",
        sonho: "Ser Bombeiro",
        musica: "Karma police - Radiohead",
        filme: "Tokyo ghoul",
        insta: "@reissx_fzx",
        foto: "ImgsTerceirinho/VictorTerceirinhoImg.jpg"
    },

    {
        nome: "Valentin",
        nasc: "29/04/2009",
        sonho: "Ser Youtuber",
        musica: "Skyfall - Adele",
        filme: "One punch man",
        insta: "@karote_ofc",
        foto: "ImgsTerceirinho/ValentinTerceirinhoImg.jpg"
    },

    {
        nome: "Luis Fernando 'Mil grau'",
        nasc: "08/06/2009",
        sonho: "Ser Policial",
        musica: "Maquina do tempo - Matue",
        filme: "A origem",
        insta: "@luis.frb__",
        foto: "ImgsTerceirinho/MilGrauTerceirinhoImg.jpg"
    },

    {
        nome: "Pedro",
        nasc: "09/03/2009",
        sonho: "Ser Paleontólogo",
        musica: "Merry Christimas, Please don't call - Bleachers",
        filme: "Vinland Saga",
        insta: "@pedrouhp",
        foto: "ImgsTerceirinho/PedroTerceirinhoImg.jpg"
    },

    {
        nome: "Lara",
        nasc: "23/02/2009",
        sonho: "Ser Jogadora de futebol profissional",
        musica: "Quando Bate Aquela Saudade - Rubel",
        filme: "Rua do Medo 1666",
        insta: "@hoscherl_",
        foto: "ImgsTerceirinho/LaraTerceirinhoImg.jpg"
    },

    {
        nome: "Raphaela",
        nasc: "25/08/2008",
        sonho: "Fazer patinação artística",
        musica: "Sobrenome - Vitinho e Péricles",
        filme: "Cinco passos de você",
        insta: "@Raphinha_rasga",
        foto: "ImgsTerceirinho/RaphaelaTerceirinhoImg.jpg"
    },

    {
        nome: "Paola",
        nasc: "23/03/2008",
        sonho: "Fazer Professora",
        musica: "me encontra - charlie brown jr",
        filme: "supernatural",
        insta: "@___reiss0",
        foto: "ImgsTerceirinho/PaolaTerceirinhoImg.jpg" 
    },

    {
        nome: "Maria Rita",
        nasc: "02/08/2008",
        sonho: "Ser Dançarina",
        musica:"Verdades do tempo - Thiago brado",
        filme: "O verão que mudou minha vida",
        insta: "@mariaquerino_",
        foto: "ImgsTerceirinho/MariaRitaTerceirinhoImg.jpg"
    },

    {
        nome: "Adrian",
        nasc: "09/03/2009",
        sonho: "Ser Astronauta",
        musica:"Caminhos - BK",
        filme: "Harry Potter",
        insta: "@wtf_adrixn",
        foto: "ImgsTerceirinho/AdrianTerceirinhoImg.jpg"
    },

];

function carregarAlbum() {

    const container = document.getElementById('album');
    if (!container) return;

    alunos.forEach((aluno, index) => {

        const card = document.createElement('div');
        card.classList.add('aluno-card');

        card.innerHTML = `
            <img src="${aluno.foto}" alt="${aluno.nome}">
            <div class="nome-label">${aluno.nome}</div>
        `;

        card.onclick = () => abrirModalAlbum(index);
        container.appendChild(card);
    });
}

function abrirModalAlbum(index) {

    const aluno = alunos[index];
    const modal = document.getElementById('meuModal');

    document.getElementById('nomeAluno').innerText = aluno.nome;
    document.getElementById('dataNasc').innerText = aluno.nasc;
    document.getElementById('profissao').innerText = aluno.sonho;
    document.getElementById('musica').innerText = aluno.musica;
    document.getElementById('spotyLink').href =
  `https://open.spotify.com/search/${encodeURIComponent(aluno.musica)}`;

    document.getElementById('filme').innerText = aluno.filme;
    document.getElementById('instaLink').innerText = aluno.insta;
    const usuario = aluno.insta.replace('@', '');

    const instaBtn = document.getElementById('instaLink');

    instaBtn.innerText = aluno.insta;
    instaBtn.href = `https://www.instagram.com/${usuario}/?utm_source=ig_web_copy_link`;
    instaBtn.target = "_blank";
    instaBtn.rel = "noopener noreferrer";

    document.getElementById('imgModal').src = aluno.foto;

    modal.style.display = "block";
}

document.getElementById('btnFechar')?.addEventListener("click", () => {
    document.getElementById('meuModal').style.display = "none";
});

window.addEventListener("click", function (event) {

    const modalAula = document.getElementById("modalAula");
    const modalAlbum = document.getElementById("meuModal");

    if (event.target === modalAula) {
        modalAula.style.display = "none";
    }

    if (event.target === modalAlbum) {
        modalAlbum.style.display = "none";
    }

});
