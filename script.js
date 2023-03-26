class Vtip {
    constructor(category, setup, delivery, id, type) {
        this.category = category;
        this.setup = setup;
        this.delivery = delivery;
        this.id = id,
        this.type = type;
    }

    vymazLocalStorage() {
        localStorage.removeItem("joke");
    }
}

let pomocnyData;

$(document).ready(function () {
    
    var joke = new Vtip();
    // Naètení dat z API a vložení do kartièek
    $.ajax({
        url: "https://v2.jokeapi.dev/joke/any?type=twopart",
        dataType: "json",
        success: function (data) {
            pomocnyData = data;
            localStorage.setItem("joke", JSON.stringify(data));
            joke.category = data.category;
            joke.setup = data.setup;
            joke.delivery = data.delivery;
            joke.id = data.id;
            joke.type = data.type;
            $(".card-title").text(data.category);
            $(".card-text").text(data.setup);
            $(".answer").text(data.delivery);
            $(".id").text(data.id);
            $(".type").text(data.type);
            
        },
        error: function () { // error callback 
            alert('Error with connection to website');
        }
    });


    $(document).keydown(function (e) {

        if (e.keyCode == 37) { // šipka doleva
            nactiZLocalStorage();

        } else if (e.keyCode == 39) { // šipka doprava
            ulozJoke();
            nactiJoke();
        }
    });

    $("#next").click(function () {
        ulozJoke();
        nactiJoke();
    });

    $("#previous").click(function () {
        nactiZLocalStorage();
    });


    $("#details").click(function () {
        $("#my-table").show();
        $("#hide").show();
    });

    $("#hide").click(function () {
        $("#my-table").hide();
        $("#hide").hide();
    });

});

function ulozJoke() {
    localStorage.setItem("joke", JSON.stringify(pomocnyData));
}

function nactiJoke() {
    $.ajax({
        url: "https://v2.jokeapi.dev/joke/any?type=twopart",
        dataType: "json",
        success: function (data) {
            pomocnyData = data;
            $(".card-title").text(data.category);
            $(".card-text").text(data.setup);
            $(".answer").text(data.delivery);
            $(".id").text(data.id);
            $(".type").text(data.type);
        },
        error: function () { // error callback 
            alert('Error with connection to website');
        }
    });
}

function nactiZLocalStorage() {
    var joke = JSON.parse(localStorage.getItem("joke"));
    $(".card-title").text(joke.category);
    $(".card-text").text(joke.setup);
    $(".answer").text(joke.delivery);
    $(".id").text(joke.id);
    $(".type").text(joke.type);

}