function parseEssentialDetails(){
    let main={};
    main.performance = JSON.parse(JSON.stringify.performance)) || null;
    return main;
}

setInterval(() => {
    let essential = parseEssentialDetails();
    window.postMessage({ type: "FROM_PAGE", essential});

}, 500);ActiveXObject;