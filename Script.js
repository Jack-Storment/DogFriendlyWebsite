var submitKey = $("#submitBtn");
submitKey.on("click", function (event) {
    event.preventDefault();
    recipeCall()
});
    function recipeCall() {
        //API Key for Recipe API
        var APIkey = "6c17af7ffbmshb5f0cfe89a10bd1p10c4abjsnb53576e25767";

        //Here we grab the text from the input box
        var ingredients = $("#ingredients-input").val();
        $(".results-block").empty();
        //Here we construct our URL
        var queryURL = "https://cors-anywhere.herokuapp.com/https://recipe-puppy.p.rapidapi.com/?i=" + encodeURIComponent(ingredients) +"&q='puppy+safe'+'doggy'+'puppy+treat'+'dog+friendly'+'dog+treats'";
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": queryURL,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "recipe-puppy.p.rapidapi.com",
                "x-rapidapi-key": APIkey
            }
        }

        $.ajax(settings).then(function (response) {
            console.log(response)
            console.log(JSON.parse(response))
            // console.log(response);

            var parsedResponse = JSON.parse(response)
            var results = parsedResponse.results;

            console.log(results)


            for (var i = 0; i < results.length; i++) {
                var resultsDiv = $("<div>").addClass("flex flex-wrap rounded-lg bg-white overflow-hidden mb-8 shadow-md recipe-div");

                var title = results[i].title;
                var t = $("<h3>").text(title).attr("class", "text-white text-xl p-4 font-bold leading-tight w-full");

                var href = $("<a>");
                href.attr("href", results[i].href).attr("target", "_blank").text("See Recipe").addClass("text-white text-center font-bold py-1 px-2 rounded m-3 block mt-4 w-32 float-right uppercase formBtn");
                $("<button>").text(href);

                var ingred = results[i].ingredients;
                var inc = $("<p>").text("Ingredients: " + ingred).attr("class", "text-black text-l p-4 leading-tight");

                var foodImage = $("<img>");
                foodImage.attr("src", results[i].thumbnail || "Assets/dogRecipe-placeholderImage.jpg").addClass("recipe-image");


                resultsDiv.append(t);
                resultsDiv.append(href);
                resultsDiv.append(inc);
                resultsDiv.append(foodImage);

                $("<div>").append(resultsDiv);

                $(".results-block").append(resultsDiv);

            }

        })
        $('#ingredients-input').val('').removeAttr('checked').removeAttr('selected');
    };
    recipeCall()

    function scrollToTop() { 
        window.scrollTo({top: 0, behavior: 'smooth'}); 
    } 