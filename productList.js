(function () {

    var mockDatabase = [
        { _id: '1', name: 'Beep Bop Case', price: 9.99, category: 'design', img: 'img/beepbop.png' },
        { _id: '2', name: 'Best Friend Cases', price: 21.99, category: 'design', img: 'img/bestFriend.jpg' },
        { _id: '3', name: 'Fire Rose Case', price: 11.99, category: 'design', img: 'img/rose.png' },
        { _id: '4', name: 'Solid Black Case', price: 8.99, category: 'solid', img: 'img/solidBlack.jpg' },
        { _id: '5', name: 'Solid Blue Case', price: 7.99, category: 'solid', img: 'img/solidBlue.jpg' },
        { _id: '6', name: 'Try Guys Case', price: 15.99, category: 'design', img: 'img/tryguys.jpg' },
        { _id: '7', name: 'Tea Case', price: 13.99, category: 'design', img: 'img/tea.jpg' },
        { _id: '8', name: 'Solid Pink Case', price: 18.99, category: 'solid', img: 'img/solidPink.jpg' },
        { _id: '9', name: 'Solid Yellow Case', price: 7.95, category: 'solid', img: 'img/solidYellow.jpg' },
        { _id: '10', name: 'Solid Lilac Case', price: 8.95, category: 'solid', img: 'img/solidLilac.png' },
    ];

    function renderList (results) {
        var listBody = document.querySelector('.list-data');

        // clear out inner HTML to get rid of any older results
        listBody.innerHTML = '';

        //modeled after the demo Professor Nissen showed in class
        var listItems = results.map(function (result, index) {
            return '<div class="card">' +
                '<img src="'+ result.img+'">' +
                '<div class="info"><h3>' + result.name +
                '</h3>'+ result.price +
                '</div></div>';
        });
        // Set the contents of the table body to the new set of rendered HTML rows
        //row is one of the items in the array created by the map function
        listItems.forEach(function (row) {
            listBody.innerHTML += row; // += adds to HTML instead of overwriting it entirely.
        });
    }

    renderList(mockDatabase);

    // Function to Order results list from the Advanced JS
    function orderBy(sortValue) {
        // Sort method varies based on what type of value we're sorting

        // ? = if else statement
        // the first block is "if" / true and the second block is "else"/false
        // they are separated by :
        var sortedResults = (sortValue === 'name') ?
            mockDatabase.sort(function (a, b) { // Strings need to be sorted in a slightly more compldex way
                var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                // Sorts alphabetically.  -1 puts it before. 1 puts it after
                if (nameA < nameB) {
                    return -1; //name A should go first
                }
                if (nameA > nameB) {
                    return 1; //name B should go first
                }
            }) :
            mockDatabase.sort(function (a, b) { // Numbers a booleans are much simpler.
                // Just need positive or negative number
                // Object properties can be accessed through a string representing their name
                return a[sortValue] - b[sortValue];
                // subtracting: if you get a negative number --> b is greater than a
                // basically returns a sorted list

                //only need this part if ur sorting by price
            });
        renderList(sortedResults);
    }

    // Change events trigger after the value of a form input changes
    document.querySelector('#orderBy').addEventListener('change', function(event){
        // Event is the JavaScript event that transpired, in our change a CHANGE event.
        // Target is the element it was performed on, useful for when the event targets
        // multiple elements.
        // Value has the name implies is the current value of the input element, if there is one
        orderBy(event.target.value);
    });

    //Function to filter by category (Solid colors vs. Designs)
    function filterByCategory (category) {

        //if the value is "Select Category", then it should return the entire database
        if (!category){
            return renderList(mockDatabase);
        }

        var filteredCategoryResults = mockDatabase.filter(function (item) {
            return item.category == category;
        });
        renderList(filteredCategoryResults);
    }

    // Change events trigger after the value of a form input changes
    document.querySelector('#category').addEventListener('change', function (event) {
        // Event is the JavaScript event that transpired, in our change a CHANGE event.
        // Target is the element it was performed on, useful for when the event targets
        // multiple elements.
        // Value has the name implies is the current value of the input element, if there is one
        filterByCategory(event.target.value);
    });

    //Function to filter by price range ($1-$10), ($11-20), ($20 + )
    function filterByPriceRange (price) {
        var ranges = {1: [1, 10], 2:[11, 20], 3:[21, 100000000000]};
        var range = ranges[price]; //here price is the value from the selection {1, 2, 3}

        //if the value is "Select Price Range", then it should return the entire database
        if (!range){
            return renderList(mockDatabase);
        }

        //filter method will create an array with all the cases that passes the condition
        var filteredPriceResults = mockDatabase.filter(function (item) {
            return item.price > range[0] && item.price < range[1];
        });

        renderList(filteredPriceResults);
    }

    // Change events trigger after the value of a form input changes
    document.querySelector('#priceRange').addEventListener('change', function (event) {
        // Event is the JavaScript event that transpired, in our change a CHANGE event.
        // Target is the element it was performed on, useful for when the event targets
        // multiple elements.
        // Value has the name implies is the current value of the input element, if there is one
        filterByPriceRange(event.target.value);
    });

})();