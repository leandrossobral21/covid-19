$('.field_with_errors').find('input').attr('style', 'border: 1px solid red');
$('.field_with_errors').attr('style', 'background-color: transparent;')

// Regex formatação senha.
var password = new RegExp('(?=^.{8,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*');

// Regex formatação email.
var email = new RegExp('^[a-z0-9](\.?[a-z0-9])+@$');

  $(document).ready(function () {
    $("#user_cep").keyup(function () {
      if ($(this).val().length == 9) {
        $.ajax({
          url: 'https://viacep.com.br/ws/' + $(this).val() + '/json/unicode/',
          dataType: 'json',
          success: function (resposta) {
            $("#user_rua").val(resposta.logradouro);
            $("#complemento").val(resposta.complemento);
            $("#user_bairro").val(resposta.bairro);
            $("#user_cidade").val(resposta.localidade);
            $("#user_estado").val(resposta.uf);
            if (resposta.erro !== true ){
              $("#user_cep").css("border-color", "green");
              $('#text-cep').popover('hide')
            }
            else {
              $("#user_cep").css("border-color", "red");
              $('#text-cep').popover('show')
            }
          }
        });
      }
      else if ($(this).val().length > 0){
        $("#user_cep").css("border-color", "#191970");
        $("#user_rua").val("");
            $("#complemento").val("");
            $("#user_bairro").val("");
            $("#user_cidade").val("");
            $("#user_estado").val("");
            $('#text-cep').popover('show')
      }
      else{
            $("#user_cep").css("border-color", "orane");
            $("#user_rua").val("");
            $("#complemento").val("");
            $("#user_bairro").val("");
            $("#user_cidade").val("");
            $("#user_estado").val("");
            $('#text-cep').popover('hide')
      }
    });
    $('#user_cpf').mask('000.000.000-00');
    $('#user_cep').mask('00000-000');
    $('#user_cnpj').mask('00.000.000/0000-00');
    jQuery('#user_fullname').keyup(function () {
   this.value = this.value.replace(/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]/g,'');
 });

    $("#user_fullname").keyup(function () {

      // Se este campo já for preenchido.
      if ($(this).val().length > 0){
        $(this).css("border-color", "green");
      }

      // Se este campo não for preenchido.
      else{
        $(this).css("border-color", "orange");
      }
    });

    $(this).scrollTop(0);

    $("#user_email").keyup(function () {
      // Atribuindo o valor do email a uma variável.
      var VAL = this.value;

      // Se já houver algo digitado.
      if($(this).val().length > 0){

        // Está no formato adequado.
        if (email.test(VAL)) {

          // Validação no banco de dados.
          $.post('/checkemail?email='+$("#user_email").val(),function(data){

            // Caso este email já exista no banco de dados.
            if(data.email_exists){
              $('#text-email').popover('hide')
              $('#exist-email').popover('show')
              $("#user_email").css("border-color", "red");
            }

            //Caso este email ainda não exista no banco de dados.
             else{
              $('#exist-email').popover('hide')
              $('#text-email').popover('hide')
              $("#user_email").css("border-color", "green");

              // Abertura do próximo bloco de informações.
              if ($("#user_password").val() == $("#user_password_confirmation").val() && password.test($("#user_password").val())) {
                $("#esc_cep").show();
                $("#esc_est").show();
                $("#esc_cid").show();
                $("#esc_bairro").show();
                $("#esc_rua").show();
                $("#esc_num").show();
                $("#esc_botao").show();
                $("#esc_text").hide();
              }
            }
          });
        }

        // Não está no formato adequado.
        else {
          $(this).css("border-color", "red");
          $('#text-email').popover('show')
          $('#exist-email').popover('hide')
        }
      }

      // Se não houver nada digitado.
      else{
        $(this).css("border-color", "rgb(132, 46, 176)");
        $('#text-email').popover('hide')
        $('#exist-email').popover('hide')
      }
    });
    
    $("#user_password").keyup(function () {
      var VAL = this.value;

      // Se o campo senha começar a ser preenchido.
      if($(this).val().length > 0){

        // Se o campo senha estiver com a formatação correta.
        if (password.test(VAL)) {
          $(this).css("border-color", "green");
          $('#text-senha').popover('hide')

          if ($(this).val() == $("#user_password_confirmation").val()){

            // Verificando formato do email.
            if (email.test($("#user_email").val())) {

              // Validação no banco de dados.
              $.post('/checkemail?email='+$("#user_email").val(),function(data){

                // Caso este email já exista no banco de dados.
                if(!data.email_exists){
                  
                  // Abertura de novas informações.
                  $("#esc_cep").show();
                  $("#esc_est").show();
                  $("#esc_cid").show();
                  $("#esc_bairro").show();
                  $("#esc_rua").show();
                  $("#esc_num").show();
                  $("#esc_botao").show();
                  $("#esc_text").hide();
                }
              })
            }
          }
        }

        // Se o campo senha estiver com a formatação incorreta.
        else {
          $(this).css("border-color", "red");
          $('#text-senha').popover('show')
        }
      }

      // Se o campo senha estiver vazio.
      else {
        $(this).css("border-color", "rgb(132, 46, 176)");

        // Se o camppo confirmação for vazio.
        if ($("#user_password_confirmation").val().length == 0){
          $("#user_password_confirmation").css("border-color", "rgb(132, 46, 176)");
          $('#text-senhaconf').popover('hide');
        }
      }

      // Se o campo confirmação de senha tiver algo.
      if ($("#user_password_confirmation").val().length > 0){

        // Se houver divergência de valores.
        if ($(this).val() !== $("#user_password_confirmation").val()) {
          $("#user_password_confirmation").css("border-color", "red");
            $('#text-senhaconf').popover('show')
            
        }

        // Se não houver divergência de valroes.
        else {
          $("#user_password_confirmation").css("border-color", "green");
          $('#text-senhaconf').popover('hide')
        }
      }
    });

    $("#user_password_confirmation").keyup(function() {

      // Se tiver algo no campo de confirmação.
      if ($(this).val().length > 0){

        // Se houver divergência nos campos.
        if ($(this).val() !== $("#user_password").val() ) {
          $(this).css("border-color", "red");
          $('#text-senhaconf').popover('show')
        }

        // Se forem iguais.
        else {
          $(this).css("border-color", "green");
          $('#text-senhaconf').popover('hide');

          // A senha é valida.
          if (password.test($("#user_password").val())) {

            // O email é valido.
            if (email.test($("#user_email").val())) {
              
              // Validação no banco de dados.
              $.post('/checkemail?email='+$("#user_email").val(),function(data){

                // Caso este email já exista no banco de dados.
                if(!data.email_exists){
                    
                  $("#esc_cep").show();
                  $("#esc_est").show();
                  $("#esc_cid").show();
                  $("#esc_bairro").show();
                  $("#esc_rua").show();
                  $("#esc_num").show();
                  $("#esc_botao").show();
                  $("#esc_text").hide();
                }
              })
            }
          }
        }
      }

      // Se não tiver algo no campo confirmação.
      else{
        $(this).css("border-color", "rgb(132, 46, 176)");
       }
     });

  $("#user_cpf").keyup(function(){

    // Se o campo cpf for preenchido por completo.
    if ($(this).val().length == 14){

      // Se o CPF for válido.
      if (TestaCPF($(this).val())){

        // Buscando no banco de dados.
        $.post('/checkcpf?cpf='+$("#user_cpf").val(),function(data){

            // Se o cpf existir no banco de dados.
            if(data.cpf_exists){
              $($("#user_cpf")).css("border-color", "red");
              $('#text-cpf').popover('hide');
              $('#exist-cpf').popover('show');
            }
            // Se o cpf não existir no banco de dados.
            else{
              $($("#user_cpf")).css("border-color", "green");
              $('#text-cpf').popover('hide');
              $('#exist-cpf').popover('hide');

              if ($('#user_fullname').val().length > 0) {
                $("#esc_email").show();
                $("#esc_senha").show();
                $("#esc_conf").show();
              }
            }
        });
      }

      // Se o CPF Não for válido
      else{
        $(this).css("border-color", "red");
        $('#text-cpf').popover('show');
        $('#exist-cpf').popover('hide');
      }
    }

    // Se o campo cpf for preenchido parcialmente.
    else if($(this).val().length >0){
      $(this).css("border-color", "orange");
      $('#text-cpf').popover('show');
      $('#exist-cpf').popover('hide');
    }

    // Se o campo cpf estiver vazio
    else{
      $(this).css("border-color", "rgb(132, 46, 176)");
      $('#text-cpf').popover('hide');
      $('#exist-cpf').popover('hide');
    }
  });

  $("#user_cnpj").keyup(function(){

    // Se o campo CNPJ for preenchido por completo.
    if ($(this).val().length == 18){

      // Se for um CNPJ válido.
      if (TestaCNPJ($(this).val())) {
        $.post('/checkcnpj?cnpj='+$("#user_cnpj").val(),function(data){

          // Se o cnpj existir no banco de dados.
          if(data.cnpj_exists){
            $($("#user_cnpj")).css("border-color", "red");
            $('#text-cnpj').popover('hide');
            $('#exist-cnpj').popover('show');
          }

          // Se o cnpj não existir no banco de dados.
          else{
            $($("#user_cnpj")).css("border-color", "green");
            $('#text-cnpj').popover('hide');
            $('#exist-cnpj').popover('hide');

            // Abertura do próximo bloco de informações.
            if ($("#user_razaosocial").val().length > 0) {
              $("#esc_email").show();
              $("#esc_senha").show();
              $("#esc_conf").show();
            }
          }
        });
      $(this).css("border-color", "green");
      $('#text-cnpj').popover('hide')
      }

      // Se não for um CNPJ válido.
      else {
        $(this).css("border-color", "red");
        $('#text-cnpj').popover('show');
        $('#exist-cnpj').popover('hide');
      }
    }

    // Se o campo CNPJ for preenchido parcialmente.
    else if($(this).val().length >0){
      $(this).css("border-color", "orange");
      $('#text-cnpj').popover('show');
      $('#exist-cnpj').popover('hide');
    }

    // Se o campo CNPJ não estiver preenchido.
    else{
      $(this).css("border-color", "rgb(132, 46, 176)");
      $('#text-cnpj').popover('hide');
      $('#exist-cnpj').popover('hide');
    }
  })

});
