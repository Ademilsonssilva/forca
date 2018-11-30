function Forca() {

    return {

        _sorteiaJogo: function () {

            return this._jogosDisponiveis[Math.floor((Math.random() * this._jogosDisponiveis.length))];

        },

        iniciaJogo: function (div) 
        {

            this.jogo_ativo = this._sorteiaJogo(); // Escolhe um jogo aleatório entre os disponíveis
            this.resposta = this.jogo_ativo.resposta; // Armazena a resposta certa (apenas para facilitar o acesso)
            this.array_resposta = this.resposta.toUpperCase().split('');
            this.jogadas = []; // Armazena as letras escolhidas pelo jogador 

            this.vidas = 5;

            this._div_dica = div.find('#dica');
            this._div_forca = div.find('#forca');
            this._div_jogadas = div.find('#jogadas');

            this.mostraTela();

        },

        mostraTela: function () 
        {

            this.mostraDica();

            this.atualizaTela();

        },

        atualizaTela: function () 
        {
            this._div_forca.html('');

            acertos = 0;

            inputs = this.array_resposta.length;

            tamanho = parseInt(85/inputs);

            for (i = 0; i < this.array_resposta.length; i++) {

                letra = $.inArray(this.array_resposta[i].toUpperCase(), this.jogadas) > -1 ? this.array_resposta[i].toUpperCase() : '';

                acertos = letra != '' ? acertos+1 : acertos;

                this._div_forca.append(
                    $("<input type='text' class='campo_forca' disabled style='width: " + tamanho + "%; font-size: "+tamanho*2+"px; font-weight: bold;' value='" + letra + "'></input>")
                )

                if(acertos == this.array_resposta.length) {
                    this.fimJogo('vitoria');
                }

            }

            this.atualizaJogadasFeitas();

        },

        mostraDica: function () 
        {

            this._div_dica.html('');

            this._div_dica.append(
                $("<span class='dica'><strong>Dica: </strong></span>").append(this.jogo_ativo.dica)
            );

        },

        realizaJogada: function (letra) 
        {

            letra = letra.toUpperCase();

            if(letra.split('').length > 1) {
                letra = letra.split('')[0];
            }

            if ($.inArray(letra, this.jogadas) == -1) {

                this.jogadas.push(letra.toUpperCase());

                if($.inArray(letra, this.array_resposta) > -1) {
                    
                }

                else {

                    this.vidas--;

                    if(this.vidas == 0) {
                        this.fimJogo('derrota');
                    }

                }

                this.atualizaTela();

            }

            else {

                swal('Ops', 'Jogada já realizada', 'warning');

            }

            

        },

        atualizaJogadasFeitas: function () 
        {
            texto_span_jogadas = "<strong>Jogadas: </strong> " + this.jogadas.join(', ') + " <br> <strong> Vidas: </strong> " + this.vidas;

            this._div_jogadas.html($("<span class='span_jogadas'>" + texto_span_jogadas + "</span>"))
        },

        fimJogo: function (resultado) 
        {
            this.fim_jogo = true;
            this.resultado = resultado;
        },

        _jogosDisponiveis: [
            
            {
                'dica': 'Era geologica em que ocorre o surgimento dos dinossauros',
                'resposta': 'mesozoica',
            },
            {
                'dica': 'Condição biológica desenvolvida quando dois óvulos fecundados se unem no momento da gestação animal',
                'resposta': 'quimerismo',
            },
            {
                'dica': 'Sistema estelar mais proximo do Sistema Solar',
                'resposta': 'alphacentauri',
            },
            {
                'dica': 'Nome da colocação pronominal existente na oração "dar-lhe-ei a resposta"',
                'resposta': 'mesoclise',
            },
            {
                'dica': 'Glândula produtora de hormônios nos seres humanos',
                'resposta': 'hipofise',
            }

        ],
    
    }

}
