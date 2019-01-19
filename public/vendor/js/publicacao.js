$(function () {
    $("#message-post").keyup(function () {
        var qtdC = $("#message-post").val().length;
        $("#caract-restantes").text(320 - qtdC);
    });
});