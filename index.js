console.log("Hello, World!")

const cheerio =  require("cheerio");
const axios =  require("axios");


async function performScrapping() {

    const axiosResponse = await axios.request({
        method: "GET",
        url: "https://brightdata.com",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
        },
    });

    return axiosResponse
}

performScrapping()

const $ = cheerio.load(axiosResponse.data)

const industryCards = $(".elementor-element-7a85e3a8").find(".e-container")


const industries = []

// scraping the "Learn how web data is used in your market" section
$(".elementor-element-7a85e3a8")
    .find(".e-container")
    .each((index, element) => {
        // extracting the data of interest
        const pageUrl = $(element).attr("href")
        const image = $(element).find(".elementor-image-box-img img").attr("data-lazy-src")
        const name = $(element).find(".elementor-image-box-content .elementor-image-box-title").text()

        // filtering out not interesting data
        if (name && pageUrl) {
            // converting the data extracted into a more
            // readable object
            const industry = {
                url: pageUrl,
                image: image,
                name: name
            }

            // adding the object containing the scraped data
            // to the industries array
            industries.push(industry)
        }
    });

    const marketLeaderReasons = []

// scraping the "What makes Bright Data
// the undisputed industry leader" section
$(".elementor-element-ef3e47e")
    .find(".elementor-widget")
    .each((index, element) => {
        const image = $(element).find(".elementor-image-box-img img").attr("data-lazy-src")
        const title = $(element).find(".elementor-image-box-title").text()
        const description = $(element).find(".elementor-image-box-description").text()

        const marketLeaderReason = {
            title: title,
            image: image,
            description: description,
        }

        marketLeaderReasons.push(marketLeaderReason)
    })

