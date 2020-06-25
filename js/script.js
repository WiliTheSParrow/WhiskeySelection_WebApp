var app = new Vue({
    el: '#app',
    data: {
        articles: [],
        allWhiskies: [],
        regions: ['all'],
        activeBtn: "all",
        filteredWhiskies: [],
        isactive: false,
        twoWhiskey: false

    },

    created: function () {
        this.getLocalData('whiskies.json', 'allWhiskies');
        this.getLocalData('articles.json', 'articles');
    },

    methods: {
        getLocalData: function (link, destination) {
            fetch(link, {
                    method: "GET",
                })
                .then(response => response.json())
                .then(json => {
                    app[destination] = json;
                    if (app.filteredWhiskies == '') {
                        this.collectRegions();
                        this.getAllWhiskies();
                    };
                })
                .catch(error => error);
        },

        // Sets the twoWhiskey to true/false. Controls the UI if there is only two whiskey it changes the justify-content to space-around or space-between by adding the necessary class name in the HTML.
        setWhiskeyCardUI: function () {
            var whiskeyArrayLength = this.filteredWhiskies.length === 2;
            whiskeyArrayLength ? this.twoWhiskey = true : this.twoWhiskey = false;
        },

        // Sets the activeBtn(region), calls the function which clears the array, calls the necessary filtering function regarding the region to set the filteredWhiskies array, calls the setWhiskeyCardUI function to set the UI.
        setActiveRegion: function (btn) {
            this.activeBtn = btn;
            this.clearFilteredWhiskies();
            this.activeBtn == 'all' ? this.getAllWhiskies() : this.fillFilteredWhiskies(btn);
            this.setWhiskeyCardUI();
        },

        // Clears the filteredWhiskies array.
        clearFilteredWhiskies: function () {
            this.filteredWhiskies = [];
        },

        // Fills the filteredWhiskies array with the active region whiskies.
        fillFilteredWhiskies: function (region) {
            this.allWhiskies.map(el => {
                if (this.activeBtn == region && el.region == region) {
                    this.filteredWhiskies.push(el);
                }
            });
        },

        // Fills the filteredWhiskies array with all region whiskies.
        getAllWhiskies: function () {
            this.filteredWhiskies = this.allWhiskies;
        },

        // Sets the webpage URLs for the whiskey cards from JSON files.
        goToWebsite: function (uri) {
            window.open(this.articles[0].url + uri, '_blank');
        },

        // Collects and sorts the regions from JSON file to set up the menu bar on the UI.
        collectRegions: function () {
            this.allWhiskies.map(el => {
                if (!this.regions.includes(el.region)) {
                    this.regions.push(el.region);
                }
            });
            this.regions.sort();
        }
    }
});