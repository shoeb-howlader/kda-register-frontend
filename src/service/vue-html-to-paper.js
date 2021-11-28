(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VueHtmlToPaper = factory());
}(this, (function () { 'use strict';

  function addStyles (win, styles) {
    styles.forEach(style => {
      let link = win.document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('type', 'text/css');
      link.setAttribute('href', style);
      win.document.getElementsByTagName('head')[0].appendChild(link);
    });
  }

  function openWindow (url, name, props) {
    let windowRef = null;
    windowRef = window.open(url, name, props);
    if (!windowRef.opener) {
      windowRef.opener = self;
    }
    windowRef.focus();
    return windowRef;
  }
    
  const VueHtmlToPaper = {
    install (_i, options = {}) {
      let globals = _i.prototype || _i.config.globalProperties;
      globals.$htmlToPaper = (el, localOptions, cb = () => true) => {
        let defaultName = '_blank', 
          defaultSpecs = ['fullscreen=yes','titlebar=yes', 'scrollbars=yes'],
          defaultReplace = true,
          defaultStyles = [];
        let {
          name = defaultName,
          specs = defaultSpecs,
          replace = defaultReplace,
          styles = defaultStyles,
        } = options;

        // If has localOptions
        // TODO: improve logic
        if (!!localOptions) {
          if (localOptions.name) name = localOptions.name;
          if (localOptions.specs) specs = localOptions.specs;
          if (localOptions.replace) replace = localOptions.replace;
          if (localOptions.styles) styles = localOptions.styles;
        }

        specs = !!specs.length ? specs.join(',') : '';

        const element = window.document.getElementById(el);

        if (!element) {
          alert(`Element to print #${el} not found!`);
          return;
        }
        
        const url = '';
        const win = openWindow(url, name, specs);

        win.document.write(`
        <html>
          <head>
            <title>KDA Computer Section Register</title>
            <style>
            /*** Table Styles **/

            .table-fill {
              
              background: white;
              border-radius:3px;
              border-collapse: collapse;
              height: 320px;
              margin: auto;
              padding:5px;
              width: 100%;
              box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
              animation: float 5s infinite;
            }
             
            .table-fill th {
              color:#D5DDE5;;
              background:#1b1e24;
              border-bottom:4px solid #9ea7af;
              border-right: 1px solid #343a45;
              font-size:23px;
              font-weight: 100;
              padding:24px;
              text-align:left;
              text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
              vertical-align:middle;
            }
            
            .table-fill th:first-child {
              border-top-left-radius:3px;
            }
             
            .table-fill th:last-child {
              border-top-right-radius:3px;
              border-right:none;
            }
              
            .table-fill tr {
              border-top: 1px solid #C1C3D1;
              border-bottom: 1px solid #C1C3D1;
              color:#666B85;
              font-size:16px;
              font-weight:normal;
              text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
            }
             
             
            .table-fill tr:first-child {
              border-top:none;
            }
            
            .table-fill tr:last-child {
              border-bottom:none;
            }
             
            .table-fill tr:nth-child(odd) td {
              background:#EBEBEB;
            }
             
            
            .table-fill tr:last-child td:first-child {
              border-bottom-left-radius:3px;
            }
             
            .table-fill tr:last-child td:last-child {
              border-bottom-right-radius:3px;
            }
             
            .table-fill td {
              background:#FFFFFF;
              padding:8px;
              text-align:left;
              vertical-align:middle;
              font-weight:300;
              font-size:18px;
              text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
              border-right: 1px solid #C1C3D1;
            }
            
            .table-fill td:last-child {
              border-right: 0px;
            }
            
            .table-fill th.text-left {
              text-align: left;
            }
            
            .table-fill th.text-center {
              text-align: center;
            }
            
            .table-fill th.text-right {
              text-align: right;
            }
            
            .table-fill td.text-left {
              text-align: left;
            }
            
            .table-fill td.text-center {
              text-align: center;
            }
            
            .table-fill td.text-right {
              text-align: right;
            }
            .product-description{
            width:100%;
            /**border: 1px solid green;**/
            padding: 4px;
            border-radius: 5px;
            }
            
</style>
          </head>
          <body>
          <h2 style=" text-align: center;font-family: -webkit-pictograph;">KDA Computer Section Register</h2>
            ${element.innerHTML}
            <p style="text-align: center;font-family: monospace;font-size: smaller;">Designed and Developed by Shoeb Howlader</p>
          </body>
        </html>
      `);

        addStyles(win, styles);
        
        setTimeout(() => {
          win.document.close();
          win.focus();
          win.print();
          setTimeout(function () {window.close();}, 1);
          cb();
        }, 1000);
          
        return true;
      };
    },
  };

  return VueHtmlToPaper;

})));
