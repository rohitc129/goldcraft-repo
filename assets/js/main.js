var baseurl = "/staging/";
var email_val =
  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
var phone_val = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
var numeric_val = /^\d+$/;
var alphanumeric_val = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
var alphanumericspace_val = /^[a-z\d\-_\s]+$/i;
var date_val = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
var regExp = /[A-Za-z0-9_~\-!@#\$%\^&\*\(\)]+$/i;
var regExpnumbers = "/[0-9]/g;";
var whitespaces_val = /^\s+$/;
var website_val =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

$(".page_loader").fadeOut("fast");

$("form").attr("autocomplete", "off");

$("input, select, textarea").on("keydown change", function () {
  $(".error span").fadeOut();
});

$("input, select, textarea").each(function () {
  var placeholder = $(this).attr("placeholder");

  if (validateblanktext(placeholder)) {
    $(this).attr("title", placeholder);
  }
});

$("img").each(function () {
  var placeholder = $(this).attr("alt");

  if (validateblanktext(placeholder)) {
    $(this).attr("title", placeholder);
  }
});

$(".enquiry_reason_name").on("click", function() {
  let enquiry_reason_id = $(this).attr('data-value');

  $(this).parent().find('.enquiry_reason_id').val(enquiry_reason_id);
});

$(".enquiry_form").on("submit", function(e) {
  e.preventDefault();

  $(".error span").fadeOut();

  let target_form = $(this);

  let data = $(this).serialize();

  $.ajax({
    url: baseurl + "enquiry-form-details",
    data: data,
    dataType: "JSON",
    type: "POST",
    beforeSend: function() {
      $(".wait_loader").css("display", "block");
    },
    success: function(result) {
      alert(result.display_message);

      window.location.href = baseurl + 'thank-you';
    },
    error: function(result) {
      $(".wait_loader").css("display", "none");

      $.each(result.responseJSON, function (k, v) {
        $(target_form).find("." + k + "_err").fadeIn();
        $(target_form).find("." + k + "_err").html(v);
        $(target_form).find("." + k).focus();

        return false;
      });
    },
  });
});

$(".project_layout_slider .fullscreen").on("click", function() {
    let img_src = $(this).parent().parent().find('.project_layout_slide').attr('src');
    let img_caption = $(this).parent().parent().find('.project_layout_slide').attr('alt');

    $(".project_layout_image").attr('src', img_src);
    $(".project_layout_caption").html(img_caption);
});

function validation_error(result) {
  $.each(result.responseJSON.errors, function (k, v) {
    if($("#" + k + "_err").length) {
      $("#" + k + "_err").fadeIn();
      $("#" + k + "_err").html(v);
    } else if($("." + k + "_err").length) {
      $("." + k + "_err").fadeIn();
      $("." + k + "_err").html(v);
    }
    
    if($("#" + k).length) {
      $("#" + k).focus();
    } else if($("." + k).length) {
      $("." + k).focus();
    }

    return false;
  });
}

function scrolltodiv(element_to_scroll) {
  $("html,body").animate(
    { scrollTop: $(element_to_scroll).offset().top },
    "slow"
  );
}

function validatestring(stringtext) {
  if (
    stringtext == "" ||
    whitespaces_val.test(stringtext) ||
    numeric_val.test(stringtext) ||
    alphanumeric_val.test(stringtext)
  ) {
    return false;
  } else {
    return true;
  }
}

function validateblanktext(stringtext) {
  if (
    stringtext == "" ||
    whitespaces_val.test(stringtext) ||
    stringtext === null
  ) {
    return false;
  } else {
    return true;
  }
}
