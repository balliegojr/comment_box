const attributes = {
    allowtransparency: "true",
    frameborder:"0",
    scrolling:"no",
    tabindex: "0",
    style: "width: 1px !important; min-width: 100% !important; border: none !important; overflow: hidden !important; height: 150px !important;",
    horizontalscrolling:"no",
    verticalscrolling: "no"
}


global.commentbox = {
    container: null,
    load: function (opt = {}) {
        if (!opt.target) {
            throw Error("Target must be a valid identifier");
        } 
        const target = document.querySelector(opt.target);
        const { client_id, app_id, url } = opt;
        
        let _url;
        if (url) {
            _url = encodeURI(url);
        } else {
            _url = encodeURI(location.origin + location.pathname);
        }
        
        
        const iframe = document.createElement("iframe");
        for(let prop in attributes){
            iframe.setAttribute(prop, attributes[prop]);
        }

        iframe.setAttribute("src", `/app?client_id=${client_id}&app_id=${app_id}&url=${_url}`);
        target.appendChild(iframe);
        this.container = iframe;

    },

} 
