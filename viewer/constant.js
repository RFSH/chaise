(function(){
    'use strict';

    angular.module('chaise.viewer')

    /**
     * TODO eventually this should be moved to a more configurable location,
     * either a standalone js file like chaise-config, or as part of the chaise-config file.
     * For now, we decided to have a centeral location for these constant without deciding how this should be configurable
     */
    .constant('viewerConstant', {
        osdViewer: {
            IMAGE_URL_QPARAM: "url",
            CHANNEL_NUMBER_QPARAM: "channelNumber",
            CHANNEL_NAME_QPARAM: "channelName",
            PSEUDO_COLOR_QPARAM: "pseudoColor",
            PIXEL_PER_METER_QPARAM: "meterScaleInPixels",
            WATERMARK_QPARAM: "waterMark",
            IS_RGB_QPARAM: "isRGB",
            CHANNEL_QPARAMS: [
                "aliasName", "channelName", "pseudoColor", "isRGB"
            ],
            OTHER_QPARAMS: [
                "waterMark", "meterScaleInPixels", "scale", "x", "y", "z",
                "ignoreReferencePoint", "ignoreDimension", "enableSVGStrokeWidth", "zoomLineThickness"
            ]
        },
        image: {
            URI_COLUMN_NAME: "uri",
            DEFAULT_Z_INDEX_COLUMN_NAME: "Default_Z", // the default value of the zindex in the form

            // what should be displayed in the head title (the browser tab)
            HEAD_TITLE_MARKDOWN_PATTERN: "",

            // what should be displayed in the page title
            PAGE_TITLE_MARKDOWN_PATTERN: "",

            // used for meterScaleInPixels qparam
            PIXEL_PER_METER_COLUMN_NAME: "Pixels_Per_Meter",

            // used for watermark
            CONSORTIUM_VISIBLE_COLUMN_NAME: "Pq797msQqRnD3Je3Jp01HQ",
            CONSORTIUM_URL_COLUMN_NAME: "URL"
        },
        processedImage: {
            // how many at a time should we read from database
            PAGE_SIZE: 25,

            PROCESSED_IMAGE_TABLE_SCHEMA_NAME: "Gene_Expression",
            PROCESSED_IMAGE_TABLE_NAME: "Processed_Image",

            // the sort criteria
            COLUMN_ORDER: [{
                "column": "Z_Index",
                "descending": false
            }, {
                "column": "Channel_Number",
                "descending": false
            }],

            // where to filter based on z_index and the iamge
            Z_INDEX_COLUMN_NAME: "Z_Index",
            REFERENCE_IMAGE_COLUMN_NAME: "Reference_Image",

            // the data used in this table
            IMAGE_URL_COLUMN_NAME: "File_URL",
            CHANNEL_NUMBER_COLUMN_NAME: "Channel_Number",
            DISPLAY_METHOD_COLUMN_NAME: "Display_Method",

            //{"source": [{"outbound": ["Gene_Expression", "Processed_Image_Reference_Image_Channel_Number_fkey"]}, "RID"], "entity": true}
            // CHANNEL_VISIBLE_COLUMN_NAME: "AeweZsAMVSdW7Vf91boEfw",


            // how to generate the url
            IIIF_VERSION: "2",
            IMAGE_URL_PATTERN: {
                "iiif": "/iiif/{{{iiif_version}}}/{{#encode url}}{{/encode}}/info.json"
            }

        },
        channel: {
            // how many channels at a time should we read from database
            PAGE_SIZE: 25,

            CHANNEL_TABLE_NAME: "Image_Channel",
            CHANNE_TABLE_SCHEMA_NAME: "Gene_Expression",

            // the sort criteria
            CHANNEL_TABLE_COLUMN_ORDER: [{
                "column": "Channel_Number",
                "descending": false
            }],

            CHANNEL_NUMBER_COLUMN_NAME: "Channel_Number",
            REFERENCE_IMAGE_COLUMN_NAME: "Image",
            CHANNEL_NAME_COLUMN_NAME: "Name",
            PSEUDO_COLOR_COLUMN_NAME: "Pseudo_Color",
            IS_RGB_COLUMN_NAME: "Is_RGB",
            IMAGE_URL_COLUMN_NAME: "Image_URL"

        },
        annotation: {
            // how much should we wait for user action and then log
            SEARCH_LOG_TIMEOUT: 2000,
            LINE_THICKNESS_LOG_TIMEOUT: 1000,

            // how many annotations at a time should we read from database
            PAGE_SIZE: 25,

            // annotation table
            ANNOTATION_TABLE_NAME: "Image_Annotation",
            ANNOTATION_TABLE_SCHEMA_NAME: "Gene_Expression",

            // fk to image table in annotation table
            REFERENCE_IMAGE_VISIBLE_COLUMN_NAME: "okfHjL8_zZzvahdjNJjz-Q",
            REFERENCE_IMAGE_COLUMN_NAME: "Image",
            // the asset column that has the annotation
            OVERLAY_COLUMN_NAME: "File_URL",
            OVERLAY_HATRAC_PATH: "resources/gene_expression/annotations",

            // used internally and should be removed from the form
            Z_INDEX_COLUMN_NAME: "Z_Index", // used for fetching annotations
            CHANNELS_COLUMN_NAME: "Channels",

            // anatomy fk in annotation table
            ANNOTATED_TERM_DISPLAYNAME: "Anatomy",
            ANNOTATED_TERM_COLUMN_NAME: "Anatomy",
            ANNOTATED_TERM_VISIBLE_COLUMN_NAME: "Y7oiVf4tLQPtUWQRrtF-KQ",
            ANNOTATED_TERM_FOREIGN_KEY_CONSTRAINT: ["Gene_Expression", "Image_Annotation_Anatomy_fkey"],

            // anatomy table
            ANNOTATED_TERM_TABLE_NAME: "Anatomy",
            ANNOTATED_TERM_TABLE_SCHEMA_NAME: "Vocabulary",
            ANNOTATED_TERM_ID_COLUMN_NAME: "ID",
            ANNOTATED_TERM_NAME_COLUMN_NAME: "Name"
        }
    })
})();
