function parseEssentialDetails(){
    let main={};
    main.performance = JSON.parse(JSON.stringify.performance)) || null;
    return main;
}

setInterval(() => {
    let essential = parseEssentialDetails();
    window.postMessage({ type: "FROM_PAGE", essential}); //postMessage() from inject csript sends data upstream to content script

}, 500);HTMLOutputElement;