
var snakApp = new Vue({

    el: '#app',
    data:{
        baseURL: 'http://snaksnak.somee.com',
        appTitle: 'Snak-Snak For You!',
        headers: ['Id','Name', 'Category', 'Source', 'Package', 'StockOnHand', 'Price', 'Image'],
        products:[],
        category:[],
        images: [],
        key:'1',
        
    },
 
    methods: {
        loadProducts: function (key) {
            axios.get(this.baseURL + "/api/Product" )
            .then(response => {
                this.products = response.data;
                console.log(this.products);
            })
            .catch(err => {
                console.error(err);
            })
        }
 //       getImagesByIndex: function () {}
    },

    mounted: function () {
      this.loadProducts(1);
//      this.getImagesByIndex();
    },
})