$(document).ready(() => {
    const inputEl = $('#ticketsCounter')

    $('.minus').click(function () {
        let count = parseInt(inputEl.val()) - 1;
        count = count < 1 ? 1 : count;
        inputEl.val(count);
        inputEl.change();
        return false;
    });
    $('.plus').click(function () {
        inputEl.val(parseInt(inputEl.val()) + 1);
        inputEl.change();
        return false;
    });
    inputEl.change((e) => {
        let value = e.target.value 
        if  (value <=0 || isNaN(parseInt(value))) {
            inputEl.val(1);
        }
    })
});