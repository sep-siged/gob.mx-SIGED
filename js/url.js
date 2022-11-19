// *************** DOCUMENTOS.HTML ***************

// METHOD TO GET AND USE A PORTION OF THE URL FROM ADDRESSBAR

// function getCurrentURL () { 
//     return window.location.href } 
    
    // Example 
    // const url = getCurrentURL()

    // EVERY PART I CAN GET FROM THE URL
    const {
        host, hostname, href, origin, pathname, port, protocol, search
      } = window.location
    console.log(href)
    // THIS CODE GETS THE URL IN AN ARRAY OR OBJECT
    function parseURLParams(url) {
        var queryStart = url.indexOf("?") + 1,
            queryEnd   = url.indexOf("#") + 1 || url.length + 1,
            query = url.slice(queryStart, queryEnd - 1),
            pairs = query.replace(/\+/g, " ").split("&"),
            parms = {}, i, n, v, nv;
    
        if (query === url || query === "") return;
    
        for (i = 0; i < pairs.length; i++) {
            nv = pairs[i].split("=", 2);
            n = decodeURIComponent(nv[0]);
            v = decodeURIComponent(nv[1]);
    
            if (!parms.hasOwnProperty(n)) parms[n] = [];
            parms[n].push(nv.length === 2 ? v : null);
        }
        return parms;
    }
    let url = parseURLParams(href);
    console.log(url.folio)
    
    // if (url = undefined) { 
    //     return; }
        
    // ACCES TO DESIRE LINK SECTION AND TURNS IT INTO A STRING
    let chain = url.folio.toString()
    console.log(chain)
    
    // IT GETS THE CONTENT OF THE DESIRE ELEMENT (ID) [IN DISUSE]
    // let getChain = document.getElementById('invoice_').textContent
    // console.log(getChain)

    // IT INSERTS DATA IN THE TARGET INPUT FIELD
    let inputValue = document.getElementById("form-data");
    inputValue.value = chain;
    
    // THIS CODE SHOWS ELEMENTONLY WHEN IT FITS WITH THE CONDITION
    // if (chain.length = 36) {
    // document.getElementById('showVal_').style.display = "block";
    // document.getElementById('hideInfo').style.display = "none";
    // document.getElementById('showVal_').style.marginTop = '40px';
    // console.log(chain.length);
    // } else if (chain.length != 36) {
    // document.getElementById('showVal_').style.display = "none";
    // document.getElementById('hideInfo').style.display = "flex";
    // } else {
    // document.getElementById('showVal_').style.display = "none";
    // document.getElementById('hideInfo').style.display = "flex";
    // }
    
    
  

    


