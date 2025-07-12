/**
 * © 2025 Abhishek Suresh | GitHub: AbhishekSuresh2
 * This plugin is created by Abhishek Suresh.
 * Unauthorized copying or modification without proper credit is prohibited.
 * Contact: +919074692450
 */

const axios = require("axios");
const { bot } = require("../lib/");

bot(
  {
    pattern: "webscan ?(.*)",
    fromMe: true,
    desc: "Scan a website and give basic details",
    type: "tools",
  },
  async (message, match) => {
    if (!match) {
      return await message.send("_Enter a Url_\n_eg: *webscan https://google.com*_");
    }

    let url = match.trim();
    if (!url.startsWith("http")) {
      url = "https://" + url;
    }

    async function fetchStatus(websiteUrl) {
      try {
        const startTime = Date.now();
        const response = await axios.get(websiteUrl, { timeout: 5000 });
        const endTime = Date.now();
        const allowHeader = response.headers["allow"];
        const supportedMethods = allowHeader ? allowHeader : "GET (Default)";
        const contentType = response.headers["content-type"] || "Unknown";
        const server = response.headers["server"] || "Unknown";
        const contentLength = response.headers["content-length"]
          ? `${(response.headers["content-length"] / 1024).toFixed(2)} KB`
          : "Unknown";
        const pageTitle = response.data.match(/<title>(.*?)<\/title>/i);
        const metaDescription = response.data.match(
          /<meta\s+name=["']description["']\s+content=["'](.*?)["']/i
        );

        const statusMessage = `*🌐 Website Scan Results:*
        
---------------------------------
Online: Yes
Url: ${websiteUrl}
Method: ${supportedMethods}
Response Time: ${endTime - startTime} ms
Status Code: ${response.status}
Content Type: ${contentType}
Server: ${server}
Response Size: ${contentLength}
Page Title: ${pageTitle ? pageTitle[1] : "Not Available"}
Page Desc: ${metaDescription ? metaDescription[1] : "Not Available"}
---------------------------------`;

        await message.send(statusMessage);
      } catch (error) {
        if (websiteUrl.startsWith("https://")) {
          return fetchStatus("http://" + websiteUrl.split("https://")[1]);
        }
        await message.send(`*🌐 Website Scan Results:*

---------------------------------
Online: No
Url: ${websiteUrl}
Error: ${error.message}
---------------------------------`);
      }
    }

    fetchStatus(url);
  }
);