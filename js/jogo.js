$(document).ready(function () {

    if(localStorage.getItem('forca_nome_usuario') != '') {
        $('#nome_jogador').val(localStorage.getItem('forca_nome_usuario'));
    }

    $('#inicia_jogo').on('click', function () {
        if($('#nome_jogador').val() != '') {
            localStorage.setItem('forca_nome_usuario', $('#nome_jogador').val());
        }

        iniciaJogo();
    });

    $(document).on('click', '.estrela', function () {

        nota = parseInt($(this).attr('avaliacao'));

        alert(nota);

        // $.ajax({
        //     url: 'http://localhost:8000',
        //     method: 'POST',
        //     data: {
        //         jogador: jogo.jogador,
        //         jogo: jogo.resumoJogo(),
        //         pergunta: jogo.pergunta.id,
        //         avaliacao: nota,
        //     },
        //     success: function () {

        //     },
        // });

    });

    function eventoJogada()
    {
        if($('#jogada').val() != '') {

            jogo.realizaJogada($('#jogada').val());
            $('#jogada').val('');

            mostraImagem();

            if(jogo.fim_jogo) {

                $('#jogada').unbind('blur');
                $('body').unbind('keypress');

                if(jogo.resultado == 'vitoria') {
                    msg = 'Você venceu';
                }
                else {
                    msg = 'Você perdeu!';
                    jogo.atualizaTela(true); // Mostra os erros
                }

                avaliar(msg, jogo.resultado);
                console.log(jogo.resumoJogo());
                $('#inicia_jogo').show();

            }

        }
    }

    function iniciaJogo()
    {
        $('#div_jogo').show();
        $('#inicia_jogo').hide();
        $('#jogada').val('');
        $('#jogada').focus();

        jogo = Forca();

        jogo.iniciaJogo($('.jogo'));

        jogo.setJogador($('#nome_jogador').val());        

        mostraImagem();
    
        $('body').bind('keypress', function (event) {
            if(event.which == 13) { 
                eventoJogada();   
            }
        });
    
        $("#jogada").blur(function () {
            eventoJogada();
        });
    }

    function mostraImagem()
    {
        $('#img_forca').attr('src', 'img/'+jogo.vidas+'vidas.jpg');
    }

    function avaliar(mensagem, resultado)
    {
        icone = resultado == 'vitoria' ? 'success' : 'error';

        inputs_avaliacao = '';
        for (i = 0; i < 5; i++) {

            inputs_avaliacao += "<a class='fas fa-star fa-lg estrela' avaliacao='" + i + "'></a>";

        }

        return alerta = swal({
            'title': 'Fim de jogo',
            'html': '<h1>'+mensagem+'</h1><br>' + inputs_avaliacao,
            'type': icone,
        });
    }

    $(document).on({
		mouseenter: function(){

            nota = $(this).attr('avaliacao');

            $('.estrela').each(function () {
                if($(this).attr('avaliacao') <= nota) {
                    $(this).addClass('amarelo');
                }
            })
		},
		mouseleave: function(){
            $('.estrela').each(function () {
                $(this).removeClass('amarelo');
            });
            

		}
	}, '.estrela');

});

