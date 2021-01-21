new Vue({
  el: "#app",
  data: {
    isDisplayingCart: false,
    baseURL: 'http://snaksnak.somee.com',

    cart: {
      items: []
    },
    props: ['key'],
    categories: [],
    products: [],
    key: '',
  },

  methods: {
    fetchProducts: function() {
      this.loading = true;
      axios.get(this.baseURL + '/api/Product')
      .then((result) => {
          this.products = result.data.reverse();
          this.loading = false;
      })
      .catch((err) => console.log(console.log));
    },

    fetchCategories: function(key) {
      axios.get(this.baseURL + '/api/Product')
      .then((response) => {
        
        this.categories = response.data.filter(
          function (item) {
            return item.category.name == key;
          }  
        )
      })
    },
    
    GetClicks: function(){
      this.key = window.localStorage.getItem("clicks");
      
      this.fetchCategories(this.key);
    },

    addProductToCart: function (product) {
      var cartItem = this.getCartItem(product);
      if (cartItem != null) {
        cartItem.quantity++;
      }
      else {
        this.cart.items.push({
          product: product,
          quantity: 1
        });
      }
      product.stockOnHand--;
    },

    //returns the cartitem if product is already in cart, else return null
    getCartItem: function (product) {
      for (let i = 0; i < this.cart.items.length; i++) {
        if (this.cart.items[i].product.id === product.id) {
          return this.cart.items[i];
        }
      }
      return null;
    },

    increaseQuantity: function (cartItem) {
      cartItem.product.stockOnHand--;
      cartItem.quantity++;
    },

    decreaseQuantity: function (cartItem) {
      cartItem.quantity--;
      cartItem.product.stockOnHand++;

      if (cartItem.quantity == 0) {
        this.removeItemFromCart(cartItem);
      }
    },

    removeItemFromCart: function (cartItem) {
      var index = this.cart.items.indexOf(cartItem);
      if (index !== -1) {
        this.cart.items.splice(index, 1);
      }
    },

    checkoutCart: function () {
      if (confirm('Are you sure you want to checkout?')) {
        this.cart.items.forEach(item => (item.product.stockOnHand += item.quantity));
        this.cart.items = [];
      }
    }
  },

  computed: {
    cartTotal: function () {
      var total = 0;
      this.cart.items.forEach(
        item => (total += item.quantity * item.product.price)
      );
      return total;
    },

    taxAmount: function () {
      return (this.cartTotal / 10);
    }
  },

  filters: {
    currency: function (value) {
      var formatter = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2
      });

      return formatter.format(value);
    }
  }, 
  
  mounted: function () {
    this.GetClicks();
  },
});
