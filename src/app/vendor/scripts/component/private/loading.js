define(['jquery'],function(){

    var $loading = $('<div style="display:none;position:fixed;z-index:10000;top:0px;left:0px;width:100%;height:100%;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE2MUNBQUM5M0I1MDExRTU4RTRCQjhBQTM3MTFEMkZEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE2MUNBQUNBM0I1MDExRTU4RTRCQjhBQTM3MTFEMkZEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTYxQ0FBQzczQjUwMTFFNThFNEJCOEFBMzcxMUQyRkQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTYxQ0FBQzgzQjUwMTFFNThFNEJCOEFBMzcxMUQyRkQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5sI/LTAAAAEElEQVR42mL4////TIAAAwAJlQOXz4H82AAAAABJRU5ErkJggg==);"><div style="position:absolute;top:0;left:0;width:100%;height:100%;background: url(../../../../styles/images/loading.gif) no-repeat center center;"></div></div>');

    /*$(document).ajaxStart(function(){
        $('body').append($loading);
        $loading.fadeIn();
    });
    $(document).ajaxStop(function(){
        $loading.stop().fadeOut(function(){
            $loading.remove();
        });
    });*/

    $(document).ajaxStart(function(){
        $('body').append($loading);
        $loading.show();
    });
    $(document).ajaxStop(function(){
        $loading.remove();
        if(window.globalInfo && typeof window.globalInfo.gotopBtnStyleFix === 'function'){
            window.globalInfo.gotopBtnStyleFix();
        }
    });
});