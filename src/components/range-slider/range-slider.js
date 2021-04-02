$(function() {
    $("#range").slider({
        range: true,
        min: 0,
        max: 15000,
        values: [5000, 10000],
        slide: function(event, ui) {
            $("#result").text(
                new Intl.NumberFormat().format(ui.values[0]) + "₽ - " +
                new Intl.NumberFormat().format(ui.values[1]) + "₽"
            );
        }
    });

    //Записываем значения ползунков в момент загрузки страницы
    //То есть значения по умолчанию
    $("#result").text(
        new Intl.NumberFormat().format($("#range").slider("values", 0)) + "₽ - " +
        new Intl.NumberFormat().format($("#range").slider("values", 1)) + "₽"
    );
});
