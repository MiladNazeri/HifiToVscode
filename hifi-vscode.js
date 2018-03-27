const fs = require('fs');
const path = require('path')

var vsCodeArray = [];

// load jsdoc
    var hifiDoc = require('./hifiJSDoc.json');
    // console.log("hifiDoc \n", hifiDoc);

// create VsCode mapping
    function VSCodeMappingObject(name, prefix, body, description){
        this.name = name;
        this.prefix = prefix;
        this.body = body;
        this.description = description;
    }

// iterate hifiDoc
    hifiDoc.forEach( item => {
        vsCodeArray.push(
            new VSCodeMappingObject(
                item.longname,
                item.name,
                [
                    item.longname
                ],
                item.description
            )
        )
    });
    // console.log("VSCodeMappingObject \n", vsCodeArray);
    

// Convert to JSON format
    function JSONConvert(VSCodeMappingObject){
        var ObjectForJSON = {};

        ObjectForJSON[VSCodeMappingObject.name] = {
            prefix: VSCodeMappingObject.prefix,
            body: VSCodeMappingObject.body,
            description: VSCodeMappingObject.description
        }

        return JSON.stringify(ObjectForJSON);
    }

// convert array
    var convertedArray = vsCodeArray.map(vcObject => JSONConvert(vcObject))
    // console.log("convertedArray \n", convertedArray);

var stringToWrite = `
        [
            ${convertedArray.join(",")}
        ]
    `

    // console.log(stringToWrite);

// write file
    fs.writeFileSync(path.join(__dirname, 'out', 'hifiVsCode.json'), stringToWrite);



/*
    https://code.visualstudio.com/docs/editor/userdefinedsnippets
    How VSCODE snipets are formated:

    {
        "For_Loop": {
            "prefix": "for",
            "body": [
            "for (const ${2:element} of ${1:array}) {",
            "\t$0",
            "}"
            ],
            "description": "For Loop"
        },
    }

    For Loop 
        is the snippet name.
    prefix 
        defines how this snippet is selected from 
        IntelliSense and tab completion. In this case for.
    body 
        is the content and either a single string or 
        an array of strings of which each element will be 
        inserted as separate line.
    description 
        is the description used in the IntelliSense drop down.

*/