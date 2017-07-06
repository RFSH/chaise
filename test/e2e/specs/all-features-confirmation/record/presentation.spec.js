var chaisePage = require('../../../utils/chaise.page.js');
var recordHelpers = require('../../../utils/record-helpers.js');
var testParams = {
    table_name: "accommodation",
    key: {
        name: "id",
        value: "2002",
        operator: "="
    },
    title: "Sherathon Hotel",
    subTitle: "Accommodations",
    tables_order: ["booking (showing all 2 results)", "accommodation_image (showing first 2 results)", "media (no results found)"],
    related_table_name_with_page_size_annotation: "accommodation_image",
    page_size: 2,
    related_tables: [
        {
            title: "booking",
            displayname: "booking",
            columns: [ "id", "price", "booking_date" ],
            data: [
                { id: 3, price: 200.00, booking_date: "5/31/2016, 12:00:00 AM" },
                { id: 4, price: 350.00, booking_date: "4/18/2016, 12:00:00 AM" }
            ]
        },
        {
            title: "accommodation_image",
            displayname: "accommodation_image",
            columns: [ "id", "filename", "uri", "content_type", "bytes", "timestamp", "image_width", "image_height", "preview" ],
            data: [
                { id: 3005, filename: "Four Points Sherathon 1", uri: "http://images.trvl-media.com/hotels/1000000/30000/28200/28110/28110_190_z.jpg", content_type: "image/jpeg", bytes: 0, timestamp: "2016-01-18T00:00:00-08:00", image_width: null, image_height: null, preview: null },
                { id: 3006, filename: "Four Points Sherathon 2", uri: "http://images.trvl-media.com/hotels/1000000/30000/28200/28110/28110_190_z.jpg", content_type: "image/jpeg", bytes: 0, timestamp: "2016-06-05T00:00:00-07:00", image_width: null, image_height: null, preview: null }
            ]
        },
        {
            title: "media",
            displayname: "<strong>media</strong>",
            columns: [ "id" ],
            data: []
        }
    ],
    columns: [
        { title: "Id", value: "2002", type: "serial4"},
        { title: "Name of Accommodation", value: "Sherathon Hotel", type: "text"},
        { title: "Website", value: "<p><a href=\"http://www.starwoodhotels.com/sheraton/index.html\">Link to Website</a></p>\n", type: "text", comment : "A valid url of the accommodation"},
        { title: "Category", value: "Hotel", type: "text", comment: "Type of accommodation ('Resort/Hotel/Motel')", presentation: { type:"url", template: "{{{chaise_url}}}/record/#{{catalog_id}}/product-record:category/id=10003"} },
        { title: "User Rating", value: "4.3000", type: "float4", annotations: { "tag:misd.isi.edu,2015:display": { markdown_name: "<strong>User Rating</strong>"}} },
        { title: "Summary", value: "Sherathon Hotels is an international hotel company with more than 990 locations in 73 countries. The first Radisson Hotel was built in 1909 in Minneapolis, Minnesota, US. It is named after the 17th-century French explorer Pierre-Esprit Radisson.", type: "longtext"},
        { title: "Description", type: "markdown", value: "<p><strong>CARING. SHARING. DARING.</strong><br>\nRadisson<sup>®</sup> is synonymous with outstanding levels of service and comfort delivered with utmost style. And today, we deliver even more to make sure we maintain our position at the forefront of the hospitality industry now and in the future.<br>\nOur hotels are service driven, responsible, socially and locally connected and demonstrate a modern friendly attitude in everything we do. Our aim is to deliver our outstanding <code>Yes I Can!</code> <sup>SM</sup> service, comfort and style where you need us.</p>\n<p><strong>THE RADISSON<sup>®</sup> WAY</strong> Always positive, always smiling and always professional, Radisson people set Radisson apart. Every member of the team has a dedication to <code>Yes I Can!</code> <sup>SM</sup> hospitality – a passion for ensuring the total wellbeing and satisfaction of each individual guest. Imaginative, understanding and truly empathetic to the needs of the modern traveler, they are people on a special mission to deliver exceptional Extra Thoughtful Care.</p>\n"},
        { title: "Number of Rooms", value: "23", type: "int2"},
        { title: "Cover Image", value: "3,005", type: "int2", presentation: { type: "url", template: "{{{chaise_url}}}/record/#{{catalog_id}}/product-record:file/id=3005"} },
        { title: "Thumbnail", value: null, type: "int4"},
        { title: "Operational Since", value: "2008-12-09 00:00:00", type: "timestamptz" },
        { title: "Is Luxurious", value: "true", type: "boolean" },
        { title: "json_col", value:'<pre>'+JSON.stringify(null,undefined,2)+'</pre>'}
    ],
    no_related_data: {
        key: {
            name: "id",
            value: "4004",
            operator: "="
        },
        tables_order: ["booking (no results found)", "accommodation_image (no results found)", "media (no results found)"]
    }
};

describe('View existing record,', function() {

    describe("For table " + testParams.table_name + ",", function() {

        beforeAll(function() {
            var keys = [];
            keys.push(testParams.key.name + testParams.key.operator + testParams.key.value);
            browser.ignoreSynchronization=true;
            var url = browser.params.url + "/record/#" + browser.params.catalogId + "/product-record:" + testParams.table_name + "/" + keys.join("&");
            browser.get(url);
            var start = (new Date()).getTime();
            chaisePage.waitForElement(element(by.id('tblRecord'))).then(function() {
                console.log((new Date()).getTime() - start);
            });
        });

        it('should load document title defined in chaise-config.js and have deleteRecord=true', function() {
            browser.manage().logs().get('browser').then(function(browserLog) {
                browser.executeScript("return chaiseConfig;").then(function(chaiseConfig) {
                    expect(chaiseConfig.deleteRecord).toBe(true);
                    if (chaiseConfig.headTitle) {
                        browser.getTitle().then(function(title) {
                            expect(title).toEqual(chaiseConfig.headTitle);
                        });
                    }
                });
            });

        });

        describe("Presentation ,", function() {
            var params = recordHelpers.testPresentation(testParams);
        });

    });

    describe("For a record with all of it's related tables as empty", function() {

        beforeAll(function() {
            var keys = [];
            keys.push(testParams.no_related_data.key.name + testParams.no_related_data.key.operator + testParams.no_related_data.key.value);
            browser.ignoreSynchronization=true;
            var url = browser.params.url + "/record/#" + browser.params.catalogId + "/product-record:" + testParams.table_name + "/" + keys.join("&");
            browser.get(url);
            chaisePage.waitForElement(element(by.id('tblRecord')));
        });

        it("should show all of the related tables in the correct order.", function() {
            var showAllRTButton = chaisePage.recordPage.getShowAllRelatedEntitiesButton();

            browser.wait(function() {
                return chaisePage.recordPage.getRelatedTables().count().then(function(ct) {
                    return (ct=testParams.no_related_data.tables_order.length);
                });
            }, browser.params.defaultTimeout);

            chaisePage.recordPage.getRelatedTables().count().then(function(count) {
                expect(count).toBe(testParams.no_related_data.tables_order.length, "Number of related tables is not correct");

                return chaisePage.recordPage.getRelatedTableTitles();
            }).then(function(headings) {
                expect(headings).toEqual(testParams.no_related_data.tables_order, "Related tables in the wrong order or the name is wrong");

                expect(showAllRTButton.getText()).toBe("Hide Empty Related Records", "Sow all Related tables button has wrong text");
                return showAllRTButton.click();
            }).then(function() {
                expect(chaisePage.recordPage.getRelatedTables().count()).toBe(0, "Not all the related tables were hidden");
                expect(chaisePage.recordPage.getRelatedTables().count()).not.toBe(testParams.no_related_data.tables_order.length, "The full set of related tables were not properly hidden");
            })
        });
    });
});