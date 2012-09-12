var path = require('path');

var Mimetype = function() {

    this._set = function( ext , type ) {
        this[ext] = type;
    };

    this._get =  function( ext ) {
        return ( this[ext] ) ? this[ext] : console.log('\nInvalid extension');
    };

    this.getFromFile = function( file ) {
        return this._get( path.extname( file ).toLowerCase().split('.')[1] );
    };

    this.setMultiple= function( list , type ) {
        for ( var i = 0; i < list.length; i++ ) {
            this._set( list[i] , type );
        }
    };

};

Mimetype.prototype = {
    'html' : 'text/html',
    'css' : 'text/css',
    '7z' : "application/x-7z-compressed",
    'atom' : "application/atom+xml",
    'avi' : "video/x-msvideo",
    'bmp' : "image/x-ms-bmp",
    'cco' : "application/x-cocoa",
    'doc' : "application/msword",
    'flv' : "video/x-flv",
    'gif' : "image/gif",
    'hqx' : "application/mac-binhex40",
    'htc' : "text/x-component",
    'ico' : "image/x-icon",
    'jad' : "text/vnd.sun.j2me.app-descriptor",
    'jardiff' : "application/x-java-archive-diff",
    'jng' : "image/x-jng",
    'jnlp' : "application/x-java-jnlp-file",
    'js' : "application/x-javascript",
    'kml' : "application/vnd.google-earth.kml+xml",
    'kmz' : "application/vnd.google-earth.kmz",
    'mml' : "text/mathml",
    'mng' : "video/x-mng",
    'mov' : "video/quicktime",
    'mp4' : "video/mp4",
    'ogv' : "video/ogg",
    'ogx' : "application/ogg",
    'pdf' : "application/pdf",
    'png' : "image/png",
    'ppt' : "application/vnd.ms-powerpoint",
    'ra' : "audio/x-realaudio",
    'rar' : "application/x-rar-compressed",
    'rpm' : "application/x-redhat-package-manager",
    'rtf' : "application/rtf",
    'run' : "application/x-makeself",
    'sea' : "application/x-sea",
    'sit' : "application/x-stuffit",
    'swf' : "application/x-shockwave-flash",
    'txt' : "text/plain",
    'wbmp' : "image/vnd.wap.wbmp",
    'weba' : "audio/webm",
    'webm' : "video/webm",
    'webp' : "image/webp",
    'wml' : "text/vnd.wap.wml",
    'wmlc' : "application/vnd.wap.wmlc",
    'wmv' : "video/x-ms-wmv",
    'xhtml' : "application/xhtml+xml",
    'xls' : "application/vnd.ms-excel",
    'xpi' : "application/x-xpinstall",
    'zip' : "application/zip",
    'woff': "application/x-font-woff",
    'json': "application/json"
};

var mime = new Mimetype();

mime.setMultiple( ['xml','rss'] , "text/xml" );
mime.setMultiple( ['xml','rss'] , "text/xml" );
mime.setMultiple( ['svg','svgz'] , "image/svg+xml" );
mime.setMultiple( ['pl','pm'] , "application/x-perl" );
mime.setMultiple( ['prc','pdb'] , "application/x-pilot" );
mime.setMultiple( ['ps','eps','ai'] , "application/postscript" );
mime.setMultiple( ['tif','tiff'] , "image/tiff" );
mime.setMultiple( ['oga','ogg','spx'] , "audio/ogg" );
mime.setMultiple( ['mpga','mpega','mp2','mp3','m4a'] , "audio/mpeg" );
mime.setMultiple( ['mpeg','mpg','mpe'] , "video/mpeg" );
mime.setMultiple( ['jar','war','ear'] , "application/java-archive" );
mime.setMultiple( ['jpeg','jpg'] , "image/jpeg" );
mime.setMultiple( ['mid','midi','kar'] , "audio/midi" );
mime.setMultiple( ['der','pem','crt'] , "application/x-x509-ca-cert" );
mime.setMultiple( ['3gpp','3gp'] , "video/3gpp" );
mime.setMultiple( ['asx','asf'] , "video/x-ms-asf" );
mime.setMultiple( ['bin','exe','dll','deb','dmg','eot','iso','img','msi','msp','msm','ttf'] , "application/octet-stream" );

module.exports = mime;