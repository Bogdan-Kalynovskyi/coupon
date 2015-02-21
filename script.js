var postClaim = true;

function load() {
    var data = JSON.parse(coupon);
    document.getElementById("mainImg").src = data[0].componentData.mainImg;
    document.getElementById("footer").style.background = data[0].componentData.themeStyle.bgColor;
    document.getElementById("couponCodeTextBox").style.background = data[0].componentData.themeStyle.buttonColor;
    document.getElementById("couponCodeBlock").children[0].style.color = data[0].componentData.themeStyle.textColor;
    document.getElementById("couponCodeTextBox").style.color = data[0].componentData.themeStyle.textColor;
    document.getElementById("couponCodeTextBox").style.borderColor = data[0].componentData.themeStyle.textColor;
    document.getElementById("couponCodeTextBox").style.backgroundColor = data[0].componentData.themeStyle.buttonColor;
    document.getElementById("shareTitle").innerText = data[0].componentData.socialShare.overlayMessage;
    document.getElementById("shareTitle").style.color = data[0].componentData.themeStyle.textColor;
    document.getElementById("icon-facebook").href = "http://www.facebook.com/sharer.php?s=100&p[url]=" + encodeURI(data[0].componentData.socialShare.shareValue) + "&p[summary]=" + encodeURI(data[0].componentData.socialShare.shareMessage);
    document.getElementById("icon-twitter").href = "http://twitter.com/share?url=" + encodeURI(data[0].componentData.socialShare.shareValue) + "&text=" + encodeURI(data[0].componentData.socialShare.shareMessage);
    document.getElementById("icon-google").href = "https://plus.google.com/share?url=" + encodeURI(data[0].componentData.socialShare.shareValue);


    if (data[0].componentData.socialShare.status === '1') {
        document.getElementById("shareButtonsContainer").style.display = 'block';
    }
    else {
        document.getElementById("shareButtonsContainer").style.display = 'none';
    }

    var len = data[0].componentData.claimButtons.length;
    for (var i=0; i<len; i++) {
        var buttonAction;
        var pathBegin;

        if (data[0].componentData.claimButtons[i].buttonType === 'site') {
            pathBegin = "<path id='icon-share' d='M 12 12 v -2 c 0 0 -8 -2 -9 2 c 0 -2 1 -6 9 -6 V 4 l 4 4.021 L 12 12 Z M 9 13 H 1 V 3 h 8 v 1 h 1 V 2 H 0 v 12 h 10 v -2 H 9 V 13 Z'>";
            buttonAction = "target='_blank' href='" + data[0].componentData.claimButtons[i].actionValue + "' onclick='downloadCoupon()'";
        }
        if (data[0].componentData.claimButtons[i].buttonType === 'download') {
            pathBegin = "<path id='icon-inbox-download' d='M 8 9.4 l -4 -3.73333 h 2 v -4.66667 h 4 v 4.66667 h 2 L 8 9.4 Z M 13.867 4.73333 H 13 l 1.486 3.73333 H 11 c 0 1.54653 -1.342 2.8 -3 2.8 c -1.656 0 -3 -1.25347 -3 -2.8 H 1.514 L 3 4.73333 H 2.133 L 0 9.4 v 5.6 h 16 v -5.6 L 13.867 4.73333 Z'>";
            buttonAction = "target='_blank' href='" + data[0].componentData.claimButtons[i].actionValue + "' onclick='downloadCoupon()'";
        }
        if (data[0].componentData.claimButtons[i].buttonType === 'code') {
            pathBegin = "<path id='icon-eye' d='M 8 3 C 2 3 0 8 0 8 s 2 5 8 5 s 8 -5 8 -5 S 14 3 8 3 Z M 8 12 c -4.366 0 -6.326 -2.938 -6.893 -4 C 1.676 6.935 3.637 4 8 4 c 4.366 0 6.326 2.938 6.893 4 C 14.324 9.065 12.363 12 8 12 Z M 10.121 5.879 C 10.664 6.422 11 7.172 11 8 c 0 1.657 -1.344 3 -3 3 S 5 9.657 5 8 s 1.344 -3 3 -3 v 3 L 10.121 5.879 Z'>";
            buttonAction = "onclick='showCode()'";
            document.getElementById("couponCodeBlock").children[0].innerText = data[0].componentData.claimButtons[i].overlayMessage;
            document.getElementById("couponCodeBlock").children[0].style.color = data[0].componentData.themeStyle.textColor;
            document.getElementById("couponCodeTextBox").innerText = data[0].componentData.claimButtons[i].actionValue;
            document.getElementById("couponCodeTextBox").style.color = data[0].componentData.themeStyle.textColor;
            document.getElementById("couponCodeTextBox").style.borderColor = data[0].componentData.themeStyle.textColor;
            document.getElementById("couponCodeTextBox").style.backgroundColor = data[0].componentData.themeStyle.buttonColor;
            document.getElementById("shareTitle").innerText = data[0].componentData.socialShare.overlayMessage;
            document.getElementById("shareTitle").style.color = data[0].componentData.themeStyle.textColor;
        }

        var buttonBegin = "<a style='background: " + data[0].componentData.themeStyle.buttonColor + "; border-color: " + data[0].componentData.themeStyle.textColor + "; color: " + data[0].componentData.themeStyle.textColor + "' " + buttonAction + ">\
                                <svg fill='" + data[0].componentData.themeStyle.textColor + "'>";

        var ends = "</path>\
                </svg>" +
            data[0].componentData.claimButtons[i].buttonText +
            "</a>";

        document.getElementById("footer").innerHTML += buttonBegin + pathBegin + ends;
    }

    if (data[0].componentData.socialShare.preClaim === "1") {
        document.getElementById("overlay").style.display = 'block';
        document.getElementById("shareBlock").style.display = 'block';
        document.getElementById("button-close").style.display = 'none';
    }

    if (data[0].componentData.socialShare.postClaim === "0") {
        postClaim = false;
    }
}

function downloadCoupon() {
    document.getElementById("couponCodeBlock").style.display = 'none';
    document.getElementById("overlay").style.display = 'block';
    document.getElementById("shareBlock").style.display = 'block';
}

function showCode() {
    document.getElementById("couponCodeBlock").style.display = 'block';
    document.getElementById("overlay").style.display = 'block';

    if (postClaim === false) {
        document.getElementById("shareBlock").style.display = 'none';
    }
}

function closeOverlay() {
    document.getElementById("overlay").style.display = 'none';
}

function copyCouponCode() {
    var text = document.getElementById("couponCodeTextBox");

    if (document.body.createTextRange) { // ms
        var range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) { // moz, opera, webkit
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function changeShareStatus() {
    document.getElementById("overlay").style.display = 'none';
    document.getElementById("button-close").style.display = 'block';
}