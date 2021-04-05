(function($) {
    const defaults = {
        maxItems: Infinity,
        minItems: 0,
        selectionText: "item",
        textPlural: "items",
        controls: {
            position: "right",
            displayCls: "iqdropdown-content",
            controlsCls: "iqdropdown-item-controls",
            counterCls: "counter",
            controlsRst: "iqdropdown-menu-reset"
        },
        items: {},
        onChange: () => {},
        beforeDecrement: () => true,
        beforeIncrement: () => true,
        setSelectionText(itemCount, totalItems) {
            const usePlural = totalItems !== 1 && this.textPlural.length > 0;
            const text = usePlural ? this.textPlural : this.selectionText;
            return `${totalItems} ${text}`;
        }
    };

    $.fn.iqDropdown = function(options) {
        this.each(function() {
            const $this = $(this);
            const $selection = $this.find("p.iqdropdown-selection").last();
            const $menu = $this.find("div.iqdropdown-menu");
            const $resetButton = $menu.find("button[type='reset']");
            const $items = $menu.find("div.iqdropdown-menu-option");
            const dataAttrOptions = {
                selectionText: $selection.data("selection-text"),
                textPlural: $selection.data("text-plural")
            };
            const itemCount = {};
            let totalItems = 0;

            const settings = $.extend(
                true,
                {},
                defaults,
                dataAttrOptions,
                options
            );

            function updateDisplay() {
                $selection.html(
                    settings.setSelectionText(itemCount, totalItems)
                );
                toggleReset(totalItems);
            }

            function toggleReset(totalItems) {
                if (totalItems > 0) {
                    $resetButton.show();
                } else {
                    $resetButton.hide();
                }
            }

            function setItemSettings(id, $item) {
                const minCount = Number($item.data("mincount"));
                const maxCount = Number($item.data("maxcount"));
                const defaultCount = Number($item.data("defaultcount"));

                settings.items[id] = {
                    minCount: Number.isNaN(Number(minCount)) ? 0 : minCount,
                    maxCount: Number.isNaN(Number(maxCount))
                        ? Infinity
                        : maxCount,
                    defaultCount: Number.isNaN(Number(defaultCount))
                        ? 0
                        : defaultCount
                };
            }

            function resetData(id, $counter) {
                $resetButton.click(event => {
                    const { items, onChange } = settings;
                    itemCount[id] = items[id].defaultCount;
                    $counter.html(itemCount[id]);
                    totalItems = 0;
                    for (const prop in itemCount) {
                        if (itemCount.hasOwnProperty(prop)) {
                            totalItems += itemCount[prop];
                        }
                    }
                    updateDisplay();
                    onChange(id, itemCount[id], totalItems);
                    event.preventDefault();
                    event.stopPropagation();
                });
            }

            function addControls(id, $item) {
                const $controls = $("<div />").addClass(
                    settings.controls.controlsCls
                );
                const $decrementButton = $(`
          <button class="button-decrement">
            <i class="icon-decrement">-</i>
          </button>
        `);
                const $incrementButton = $(`
          <button class="button-increment">
            <i class="icon-increment">+</i>
          </button>
        `);
                const $counter = $(`<span>${itemCount[id]}</span>`).addClass(
                    settings.controls.counterCls
                );

                $item.children("div").addClass(settings.controls.displayCls);
                $controls.append($decrementButton, $counter, $incrementButton);

                if (settings.controls.position === "right") {
                    $item.append($controls);
                } else {
                    $item.prepend($controls);
                }

                $decrementButton.click(event => {
                    const {
                        items,
                        minItems,
                        beforeDecrement,
                        onChange
                    } = settings;
                    const allowClick = beforeDecrement(id, itemCount);

                    if (
                        allowClick &&
                        totalItems > minItems &&
                        itemCount[id] > items[id].minCount
                    ) {
                        itemCount[id] -= 1;
                        totalItems -= 1;
                        $counter.html(itemCount[id]);
                        updateDisplay();
                        onChange(id, itemCount[id], totalItems);
                        resetData(id, $counter);
                    }

                    event.preventDefault();
                });

                $incrementButton.click(event => {
                    const {
                        items,
                        maxItems,
                        beforeIncrement,
                        onChange
                    } = settings;
                    const allowClick = beforeIncrement(id, itemCount);

                    if (
                        allowClick &&
                        totalItems < maxItems &&
                        itemCount[id] < items[id].maxCount
                    ) {
                        itemCount[id] += 1;
                        totalItems += 1;
                        $counter.html(itemCount[id]);
                        updateDisplay();
                        onChange(id, itemCount[id], totalItems);
                        resetData(id, $counter);
                    }

                    event.preventDefault();
                });

                $item.click(event => event.stopPropagation());

                return $item;
            }

            $this.click(() => {
                $this.toggleClass("menu-open");
            });

            $items.each(function() {
                const $item = $(this);
                const id = $item.data("id");
                const defaultCount = Number($item.data("defaultcount") || "0");

                itemCount[id] = defaultCount;
                totalItems += defaultCount;
                setItemSettings(id, $item);
                addControls(id, $item);
            });

            updateDisplay();
        });

        return this;
    };
})(jQuery);
