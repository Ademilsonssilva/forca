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
                    swal('Uau', 'Você venceu', 'success');
                }
                else {
                    swal('Ops', 'Você perdeu!', 'error');
                }
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

});
