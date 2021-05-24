# jQuery Image Maker
## Image maker

> **JQuery Image Maker responsive plugin enable you to add a custom resizable texts to image in addition to merge images and Draw. It based on HTML5 canvas. **

## Demo & Examples
### [Clothes & T-Shirt maker](https://mattar88.github.io/imageMaker/demo#clothe-tshirt-maker)
### [Meme Generator](https://mattar88.github.io/imageMaker/demo#memegenerator)
### [Birthday Cards](https://mattar88.github.io/imageMaker/demo#birthday-cards)
### [Image Maker](https://mattar88.github.io/imageMaker/demo#image-maker)

## Screenshots

| Birthday Cards  | Clothes & T-Shirt maker |
| :------------ | :------------- |
| <img src="screenshots/birthday-cards.jpeg" width="250"> | <img src="screenshots/clothe-tshirt-maker.jpeg" width="250"> |

## Features:
 *  Responsive works on Desktop, tablet, mobile
 *  Unlimited imageMaker in the same page, you can define more than one Image maker in the same page.
 *  Translatable
 *  Have many operations: Resizable and draggable texts, merge image, upload template, predefined merge images and templates, Draw
 *  We can used as Clothes or T-shirt design maker(add logo or Icon or emotions to your cloth), Meme generator, Birthday Cards maker. 

## Dependent libraries:
 *  jquery
 *  jquery.ui
 *  jqueryui-touch-punch(optional for mobile)

## Installation

## Using JQuery Image Maker

Just follow these simple steps in order to enable Image Maker to your app:

1. Include jQuery and jQuery UI and jQuery UI Touch Punch on your page.

    ```html
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.2/jquery.ui.touch-punch.min.js"></script>
    ```
    Note: You can skip the include of jqueryui-touch-punch plugin for desktop use only
    
2. Download imageMaker then add imageMaker.min.js and imageMaker.min.css.

    ```html
    <link rel="stylesheet" type="text/css" href="imageMake.min.css">
    <script src="imageMaker.min.js"></script>
    ```

3. Add in the body of the page html the main element of Image Maker.

    ```html
    <div id="imageMaker1"></div>
    ```
4. Enable the Image Maker by add the following js code
    ```js
    $('#imageMaker1').imageMaker()
    ```    
# Settings
## Options

| Option name | Description | Type | Default |
| :---         |     :---      |     :---: |  :---: |
| templates   | You can predefine images that used as template.It's array of object that contains url and title of predefined templated   | [{url:'','title':''},]    |[] |
| template_thumbnail_width     | Width of predefined template       |   integer   | 50 |
| template_thumbnail_height     | Height of predefined template       |   integer   | 50 |
| merge_images   | You can predefine images to merge with the template. It's array of object that contains url and title of predefined merges Images   | [{url:'','title':''}]    | []|
| merge_image_thumbnail_width   | Width of predefined merge image   | Integer  | 'auto' |
| merge_image_thumbnail_height   | Height of predefined merge image   | Integer  | 50 |
| downloadGeneratedImage   | Maybe you need to send generated image to backend using ajax(or other technology) instead of download it so you have the ability to disabled download image by set this variable false and user the hook onGenerate()  | bool  | true |
| text_boxes_count | The count of textboxes that should add by default  | Integer  | 2 |
| i18n   | Allows you to alter all texts appears And therefore you can translate them  | json  | {fontFamilyText: 'Font Family', enterTextText:'Enter Text', topText:'Top Text',bottomText: 'Bottom Text', sizeText:'Size', uperCaseText:'UperCase', mergeImageText: 'Merge Image', drawText:'Draw', addTextBoxText:'Add TextBox', previewText:'Preview', addTemplateText:'add template', resetText: 'Reset', imageGeneratorText: 'Image maker',stopBrushingText:'Stop Brushing', canvasLoadingText: 'Canvas Loading'}|
              
## Hooks and Events

| Event name | Description | function | Parameters |
| :---         |     :---      |     :---: |  :---: |
| preRender   | Invoked before render html, you can alter every HTML elements appears using this function, note you are required to return the altered HTML  | function(html){return html;},  |html |
| onInitialize     | Invoked before attached events, allows you to alter options      |   function(canvas_info){}   | canvas_info refer to Options |
| onLoad     | Invoked after everything loaded      |   function(canvas_info){}   | canvas_info refer to Options |
| onGenerate   | Invoked on click button to generate image   | function(data, formData){}  | data = {  amm_canvas: file base64, all_texts:Array, drwaIsEmpty: Integer, imagesIsEmpty:Integer} And formData contains all serialized data mentioned before ready to send to server |
| alterFontFamilies   | Invoked before show all font families options used for resizable text  | function(All_FontFamilies){}    | All_FontFamilies |
| alterTextInfo   |Allows to alter default text options   | function(text_info){}  | text_info = {toUpperCase: true,  shadowColor:'black', shadowBlur:3, textColor: '#ffffff', textAlign: 'center', strokeColor:'#000000', lineWidth:3, fontStyle: "normal", fontVariant:"normal", fontWeight:"bold", fontFamily:"impact", fontSize: 50,inputFontSize:50} |

## Example 
````js
 $('#imageMaker1').imageMaker({
            merge_images:[{url: './assets/design/just_do_it.png', title:'Just Do it'},
                        {url: './assets/design/starbucks.png', title:'Starbucks'},
                        {url: './assets/design/kiss.png', title:'Kiss'},
                        {url: './assets/design/donkey.png', title:'Donkey 1'},
                        {url: './assets/design/donkey2.png', title:'Donkey 2'},
            ],
            templates:[
            {url: './assets/design/t-shirt-white.png', title:'T-shirt White'},
            {url: './assets/design/t-shirt-black.png', title:'T-shirt black'},],
            text_boxes_count:0,
         merge_image_thumbnail_width:'auto',
        merge_image_thumbnail_height:50,
        template_thumbnail_width:50,
        template_thumbnail_height:50,
        i18n:{fontFamilyText: 'Font Family',
                enterTextText:'Enter Text',
                topText:'Top Text',
                bottomText: 'Bottom Text',
                sizeText:'Size',
                uperCaseText:'UperCase',
                addTemplateText:'Add template'
         },
         downloadGeneratedImage:true,
         onGenerate: function(data, formData){          
                $.ajax({
                type: "POST",
                url: "YOURCALLBACK",
                data: formData,
                success: function (data) {},
                complete: function() {}})
                },
         preRender:function(html){ html+="<div>this is my alter</div>"; return html;},
         onInitialize:function(canvas_info){},
         onLoad:function(canvas_info){console.log('onLoad');},
         alterTextInfo:function(text_info){},
         alterFontFamilies:function(All_FontFamilies){  All_FontFamilies.push('Roboto'); },
       });
````


_Tested on iPad, iPhone, Android and other touch-enabled mobile devices._
