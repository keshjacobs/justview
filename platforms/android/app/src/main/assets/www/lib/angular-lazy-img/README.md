# angular-lazy-img

Lightweight lazy load images plugin. Only 1kb after gziping. Pure JavaScript, only Angular as dependency.

## Installation

1. `bower install --save angular-lazy-img`
2. Include `angular-lazy-img` in your HTML.

    ```html
    <script src="<your-bower-components>/angular-lazy-img/release/angular-lazy-img.js"></script>
    ```

3. Inject the `angular-lazy-img` module in your application.

    ```js
    angular.module('your.module', [
        'angularLazyImg'
    ]);
    ```

## Usage

Just add lazy-img attribute with source to file that you want to lazy load

  ```html
  <img lazy-img='photo.jpeg' />
  ```

If you want show spinner put it in src attribute

  ```html
  <img src='spinner.gif' lazy-img='photo.jpeg' />
  ```
  
If you want load a default image when requested gets an error use lazy-img-error attribute

  ```html
  <img lazy-img='photo.jpeg' lazy-img-error='no-photo.jpeg' />
  ```

You want to lazy load background image? No problem, add directive to anything you like and it will handle the rest.

  ```html
  <div lazy-img='photo.jpeg'></div>
  ```

If you need to run the image check manually (for example when clicking on tabs that filter your image result), 
you can trigger it that way:

  ```js
  $rootScope.$emit('lazyImg:refresh');
  ```
  
On success and error lazyImg will trigger events on $rootScope - lazyImg:success and lazyImg:error, passing as first param image 

### Configuration

Inside your config require 'lazyImgConfigProvider' and set custom options.

  ```js
  angular.module('your.module', [
    'angularLazyImg'
  ]).config(['lazyImgConfigProvider', function(lazyImgConfigProvider){
    var scrollable = document.querySelector('#scrollable');
    lazyImgConfigProvider.setOptions({
      offset: 100, // how early you want to load image (default = 100)
      errorClass: 'error', // in case of loading image failure what class should be added (default = null)
      successClass: 'success', // in case of loading image success what class should be added (default = null)
      onError: function(image){}, // function fired on loading error
      onSuccess: function(image){}, // function fired on loading success
      container: angular.element(scrollable) // if scrollable container is not $window then provide it here. This can also be an array of elements.
    });
  }])
  ```
#### Use a scrollable container in a dynamic page
Just add ```lazy-img-container``` attribute to your scrollable container to be considered when you scroll him.

## Author

Copyright 2017, [Pawe?? Wszo??a](https://github.com/Pentiado) (wszola.p@gmail.com)
