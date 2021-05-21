# jQuery Image Maker
## Image maker

> **JQuery Image Maker plugin is a response plugin that enable you to add a custom resizable texts to image in addition to merge images and Draw. It based on HTML5 canvas. **

## Demo & Examples

[https://www.tolastbit.com/apps/meme-generator](https://www.tolastbit.com/apps/meme-generator)

## Depends libraries:
 *  jquery
 *  jquery.ui
 *  jqueryui-touch-punch

## Example Usage

## Using JQuery maker

Just follow these simple steps in order to enable Image Maker to your app:

1. Include jQuery and jQuery UI and jQuery UI Touch Punch on your page.

    ```html
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.2/jquery.ui.touch-punch.min.js"></script>
    ```

2. Download imageMaker then add imageMaker.js and imageMaker.css then Include them after the dependend plugins above in 1.

    ```html
    <script src="imageMake.js"></script>
    <link rel="stylesheet" href="imageMake.css">
    ```

3. Add in the body of page html the main element of Image Maker.

    ```html
    <div id="imageMaker1"></div>
    ```
4. Enable the Image Maker by add the following js code
    ```js
    $('#imageMaker1').imageMaker()
    ```    

_Tested on iPad, iPhone, Android and other touch-enabled mobile devices._
