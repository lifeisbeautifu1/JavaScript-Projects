

document.querySelector(".filter").addEventListener('keyup', function() {
    const input = document.querySelector(".filter").value.toLowerCase();

    const list = document.querySelectorAll('.list-item');

    list.forEach(function(item) {
        if (item.textContent.toLowerCase().indexOf(input) != -1) {
            item.style.display = '';
        }
        else {
            item.style.display = 'none';
        }
    });
});