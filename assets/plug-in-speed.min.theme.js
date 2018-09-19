window.slate=window.slate||{},window.theme=window.theme||{},slate.a11y={pageLinkFocus:function(e){function t(){e.first().removeClass(n).removeAttr("tabindex")}var n="js-focus-hidden"
e.first().attr("tabIndex","-1").focus().addClass(n).one("blur",t)},focusHash:function(){var e=window.location.hash
e&&document.getElementById(e.slice(1))&&this.pageLinkFocus($(e))},bindInPageLinks:function(){$("a[href*=#]").on("click",function(e){this.pageLinkFocus($(e.currentTarget.hash))}.bind(this))},trapFocus:function(e){var t=e.namespace?"focusin."+e.namespace:"focusin"
e.$elementToFocus||(e.$elementToFocus=e.$container),e.$container.attr("tabindex","-1"),e.$elementToFocus.focus(),$(document).on(t,function(t){e.$container[0]===t.target||e.$container.has(t.target).length||e.$container.focus()})},removeTrapFocus:function(e){var t=e.namespace?"focusin."+e.namespace:"focusin"
e.$container&&e.$container.length&&e.$container.removeAttr("tabindex"),$(document).off(t)}},slate.cart={cookiesEnabled:function(){var e=navigator.cookieEnabled
return e||(document.cookie="testcookie",e=-1!==document.cookie.indexOf("testcookie")),e}},slate.utils={findInstance:function(e,t,n){for(var a=0;a<e.length;a++)if(e[a][t]===n)return e[a]},removeInstance:function(e,t,n){for(var a=e.length;a--;)if(e[a][t]===n){e.splice(a,1)
break}return e},compact:function(e){for(var t=-1,n=null==e?0:e.length,a=0,i=[];++t<n;){var o=e[t]
o&&(i[a++]=o)}return i},defaultTo:function(e,t){return null==e||e!==e?t:e}},slate.rte={wrapTable:function(e){var t=void 0===e.tableWrapperClass?"":e.tableWrapperClass
e.$tables.wrap('<div class="'+t+'"></div>')},wrapIframe:function(e){var t=void 0===e.iframeWrapperClass?"":e.iframeWrapperClass
e.$iframes.each(function(){$(this).wrap('<div class="'+t+'"></div>'),this.src=this.src})}},slate.Sections=function(){this.constructors={},this.instances=[],$(document).on("shopify:section:load",this._onSectionLoad.bind(this)).on("shopify:section:unload",this._onSectionUnload.bind(this)).on("shopify:section:select",this._onSelect.bind(this)).on("shopify:section:deselect",this._onDeselect.bind(this)).on("shopify:section:reorder",this._onReorder.bind(this)).on("shopify:block:select",this._onBlockSelect.bind(this)).on("shopify:block:deselect",this._onBlockDeselect.bind(this))},slate.Sections.prototype=$.extend({},slate.Sections.prototype,{_createInstance:function(e,t){var n=$(e),a=n.attr("data-section-id"),i=n.attr("data-section-type")
if(t=t||this.constructors[i],void 0!==t){var o=$.extend(new t(e),{id:a,type:i,container:e})
this.instances.push(o)}},_onSectionLoad:function(e){var t=$("[data-section-id]",e.target)[0]
t&&this._createInstance(t)},_onSectionUnload:function(e){var t=slate.utils.findInstance(this.instances,"id",e.detail.sectionId)
t&&("function"==typeof t.onUnload&&t.onUnload(e),this.instances=slate.utils.removeInstance(this.instances,"id",e.detail.sectionId))},_onSelect:function(e){var t=slate.utils.findInstance(this.instances,"id",e.detail.sectionId)
t&&"function"==typeof t.onSelect&&t.onSelect(e)},_onDeselect:function(e){var t=slate.utils.findInstance(this.instances,"id",e.detail.sectionId)
t&&"function"==typeof t.onDeselect&&t.onDeselect(e)},_onReorder:function(e){var t=slate.utils.findInstance(this.instances,"id",e.detail.sectionId)
t&&"function"==typeof t.onReorder&&t.onReorder(e)},_onBlockSelect:function(e){var t=slate.utils.findInstance(this.instances,"id",e.detail.sectionId)
t&&"function"==typeof t.onBlockSelect&&t.onBlockSelect(e)},_onBlockDeselect:function(e){var t=slate.utils.findInstance(this.instances,"id",e.detail.sectionId)
t&&"function"==typeof t.onBlockDeselect&&t.onBlockDeselect(e)},register:function(e,t){this.constructors[e]=t,$("[data-section-type="+e+"]").each(function(e,n){this._createInstance(n,t)}.bind(this))}}),slate.Currency=function(){function e(e,n){function a(e,t,n,a){if(t=slate.utils.defaultTo(t,2),n=slate.utils.defaultTo(n,","),a=slate.utils.defaultTo(a,"."),isNaN(e)||null==e)return 0
e=(e/100).toFixed(t)
var i=e.split("."),o=i[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1"+n),r=i[1]?a+i[1]:""
return o+r}"string"==typeof e&&(e=e.replace(".",""))
var i="",o=/\{\{\s*(\w+)\s*\}\}/,r=n||t
switch(r.match(o)[1]){case"amount":i=a(e,2)
break
case"amount_no_decimals":i=a(e,0)
break
case"amount_with_space_separator":i=a(e,2," ",".")
break
case"amount_no_decimals_with_comma_separator":i=a(e,0,",",".")
break
case"amount_no_decimals_with_space_separator":i=a(e,0," ")}return r.replace(o,i)}var t="${{amount}}"
return{formatMoney:e}}(),slate.Image=function(){function e(e,t){"string"==typeof e&&(e=[e])
for(var n=0;n<e.length;n++){var a=e[n]
this.loadImage(this.getSizedImageUrl(a,t))}}function t(e){(new Image).src=e}function n(e){var t=e.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/)
return t?t[1]:null}function a(e,t){if(null===t)return e
if("master"===t)return this.removeProtocol(e)
var n=e.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i)
if(n){var a=e.split(n[0]),i=n[0]
return this.removeProtocol(a[0]+"_"+t+i)}return null}function i(e){return e.replace(/http(s)?:/,"")}return{preload:e,loadImage:t,imageSize:n,getSizedImageUrl:a,removeProtocol:i}}(),slate.Variants=function(){function e(e){this.$container=e.$container,this.product=e.product,this.singleOptionSelector=e.singleOptionSelector,this.originalSelectorId=e.originalSelectorId,this.enableHistoryState=e.enableHistoryState,this.currentVariant=this._getVariantFromOptions(),$(this.singleOptionSelector,this.$container).on("change",this._onSelectChange.bind(this))}return e.prototype=$.extend({},e.prototype,{_getCurrentOptions:function(){var e=$.map($(this.singleOptionSelector,this.$container),function(e){var t=$(e),n=t.attr("type"),a={}
return"radio"===n||"checkbox"===n?t[0].checked?(a.value=t.val(),a.index=t.data("index"),a):!1:(a.value=t.val(),a.index=t.data("index"),a)})
return e=slate.utils.compact(e)},_getVariantFromOptions:function(){var e=this._getCurrentOptions(),t=this.product.variants,n=!1
return t.forEach(function(t){var a=!0
e.forEach(function(e){a&&(a=e.value===t[e.index])}),a&&(n=t)}),n||null},_onSelectChange:function(){var e=this._getVariantFromOptions()
this.$container.trigger({type:"variantChange",variant:e}),e&&(this._updateMasterSelect(e),this._updateImages(e),this._updatePrice(e),this.currentVariant=e,this.enableHistoryState&&this._updateHistoryState(e))},_updateImages:function(e){var t=e.featured_image||{},n=this.currentVariant.featured_image||{}
e.featured_image&&t.src!==n.src&&this.$container.trigger({type:"variantImageChange",variant:e})},_updatePrice:function(e){(e.price!==this.currentVariant.price||e.compare_at_price!==this.currentVariant.compare_at_price)&&this.$container.trigger({type:"variantPriceChange",variant:e})},_updateHistoryState:function(e){if(history.replaceState&&e){var t=window.location.protocol+"//"+window.location.host+window.location.pathname+"?variant="+e.id
window.history.replaceState({path:t},"",t)}},_updateMasterSelect:function(e){$(this.originalSelectorId,this.$container)[0].value=e.id}}),e}(),theme.Product=function(){function e(e){if(this.$container=$(e),$(t.productJson,this.$container).html()){this.$container.attr("data-section-id")
this.productSingleObject=JSON.parse($(t.productJson,this.$container).html())
var n={$container:this.$container,enableHistoryState:this.$container.data("enable-history-state")||!1,singleOptionSelector:t.singleOptionSelector,originalSelectorId:t.originalSelectorId,product:this.productSingleObject}
this.settings={},this.namespace=".product",this.variants=new slate.Variants(n),this.$featuredImage=$(t.productFeaturedImage,this.$container),this.$container.on("variantChange"+this.namespace,this.updateAddToCartState.bind(this)),this.$container.on("variantPriceChange"+this.namespace,this.updateProductPrices.bind(this)),this.$featuredImage.length>0&&(this.settings.imageSize=slate.Image.imageSize(this.$featuredImage.attr("src")),slate.Image.preload(this.productSingleObject.images,this.settings.imageSize),this.$container.on("variantImageChange"+this.namespace,this.updateProductImage.bind(this)))}}var t={addToCart:"[data-add-to-cart]",addToCartText:"[data-add-to-cart-text]",comparePrice:"[data-compare-price]",comparePriceText:"[data-compare-text]",originalSelectorId:"[data-product-select]",priceWrapper:"[data-price-wrapper]",productFeaturedImage:"[data-product-featured-image]",productJson:"[data-product-json]",productPrice:"[data-product-price]",productThumbs:"[data-product-single-thumbnail]",singleOptionSelector:"[data-single-option-selector]"}
return e.prototype=$.extend({},e.prototype,{updateAddToCartState:function(e){var n=e.variant
return n?($(t.priceWrapper,this.$container).removeClass("hide"),void(n.available?($(t.addToCart,this.$container).prop("disabled",!1),$(t.addToCartText,this.$container).html(theme.strings.addToCart)):($(t.addToCart,this.$container).prop("disabled",!0),$(t.addToCartText,this.$container).html(theme.strings.soldOut)))):($(t.addToCart,this.$container).prop("disabled",!0),$(t.addToCartText,this.$container).html(theme.strings.unavailable),void $(t.priceWrapper,this.$container).addClass("hide"))},updateProductPrices:function(e){var n=e.variant,a=$(t.comparePrice,this.$container),i=a.add(t.comparePriceText,this.$container)
$(t.productPrice,this.$container).html(slate.Currency.formatMoney(n.price,theme.moneyFormat)),n.compare_at_price>n.price?(a.html(slate.Currency.formatMoney(n.compare_at_price,theme.moneyFormat)),i.removeClass("hide")):(a.html(""),i.addClass("hide"))},updateProductImage:function(e){var t=e.variant,n=slate.Image.getSizedImageUrl(t.featured_image.src,this.settings.imageSize)
this.$featuredImage.attr("src",n)},onUnload:function(){this.$container.off(this.namespace)}}),e}(),theme.customerAddresses=function(){var e=$("#AddressNewForm")
e.length&&(Shopify&&new Shopify.CountryProvinceSelector("AddressCountryNew","AddressProvinceNew",{hideElement:"AddressProvinceContainerNew"}),$(".address-country-option").each(function(){var e=$(this).data("form-id"),t="AddressCountry_"+e,n="AddressProvince_"+e,a="AddressProvinceContainer_"+e
new Shopify.CountryProvinceSelector(t,n,{hideElement:a})}),$(".address-new-toggle").on("click",function(){e.toggleClass("hide")}),$(".address-edit-toggle").on("click",function(){var e=$(this).data("form-id")
$("#EditAddress_"+e).toggleClass("hide")}),$(".address-delete").on("click",function(){var e=$(this),t=e.data("form-id"),n=e.data("confirm-message")
confirm(n||"Are you sure you wish to delete this address?")&&Shopify.postLink("/account/addresses/"+t,{parameters:{_method:"delete"}})}))}(),theme.customerLogin=function(){function e(e){e.preventDefault(),n()}function t(){var e=window.location.hash
"#recover"===e&&n()}function n(){$("#RecoverPasswordForm").toggleClass("hide"),$("#CustomerLoginForm").toggleClass("hide")}function a(){var e=$(".reset-password-success")
e.length&&$("#ResetSuccess").removeClass("hide")}var i={recoverPasswordForm:"#RecoverPassword",hideRecoverPasswordLink:"#HideRecoverPasswordLink"}
$(i.recoverPasswordForm).length&&(t(),a(),$(i.recoverPasswordForm).on("click",e),$(i.hideRecoverPasswordLink).on("click",e))}(),$(document).ready(function(){var e=new slate.Sections
e.register("product",theme.Product),slate.a11y.pageLinkFocus($(window.location.hash)),$(".in-page-link").on("click",function(e){slate.a11y.pageLinkFocus($(e.currentTarget.hash))})
var t=".rte table"
slate.rte.wrapTable({$tables:$(t),tableWrapperClass:"rte__table-wrapper"})
var n='.rte iframe[src*="youtube.com/embed"],.rte iframe[src*="player.vimeo"]'
slate.rte.wrapIframe({$iframes:$(n),iframeWrapperClass:"rte__video-wrapper"}),slate.cart.cookiesEnabled()&&(document.documentElement.className=document.documentElement.className.replace("supports-no-cookies","supports-cookies"))})
