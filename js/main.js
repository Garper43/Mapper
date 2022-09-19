// var map;

// async function getData(link) {
//     var data;

//     await fetch(link)
//     .then((response) => {
//         return response.json();

//     })
//     .then((json) => {
//         data = json;

//     }) 

//     return data;
// }

// async function loadMap(id) {
//     var link = "http://localhost:8080/Mapper/maps/" + id + ".json";
//     var data = await getData(link);
//     console.log(data);

//     map = data;
//     map.image.file = new Image();

//     map.image.file.src = map.image.src;
//     map.image.file.onload = () => {
//         let imgWidth = map.image.file.naturalWidth;
//         let imgHeight = map.image.file.naturalHeight;

//         //set base image size and offset
//         if(imgHeight > imgWidth) {
//             map.image.baseWidth = canvas.height * (imgWidth/imgHeight);
//             map.image.baseHeight = canvas.height;

//             map.x = (canvas.width - map.image.baseWidth) / 2;
//         } else {
//             map.image.baseHeight = canvas.width * (imgHeight/imgWidth);
//             map.image.baseWidth = canvas.width;

//             map.y = (canvas.height - map.image.baseHeight) / 2;
//         }
        
//         //set initial display image size
//         map.image.displayWidth = map.image.baseWidth * map.scale;
//         map.image.displayHeight = map.image.baseHeight * map.scale;

//         //initial image draw
//         update();
//     }
// }

// function saveMap(mapId) {
//     let request = new XMLHttpRequest();
//     request.open("POST", "/Mapper/MapJsonServlet");

//     var fileCopy = map.image.file;
//     delete map.image.file;

//     var content = mapId + "\n" + JSON.stringify(map);

//     request.send(content);
    
//     console.log(content);
    
//     map.image.file = fileCopy;
// }

var map = {
    image: {
        file: new Image(),
        //TODO: this is a bit redundant, try to get rid of it later
        src: "assets/o-block.png",

        //these dimentions are placeholders and will be replaced in image.file.onload()
        //they are used for calculating displayed image size
        //TODO: try replacing these with a single aspect ratio
        baseWidth: 0,
        baseHeight: 0,

        //these dimentions are placeholders and will be replaced in scroll events
        //displayed dimentions are actual dimentions that will be drawn
        displayWidth: 0,
        displayHeight: 0,
    },
    //offset
    x: 0,
    y: 0,

    drag: false,
    draw: false,
    dragStart: {
        x: 0,
        y: 0
    },
    scale: 1,

    toolData: {
        brushes: [],
        waypoints: []
    },

    utils: {
        loadMap: async (id) => {
            var link = "http://localhost:8080/Mapper/maps/" + id + ".json";
            var tempMap = await map.utils.getData(link);

            //reset map position
            map.x = 0;
            map.y = 0;
            map.scale = 1;

            //set up tool data
            map.toolData = tempMap.toolData;

            //set up map image
            map.image.file = new Image();
            map.image.file.src = tempMap.imageSrc;
            map.image.file.onload = () => {
                let imgWidth = map.image.file.naturalWidth;
                let imgHeight = map.image.file.naturalHeight;

                //set base image size and offset
                if(imgHeight > imgWidth) {
                    map.image.baseWidth = canvas.height * (imgWidth/imgHeight);
                    map.image.baseHeight = canvas.height;

                    map.x = (canvas.width - map.image.baseWidth) / 2;
                } else {
                    map.image.baseHeight = canvas.width * (imgHeight/imgWidth);
                    map.image.baseWidth = canvas.width;

                    map.y = (canvas.height - map.image.baseHeight) / 2;
                }
                
                //set initial display image size
                map.image.displayWidth = map.image.baseWidth * map.scale;
                map.image.displayHeight = map.image.baseHeight * map.scale;

                //initial image draw
                update();
            }
        },

        //TODO: make a class for serialized map
        saveMap: (mapId) => {
            let tempMap = {};
            tempMap.imageSrc = map.image.file.src;
            tempMap.toolData = map.toolData;

            let serializedMap = JSON.stringify(tempMap);

            let request = new XMLHttpRequest();
            request.open("POST", "/Mapper/MapJsonServlet");
        
            var content = mapId + "\n" + serializedMap;
        
            request.send(content);
        },

        getData: async (link) => {
            var data;
        
            await fetch(link)
            .then((response) => {
                return response.json();
        
            })
            .then((json) => {
                data = json;
        
            }) 
        
            return data;
        },

        serializeToJSON: () => {

        }
    }
}

// function change(variable, target) {
//     variable.image.baseWidth = target;
// }