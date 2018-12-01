$(document).ready(function () {

    $('#inicia_jogo').on('click', function () {
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
