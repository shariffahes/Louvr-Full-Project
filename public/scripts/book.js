let data = 0;
let total = 0;
let left = 150;

document.getElementById("counting").innerText = data;

function increment() {
    if (document.getElementById("month").value != "Select Month"
        && document.getElementById("day").value != "Select Day") {
        data = data + 1;
        if (data <= 10) {
            document.getElementById("counting").innerText = data;
        }

        else {
            data = 10;
            document.getElementById("counting").innerText = data;
            document.getElementById("counting").style.color = 'red';
        }
        calc();
    }
}

function decrement() {
    if (document.getElementById("month").value != "Select Month"
        && document.getElementById("day").value != "Select Day") {
        data = data - 1;
        if (data >= 0) {
            document.getElementById("counting").style.color = 'black';
            document.getElementById("counting").innerText = data;
        }
        else {
            data = 0;
            document.getElementById("counting").innerText = data;
        }

        calc();
    }
}

function calc() {
    total = data * 17;
    document.getElementById("total").innerText = total;
    leftTickets();
}

function leftTickets() {
    left = 150 - data;
    document.getElementById("left").innerText = left;
}
