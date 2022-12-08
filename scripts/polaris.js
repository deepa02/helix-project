export function decoratePolarisImage(element) {
    decoratePolarisImageTitle(element);
 //   decoratePolarisTag(element);
}

function decoratePolarisImageTitle(element){
    const polarisImageTitle = '~polaris-title~';
    element.querySelectorAll('p').forEach((para) => {
        if(polarisImageTitle === para.innerHTML){
            console.log('found polaris title');
            // get the assetid from the alt attribute of the nearest image tag above this html tag
            const closestImg = para.parentElement.querySelector('img');
            if(closestImg !== null) {
                const assetId = closestImg.getAttribute('alt')
                if (assetId && testAssetId(assetId)) {
                    console.log('asset id found : ', assetId);
                     fetchAssetMetadata(assetId).then(resp => {
                       console.log(resp);
                       var jsonStr = JSON.stringify(resp);
                       var jsonObj = JSON.parse(jsonStr);
                       var titleVal = parsePolarisTitleResponse(jsonObj);
                       para.innerHTML = titleVal;
                     });
                  //  var sampleJson = sampleResponse();
                  //   var titleVal = parsePolarisMetadataResponse(sampleJson,'title');
                  //   para.innerHTML = titleVal;
                }
            }
        }
    });
}

function decoratePolarisTag(element){
    const polarisTag = '~polaris-tag~';
    element.querySelectorAll('p').forEach((para) => {
        if(polarisTag === para.innerHTML){
            console.log('found polaris tag');
            // get the assetid from the alt attribute of the nearest image tag above this html tag
            const closestImg = para.parentElement.querySelector('img');
            if(closestImg !== null) {
                const assetId = closestImg.getAttribute('alt')
                if (assetId && testAssetId(assetId)) {
                    console.log('asset id found : ', assetId);
                    fetchAssetMetadata(assetId).then(resp => {
                        console.log(resp);
                        var jsonStr = JSON.stringify(resp);
                        var jsonObj = JSON.parse(jsonStr);
                        var titleVal = parsePolarisTitleResponse(jsonObj);
                        para.innerHTML = titleVal;
                    });
                    //  var sampleJson = sampleResponse();
                    //   var titleVal = parsePolarisMetadataResponse(sampleJson,'title');
                    //   para.innerHTML = titleVal;
                }
            }
        }
    });
}


async function fetchAssetMetadata(assetId){
    const polarisMetadataApiEndPoint = 'https://polarisnew-dev-va7.stage.cloud.adobe.io/adobe/approvedassets/metadata/urn:aaid:aem:';
    const headers = {
        'x-sky-polaris-release': 'cm-p47604-e107386',
        'mode': 'no-cors'
    };
    var url = polarisMetadataApiEndPoint + assetId;
    const response = await fetch(url, { headers });
    const resp = await response.json();
    return resp;
}

function parsePolarisTitleResponse(jsonOutput) {
    if (jsonOutput) {
        var embeddedEle, attrVal;
        if (embeddedEle = jsonOutput['embedded']) {
            attrVal = embeddedEle['dc:title']
        }
    }
    return attrVal;
}

function parsePolarisTag(jsonOutput) {
    if (jsonOutput) {
        var jsonStr = JSON.stringify(jsonOutput);
        var jsonObj = JSON.parse(jsonOutput);
        var embeddedEle, attrVal;
        if (embeddedEle = jsonObj['embedded']) {
            attrVal = embeddedEle['dc:title']
        }
    }
    return attrVal;
}

function testAssetId(assetId){
    const re = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
    return re.test(assetId);
}

function sampleResponse(){
    return '{\n' +
        '  "embedded": {\n' +
        '    "xmp:CreatorTool": "Adobe Photoshop CC 2015 (Macintosh)",\n' +
        '    "dc:description": "Premium Black Green shoes",\n' +
        '    "exif:ExifVersion": "0221",\n' +
        '    "tiff:ImageLength": 1080,\n' +
        '    "exif:PixelYDimension": 1080,\n' +
        '    "tiff:ResolutionUnit": 2,\n' +
        '    "exif:ColorSpace": 65535,\n' +
        '    "xmpMM:DocumentID": "adobe:docid:photoshop:782c02b1-9dec-1178-9766-b63121e358c9",\n' +
        '    "exif:PixelXDimension": 1392,\n' +
        '    "dc:title": "Black Green shoes",\n' +
        '    "xmp:CreateDate": "java.util.GregorianCalendar[time=1439927440000,areFieldsSet=true,areAllFieldsSet=true,lenient=false,zone=sun.util.calendar.ZoneInfo[id=\\"GMT-07:00\\",offset=-25200000,dstSavings=0,useDaylight=false,transitions=0,lastRule=null],firstDayOfWeek=1,minimalDaysInFirstWeek=1,ERA=1,YEAR=2015,MONTH=7,WEEK_OF_YEAR=34,WEEK_OF_MONTH=4,DAY_OF_MONTH=18,DAY_OF_YEAR=230,DAY_OF_WEEK=3,DAY_OF_WEEK_IN_MONTH=3,AM_PM=1,HOUR=0,HOUR_OF_DAY=12,MINUTE=50,SECOND=40,MILLISECOND=0,ZONE_OFFSET=-25200000,DST_OFFSET=0]",\n' +
        '    "tiff:BitsPerSample": "[Ljava.lang.Long;@304c4591",\n' +
        '    "xmpMM:OriginalDocumentID": "1E2855B4C57F434DEAB84587923ED0D8",\n' +
        '    "xmp:ModifyDate": "java.util.GregorianCalendar[time=1442477020000,areFieldsSet=true,areAllFieldsSet=true,lenient=false,zone=sun.util.calendar.ZoneInfo[id=\\"GMT+02:00\\",offset=7200000,dstSavings=0,useDaylight=false,transitions=0,lastRule=null],firstDayOfWeek=1,minimalDaysInFirstWeek=1,ERA=1,YEAR=2015,MONTH=8,WEEK_OF_YEAR=38,WEEK_OF_MONTH=3,DAY_OF_MONTH=17,DAY_OF_YEAR=260,DAY_OF_WEEK=5,DAY_OF_WEEK_IN_MONTH=3,AM_PM=0,HOUR=10,HOUR_OF_DAY=10,MINUTE=3,SECOND=40,MILLISECOND=0,ZONE_OFFSET=7200000,DST_OFFSET=0]",\n' +
        '    "xmp:MetadataDate": "java.util.GregorianCalendar[time=1442509420000,areFieldsSet=true,areAllFieldsSet=true,lenient=false,zone=sun.util.calendar.ZoneInfo[id=\\"GMT-07:00\\",offset=-25200000,dstSavings=0,useDaylight=false,transitions=0,lastRule=null],firstDayOfWeek=1,minimalDaysInFirstWeek=1,ERA=1,YEAR=2015,MONTH=8,WEEK_OF_YEAR=38,WEEK_OF_MONTH=3,DAY_OF_MONTH=17,DAY_OF_YEAR=260,DAY_OF_WEEK=5,DAY_OF_WEEK_IN_MONTH=3,AM_PM=0,HOUR=10,HOUR_OF_DAY=10,MINUTE=3,SECOND=40,MILLISECOND=0,ZONE_OFFSET=-25200000,DST_OFFSET=0]",\n' +
        '    "tiff:SamplesPerPixel": 3,\n' +
        '    "tiff:XResolution": "300/1",\n' +
        '    "dc:modified": "java.util.GregorianCalendar[time=1452284643445,areFieldsSet=true,areAllFieldsSet=true,lenient=false,zone=sun.util.calendar.ZoneInfo[id=\\"GMT-08:00\\",offset=-28800000,dstSavings=0,useDaylight=false,transitions=0,lastRule=null],firstDayOfWeek=1,minimalDaysInFirstWeek=1,ERA=1,YEAR=2016,MONTH=0,WEEK_OF_YEAR=2,WEEK_OF_MONTH=2,DAY_OF_MONTH=8,DAY_OF_YEAR=8,DAY_OF_WEEK=6,DAY_OF_WEEK_IN_MONTH=2,AM_PM=1,HOUR=0,HOUR_OF_DAY=12,MINUTE=24,SECOND=3,MILLISECOND=445,ZONE_OFFSET=-28800000,DST_OFFSET=0]",\n' +
        '    "tiff:PhotometricInterpretation": 2,\n' +
        '    "tiff:Orientation": 1,\n' +
        '    "tiff:BitsPerSample_xmpArrayType": "rdf:Seq",\n' +
        '    "photoshop:ColorMode": 3,\n' +
        '    "tiff:ImageWidth": 1392,\n' +
        '    "xmpMM:InstanceID": "xmp.iid:7489f0e8-db42-4e4f-a4e0-5a0520a64f1e",\n' +
        '    "tiff:YResolution": "300/1"\n' +
        '  },\n' +
        '  "repository": {\n' +
        '    "repo:name": "Marin-test-product.jpg",\n' +
        '    "dc:format": "image/jpeg",\n' +
        '    "repo:createDate": "2022-11-25T09:09:38.952Z",\n' +
        '    "repo:modifyDate": "2022-11-25T09:10:08.185Z"\n' +
        '  },\n' +
        '  "application": {\n' +
        '    "dam:assetStatus": "approved",\n' +
        '    "xcm:keywords": [],\n' +
        '    "xcm:machineKeywords": [\n' +
        '      {\n' +
        '        "algorithm": "haystack",\n' +
        '        "localeCode": "en-US",\n' +
        '        "confidence": 0.8088300228118896,\n' +
        '        "value": "shoe"\n' +
        '      },\n' +
        '      {\n' +
        '        "algorithm": "haystack",\n' +
        '        "localeCode": "en-US",\n' +
        '        "confidence": 0.7855395078659058,\n' +
        '        "value": "isolated"\n' +
        '      },\n' +
        '      {\n' +
        '        "algorithm": "haystack",\n' +
        '        "localeCode": "en-US",\n' +
        '        "confidence": 0.766371488571167,\n' +
        '        "value": "shoes"\n' +
        '      },\n' +
        '      {\n' +
        '        "algorithm": "haystack",\n' +
        '        "localeCode": "en-US",\n' +
        '        "confidence": 0.7628973126411438,\n' +
        '        "value": "footwear"\n' +
        '      },\n' +
        '      {\n' +
        '        "algorithm": "haystack",\n' +
        '        "localeCode": "en-US",\n' +
        '        "confidence": 0.7544819712638855,\n' +
        '        "value": "white"\n' +
        '      },\n' +
        '      {\n' +
        '        "algorithm": "haystack",\n' +
        '        "localeCode": "en-US",\n' +
        '        "confidence": 0.7315770387649536,\n' +
        '        "value": "sport"\n' +
        '      },\n' +
        '      {\n' +
        '        "algorithm": "haystack",\n' +
        '        "localeCode": "en-US",\n' +
        '        "confidence": 0.7287770509719849,\n' +
        '        "value": "pair"\n' +
        '      },\n' +
        '      {\n' +
        '        "algorithm": "haystack",\n' +
        '        "localeCode": "en-US",\n' +
        '        "confidence": 0.7246720194816589,\n' +
        '        "value": "boot"\n' +
        '      },\n' +
        '      {\n' +
        '        "algorithm": "haystack",\n' +
        '        "localeCode": "en-US",\n' +
        '        "confidence": 0.7175112962722778,\n' +
        '        "value": "foot"\n' +
        '      },\n' +
        '      {\n' +
        '        "algorithm": "haystack",\n' +
        '        "localeCode": "en-US",\n' +
        '        "confidence": 0.7080768346786499,\n' +
        '        "value": "clothing"\n' +
        '      },\n' +
        '      {\n' +
        '        "algorithm": "haystack",\n' +
        '        "localeCode": "en-US",\n' +
        '        "confidence": 0.1,\n' +
        '        "value": "leather"\n' +
        '      },\n' +
        '      {\n' +
        '        "algorithm": "haystack",\n' +
        '        "localeCode": "en-US",\n' +
        '        "confidence": 0.6853979229927063,\n' +
        '        "value": "fashion"\n' +
        '      },\n' +
        '      {\n' +
        '        "algorithm": "haystack",\n' +
        '        "localeCode": "en-US",\n' +
        '        "confidence": 0.680280327796936,\n' +
        '        "value": "black"\n' +
        '      },\n' +
        '      {\n' +
        '        "algorithm": "haystack",\n' +
        '        "localeCode": "en-US",\n' +
        '        "confidence": 0.6724807024002075,\n' +
        '        "value": "background"\n' +
        '      },\n' +
        '      {\n' +
        '        "algorithm": "haystack",\n' +
        '        "localeCode": "en-US",\n' +
        '        "confidence": 0.6596642732620239,\n' +
        '        "value": "boots"\n' +
        '      },\n' +
        '      {\n' +
        '        "algorithm": "haystack",\n' +
        '        "localeCode": "en-US",\n' +
        '        "confidence": 0.6492326855659485,\n' +
        '        "value": "lace"\n' +
        '      },\n' +
        '      {\n' +
        '        "algorithm": "haystack",\n' +
        '        "localeCode": "en-US",\n' +
        '        "confidence": 0.6399837732315063,\n' +
        '        "value": "sports"\n' +
        '      },\n' +
        '      {\n' +
        '        "algorithm": "haystack",\n' +
        '        "localeCode": "en-US",\n' +
        '        "confidence": 0.6205569505691528,\n' +
        '        "value": "two"\n' +
        '      },\n' +
        '      {\n' +
        '        "algorithm": "haystack",\n' +
        '        "localeCode": "en-US",\n' +
        '        "confidence": 0.6082679629325867,\n' +
        '        "value": "rubber"\n' +
        '      },\n' +
        '      {\n' +
        '        "algorithm": "haystack",\n' +
        '        "localeCode": "en-US",\n' +
        '        "confidence": 0.6077027916908264,\n' +
        '        "value": "closeup"\n' +
        '      },\n' +
        '      {\n' +
        '        "algorithm": "haystack",\n' +
        '        "localeCode": "en-US",\n' +
        '        "confidence": 0.6038620471954346,\n' +
        '        "value": "sneakers"\n' +
        '      },\n' +
        '      {\n' +
        '        "algorithm": "haystack",\n' +
        '        "localeCode": "en-US",\n' +
        '        "confidence": 0.5995126366615295,\n' +
        '        "value": "male"\n' +
        '      },\n' +
        '      {\n' +
        '        "algorithm": "haystack",\n' +
        '        "localeCode": "en-US",\n' +
        '        "confidence": 0.5902497172355652,\n' +
        '        "value": "nobody"\n' +
        '      },\n' +
        '      {\n' +
        '        "algorithm": "haystack",\n' +
        '        "localeCode": "en-US",\n' +
        '        "confidence": 0.5892452001571655,\n' +
        '        "value": "equipment"\n' +
        '      },\n' +
        '      {\n' +
        '        "algorithm": "haystack",\n' +
        '        "localeCode": "en-US",\n' +
        '        "confidence": 0.5844595432281494,\n' +
        '        "value": "shoelace"\n' +
        '      }\n' +
        '    ]\n' +
        '  }\n' +
        '}';
}
