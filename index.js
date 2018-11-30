const fetch = require('node-fetch');

var qEtoName = {"Q1204":"Illinois","Q812":"Florida","Q824":"Oregon","Q797":"Alaska","Q1166":"Michigan","Q816":"Arizona","Q782":"Hawaii","Q829":"Utah","Q1207":"North Dakota","Q1223":"Washington","Q1212":"Montana","Q1227":"Nevada","Q1214":"Wyoming","Q1261":"Colorado","Q1221":"Idaho","Q1211":"South Dakota","Q1370":"Virginia","Q1387":"Rhode Island","Q1384":"New York","Q1397":"Ohio","Q1371":"West Virginia","Q1391":"Maryland","Q1400":"Pennsylvania","Q1393":"Delaware","Q1494":"Mississippi","Q1522":"New Mexico","Q1558":"Kansas","Q1509":"Tennessee","Q1546":"Iowa","Q1527":"Minnesota","Q1537":"Wisconsin","Q1553":"Nebraska","Q771":"Massachusetts","Q1428":"Georgia","Q724":"Maine","Q1454":"North Carolina","Q173":"Alabama","Q1439":"Texas","Q1603":"Kentucky","Q1581":"Missouri","Q99":"California","Q1456":"South Carolina","Q16551":"Vermont","Q1415":"Indiana","Q1588":"Louisiana","Q1612":"Arkansas","Q759":"New Hampshire","Q779":"Connecticut","Q1649":"Oklahoma","Q1408":"New Jersey"}

var urls = [["Q1166",9285758.857142856],["Q1204",11737453.42857143],["Q1207",659063.1428571428],["Q1211",737183.7142857143],["Q1212",839927.1428571428],["Q1214",503765.9090909091],["Q1221",1120986.7142857143],["Q1223",5007177.571428572],["Q1227",1480856.4285714286],["Q1261",3561799.285714286],["Q1370",6230307.285714285],["Q1371",1836177.857142857],["Q1384",18388306.85714286],["Q1387",987716.4285714285],["Q1391",4878348],["Q1393",697481.4285714285],["Q1397",10929460.857142856],["Q1400",12092107],["Q1408",7929835.375],["Q1415",5724931],["Q1428",6937568.285714285],["Q1439",17922657.57142857],["Q1454",7110887.857142857],["Q1456",3587879.285714286],["Q1494",2613313.5714285714],["Q1509",5084966.857142857],["Q1522",1535474.2857142857],["Q1527",4483271.714285715],["Q1537",4969863.142857143],["Q1546",2909864.8571428573],["Q1553",1639546.7142857143],["Q1558",2531374.1428571427],["Q1581",5242554.714285715],["Q1588",4142467.5714285714],["Q1603",3772737.5714285714],["Q1612",2416321.285714286],["Q1649",3194414.4285714286],["Q16551",538433.5714285715],["Q173",4104456.4285714286],["Q724",1178073.2857142857],["Q759",1036761.1428571428],["Q771",6040336.857142857],["Q779",3218883.285714286],["Q782",1110218.5],["Q797",507719.71428571426],["Q812",12782887.57142857],["Q816",3972459.714285714],["Q824",2945278.285714286],["Q829",1875251.4285714286],["Q99",29827337.5]]

var finalData = []

urls.reduce(
            (p, x) => p.then(_ => {
                return new Promise((resolve) => {
                    const qE = x[0]
                    const popE = x[1]
                    fetch("https://query.wikidata.org/sparql?format=json&query=PREFIX%20xsd%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0A%0A%23added%20before%202016-10%0ASELECT%20%28COUNT%28%3Fitem%29%20AS%20%3Fcount%29%20WHERE%20%7B%0A%20%20%3Fitem%20wdt%3AP31%20wd%3AQ5.%0A%20%20%3Fitem%20wdt%3AP569%20%3Fborn.%0A%20%20%3Fitem%20wdt%3AP19%20%3Fpob.%0A%20%20%3Fpob%20wdt%3AP131%2a%20wd%3A" + qE + ".%0A%20%20FILTER%28%3Fborn%20%3E%3D%20%221960-01-01T00%3A00%3A00Z%22%5E%5Exsd%3AdateTime%29%0A%7D")
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {
var wikiPeople = +(((((data || {}).results || {}).bindings || {})[0] || {}).count || {}).value
console.debug(qEtoName[qE], wikiPeople, popE, wikiPeople/popE)
                            finalData.push([qEtoName[qE], wikiPeople, popE, wikiPeople/popE])
                            resolve()
                        })
                        .catch((error) => {
                            console.debug(error, 'Promise error')
                            resolve()
                        });
                })
            } ),
            Promise.resolve()
        )
            .then(() => {
                console.debug(JSON.stringify(finalData))
            })
