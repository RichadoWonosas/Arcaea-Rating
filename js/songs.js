const difficulty = ["?", "1", "2", "3", "4", "5", "6", "7", "8", "9", "9+", "10", "10+", "11"];
const diffNumber = [
    0.0,
    1.2, 1.5, 1.8, 2.2, 2.5, 2.8, 3.2, 3.5, 3.8,
    4.2, 4.5, 4.8, 5.2, 5.5, 5.8, 6.2, 6.5, 6.8,
    7.2, 7.5, 7.8, 8.2, 8.5, 8.8, 9.2, 9.5, 9.8,
    10.2, 10.5, 10.8, 11.2, 11.5, 11.8
];
const diffString = [
    "?",
    "1-", "1=", "1+", "2-", "2=", "2+", "3-", "3=", "3+",
    "4-", "4=", "4+", "5-", "5=", "5+", "6-", "6=", "6+",
    "7-", "7=", "7+", "8-", "8=", "8+", "9-", "9=", "9+",
    "10-", "10=", "10+", "11-", "11=", "11+"
];

class songFrame extends HTMLElement {

    constructor() {
        super();

        //Create shadow root
        let shadow = this.attachShadow({ mode: "open" });
        let mainFrame = document.createElement("table");
        mainFrame.setAttribute("class", "main_frame");
        mainFrame.setAttribute("onchange", "song_change()");

        let imageRow = document.createElement("tr");
        imageRow.setAttribute("class", "cover_row");

        let imageCol = document.createElement("td");
        imageCol.setAttribute("colspan", "4");

        let coverLink = document.createElement("a");
        coverLink.setAttribute("class", "link");
        coverLink.setAttribute("target", "_blank");
        if (this.hasAttribute("href"))
            coverLink.setAttribute("href", this.getAttribute("href"));
        else if (this.hasAttribute("link"))
            coverLink.setAttribute("href", this.getAttribute("link"));

        let cover = document.createElement("img");
        cover.setAttribute("class", "cover");
        if (this.hasAttribute("img"))
            cover.setAttribute("src", this.getAttribute("img"));
        else if (this.hasAttribute("cover"))
            cover.setAttribute("src", this.getAttribute("cover"));
        else if (this.hasAttribute("image"))
            cover.setAttribute("src", this.getAttribute("image"));
        else
            cover.setAttribute("src", "src/cover/default.jpg");

        let titleRow = document.createElement("tr");
        titleRow.setAttribute("id", "title_row");

        let titleCol = document.createElement("th");
        titleCol.setAttribute("colspan", "4");
        titleCol.setAttribute("class", "song_title");

        let titleLink = document.createElement("a");
        titleLink.setAttribute("class", "link");
        titleLink.setAttribute("target", "_blank");
        if (this.hasAttribute("href"))
            titleLink.setAttribute("href", this.getAttribute("href"));
        else if (this.hasAttribute("link"))
            titleLink.setAttribute("href", this.getAttribute("link"));
        if (this.hasAttribute("song-title"))
            titleLink.textContent = this.getAttribute("song-title");
        else if (this.hasAttribute("song"))
            titleLink.textContent = this.getAttribute("song");
        else
            titleLink.textContent = "Unknown Song";

        let diffRow = document.createElement("tr");

        let diffType = document.createElement("th");
        diffType.setAttribute("class", "diff_title");
        diffType.setAttribute("colspan", "2");
        let diff = "";
        if (this.hasAttribute("diff"))
            diff = this.getAttribute("diff");
        else if (this.hasAttribute("difficulty"))
            diff = this.getAttribute("difficulty");
        switch (diff) {
            case "0":
            case "pst":
            case "PST":
            case "past":
            case "PAST":
                diff = "PST";
                break;

            case "1":
            case "prs":
            case "PRS":
            case "present":
            case "PRESENT":
                diff = "PRS";
                break;

            default:
            case "2":
            case "ftr":
            case "FTR":
            case "future":
            case "FUTURE":
                diff = "FTR";
                break;

            case "3":
            case "byn":
            case "BYN":
            case "byd":
            case "BYD":
            case "beyond":
            case "BEYOND":
                diff = "BYN";
                break;
        }
        diffType.textContent = diff;

        let diffRating = document.createElement("td");
        diffRating.setAttribute("class", "diff_rating");
        diffRating.setAttribute("colspan", "2");
        let rating = "?";
        if (this.hasAttribute("rating"))
            rating = this.getAttribute("rating");
        else if (this.hasAttribute("diff-rating"))
            rating = this.getAttribute("diff-rating");
        else if (this.hasAttribute("difficulty-rating"))
            rating = this.getAttribute("difficulty-rating");
        if (difficulty.indexOf(rating) < 0)
            rating = "?";
        diffRating.textContent = rating;

        let PTTRow = document.createElement("tr");

        let PTTBaseName = document.createElement("th");
        PTTBaseName.setAttribute("class", "content_title");
        PTTBaseName.textContent = "Base PTT";

        let PTTBase = document.createElement("td");
        PTTBase.setAttribute("class", "rating");
        PTTBase.setAttribute("id", "ptt_rating");
        let ptt = "0.0";
        if (this.hasAttribute("base"))
            ptt = this.getAttribute("base");
        else if (this.hasAttribute("ptt"))
            ptt = this.getAttribute("ptt");
        else if (this.hasAttribute("ptt-base"))
            ptt = this.getAttribute("ptt-base");
        PTTBase.textContent = ptt;

        let ratingRow = document.createElement("tr");
        ratingRow.setAttribute("class", "rating_row");

        let tapRating = document.createElement("td");
        tapRating.setAttribute("class", "rating");
        tapRating.setAttribute("id", "tap_rating");
        let tapStr = "?";
        let tapNum = 0.0;
        if (this.hasAttribute("tap"))
            tapStr = this.getAttribute("tap");
        if (this.hasAttribute("tap-rating"))
            tapStr = this.getAttribute("tap-rating");
        if (diffString.indexOf(tapStr) < 0)
            tapStr = "?";
        tapNum = diffNumber[diffString.indexOf(tapStr)];
        let tapDfn = document.createElement("dfn");
        tapDfn.setAttribute("title", "Tap Rating");
        tapDfn.textContent = tapStr;

        let moveRating = document.createElement("td");
        moveRating.setAttribute("class", "rating");
        moveRating.setAttribute("id", "move_rating");
        let moveStr = "?";
        let moveNum = 0.0;
        if (this.hasAttribute("move"))
            moveStr = this.getAttribute("move");
        if (this.hasAttribute("move-rating"))
            moveStr = this.getAttribute("move-rating");
        if (diffString.indexOf(moveStr) < 0)
            moveStr = "?";
        moveNum = diffNumber[diffString.indexOf(moveStr)];
        let moveDfn = document.createElement("dfn");
        moveDfn.setAttribute("title", "Move Rating");
        moveDfn.textContent = moveStr;

        let arcRating = document.createElement("td");
        arcRating.setAttribute("class", "rating");
        arcRating.setAttribute("id", "arc_rating");
        let arcStr = "?";
        let arcNum = 0.0;
        if (this.hasAttribute("arc"))
            arcStr = this.getAttribute("arc");
        if (this.hasAttribute("arc-rating"))
            arcStr = this.getAttribute("arc-rating");
        if (diffString.indexOf(arcStr) < 0)
            arcStr = "?";
        arcNum = diffNumber[diffString.indexOf(arcStr)];
        let arcDfn = document.createElement("dfn");
        arcDfn.setAttribute("title", "Arc Rating");
        arcDfn.textContent = arcStr;

        let techRating = document.createElement("td");
        techRating.setAttribute("class", "rating");
        techRating.setAttribute("id", "tech_rating");
        let techStr = "?";
        let techNum = 0.0;
        if (this.hasAttribute("tech"))
            techStr = this.getAttribute("tech");
        if (this.hasAttribute("tech-rating"))
            techStr = this.getAttribute("tech-rating");
        if (diffString.indexOf(techStr) < 0)
            techStr = "?";
        techNum = diffNumber[diffString.indexOf(techStr)];
        let techDfn = document.createElement("dfn");
        techDfn.setAttribute("title", "Tech Rating");
        techDfn.textContent = techStr;

        let avrRatingName = document.createElement("th");
        avrRatingName.setAttribute("class", "content_title");
        avrRatingName.setAttribute("id", "avr_rating_name");
        avrRatingName.textContent = "Avr. Rating";

        let avrRating = document.createElement("td");
        avrRating.setAttribute("class", "rating");
        avrRating.setAttribute("id", "avr_rating");
        let average = Math.sqrt(
            1.04 * tapNum * tapNum +
            1.04 * moveNum * moveNum +
            0.88 * arcNum * arcNum +
            1.04 * techNum * techNum
        ) / 2;
        avrRating.textContent = average.toFixed(4);

        let style = document.createElement("style");
        style.textContent = `
        .main_frame {
            position: relative;
            width: 16em;
            float: left;
            border: 2px solid blue;
            margin: 0.5em;
            color: #333333;
            background-color: rgba(204, 204, 255, 0.6);
            transition: all 0.6s;
            font-size: 0.72em;
            font-weight: 300;
            border-spacing: 0.25em;
        }
        .main_frame tr {
            height: 0%;
        }
        .cover_row {
            text-align: center;
        }
        .link {
            text-decoration: none;
            color: inherit;
        }
        .cover {
            width: 95%;
            position: center;
        }
        #title_row {
            height: 5.4em;
        }
        .song_title {
            font-size: 1.25em;
            font-weight: 900;
        }
        .main_frame th, .main_frame td {
            border: 1px solid purple;
            border-spacing: 2.5%;
            width: 22.5%;
            height: 0em;
        }
        .rating_row {
            transition-duration: 0.6s;
            transform: scale(1, 0);
            transform-origin: 50% 0%;

            -o-transition-duration: 0.6s;
            -o-transform: scale(1, 0);
            -o-transform-origin: 50% 0%;

            -ms-transition-duration: 0.6s;
            -ms-transform: scale(1, 0);
            -ms-transform-origin: 50% 0%;

            -moz-transition-duration: 0.6s;
            -moz-transform: scale(1, 0);
            -moz-transform-origin: 50% 0%;

            -webkit-transition-duration: 0.6s;
            -webkit-transform: scale(1, 0);
            -webkit-transform-origin: 50% 0%;
        }
        .main_frame:hover .rating_row, .main_frame:focus .rating_row {
            transform: scale(1, 1);
            transform-origin: 50% 0%;

            -o-transform: scale(1, 1);
            -o-transform-origin: 50% 0%;

            -ms-transform: scale(1, 1);
            -ms-transform-origin: 50% 0%;

            -moz-transform: scale(1, 1);
            -moz-transform-origin: 50% 0%;

            -webkit-transform: scale(1, 1);
            -webkit-transform-origin: 50% 0%;
        }
        .rating {
            text-align: center;
        }
        .diff_rating {
            text-align: left;
        }
        `;

        shadow.appendChild(style);
        shadow.appendChild(mainFrame);
        mainFrame.appendChild(imageRow);
        imageRow.appendChild(imageCol);
        imageCol.appendChild(coverLink);
        coverLink.appendChild(cover);
        mainFrame.appendChild(titleRow);
        titleRow.appendChild(titleCol);
        titleCol.appendChild(titleLink);
        mainFrame.appendChild(diffRow);
        diffRow.appendChild(diffType);
        diffRow.appendChild(diffRating);
        mainFrame.appendChild(PTTRow);
        PTTRow.appendChild(PTTBaseName);
        PTTRow.appendChild(PTTBase);
        PTTRow.appendChild(avrRatingName);
        PTTRow.appendChild(avrRating);
        mainFrame.appendChild(ratingRow);
        ratingRow.appendChild(tapRating);
        tapRating.appendChild(tapDfn);
        ratingRow.appendChild(moveRating);
        moveRating.appendChild(moveDfn);
        ratingRow.appendChild(arcRating);
        arcRating.appendChild(arcDfn);
        ratingRow.appendChild(techRating);
        techRating.appendChild(techDfn);
    }

}

customElements.define("song-frame", songFrame);
