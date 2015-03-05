function Coupon (container) {
    function $ (id) {
        return document.getElementById(id);
    }
    
    var postClaim = true;

    function load() {
        var data = JSON.parse(coupon);
        $("mainImg").src = data[0].componentData.mainImg;
        $("footer").style.background = data[0].componentData.themeStyle.bgColor;
        $("couponCodeTextBox").style.background = data[0].componentData.themeStyle.buttonColor;
        $("couponCodeBlock").children[0].style.color = data[0].componentData.themeStyle.textColor;
        $("couponCodeTextBox").style.color = data[0].componentData.themeStyle.textColor;
        $("couponCodeTextBox").style.borderColor = data[0].componentData.themeStyle.textColor;
        $("couponCodeTextBox").style.backgroundColor = data[0].componentData.themeStyle.buttonColor;
        $("shareTitle").innerText = data[0].componentData.socialShare.overlayMessage;
        $("shareTitle").style.color = data[0].componentData.themeStyle.textColor;
        $("icon-facebook").href = "http://www.facebook.com/sharer.php?s=100&p[url]=" + encodeURI(data[0].componentData.socialShare.shareValue) + "&p[summary]=" + encodeURI(data[0].componentData.socialShare.shareMessage);
        $("icon-twitter").href = "http://twitter.com/share?url=" + encodeURI(data[0].componentData.socialShare.shareValue) + "&text=" + encodeURI(data[0].componentData.socialShare.shareMessage);
        $("icon-google").href = "https://plus.google.com/share?url=" + encodeURI(data[0].componentData.socialShare.shareValue);


        if (data[0].componentData.socialShare.status === '1') {
            $("shareButtonsContainer").style.display = 'block';
        }
        else {
            $("shareButtonsContainer").style.display = 'none';
        }

        var len = data[0].componentData.claimButtons.length;
        for (var i = 0; i < len; i++) {
            var buttonAction;
            var buttonOnClick;
            var pathBegin;

            if (data[0].componentData.claimButtons[i].buttonType === 'site') {
                pathBegin = "<path id='icon-share' d='M 12 12 v -2 c 0 0 -8 -2 -9 2 c 0 -2 1 -6 9 -6 V 4 l 4 4.021 L 12 12 Z M 9 13 H 1 V 3 h 8 v 1 h 1 V 2 H 0 v 12 h 10 v -2 H 9 V 13 Z'>";
                buttonAction = "target='_blank' href='" + data[0].componentData.claimButtons[i].actionValue + "'";
                buttonOnClick = downloadCoupon;
            }
            if (data[0].componentData.claimButtons[i].buttonType === 'download') {
                pathBegin = "<path id='icon-inbox-download' d='M 8 9.4 l -4 -3.73333 h 2 v -4.66667 h 4 v 4.66667 h 2 L 8 9.4 Z M 13.867 4.73333 H 13 l 1.486 3.73333 H 11 c 0 1.54653 -1.342 2.8 -3 2.8 c -1.656 0 -3 -1.25347 -3 -2.8 H 1.514 L 3 4.73333 H 2.133 L 0 9.4 v 5.6 h 16 v -5.6 L 13.867 4.73333 Z'>";
                buttonAction = "target='_blank' href='" + data[0].componentData.claimButtons[i].actionValue + "'";
                buttonOnClick = downloadCoupon;
            }
            if (data[0].componentData.claimButtons[i].buttonType === 'code') {
                pathBegin = "<path id='icon-eye' d='M 8 3 C 2 3 0 8 0 8 s 2 5 8 5 s 8 -5 8 -5 S 14 3 8 3 Z M 8 12 c -4.366 0 -6.326 -2.938 -6.893 -4 C 1.676 6.935 3.637 4 8 4 c 4.366 0 6.326 2.938 6.893 4 C 14.324 9.065 12.363 12 8 12 Z M 10.121 5.879 C 10.664 6.422 11 7.172 11 8 c 0 1.657 -1.344 3 -3 3 S 5 9.657 5 8 s 1.344 -3 3 -3 v 3 L 10.121 5.879 Z'>";
                buttonAction = '';
                buttonOnClick = showCode;
                var block = $("couponCodeBlock").children[0];
                block.innerText = data[0].componentData.claimButtons[i].overlayMessage;
                block.style.color = data[0].componentData.themeStyle.textColor;
                var text = $("couponCodeTextBox");
                text.innerText = data[0].componentData.claimButtons[i].actionValue;
                text.style.color = data[0].componentData.themeStyle.textColor;
                text.style.borderColor = data[0].componentData.themeStyle.textColor;
                text.style.backgroundColor = data[0].componentData.themeStyle.buttonColor;
                $("shareTitle").innerText = data[0].componentData.socialShare.overlayMessage;
                $("shareTitle").style.color = data[0].componentData.themeStyle.textColor;
            }

            var buttonBegin = "<a id='button" + i +
                "' style='background: " + data[0].componentData.themeStyle.buttonColor + 
                "; border-color: " + data[0].componentData.themeStyle.textColor + 
                "; color: " + data[0].componentData.themeStyle.textColor + 
                "' " + buttonAction + ">\
                               <svg fill='" + data[0].componentData.themeStyle.textColor + "'>";

            var ends = "</path>\
                    </svg>" +
                data[0].componentData.claimButtons[i].buttonText +
                "</a>";

            $("footer").innerHTML += buttonBegin + pathBegin + ends;
            $("button" + i).onclick = buttonOnClick;
        }

        if (data[0].componentData.socialShare.preClaim === "1") {
            $("overlay").style.display = 'block';
            $("shareBlock").style.display = 'block';
            $("button-close").style.display = 'none';
        }

        if (data[0].componentData.socialShare.postClaim === "0") {
            postClaim = false;
        }


        function downloadCoupon() {
            $("couponCodeBlock").style.display = 'none';
            $("overlay").style.display = 'block';
            $("shareBlock").style.display = 'block';
        }

        function showCode() {
            $("couponCodeBlock").style.display = 'block';
            $("overlay").style.display = 'block';

            if (postClaim === false) {
                $("shareBlock").style.display = 'none';
            }
        }

        $('button-close').onclick = function () {
            $("overlay").style.display = 'none';
        };

        $("couponCodeTextBox").onclick = function () {
            if (document.body.createTextRange) { // ms
                var range = document.body.createTextRange();
                range.moveToElementText(this);
                range.select();
            } else if (window.getSelection) { // moz, opera, webkit
                var selection = window.getSelection();
                var range = document.createRange();
                range.selectNodeContents(this);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        };

        $('icon-facebook').onclick = $('icon-twitter').onclick = $('icon-google').onclick = function () {
            $("overlay").style.display = 'none';
            $("button-close").style.display = 'block';
        };
    }
    
    
    function domReady (callback) {
        // Mozilla, new IE and Webkit
        if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", callback, false);
            // If IE event model is used
        } else if (document.attachEvent) {
            document.attachEvent("onreadystatechange", function () {
                if (document.readyState === "complete") {
                    callback();
                }
            });
        }
    }
    
    
    function render() {
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.position = 'relative';
        container.innerHTML = '<header> <img id="mainImg"> </header> <footer id="footer"></footer> <div id="overlay" class="overlay"> <svg class="icon-close" fill="rgba(255, 255, 255, 1)" id="button-close"> <path id="icon-close" d="M 12 0 C 5.37486 0 0 5.37146 0 12 S 5.37486 24 12 24 c 6.62854 0 12 -5.37146 12 -12 S 18.6285 0 12 0 Z M 12 22.1721 c -5.61099 0 -10.1721 -4.56285 -10.1721 -10.1721 c 0 -5.60759 4.56285 -10.1721 10.1721 -10.1721 S 22.1721 6.39241 22.1721 12 C 22.1721 17.611 17.611 22.1721 12 22.1721 Z M 17.6908 8.51925 L 14.645 11.5651 l 3.04587 3.04587 l -2.40204 2.40204 L 12.2429 13.9672 L 9.19706 17.013 L 6.79502 14.611 l 3.04587 -3.04587 L 6.79502 8.51925 L 9.19706 6.11721 L 12.2429 9.16308 l 3.04587 -3.04587 L 17.6908 8.51925 Z"></path> </svg> <div class="centered"> <div id="couponCodeBlock"> <div></div> <div id="couponCodeTextBox" class="coupon-code"></div> </div> <div id="shareBlock"> <div id="shareTitle"></div> <div id="shareButtonsContainer"> <a class="icon" id="icon-facebook" target="_window"> <svg fill="#000000"> <path d="M 31.998 26.6663 c 0 2.80182 -2.52984 5.33367 -5.33367 5.33367 H 20.9747 v -12.0892 h 5.33367 V 14.5771 H 20.9747 V 12.4532 c 0 -0.857946 0.549966 -1.42991 1.02194 -1.42991 h 4.30973 V 5.68964 h -4.30973 c -3.30779 0 -5.99963 3.2278 -5.99963 6.80957 v 2.07787 H 12.0872 v 5.33367 h 3.91176 v 12.0872 H 5.33367 c -2.80382 0 -5.33367 -2.53184 -5.33367 -5.33367 V 5.33367 c 0 -2.80182 2.52984 -5.33367 5.33367 -5.33367 h 21.3327 c 2.80183 0 5.33367 2.53184 5.33367 5.33367 L 31.998 26.6663 L 31.998 26.6663 Z"></path> </svg> </a> <a class="icon" id="icon-twitter" target="_window"> <svg fill="#000000"> <path d="M 32 13.1483 c -0.712 0.687514 -1.862 1.31204 -3.818 1.29764 c -2.61 9.51721 -20.124 13.5541 -28.182 3.67334 c 3.086 2.65107 8.46 2.88324 11.87 -0.286164 c -2 0.262767 -3.454 -1.50101 -1 -2.45309 C 8.662 15.5978 7.436 14.5413 6.932 13.6432 c 0.518 -0.487739 1.088 -0.712711 2.194 -0.779303 C 6.708 12.3492 5.816 11.2873 5.542 9.99505 c 0.67 -0.143982 1.51 -0.268166 1.968 -0.212373 C 5.392 8.7874 4.656 7.28819 4.774 6.16153 c 3.784 1.26524 6.194 2.28031 8.21 3.25219 C 13.702 9.75928 14.502 10.3802 15.406 11.1685 C 16.558 8.43105 17.98 5.609 20.416 4.21057 c -0.04 0.31676 -0.23 0.611924 -0.48 0.854893 c 0.692 -0.56333 1.588 -0.952081 2.502 -1.06547 c -0.106 0.615523 -1.09 0.96288 -1.686 1.16445 c 0.452 -0.125984 2.848 -1.08886 3.108 -0.539933 c 0.31 0.622722 -1.654 0.910686 -1.988 1.01867 C 21.622 5.71879 21.374 5.79977 21.128 5.88976 c 3.04 -0.271766 5.938 1.98335 6.786 4.7802 c 0.06 0.201575 0.12 0.424747 0.174 0.658718 c 1.112 0.372553 3.124 -0.0179978 3.772 -0.376153 c -0.47 0.997075 -1.688 1.73318 -3.486 1.86637 C 29.24 13.1411 30.872 13.321 32 13.1483 Z"></path> </svg> </a> <a class="icon" id="icon-google" target="_blank"> <svg fill="#000000"> <path d="M 25.6175 1.16538 c -2.76442 1.68312 -5.6119 0.263576 -7.66541 0 C 8.88419 0 6 10.3096 12.6068 14.4458 C 10.9068 15.3043 11.0188 19.6741 12.8405 20.2972 c -4.29248 0.478202 -5.08838 6.37477 -2.7876 8.77896 c 2.79919 2.92381 11.4131 2.72989 13.938 0 c 1.76374 -1.90716 2.00908 -5.83821 0.463634 -7.65123 c -1.40636 -1.65676 -8.47291 -1.90716 -8.36086 -4.50338 c 0.0772723 -1.81491 2.63112 -1.52874 4.18236 -2.24981 c 2.91703 -1.3593 4.63054 -5.4259 3.48498 -8.55304 c 0.651019 -0.118609 1.20738 -0.331353 1.8584 -0.449962 V 1.16538 H 25.6175 Z M 14.4671 10.6183 c -3.39998 -7.21822 7.81609 -6.70048 4.41418 0 C 17.7647 11.426 15.5702 11.5051 14.4671 10.6183 Z M 20.7397 24.7987 c 0.301362 3.23634 -6.42519 3.37942 -7.20178 1.12585 c -0.654883 -1.89963 0.16034 -2.43619 2.09022 -2.92569 C 17.8149 22.4435 20.5368 22.6336 20.7397 24.7987 Z"></path> </svg> </a> </div> </div> </div> </div>';       
    }
    
    
    render();
    domReady(load);
}