/*!
 * jQuery Image Maker 1.0.0
 *
 * Copyright 2015–2021, Mohammad Attar
 *
 * Depends:
 *  jquery
 *  jquery.ui
 *  jqueryui-touch-punch
 */

(function (global, $) {

  if (typeof $ === 'undefined') {
        console.error('Image Maker requires jQuery.');
}



$.fn.imageMaker = function (options) {
        
        var selectors = {
            wrapperMain: '.wrapper-memes-main',
            wrapperOperations:'.wrapper-memes-operations',
            wrapperUploadImage:'.wrapper_upload_image',
            wrapperTextBoxes: '.amm-text-boxes',
            wrapperMemesPreview:'.wrapper-memes-preview',
            wrapperMemesPreviewOperations:'.wrapper-memes-preview-operations',
            wrapperCanvasBackground:'.wrapper_canvas_background',
            wrapperCanvas:'.wrapper_canvas',
            wrapperSelectImageAmm:'.wrapper_select_image_amm',
            wrapperHoverTitleMemeAmm:'.wrapper_hover_title_meme_amm',
            wrapperThumbnailMeme:'.wrapper_thumbnail_meme',
            ammCanvas: '.amm_canvas',
            addTextBox:'.add_textbox',
            generateMeme: 'generateMeme'
        }




function unique_id(){
    return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
}



var initialElements  = function(canvas_info) {
    var buildImagesMemes = '<div class="view-images-memes-ar-amm">';
    buildImagesMemes += '<div class="wrapper_hover_title_meme_amm"></div>';
    buildImagesMemes += '<div class="wrapper_thumbnail_meme">';
     
    $.each(canvas_info.templates,function(delta, img){
        buildImagesMemes += '<div class="wrapper_select_image_amm">';
        buildImagesMemes +=   '<img typeof="foaf:Image" width="'+canvas_info.template_thumbnail_width+'" height="'+canvas_info.template_thumbnail_height+'" src="'+img.url+'" title="'+img.title+'">';
        buildImagesMemes += '</div>';
    });
    buildImagesMemes += '</div>';
    buildImagesMemes += '</div>';


    var buildImagesMergeMemes = '<div class="wrapper-amm-select-merge-images">';
        buildImagesMergeMemes += '<div class="wrapper-amm-hover-title-merge-images"></div>';
        buildImagesMergeMemes +='<div class="wrapper-thumbnail-merge-images">';
        $.each(canvas_info.merge_images,function(delta, img){
            buildImagesMergeMemes +='<div class="wrapper-select-merge-image-amm">';
            buildImagesMergeMemes +=   '<img typeof="foaf:Image" width="'+canvas_info.merge_image_thumbnail_width+'" height="'+canvas_info.merge_image_thumbnail_height+'" src="'+img.url+'" title="'+img.title+'">';
            buildImagesMergeMemes +='</div>';
                });
     buildImagesMergeMemes +='</div>'
     buildImagesMergeMemes +='</div>';
  

    return `<div class="wrapper-memes-main">
    
    <div class="wrapper-memes-preview">
    <div class="wrapper-memes-preview-operations">
    
           <button  class="trigger-element first fileUpload btn btn-sm btn-default" target_element_triggered=".amm-addImage" id="amm-merge-image-trigger">
             <input type="file" class="upload amm-addImage"  name="addImage"> 
                <span class="glyphicon glyphicon-picture"></span> 
                <span class="text_value">`+canvas_info.i18n.mergeImageText+`</span>
            </button> 
             <button  class="trigger-element btn btn-sm btn-default" id="amm-brushes">
                             <span class="glyphicon glyphicon-pencil"></span>             <span class="text_value">`+canvas_info.i18n.drawText+`</span>
            </button>      
         
                  <button class="responsive-button hide-responsive-button last btn btn-sm btn-default" id="amm-preview-responsive">
                             <span class="glyphicon glyphicon-eye-open"></span>             <span class="text_value">`+canvas_info.i18n.previewText+`</span>
            </button>      
                  <button href="#" class="trigger-element responsive-button hide-responsive-button first fileUpload btn btn-sm btn-default" 
                  target_element_triggered="#amm-input-upload-image-meme-responsive"  id="amm-upload-image-meme-responsive">
                <input type="file" class="upload" id="amm-input-upload-image-meme-responsive" name="addImage-responsive">             <span class="glyphicon glyphicon-paperclip"></span>             <span class="text_value">`+canvas_info.i18n.addTemplateText+`</span>
            </button>      
 
           
          <div class="wrapper-amm-stop-brushes">
           <button type="submit" class="btn btn-danger" value="Clear" id="amm-clear-brush">Clear</button>
           <button type="submit" class="btn btn-default" value="Stop Brushing" id="amm-stop-brushing">`+canvas_info.i18n.stopBrushingText+`</button>
           <input type="color" data-on="brushes" class="amm-color-picker colorSelectorBrushes" name="colorSelectorBrushes" value="#ffffff" List/>
           <div class="clear_both"></div>
          </div>
          
           <div class="clear_both"></div>
       </div>
    
    <div id="wrapper_canvas_background">
    <div class="wrapper_canvas">
    <canvas id="`+canvas_info.id+`" class="amm_canvas"></canvas>	   
    </div>
    <div class="canvas_loading">`+canvas_info.i18n.canvasLoadingText+`</div>
    
    </div> 
     
    <form class="form-generat-meme" action="meme-generator-callback" method="post" enctype="multipart/form-data">
    <a href="#" type="submit" class="generate_meme btn btn-default btn-primary form-submit" disabled="disabled" >`+canvas_info.i18n.imageGeneratorText+`</a>
    <button type="submit" class="btn btn-default btn-danger form-submit reset_meme" >`+canvas_info.i18n.resetText+`</button>
    </form>
    
    </div>
   

    <div class="wrapper-memes-operations">
    `+buildImagesMergeMemes+`
    `+buildImagesMemes+`
     <div class="amm-text-boxes"></div>
     <form action="/" method="post" class="advanced-options-operations-form" accept-charset="UTF-8"><div><input type="hidden" name="form_build_id" value="form-C56rQ956oZXaasEGaFTd4nA7cf4GnkPvYCU0HEoO-fg">
     <input type="hidden" name="form_id" value="advanced_options_operations_form">
     <button class="add_textbox btn btn-success form-submit edit-add-textbox"  name="op" value="add_textbox" type="button">`+canvas_info.i18n.addTextBoxText+`</button>
     </div></form>
    </div>

    <div class="clear_both"> </div>

    </div>`;
    }



$(this).each(function (delta) {
 
     var container = $(this);
      

     var canvas_info = {
        id:this.id ? this.id: unique_id(),
        canvas: null,
        ctx: null,
        final_width: 0,
        final_height: 0,//The final width of canvas after load and scale canvas
        _maxWidth: 500,//The initial size that used for scale
        _maxHeight: 700,
        position_left: 0,
        ratio_image: 1,
        ratio_width: 0,
        ratio_height: 0,
        height_div: 100,
        text_boxes_count:2,
        merge_images: [],
        merge_image_thumbnail_width:'auto',
        merge_image_thumbnail_height:50,
        template_thumbnail_width:50,
        template_thumbnail_height:50,
        templates: [],
        img: null,
        downloadGeneratedImage:true,
        onGenerate:function(data, formData) {},
        preRender:function(html){return html;},
        onInitialize:function(canvas_info){},
        onLoad:function(canvas_info){},
        alterTextInfo:function(text_info){},
        alterFontFamilies:function(All_FontFamilies){},
        i18n:{fontFamilyText: 'Font Family',
             enterTextText:'Enter Text',
             topText:'Top Text',
             bottomText: 'Bottom Text',
             sizeText:'Size',
             uperCaseText:'UperCase',
             mergeImageText: 'Merge Image',
             drawText:'Draw',
             addTextBoxText:'Add TextBox',
             previewText:'Preview',
             addTemplateText:'Add template',
             resetText: 'Reset',
             imageGeneratorText: 'Image maker',
             stopBrushingText:'Stop Brushing',
             canvasLoadingText: 'Canvas Loading'
              },
        weight:"brushes",/*Order of Draw the Possibilities('brushes', 'text', 'images')*/
     
    };

       $.extend(true, canvas_info, options);
     
       if(!canvas_info.templates.length){
         canvas_info.templates.push({url: 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs', 
                    'title': 'Empty black'});
       }
       var html = initialElements(canvas_info);
       html = canvas_info.preRender(html);
       container.append(html);
       
       canvas_info.onInitialize(canvas_info)
    //    var width_preview = container.find('.wrapper-memes-preview').width();
 //      canvas_info._maxWidth = width_preview ? width_preview : canvas_info._maxWidth;

    /**
     * @constructor
     */
    Texts = function() {
        
    };
    
// Make the length property work
    Object.defineProperty(Texts.prototype, "length", {
        get: function() {
            var count = 0;
            for (var key in this) {
                if (this.hasOwnProperty(key))
                    count++;
            }
            return count;
        }
    });
// Make the keys property work
    Object.defineProperty(Texts.prototype, "keys", {
        get: function() {
            var keys = [];
            for (var key in this) {
                if (this.hasOwnProperty(key))
                    keys.push(key);
            }
            return keys;
        }
    });
    
    
 Object.defineProperty(Texts.prototype, "empty", {
        get: function() {
            for (var key in this) {
                if (this.hasOwnProperty(key) && this[key] !=null && $.trim(this[key].text))
                     return false;
            }
            return true;
        }
    });
 Texts.prototype.reset = function(){ 
      for (var member in this)  this[member].text = "";
       $(MemeGenerator.get_texts_class()).val('');
       container.trigger({type: "CanvasPostChange", value:this, on: 'resetTexts'});
      return true;
    };
    
    
    var texts = new Texts();
    
    
    var Images = function(){
        
    };
    

    var formDataMemeGeneratorData = new FormData();
    
   Object.defineProperty(Images.prototype, "length", {
        get: function() {
            var count = 0;
            for (var key in this) {
                if (this.hasOwnProperty(key))
                    count++;
            }
            return count;
        }
    });
    
   Object.defineProperty(Images.prototype, "keys", {
        get: function() {
            var keys = [];
            for (var key in this) {
                if (this.hasOwnProperty(key))
                    keys.push(key);
            }
            return keys;
        }
    });
  Images.prototype.reset = function(){ 
     for (var member in this) delete this[member];
    
     $(MemeGenerator.get_images_class()).remove();
     container.trigger({type: "CanvasPostChange", value:this, on: 'resetImages'});
      return true;
    };
    
  
    var BrushesPoints = function(){};
    
    
   Object.defineProperty(BrushesPoints.prototype, "length", {
        get: function() {
            var count = 0;
            for (var key in this) {
                if (this.hasOwnProperty(key))
                    count++;
            }
            return count;
        }
    });
    
    Object.defineProperty(BrushesPoints.prototype, "add", {
        get: function(point) {
            this[this.length] = point;
           
        }
    });
   Object.defineProperty(BrushesPoints.prototype, "keys", {
        get: function() {
            var keys = [];
//            console.log(this);
            for (var key in this) {
                if (this.hasOwnProperty(key))
                    keys.push(key);
            }
            
            return keys;
        }
    });
    
    
  
    
    
  BrushesPoints.prototype.reset = function(){
     for (var member in this) delete this[member];
      container.trigger({type: "CanvasPostChange", value:this, on: 'resetBrushes'});
      return true;
    };
     
    var brushespoints = new BrushesPoints();
    
     var pointOptions = {
        lineWidth : 3,
        strokeStyle : "#ffffff" 
     };

        var Point = function(x, y){
         this.x = x;
         this.y = y;
         Point.prototype.lineWidth = 3;
         Point.prototype.strokeStyle = "#ffffff"; 
     };

    
     var images = new Images();

     var ImageInfo = function(){
         this.id = null;
         this.delta = null;
         this.top = 20;
         this.left = 20;
         this.height = 100;
         this.width = 100;
         this.ratioWidth=this.width/canvas_info.final_width; 
         this.ratioHeight=this.height/canvas_info.final_height; 
         this.ratioLeft = this.left/container.find(selectors.ammCanvas).width();
         this.ratioTop = this.top/container.find(selectors.ammCanvas).height();
         this.img = null;
     };
    

     var memeGeneratorData = {
        originalImage: null,
        memeGenerator: 0,
        text: 0
     };
    
    var MemeGenerator = {};
    
    MemeGenerator = {
        get_pointOptions:function(){
            return pointOptions;
        },
        get_brushesPoints:function(){
            return brushespoints;
        },
        get_texts: function() {
            return texts;
        },
        get_texts_class: function() {
            return '.amm-text'; 
        },
       get_images_class: function() {
            return ".imageBoxDR";
        },
        get_images: function() {
            return images;
        },
        set_images: function(images_arg) {
            images = images_arg;
        },
        get_text_id: function(delta){
            return "text_"+canvas_info.id+'_'+delta;
        },
        get_text: function(delta) {
           return texts["text_"+canvas_info.id+'_'+delta];
        },
        set_text: function(text_info) {
            texts["text_"+canvas_info.id+'_'+text_info.delta] = text_info;
        },
        set_texts: function(texts_arg) {
            texts = texts_arg;
        },
        get_canvas_info: function() {
            return canvas_info;
        },
        set_canvas_info: function(canvas_info_arg) {
            canvas_info = canvas_info_arg;
        },
        is_responsive: function(){ 
            return $(window).width()<= 800;
        },//if the parent element have mobile size screen
        is_parent_mobile_screen: function(){ 
            return container.width()<= 800;
        },
        focusout: function(){ 
          //Focus out the cursor from all textareas 
          container.find("textarea").blur();
        },
        
       find_highest_ZIndex: function(){
       return  Math.max.apply(null, $.map($('body *'), function(e,n) {
                                if ($(e).css('position') != 'static')
                                   return parseInt($(e).css('z-index')) || 1;
                   }));
    
    }
  }


    window.onload = function() {};


    function initialize(){
     

          canvas_info.canvas = container.find(selectors.ammCanvas);
        //   console.log(canvas_info.canvas);
          canvas_info.ctx = canvas_info.canvas.get(0).getContext("2d");
          container.find( ".wrapper_select_image_amm:first" ).click();
         
   }
    
  
    // When document has finished loading
 

       var lastPoint;

     container.on('click', ".add_textbox", function(event) {
          event.preventDefault();
    
           var text_info = {
                toUpperCase: true,
                id: null,
                id_box: null,
                delta: null,
                ratioWidth:1, //used for responsive aspect
                ratioHeight: canvas_info.height_div/canvas_info.final_height, 
                ratioLeft: 0,
                ratioTop:0,
                text:"",
                shadowColor:'black',
                shadowBlur:3,
                textColor: '#ffffff',
                textAlign: 'center',
                strokeColor:'#000000',
                lineWidth:3,
                fontStyle: "normal",
                fontVariant:"normal",
                fontWeight:"bold", 
                fontFamily:"impact",
                fontSize: 50,
                inputFontSize:50,
                top: 0,
                left: 0,
                heigth: 0,
                width: 0,
                placeholder:canvas_info.i18n.enterTextText,
                elementChanged:null,
                event:null,
                isNew: true,//If Now created
                getParent: function() {
                    return $('.wrapper-text[delta="'+this.delta+'"]');
                },
                getParentClass: function() {
                    return '.wrapper-text[delta="'+this.delta+'"]';
                },        
                getInfo: function() {
                    return '';
                },
               clone: function() {
                 var obj = this;
                var copiedObject = {};
               jQuery.extend(copiedObject,obj);
                return copiedObject;
            },
            }
        //    console.log("texts", texts);

           var delta = texts.length;
                $.each(texts.keys, function(index, id) {
                     if(texts[id] == null) {
                         var splited = id.split('_', '');
                        delta = splited[splited.length-1];    
                     }
                 })
   
           
            text_info.id = "text_" +canvas_info.id+'_'+delta;
            text_info.id_box = "boxDR_" +canvas_info.id+'_'+delta;
            text_info.delta = delta;
            canvas_info.alterTextInfo(text_info);
            
          
          
            var style = "";
            var top = 0;
            if(delta == 0) text_info.placeholder = canvas_info.i18n.topText;
            if(delta == 1){
                text_info.placeholder = canvas_info.i18n.bottomText;
                //       Height Canvas             -       Responsive Height of Box
                top = container.find(selectors.ammCanvas).height() - (container.find(selectors.ammCanvas).outerHeight()*text_info.ratioHeight);
                
//                console.log(top);
            }
            if(delta > 1){
             top = (container.find(selectors.ammCanvas).height()/2) - ((container.find(selectors.ammCanvas).outerHeight()*text_info.ratioHeight)/2);
             
            }
            text_info.ratioTop = top/container.find(selectors.ammCanvas).height();
            
            style = '';//style="top:'+top+'px;"';
            texts[text_info.id] = text_info;
            var textarea = MemeGeneratorTheme.wrapper_text(text_info);
            container.find('.amm-text-boxes').append(textarea);
 
             var boxDR = $('<div id="' + text_info.id_box +'"'+style+' font="20px Arial" class="boxDR"></div>');
             var delete_box = $('<button href="#" class="delete-box-amm delete-text-boxes"></button>');
             boxDR.append(delete_box);
             delete_box.on('click tap touchstart',function(){
                
                  
                 container.find('#' + text_info.id).closest('.wrapper-text').remove();
                 container.find('#' + text_info.id_box).resizable( "destroy" )
                                                     .draggable('destroy')
                                                                 .remove();
                 texts[text_info.id] = null;
 
     
                  container.trigger({type: "CanvasPreChange", value:canvas_info.img, on: 'fillText'});
                  MemeGeneratorAPI.canvas_reset(canvas_info.img);
                  MemeGeneratorAPI.drawBrushesPoints();
                  MemeGeneratorAPI.canvas_addimage(null, null);
                  MemeGeneratorAPI.canvas_filltext(null, null);
                  container.trigger({type: "CanvasPostChange", value:canvas_info.img, on: 'fillText'});
             })

            container.find('.wrapper_canvas').prepend(boxDR);
            container.find('#' + text_info.id_box).draggable({
               containment: container.find(selectors.wrapperCanvas), 
               refreshPositionsType:true,
                create: function(event, ui) {
                },             
                start: function(event, ui) {
                   //bug http://bugs.jqueryui.com/ticket/9379
                //    console.log([ui.position.top, $(window).scrollTop()]);
//                      if(isChrome)  
                        //  ui.position.top += $(window).scrollTop();
                },
                drag: function(event, ui) {
                //  console.log([ui.position.top, $(window).scrollTop()]);
//                  if(isChrome)  
                    //    ui.position.top += $(window).scrollTop();
                    container.trigger({type: "CanvasPreChange", value:{'ui':ui,'delta':delta, 'this':$(this)}, on: 'dragText'}); 
                   MemeGeneratorAPI.canvas_reset(canvas_info.img);
                   MemeGeneratorAPI.drawBrushesPoints();
                   MemeGeneratorAPI.canvas_addimage(null, null);
                   MemeGeneratorAPI.canvas_filltext(ui, $(this).attr('id'));
                   container.trigger({type: "CanvasPostChange", value:{'ui':ui,'delta':delta, 'this':$(this)}, on: 'dragText'}); 
//                    
                    
                    
                },
                 stop: function(event, ui) {
                    
                   },
                    
            })
            .resizable({
                handles:  'all',
                resize: function(event, ui) {
                       container.trigger({type: "CanvasPreChange", value:{'ui':ui,'delta':delta, 'this':$(this)}, on: 'resizeText'});
                    MemeGeneratorAPI.canvas_reset(canvas_info.img);
                    MemeGeneratorAPI.drawBrushesPoints();
                    MemeGeneratorAPI.canvas_addimage(null, null);
                    MemeGeneratorAPI.canvas_filltext(ui, $(this).attr('id'));
                    container.trigger({type: "CanvasPostChange", value:{'ui':ui,'delta':delta, 'this':$(this)}, on: 'resizeText'});
        
                  
                },
                containment: container.find(selectors.wrapperCanvas),
                minHeight: 50,
                minWidth: 50,
             
            })  .css(
                    {border: "1px dashed white", position: "absolute", width: canvas_info.final_width + "px", height: canvas_info.height_div + "px"}
            ).animate({
              opacity: 0
             }, 1000, function() {
                    
                 
             });
             // Trigger the resize event in order to make boxes responsive
             $(window).resize();
 
        });
  
  

  container.on( "click", ".btn", function(event){ 
    
    var sel = $(this).attr("target_element_triggered");
    if(!$(event.target).is(sel)){
   
    if($(this).hasClass("trigger-element"))container.find($(this).attr("target_element_triggered")).click();
    }
    else { 
       // if($(this).attr("href") == "#")event.preventDefault();
        }
 });


 $("#amm-preview-responsive").click(function(event){
     
     if($('.boxDR, .imageBoxDR').hasClass('ForceHide'))
     {   
         $(this).removeClass("active");
         $('.boxDR, .imageBoxDR').removeClass("ForceHide");
     }
     else {
         $(this).addClass("active");
         $('.boxDR, .imageBoxDR').addClass("ForceHide");
          
     }
 });
 
 
 
$(window).resize(function(event) {
  
//    console.log(a);

    
if(event.target == window){

// var preview_width = container.find('.wrapper-memes-preview').width();
    

        $.each(texts.keys, function(index, id) {
            if(texts[id] != null){
                container.find("#"+texts[id].id_box).width(container.find(selectors.ammCanvas).outerWidth()*texts[id].ratioWidth);
                container.find("#"+texts[id].id_box).height(container.find(selectors.ammCanvas).outerHeight()*texts[id].ratioHeight);
                container.find("#"+texts[id].id_box).css( "left", container.find(selectors.ammCanvas).outerWidth()*texts[id].ratioLeft+"px");
                container.find("#"+texts[id].id_box).css( "top",  container.find(selectors.ammCanvas).outerHeight()*texts[id].ratioTop+"px");
            }
            // console.log([container.find(selectors.ammCanvas).height()*texts[id].ratioHeight, container.find(selectors.ammCanvas).height(), texts[id].ratioHeight]);
        }); 
      
     $.each(images.keys, function(index, id) {
//         console.log([images[id], container.find(selectors.ammCanvas).outerWidth()*images[id].ratioLeft]);
        container.find("#"+images[id].id).width(container.find(selectors.ammCanvas).outerWidth()*images[id].ratioWidth);
        container.find("#"+images[id].id).height(container.find(selectors.ammCanvas).outerHeight()*images[id].ratioHeight);
        container.find("#"+images[id].id).css( "left", container.find(selectors.ammCanvas).outerWidth()*images[id].ratioLeft+"px");
        container.find("#"+images[id].id).css( "top",  container.find(selectors.ammCanvas).outerHeight()*images[id].ratioTop+"px");
   }); 
} 
});




container.on( "keyup", ".wrapper-text .amm-text", function(event){ 
            var delta = $(this).closest(".wrapper-text").attr('delta');
            var id = "text_"+canvas_info.id+'_'+delta
            texts[id].event = event;
            texts[id].text = $("#" + texts[id].id).val();
            container.trigger({type: "CanvasPreChange", value:delta, on: 'fillText'}); 
            MemeGeneratorAPI.canvas_reset(canvas_info.img);
            MemeGeneratorAPI.drawBrushesPoints();
            MemeGeneratorAPI.canvas_addimage(null, null);
            MemeGeneratorAPI.canvas_filltext(null, null);
            container.trigger({type: "CanvasPostChange", value:delta, on: 'fillText'}); 
             
        });
        
       
/*Add image*/ 

function amm_add_image(event){

    var image_info = new ImageInfo();
    image_info.img = new Image();
    var reader = new FileReader();
    reader.onload = function(event) {
        image_info.img.src = event.target.result;
        amm_add_image_load(image_info);
    };
 reader.readAsDataURL(this.files[0]);
}

function amm_canvas_refresh(){

}

function amm_add_image_load(image_info){

    image_info.id = "imageBoxDR"+'_'+ canvas_info.id +'_'+ images.length;
    image_info.delta = images.length;
    images[image_info.id] = image_info;
    image_info.img.onload = function() {
//                    console.log([image_info.img, image_info.left, image_info.top, image_info.width, image_info.height]);
        container.trigger({type: "CanvasPreChange", value:image_info.img, on: 'addImage'});
        MemeGeneratorAPI.canvas_addimage();
//                    canvas_info.ctx.drawImage(image_info.img, image_info.left, image_info.top, image_info.width, image_info.height);
        container.trigger({type: "CanvasPostChange", value:image_info.img, on: 'addImage'});
     
        var imageBoxDR = $('<div id="' + image_info.id + '" class="imageBoxDR"></div>');
        var delete_box = $('<button class="delete-box-amm delete-pr-merge-image"></button>');
        imageBoxDR.append(delete_box);
        delete_box.on('click tap touchstart', function(){
             
            container.find('#' + image_info.id).resizable( "destroy" )
                                                .draggable('destroy')
                                                            .remove();
            delete images[image_info.id];

         container.trigger({type: "CanvasPreChange", value:canvas_info.img, on: 'deleteMergeImage'});
        MemeGeneratorAPI.canvas_reset(canvas_info.img);
        MemeGeneratorAPI.drawBrushesPoints();
        MemeGeneratorAPI.canvas_addimage(null, null);
        MemeGeneratorAPI.canvas_filltext(null, null);
        container.trigger({type: "CanvasPostChange", value:canvas_info.img, on: 'deleteMergeImage'});
        })
        container.find('.wrapper_canvas').prepend(imageBoxDR);
        
       
        container.find('#' + image_info.id).draggable({
            containment: container.find(selectors.wrapperCanvas),
            refreshPositions: true,
            create: function(event, ui) {
            },
            start: function(event, ui) {
                //bug http://bugs.jqueryui.com/ticket/9379
//                            if (isChrome)
// console.log([ui.position.top, $(window).scrollTop()]);
                    ui.position.top += $(window).scrollTop();
            },
            drag: function(event, ui) {
//                            if (isChrome)
// console.log([ui.position.top, $(window).scrollTop()]);
                    // ui.position.top += $(window).scrollTop();
                container.trigger({type: "CanvasPreChange", value:{'ui':ui,'delta': image_info.delta , 'this':$(this)}, on: 'dragImage'});
            //    console.log(images);
                MemeGeneratorAPI.canvas_reset(canvas_info.img);
                MemeGeneratorAPI.drawBrushesPoints();
                MemeGeneratorAPI.canvas_filltext(null, null);
                MemeGeneratorAPI.canvas_addimage(ui, $(this).attr('id'));
                // console.log(images);
                container.trigger({type: "CanvasPostChange", value:{'ui':ui,'delta': image_info.delta , 'this':$(this)}, on: 'dragImage'});
                
                 

            },
            stop: function(event, ui) {

            },
        }).resizable({
                    handles: 'all',
                    resize: function(event, ui) {
                        container.trigger({type: "CanvasPreChange", value:{'ui':ui,'delta': image_info.delta , 'this':$(this)}, on: 'resizeImage'});
                         MemeGeneratorAPI.canvas_reset(canvas_info.img);
                         MemeGeneratorAPI.drawBrushesPoints();
                         MemeGeneratorAPI.canvas_filltext(null, null);
                         MemeGeneratorAPI.canvas_addimage(ui, $(this).attr('id')); 
                        container.trigger({type: "CanvasPostChange", value:{'ui':ui,'delta': image_info.delta , 'this':$(this)}, on: 'resizeImage'});

                    },
                    containment: container.find(selectors.wrapperCanvas),
                    minHeight: 50,
                    minWidth: 50
                }).css(
                {border: "1px dashed white", position: "absolute", width: image_info.width + "px", height: image_info.height + "px"}
        ).animate({
            opacity: 0
        }, 1000, function() {

        });

    
 

    //After select existing meme should initialize imageboxes accordingly with meme       
    $(window).resize();
    };
}

container.find('.amm-addImage').change(amm_add_image);
 /**/
 
 
 /*Reset Meme event*/
  container.find(".reset_meme").click(function(event){
      event.preventDefault();
      MemeGeneratorAPI.canvas_reset(canvas_info.img);
      brushespoints.reset();
      texts.reset();
      images.reset();
   
  });
 /**/



 
 /*Predefined merge Image select*/

 container.on( "click", ".wrapper-select-merge-image-amm", function(event){ 

        container.find(".wrapper-amm-hover-title-merge-images").text($(this).find("img").attr("title")); 
        container.find("*").removeClass("SI_amm_mi_selected");
        $(this).addClass("SI_amm_mi_selected");
        var image_info = new ImageInfo();
        image_info.img = new Image();
        image_info.img.src = $(this).find('img').attr("src");
        // check if //domain.com or http://domain.com is a different origin
        if (/^([\w]+\:)?\/\//.test(canvas_info.img.src) && canvas_info.img.src.indexOf(location.host) === -1) {
            image_info.img.crossOrigin = "anonymous"; // or "use-credentials"
        } 
        amm_add_image_load(image_info);
          
 })

 
 /*Image select*/

 container.on( "click", ".wrapper_select_image_amm", function(event){ 

    //   var tid = $(this).attr("tid");
    //   formDataMemeGeneratorData.append('tid', tid);
      formDataMemeGeneratorData.append('originalMeme', null);
      var Original_image = $(this).find('img').attr("src");
      container.find(".wrapper_hover_title_meme_amm").text($(this).find("img").attr("title")); 
        container.find("*").removeClass("SI_amm_selected");
        $(this).addClass("SI_amm_selected");
        canvas_info.img = new Image();
        canvas_info.img.src = Original_image; 
        // check if //domain.com or http://domain.com is a different origin
        if (/^([\w]+\:)?\/\//.test(canvas_info.img.src) && canvas_info.img.src.indexOf(location.host) === -1) {
        canvas_info.img.crossOrigin = "anonymous"; // or "use-credentials"
        } 
        
        canvas_info.img.onload = function() {
               
                    memeGeneratorData.originalImage = canvas_info.img;
//                    console.log(canvas_info.img);
container.trigger({type: "CanvasPreChange", value:Original_image, on: 'selectImage'});
                    MemeGeneratorAPI.canvas_reset(canvas_info.img);
                    MemeGeneratorAPI.drawBrushesPoints();
                    MemeGeneratorAPI.canvas_addimage(null, null);
                    MemeGeneratorAPI.canvas_filltext(null, null);
                    container.trigger({type: "CanvasPostChange", value:Original_image, on: 'selectImage'});
//                    console.log(canvas_info.img.width);
                    container.find(".canvas_loading").remove();
                    canvas_info.canvas.css("display","block");

              
                    if(texts.length == 0){
                         // Add two text field
                         for(i=0; i<canvas_info.text_boxes_count; i++){
                            container.find(".add_textbox").click();
                         }
                          
    
                    }
  
              //After select existing meme should initialize boxes accordingly with meme       
              $(window).resize();
        };
 })

 /*Upload meme image*/
container.find('#amm-input-upload-image-meme-responsive').change(function(e) {
  
            var reader = new FileReader();
            reader.onload = function(event) {
                canvas_info.img = new Image();
                canvas_info.img.onload = function() {
                    container.trigger({type: "CanvasPreChange", value:canvas_info.img, on: 'uploadImage'});
                    MemeGeneratorAPI.canvas_reset(canvas_info.img);
                    MemeGeneratorAPI.drawBrushesPoints();
                    MemeGeneratorAPI.canvas_addimage(null, null);
                    MemeGeneratorAPI.canvas_filltext(null, null);
                     container.trigger({type: "CanvasPostChange", value:canvas_info.img, on: 'uploadImage'});
                    
                    
                }
                canvas_info.img.src = event.target.result;
                /*Generate meme with upload image*/               
                formDataMemeGeneratorData.append('originalMeme', e.target.files[0]);
                /**/
                
             //After upload new meme should initialize boxes accordingly with the new meme       
              $(window).resize();
            };
            
            reader.readAsDataURL(e.target.files[0]);
      
   
//            memeGeneratorData.originalImage = e.target.files[0]
        });

    function prepareGenerateMeme(link, canvasId, filename) {

            link.href = document.getElementById(canvasId).toDataURL();
            link.download = filename;
        }




/*EventsChange*/
container.on( "change", ".wrapper-memes-main .EventChange", function(event){ 
 var value = event.target.value;   
  if($(this).attr("type") == "checkbox" && !$(this).is(":checked")) value = 0;
   var $this = $(this);
//   console.log([event.target]);
   $.each($(this).attr('var').split(","), function( index, variable ) {
//       if(texts["text"+$this.closest(".wrapper-text").attr('delta')]["delta"] == 0 )
//             console.log([texts["text"+$this.closest(".wrapper-text").attr('delta')], variable]);
var id = MemeGenerator.get_text_id($this.closest(".wrapper-text").attr('delta'));
   texts[id][variable] = value;
   container.trigger({type: "CanvasPreChange", value:variable, on: 'buttonsEventChange'});
   MemeGeneratorAPI.canvas_reset(canvas_info.img);  
   MemeGeneratorAPI.drawBrushesPoints();
   MemeGeneratorAPI.canvas_addimage(null, null);
   MemeGeneratorAPI.canvas_filltext(null, null); 
   container.trigger({type: "CanvasPostChange", value:variable, on: 'buttonsEventChange'});
              
  });
 });
 
 
container.click(function(event) { 
    
    if(!$(event.target).closest('.amm-popup, .amm-popup-trigger').length) {
        if(container.find('.amm-popup').is(":visible")) { 
            container.find(".amm-popup-trigger.opened").click();
        }
         
    }        
});
container.on( "click", ".wrapper_canvas_background", function(event){ 
    event.preventDefault();
     MemeGenerator.focusout();
});


container.on('click', '.moreOption', function(event){ 
    
      var delta = $(this).closest('.wrapper-text').attr('delta');
     if($(this).hasClass("opened")){
       $(this).closest(".wrapper-text").find('.wrapperRenderPopupMoreOptions').remove();
       $(this).removeClass("opened");
     }
     else{
        container.find(".amm-popup-trigger.opened").click();  
      $(this).addClass("opened");
      var id = MemeGenerator.get_text_id(delta);
      texts[id].elementChanged = $(this);
      MemeGeneratorAPI.popupMoreOption(texts[id]);
      texts[id].elementChanged = null;
      }
      event.preventDefault();
 }); 

 
/**
 * This event is called right before the canvas change. 
 * @param {event} jsonObject has value{ value, on}
 * Variable On has values {dragText, resizeText, addImage, fillText, 
 *                dragImage, resizeImage, selectImage, 
 *                uploadImage, buttonsEventChange, changeColor, 
 *                resetBrushes, brushes, "resetTexts", "resetImages"  }
 * */
 container.on("CanvasPreChange", function (event) {
 
     if(event.on == "dragText" || event.on == "resizeText"){
        var id = "text_"+canvas_info.id+'_'+event.value.delta
        if(event.on == "resizeText"){
        texts[id].ratioWidth = event.value.ui.size.width/container.find(selectors.ammCanvas).width();
        texts[id].ratioHeight = event.value.ui.size.height/container.find(selectors.ammCanvas).height() ;
//        console.log([ event.value.ui.size.height, container.find(selectors.ammCanvas).height()]);
        }
        texts[id].ratioTop = event.value.ui.position.top/container.find(selectors.ammCanvas).height();   
        texts[id].ratioLeft = event.value.ui.position.left/container.find(selectors.ammCanvas).width();
    //console.log([event.value.ui.position.top, container.find(selectors.ammCanvas).height()]);
        MemeGenerator.focusout();
    }

     if(event.on == "dragImage" || event.on == "resizeImage"){
        var id = "imageBoxDR_"+canvas_info.id+'_'+event.value.delta
        if(event.on == "resizeImage"){
        images[id].ratioWidth = event.value.ui.size.width/container.find(selectors.ammCanvas).width();
        images[id].ratioHeight = event.value.ui.size.height/container.find(selectors.ammCanvas).height() ;
//        console.log([ event.value.ui.size.height, container.find(selectors.ammCanvas).height()]);
        }
    //    console.log(images);
        images[id].ratioTop = event.value.ui.position.top/container.find(selectors.ammCanvas).height();   
        images[id].ratioLeft = event.value.ui.position.left/container.find(selectors.ammCanvas).width();

        
        MemeGenerator.focusout();
    }

    if(!container.hasClass('amm_loaded') ){
        container.addClass('amm_loaded');
        canvas_info.onLoad(canvas_info);
       }
 
     
}); 

/**
 * This event is called right after the canvas change. 
 * @param {event} jsonObject has value{ value, on}
 * Variable On has values {dragText, resizeText, addImage, fillText, 
 *                dragImage, resizeImage, selectImage, 
 *                uploadImage, buttonsEventChange, changeColor, 
 *                resetBrushes, brushes, "resetTexts", "resetImages"  }
 * */
 container.on("CanvasPostChange",  function (event) {
 
       switch(event.on){
        case 'fillText': 
        case 'addImage':
        case 'brushes':
        case 'resetTexts':
        case 'resetImages':
        case 'resetBrushes':
     //Active "Gernerate Meme" button in case Canvas not empty.
        if(!texts.empty || brushespoints.length  || images.length){
             container.find(".generate_meme").removeAttr("disabled");
         }
         else  container.find(".generate_meme").attr("disabled", "disabled");
        break;  
        
            
    }
}); 


container.on("OnChangeColor",  function (event) {
    var id = "text_"+canvas_info.id+'_'+event.delta
 if(event.on == "text") texts[id].textColor = event.color; 
  else if(event.on == "outline" ) texts[id].strokeColor = event.color; 
      else  if(event.on == "brushes" ){ 
         pointOptions.strokeStyle = event.color; 
         container.find("#amm-stop-brushing").css("background", event.color);
    }
    
    
  container.trigger({type: "CanvasPreChange", value:event, on: 'changeColor'});
  MemeGeneratorAPI.canvas_reset(canvas_info.img);  
  MemeGeneratorAPI.drawBrushesPoints();   
  MemeGeneratorAPI.canvas_addimage(null, null);
  MemeGeneratorAPI.canvas_filltext(null, null);
  container.trigger({type: "CanvasPostChange", value:event, on: 'changeColor'});
  
 
});

   
    var brush = false;
    $(container).on( 'click', '#amm-brushes, #amm-clear-brush, #amm-stop-brushing', function (event) {
        event.preventDefault();

            switch (this.id) {
                  case "amm-brushes":
                         canvas_info.canvas.addClass("MouseCrossHair");
                         container.find('.boxDR, .imageBoxDR').addClass("ForceHide");
                         container.find(".wrapper-amm-stop-brushes").addClass('show');
                         container.find("#amm-merge-image-trigger, #amm-brushes, .wrapper-memes-preview-operations .responsive-button").hide();
 
                           
                       brush = true;
                    if(!$("*").hasClass("pickpop-brushes")){
                        // MemeGeneratorTheme.BrushesRenderPopupColorPanel(pointOptions);
//                       $("#amm-clear-brush").after(popupColorPanel);      
                     }
                   break;
                  case "amm-stop-brushing":
                    canvas_info.canvas.removeClass("MouseCrossHair");
                    container.find('.boxDR, .imageBoxDR').removeClass("ForceHide");
                    container.find(".wrapper-amm-stop-brushes").removeClass('show');
                    container.find("#amm-merge-image-trigger, #amm-brushes, .wrapper-memes-preview-operations .responsive-button").show();
                        if(MemeGenerator.is_responsive()){
                            container.find(".wrapper-memes-preview-operations .responsive-button").show();
                       }  
                
                    brush = false;
                   break;
                   case "amm-clear-brush":
                    brushespoints.reset();
                    MemeGeneratorAPI.canvas_reset(canvas_info.img);
                    MemeGeneratorAPI.canvas_addimage(null, null);
                    MemeGeneratorAPI.canvas_filltext(null, null);
                    MemeGeneratorAPI.drawBrushesPoints();
             
                   break;
               }
        });
 
var isMouseDown = false;

var draw = container.find(selectors.ammCanvas).get(0);
document.addEventListener('mouseup',function(){
    isMouseDown = false;
                    /*Leave mouse*/
                    if (brushespoints[brushespoints.length - 1] != null)
                        brushespoints[brushespoints.length] = lastPoint;
                        
//            You have a strange Mouse!.
 },false);

draw.addEventListener('mousedown',function(e){e.preventDefault(); isMouseDown = true;},false);
draw.addEventListener('mousemove', amm_brushing, false) 

 function amm_brushing(event) {
  
            if (brush) {
                if (isMouseDown) {
                    var x, y;
//            Left Mouse button pressed.
                    var element = container.find(selectors.ammCanvas).get(0);
                    var rect = element.getBoundingClientRect();
                    var scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
                    var scrollLeft = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft;
                    var elementLeft = rect.left + scrollLeft;
                    var elementTop = rect.top + scrollTop;

                    if (document.all) { //detects using IE   
                        x = event.clientX + scrollLeft - elementLeft; //event not evt because of IE
                        y = event.clientY + scrollTop - elementTop;
                    }
                    else {
                        x = event.pageX - elementLeft;
                        y = event.pageY - elementTop;
                    }
                    console.log(x, y);
                    var point = new Point(x, y);//(event.pageX - offset.left, event.pageY - offset.top);
                    point.strokeStyle = pointOptions.strokeStyle;
                    //On initialize their is final_width added to canvas that can force to add the following ratio
                    var ratio_width_responsive =  (canvas_info.final_width/container.find(selectors.ammCanvas).width());
                    var ratio_height_responsive =  (canvas_info.final_height/container.find(selectors.ammCanvas).height());
                   
                    point.x = point.x*ratio_width_responsive;
                    point.y = point.y*ratio_height_responsive;

                    //Then add the ratio
                    // point.ratioLeft = point.x*ratio_width_responsive;
                    // point.ratioTop = point.y*ratio_height_responsive;

                    brushespoints[brushespoints.length] = point;
                    container.trigger({type: "CanvasPreChange", value:brushespoints, on: 'brushes'});
                    MemeGeneratorAPI.canvas_reset(canvas_info.img);
                    MemeGeneratorAPI.canvas_addimage(null, null);
                    MemeGeneratorAPI.canvas_filltext(null, null);
                    MemeGeneratorAPI.drawBrushesPoints();
                    container.trigger({type: "CanvasPostChange", value:brushespoints, on: 'brushes'});
                    
                    delete x, y, element, rect, scrollTop, scrollLeft, elementLeft, elementTop, point;
                }
            }
  
    }
    
 

 // Set up touch events for mobile, etc
 draw.addEventListener("touchstart", function (e) {   
    mousePos = getTouchPos(draw, e);
     var touch = e.touches[0];

    var mouseEvent = new MouseEvent("mousedown", {
    
        clientX: touch.clientX,
        clientY: touch.clientY
        });
        draw.dispatchEvent(mouseEvent);
     
       
   }, false);

draw.addEventListener("touchend", function (e) {
        var mouseEvent = new MouseEvent("mouseup", {});
        draw.dispatchEvent(mouseEvent);
}, false);

 

draw.addEventListener("touchmove", function (e) {
    if(e.changedTouches.length == 0){
        
        draw.dispatchEvent(new MouseEvent("mouseup", {}));
        }else{

        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
        });
        draw.dispatchEvent(mouseEvent);
    }

       
}, false);

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
var rect = canvasDom.getBoundingClientRect();
return {
x: touchEvent.touches[0].clientX - rect.left,
y: touchEvent.touches[0].clientY - rect.top
};
}   


 $(container).on('hover', ".wrapper_select_image_amm img", function (ev) {
         var title = $(this).attr("title"); 
             
           if (ev.type == 'mouseenter') {
    
            container.find(".wrapper_hover_title_meme_amm").text(title); 
            }

            if (ev.type == 'mouseleave') {
                container.find(".wrapper_hover_title_meme_amm").text($(".SI_amm_selected img").attr("title"));
               
            }
        });



        
container.find(".generate_meme").click(function(event){
    
if(!canvas_info.downloadGeneratedImage){
    event.preventDefault();
}
 var _this = $(this);
 var all_texts = [];
 //  memeGeneratorData.originalImage = null;
//    console.log(canvas_info.canvas.toDataURL());
//      memeGeneratorData.memeGenerator = canvas_info.getImageData(0, 0, canvas_info.final_width, canvas_info.final_height);

    $.each(texts.keys, function(index, id) {
            if(texts[id].text)all_texts.push(texts[id].text);
        });
        // console.log(canvas_info.canvas.get(0));
        var dataURL = canvas_info.canvas.get(0).toDataURL();
         
        if(canvas_info.downloadGeneratedImage){
        var image = canvas_info.canvas.get(0).toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        $(this).attr('download', container.find(selectors.wrapperHoverTitleMemeAmm).text()+'.png');
        $(this).attr("href", image);
        }
 
        var file= dataURL;//new Blob([new Uint8Array(array)], {type: 'image/png'});
 

        formDataMemeGeneratorData.append('amm_canvas', file);    
        formDataMemeGeneratorData.append("all_texts", JSON.stringify(all_texts));
        formDataMemeGeneratorData.append("textsIsEmpty", texts.empty);
        formDataMemeGeneratorData.append("drwaIsEmpty", brushespoints.length ? false : true);
        formDataMemeGeneratorData.append("imagesIsEmpty", images.length ? false : true);
        
        canvas_info.onGenerate({
            'amm_canvas': file,
            "all_texts":all_texts,
            'drwaIsEmpty': brushespoints.length,
            'imagesIsEmpty':images.length
        },formDataMemeGeneratorData);
     
 
    //    event.preventDefault();
});


container.on('change', ".amm-color-picker", function(){
    var on = $(this).data('on');
    var id = $(this).attr('id');
    var delta = (on !='brushes') ? $(this).closest('.wrapper-text').attr('delta'): null;
    var hex =  $(this).val().replace('#', '');
    if(on == 'brushes'){
    container.find('#colorSelectorBrushes div').css('backgroundColor', '#' + hex); 
    }
   
    container.trigger({
        type: "OnChangeColor",
        id: id,
        color: "#"+hex,
        this:$(this),
        on: on,
        delta: delta
        
  }); 
})



//API

var MemeGeneratorAPI = {};


MemeGeneratorAPI.currentScriptPath = function () {

    var scripts = document.querySelectorAll( 'script[src]' );
    var currentScript = scripts[ scripts.length - 1 ].src;
    var currentScriptChunks = currentScript.split( '/' );
    var currentScriptFile = currentScriptChunks[ currentScriptChunks.length - 1 ];

    return currentScript.replace( currentScriptFile, '' );
}

MemeGeneratorAPI.window_width = function () {
    var paddingLeft = parseInt(container.find(".main-container").css("padding-left").replace("px", ""));
    var paddingRight = parseInt(container.find(".main-container").css("padding-right").replace("px", ""));
    return  $(window).width() > 600 ? 500 : $(window).width() - paddingLeft - paddingRight;
}



MemeGeneratorAPI.wrapText = function(context, text, x, y, maxWidth, maxHeight, text_info) {
    var words = text.split(' ');
    
    var CopyContext = context;
    var spaceLines = 3;
    var line = '';
    if (words.length == 1) {
        line = text;
        var metrics = context.measureText(line);
        while (metrics.width > maxWidth) {
            MemeGeneratorAPI.decrease_font_size(context, text_info);
            metrics = context.measureText(line);
        }
        y += text_info.fontSize;
//            console.log(x);
        context.strokeText(line, x, y+spaceLines);
        context.fillText(line, x, y+spaceLines);
    }
    else {
        var delta = 0;
        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = CopyContext.measureText(testLine);

            if (metrics.width > maxWidth) {
                /*Check if could add to next line(Respect Height)*/
                while ((((delta + 2) * text_info.fontSize) + (spaceLines * (delta + 2))) > maxHeight) {
                    MemeGeneratorAPI.decrease_font_size(CopyContext, text_info);
                }
                line = words[n] + ' ';
                /*Respect Width to Next line*/
                metrics = CopyContext.measureText(line);
                while ((metrics.width > maxWidth)) {
                    MemeGeneratorAPI.decrease_font_size(CopyContext, text_info);
                    metrics = CopyContext.measureText(line);
                }
                delta++;
                
            }
            else
                line += words[n] + ' ';
        }

        /**/
        /*Refresh TableTextDimension with the new fontSize*/
        line = '';
        var delta = 0;
        var top = null;
        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            if (metrics.width > maxWidth) {
                top = (y + (text_info.fontSize * (delta + 1))) + (spaceLines * (delta + 1));
                context.strokeText(line, x, top);
                context.fillText(line, x, top);
                line = words[n] + ' ';
                delta++;
            }
            else
                line += words[n] + ' ';
        }
        top = (y + (text_info.fontSize * (delta + 1))) + (spaceLines * (delta + 1));
        context.strokeText(line, x, top);
        context.fillText(line, x, top);
    
    }
    MemeGeneratorAPI.reset_font_size(context, text_info);
};
MemeGeneratorAPI.drawBrushesPoints = function(){
    var canvas_info = MemeGenerator.get_canvas_info();

    var lastPoint = null;
    var brushesPoints = MemeGenerator.get_brushesPoints();
   
     $.each(brushesPoints, function(index, point) {
    

     if (point == undefined || point == null){
             lastPoint = point;
     }
    
    if (lastPoint !== undefined && lastPoint !== null) {

        canvas_info.ctx.beginPath();
        canvas_info.ctx.moveTo(lastPoint.x, lastPoint.y);
        canvas_info.ctx.lineTo(point.x, point.y);
        canvas_info.ctx.strokeStyle = point.strokeStyle;
        canvas_info.ctx.stroke();
        canvas_info.ctx.lineWidth = point.lineWidth;
        canvas_info.ctx.shadowBlur = 0;
       }
    lastPoint = point;
         
    });

};

MemeGeneratorAPI.skipWidth = function(context, textInfo, text, maxWidth, fontSize) {
     var FZ = textInfo.fontSize;
     textInfo.fontSize = fontSize;
     context.font = MemeGeneratorAPI.buildFont(textInfo); 
     var metrics = context.measureText(text); 
     textInfo.fontSize = FZ;
     context.font = MemeGeneratorAPI.buildFont(textInfo);
     if(metrics.width > maxWidth - 20) return true;
     return false; 
};

MemeGeneratorAPI.reset_font_size = function(context, text_info) {
    text_info.fontSize = text_info.inputFontSize;
    context.font = MemeGeneratorAPI.buildFont(text_info);
};

MemeGeneratorAPI.decrease_font_size = function(context, text_info) {
    text_info.fontSize -= 1;
    context.font = MemeGeneratorAPI.buildFont(text_info);
};

MemeGeneratorAPI.increase_font_size = function(context, text_info) {
    text_info.fontSize += 1;
    context.font = MemeGeneratorAPI.buildFont(text_info);
};


/**
 * Remove all texts from image
 */
MemeGeneratorAPI.canvas_reset = function(img) {
    var canvas_info = MemeGenerator.get_canvas_info();
//  console.log(canvas_info._maxWidth, img.width);
    canvas_info.ratio_width = canvas_info._maxWidth/img.width;
    canvas_info.ratio_height = canvas_info._maxHeight/img.height;
    if (canvas_info.ratio_width < canvas_info.ratio_height)
        canvas_info.ratio_image = canvas_info.ratio_width;
    else
        canvas_info.ratio_image = canvas_info.ratio_height;

    canvas_info.final_width = img.width * (canvas_info.ratio_image);
    canvas_info.final_height = img.height * (canvas_info.ratio_image);

    //$(".wrapper_canvas, .wrapper_canvas_background").css({width: canvas_info.final_width + "px", height: canvas_info.final_height + "px"})
    container.find(selectors.ammCanvas+","+selectors.wrapperCanvas)
                                .attr("width", canvas_info.final_width)
                                     .attr("height", canvas_info.final_height);

    canvas_info.ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas_info.final_width, canvas_info.final_height)

};

MemeGeneratorAPI.canvas_addimage = function(ui, current_box_id){
    // var canvas_info = MemeGenerator.get_canvas_info();
    var images = MemeGenerator.get_images();
    
    var image_object = null;
    $.each(images.keys, function(index, id) {
        image_object = images[id];
//              console.log(["imagesid", id, image_object.img.src]);
        if(current_box_id == image_object.id)
             {   
                 
                 image_object.left =  (ui.position)? ui.position.left:image_object.left;  
                 image_object.top =  (ui.position)? ui.position.top:image_object.top; 
                  
                 /*On event resizable*/
                 image_object.width = (ui.size)? ui.size.width:image_object.width;
                 image_object.height = (ui.size)? ui.size.height:image_object.height;
                
                 /*End*/
             }
           
         // For responsive reasons      
          canvas_info.ctx.drawImage(image_object.img, 
                                    canvas_info.final_width*image_object.ratioLeft, 
                                    canvas_info.final_height*image_object.ratioTop, 
                                    canvas_info.final_width*image_object.ratioWidth, 
                                    canvas_info.final_height*image_object.ratioHeight);   
             
         });
         
};

MemeGeneratorAPI.canvas_filltext = function(ui, current_box_id) {
    var canvas_info = MemeGenerator.get_canvas_info();
//        console.log(canvas_info.final_height)
    var texts = MemeGenerator.get_texts();
    var text_object = null; 
    $.each(texts.keys, function(index, id) {
        
        if(texts[id] != null){

        text_object = texts[id];
        text_object.fontSize = parseInt(text_object.fontSize);
        var _this = container.find("#" + text_object.id_box);
        var text = container.find("#" + id).val();
         if(text == null || text == "") return;
        var position = _this.position();
        /*Revert postion top*/
        //@TODO: Should re-position and re-Size each box to fit each image-meme
        if(canvas_info.final_height < position.top+_this.outerHeight()){
        position.top = canvas_info.final_height - _this.outerHeight();
        texts[id].top = position.top; 

    }
 
        var maxWidth = _this.outerWidth(); 
        var maxHeight = _this.outerHeight(); 
        var oldMaxWidth = maxWidth; 
        var oldMaxHeight = maxHeight; 
     
        if(current_box_id == text_object.id_box)
             {   position = ui.position; 
 
                 /*On event resizable*/
                 maxWidth = (ui.size)? ui.size.width:maxWidth;
                 maxHeight = (ui.size)? ui.size.height:maxHeight;
              
                 /*End*/
             }
                
 
//        http://www.w3schools.com/tags/canvas_font.asp

         canvas_info.ctx.font = MemeGeneratorAPI.buildFont(text_object);
       
         // shadow
         canvas_info.ctx.shadowBlur = text_object.shadowBlur;

         canvas_info.ctx.shadowColor = text_object.shadowColor;
         // outline 
         canvas_info.ctx.strokeStyle= text_object.strokeColor;
         canvas_info.ctx.lineWidth =  text_object.lineWidth; 
         //text
         canvas_info.ctx.fillStyle =  text_object.textColor; 
         canvas_info.ctx.textAlign =  text_object.textAlign;
         if(text_object.toUpperCase) text = text.toUpperCase();


        // For responsive reasons      
//            console.log([maxWidth, canvas_info.final_width*text_object.ratioWidth, canvas_info.final_width, text_object.ratioWidth]);
        maxWidth = canvas_info.final_width*text_object.ratioWidth;
        maxHeight = canvas_info.final_height*text_object.ratioHeight;
        var left = (canvas_info.final_width*text_object.ratioLeft);
        var top =  (canvas_info.final_height*text_object.ratioTop);
          
        MemeGeneratorAPI.wrapText(canvas_info.ctx, text, left + maxWidth/2, top , maxWidth, maxHeight, text_object);
      
            }
    });

};






MemeGeneratorAPI.buildFont = function(text_info){ 
/* @see more fonts http://uupaa-js-spinoff.googlecode.com/svn/trunk/uupaa-excanvas.js/demo/8_8_canvas_fonts.html */
     switch(text_info.fontFamily){
         case 'impact' :
         return text_info.fontSize+"px impact";
     }
    return text_info.fontStyle+" "+text_info.fontVariant+" "+text_info.fontWeight+" "+text_info.fontSize+"px "+text_info.fontFamily;
 };

 
MemeGeneratorAPI.popupMoreOption = function(text_info){
    var HTML = MemeGeneratorTheme.renderPopupMoreOptions(text_info);
    var parentElement = text_info.getParent();
    parentElement.append(HTML);
    var position = text_info.elementChanged.position();
    var marginLeft = text_info.elementChanged.css("margin-left");
    container.find(".wrapperRenderPopupMoreOptions").css({left: position.left + parseFloat(marginLeft)+ text_info.elementChanged.outerWidth() - $(".wrapperRenderPopupMoreOptions").outerWidth() +"px",
                                           "z-index": MemeGenerator.find_highest_ZIndex() }).show();
}; 

 
MemeGeneratorAPI.rgb2hex = function(rgb) {
var result = new String;
var number = new Number;
var numbers = rgb.match(/\d+/g), j, result, number;
for (j = 0; j < numbers.length; j += 1) {
  number = numbers[j] * 1;
  // convert to hex
  number = number.toString(16);
  // enforce double-digit
  if (number.length < 2) {
    number = "0" + number;
  }
  result += number;
}
return result;
};
/*End Meme generator API*/



/* Meme template */
var MemeGeneratorTheme = {};


 
MemeGeneratorTheme.wrapper_text = function (text_info) { 
    
    return `<div class="wrapper-text" delta="`+text_info.delta+`">
                <textarea  placeholder="`+text_info.placeholder+`" id="` + text_info.id + `" class="amm-text"></textarea>
                <div class="fontOps">
                <input type="color" data-on="text" class="amm-color-picker pickerTextColor" title="Change Font Color"  name="pickerTextColor" value="`+(text_info.textColor)+`" list>
                <input type="color" data-on="outline" class="amm-color-picker pickerStrokeColor" title="Change Outline Color"  name="pickerStrokeColor" value="`+(text_info.strokeColor)+`" list>
                <input id="ow0" class="ow EventChange" var="lineWidth" value="`+text_info.lineWidth+`" type="number" maxlength="1" min="0" max="9" title="Change Outline Width" tabindex="-1">
                 <a href="#" class="btn btn-xs btn-default moreOption amm-popup-trigger"></a>
                </div>
           <div class="clear_both"></div> </div>`;
               
    };
    
    MemeGeneratorTheme.renderPopupMoreOptions= function (text_info) {
    var InputFontSize = '<div class="wrapperInputFontSize"><label>'+canvas_info.i18n.sizeText+': </label><input class="InputFontSize EventChange" var="fontSize,inputFontSize" type="number" maxlength="1" max="100" min="10" title="Change Size Text" tabindex="-1" value="'+text_info.inputFontSize+'"></div>';
    var All_FontFamilies = ['Verdana','impact', 'Times New Roman', 'Arial', 'Courier New', 'serif', 'sans-serif'];   
    canvas_info.alterFontFamilies(All_FontFamilies);
    var HTML_FontFamilies = '';
      var checked = '';
        $(All_FontFamilies).each(function(index, value){
        if(text_info.fontFamily == value) HTML_FontFamilies += '<option selected="selected">'+value+'</option>';
         else HTML_FontFamilies += '<option>'+value+'</option>';
               });
        var InputFontFamily = '<div class="wrapperInputFontFamily"><label>'+canvas_info.i18n.fontFamilyText+': </label><select var="fontFamily" class="InputFontFamily EventChange" >'+HTML_FontFamilies+'</select></div>';
        checked = '';
        if(text_info.shadowBlur) checked = 'checked="checked"';
        var InputShadow = '<div class="wrapperInputFontFamily"><label>Shadow: </label><input class="InputShadow EventChange" var="shadowBlur" value="'+text_info.shadowBlur+'" type="checkbox" '+checked+'></div>';
        var InputUpperCase = '<div class="wrapperInputUpperCase"><label>'+canvas_info.i18n.uperCaseText+': </label><input class="InputUpperCase EventChange" var="toUpperCase" value="'+text_info.shadowBlur+'" type="checkbox" '+((text_info.toUpperCase)?'checked="checked"':'')+'></div>';
        var ELEMENT = '<div class="wrapperRenderPopupMoreOptions amm-popup">'+InputFontFamily+InputFontSize+InputShadow+InputUpperCase+'</div>'; 
        return ELEMENT;
    };
    
    
    
    MemeGeneratorTheme.popupDownloadCanvas = function (args) {
     var canvas_info = Drupal.meme_generator.get_canvas_info();
    return '<div class="wrapper-popup-download-canvas">\n\
        <img class="done-image-canvas" src="'+canvas_info.canvas.toDataURL()+'">\n\
        <div class="PDC-wrapper-share-download">Loading</div>\n\
    </div>';
               
    };

  /*End Meme template */


   initialize();
  
 });


 

};

    

 
})(this, window.jQuery);