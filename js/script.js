var app = new Vue({
    el: '#app',
    data: {
        articles: [],
        allWhiskies: [],
        regions: ['all'],
        activeBtn: "all",
        filteredWhiskies: [],
        isactive: false

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

        setActiveRegion: function (btn) {
            this.activeBtn = btn;
            this.clearFilteredWhiskies();
            if (btn == 'all') {
                this.getAllWhiskies();
            } else {
                this.fillFilteredWhiskies(btn);
            }
        },

        clearFilteredWhiskies: function () {
            this.filteredWhiskies = [];
        },

        fillFilteredWhiskies: function (region) {
            for (var i = 0; i < this.allWhiskies.length; i++) {
                if (this.activeBtn == region && this.allWhiskies[i].region == region) {
                    this.filteredWhiskies.push(this.allWhiskies[i]);
                }
            }
        },

        getAllWhiskies: function () {
            this.filteredWhiskies = this.allWhiskies;
        },

        goToWebsite: function (uri) {
            window.open(this.articles[0].url + uri, '_blank');
        },

        collectRegions: function () {
            for (var i = 0; i < this.allWhiskies.length; i++) {
                if (!this.regions.includes(this.allWhiskies[i].region)) {
                    this.regions.push(this.allWhiskies[i].region);
                }
            }
            this.regions.sort();
        }
    }
});