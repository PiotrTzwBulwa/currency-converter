(function ($) {
    const currencies = document.querySelectorAll(".input-currency");
    const date = document.querySelector(".date");
    const clearBtn = document.querySelector(".clear-btn");

    const pln = document.querySelector("#input-PLN");
    const euro = document.querySelector("#input-Euro");
    const gbp = document.querySelector("#input-GBP");
    const usd = document.querySelector("#input-USD");

    const euroName = document.querySelector("#Euro-currency");
    const gbpName = document.querySelector("#GBP-currency");
    const usdName = document.querySelector("#USD-currency");

    const dataURL = "http://api.nbp.pl/api/exchangerates/tables/a/";

    $.getJSON(dataURL, function (data) {
        date.textContent = data[0].effectiveDate;

        euroCurrency = data[0].rates[7].mid;
        gbpCurrency = data[0].rates[10].mid;
        usdCurrency = data[0].rates[1].mid;

        euroName.textContent = "1 EURO = " + euroCurrency + " zł";
        gbpName.textContent = "1 GBP = " + gbpCurrency + " zł";
        usdName.textContent = "1 USD = " + usdCurrency + " zł";

        pln.addEventListener("keyup", function () {
            euro.value = (pln.value / euroCurrency).toFixed(6);
            gbp.value = (pln.value / gbpCurrency).toFixed(6);
            usd.value = (pln.value / usdCurrency).toFixed(6);
        });

        euro.addEventListener("keyup", function () {
            pln.value = (euro.value * euroCurrency).toFixed(6);
            gbp.value = (euro.value * (euroCurrency / gbpCurrency)).toFixed(6);
            usd.value = (euro.value * (euroCurrency / usdCurrency)).toFixed(6);
        });

        gbp.addEventListener("keyup", function () {
            euro.value = (gbp.value * (gbpCurrency / euroCurrency)).toFixed(6);
            pln.value = (gbp.value * gbpCurrency).toFixed(6);
            usd.value = (gbp.value * (gbpCurrency / usdCurrency)).toFixed(6);
        });

        usd.addEventListener("keyup", function () {
            euro.value = (usd.value * (usdCurrency / euroCurrency)).toFixed(6);
            pln.value = (usd.value * usdCurrency).toFixed(6);
            gbp.value = (usd.value * (usdCurrency / gbpCurrency)).toFixed(6);
        });

        clearBtn.addEventListener("click", function () {
            currencies.forEach(currency => {
                if (currency.textContent !== null) {
                    currency.value = null;
                }
            })
        });
    })
})(jQuery);










