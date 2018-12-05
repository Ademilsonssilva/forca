$(document).ready(function () {

    var API_URL = 'http://localhost:8000/forca';

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

        swal.close();

        $.ajax({
            url: jogo.api_url+'/registrar_jogo',
            method: 'POST',
            data: {
                jogador: jogo.jogador,
                resumo_jogo: jogo.resumoJogo(),
                pergunta_id: jogo.jogo_ativo.id,
                resultado: jogo.resultado,
                nota: nota,
            },
            success: function (response) {
                console.log(response)
            },
            error: function () {

            },
        });

    });

    $('#cadastrar_nova_pergunta').on('click', function () {

        if($('#form_dica').val() == '' || $('#form_resposta').val() == '' || $('#form_email_criador').val() == '') {
            swal('Ops', 'Preencha todas as informações antes de prosseguir', 'warning');
            return false;
        }

        $.ajax({
            url: API_URL + '/adicionar',
            method: 'POST',
            data: {
                dica: $('#form_dica').val(),
                resposta: $('#form_resposta').val(),
                email_criador: $('#form_email_criador').val(),
            },
            success: function (response) {
                swal({
                    html: 'Pergunta gravada com sucesso!',
                    toast: true,
                    timer: 2000,
                })
                console.log(response);
            },
            error: function (error) {
                swal('Ops', 'Ocorreu um erro inesperado!', 'error');
            }
        });

        $('#form_cadastrar').hide();
        $('#inicio').show();
    });

    $('#nova_pergunta').on('click', function () {
        $('#inicio').hide();
        $('#form_cadastrar').show();
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
                $('#voltar_inicio').show();

            }

        }
    }

    $('#voltar_inicio').click(function () {
        $(this).hide();
        $('#div_jogo').hide();
        $('#inicio').show();
    });

    function iniciaJogo()
    {
        $('#div_jogo').show();
        $('#inicio').hide();
        $('#jogada').val('');
        $('#jogada').focus();

        jogo = Forca();

        jogo.setApiUrl(API_URL);

        // jogo._popularBanco();

        jogo.getPergunta();

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

        html_swal = 'A resposta era: <font color="red"><b> ' + jogo.resposta + ' </b></font><h2>Avalie a pergunta: </h2><br>';

        var alerta = swal({
            'title': mensagem,
            'html': html_swal + inputs_avaliacao,
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

