import "./iq-dropdown.js";
import i18n from "i18n-js";

i18n.translations["ru"] = {
    "%n bedroom": {
        one: "{{count}} спальня",
        few: "{{count}} спальни",
        many: "{{count}} спален",
        other: "{{count}} спален"
    },
    "%n bathroom": {
        one: "{{count}}&nbsp;ванная комната",
        few: "{{count}}&nbsp;ванные комнаты",
        many: "{{count}}&nbsp;ванных комнат",
        other: "{{count}}&nbsp;ванных комнат"
    },
    "%n bed": {
        one: "{{count}} кровать",
        few: "{{count}} кровати",
        many: "{{count}} кроватей",
        other: "{{count}} кроватей"
    },
    "%n visitor": {
        one: "{{count}} гость",
        few: "{{count}} гостя",
        many: "{{count}} гостей",
        other: "{{count}} гостей"
    },
    "%n infant": {
        one: "{{count}} младенец",
        few: "{{count}} младенца",
        many: "{{count}} младенцев",
        other: "{{count}} младенцев"
    }
};

i18n.pluralization["ru"] = function(count) {
    var key =
        count % 10 == 1 && count % 100 != 11
            ? "one"
            : [2, 3, 4].indexOf(count % 10) >= 0 &&
              [12, 13, 14].indexOf(count % 100) < 0
            ? "few"
            : count % 10 == 0 ||
              [5, 6, 7, 8, 9].indexOf(count % 10) >= 0 ||
              [11, 12, 13, 14].indexOf(count % 100) >= 0
            ? "many"
            : "other";
    return [key];
};

i18n.defaultLocale = "ru";
i18n.locale = "ru";

var captions = {
    bathroom: "%n bathroom",
    bedroom: "%n bedroom",
    bed: "%n bed",
    visitor: "%n visitor",
    infant: "%n infant"
};

$(document).ready(function() {
    $(".conveniences").iqDropdown({
        minItems: 2,
        onChange: function(id, count, totalItems) {
            console.log(id, count, totalItems);
        },
        setSelectionText: function(itemCount, totalItems) {
            return Object.keys(itemCount)
                .map(key => i18n.t(captions[key], { count: itemCount[key] }))
                .join(", ");
        }
    });
    $(".visitors").iqDropdown({
        setSelectionText: function(itemCount, totalItems) {
            if (totalItems === 0) {
                return "Сколько гостей";
            }
            const items = Object.keys(itemCount)
                .map(key => itemCount[key])
                .join(" + ");
            if (itemCount.infant === 0) {
                return i18n.t("%n visitor", { count: totalItems });
            }
            return (
                i18n.t("%n visitor", { count: totalItems }) +
                ", " +
                i18n.t("%n infant", { count: itemCount.infant })
            );
        },
        onChange: function(id, count, totalItems) {
            console.log(id, count, totalItems);
        }
    });
});
