function compareByAvrRatingDown(element1, element2) {
    if (element1.avr <= element2.avr)
        return 1;
    else
        return -1;
}

function compareByAvrRatingUp(element1, element2) {
    if (element1.avr >= element2.avr)
        return 1;
    else
        return -1;
}

function compareByTapRatingDown(element1, element2) {
    if (element1.tapNum < element2.tapNum)
        return 1;
    else if (element1.tapNum > element2.tapNum)
        return -1;
    else
        return compareByAvrRatingDown(element1, element2);
}

function compareByTapRatingUp(element1, element2) {
    if (element1.tapNum > element2.tapNum)
        return 1;
    else if (element1.tapNum < element2.tapNum)
        return -1;
    else
        return compareByAvrRatingUp(element1, element2);
}

function compareByMoveRatingDown(element1, element2) {
    if (element1.moveNum < element2.moveNum)
        return 1;
    else if (element1.moveNum > element2.moveNum)
        return -1;
    else
        return compareByAvrRatingDown(element1, element2);
}

function compareByMoveRatingUp(element1, element2) {
    if (element1.moveNum > element2.moveNum)
        return 1;
    else if (element1.moveNum < element2.moveNum)
        return -1;
    else
        return compareByAvrRatingUp(element1, element2);
}

function compareByArcRatingDown(element1, element2) {
    if (element1.arcNum < element2.arcNum)
        return 1;
    else if (element1.arcNum > element2.arcNum)
        return -1;
    else
        return compareByAvrRatingDown(element1, element2);
}

function compareByArcRatingUp(element1, element2) {
    if (element1.arcNum > element2.arcNum)
        return 1;
    else if (element1.arcNum < element2.arcNum)
        return -1;
    else
        return compareByAvrRatingUp(element1, element2);
}

function compareByTechRatingDown(element1, element2) {
    if (element1.techNum < element2.techNum)
        return 1;
    else if (element1.techNum > element2.techNum)
        return -1;
    else
        return compareByAvrRatingDown(element1, element2);
}

function compareByTechRatingUp(element1, element2) {
    if (element1.techNum > element2.techNum)
        return 1;
    else if (element1.techNum < element2.techNum)
        return -1;
    else
        return compareByAvrRatingUp(element1, element2);
}

var compareDown = [compareByAvrRatingDown, compareByTapRatingDown, compareByMoveRatingDown, compareByArcRatingDown, compareByTechRatingDown];
var compareUp = [compareByAvrRatingUp, compareByTapRatingUp, compareByMoveRatingUp, compareByArcRatingUp, compareByTechRatingUp];
var compare = [compareDown, compareUp];

var songlist;
var songs = [];
var sortOrder = 0;
var sortBy = 0;

function resort() {
    let root = document.getElementById("song_rating").shadowRoot;
    sortOrder = root.getElementById("order").options.selectedIndex;
    sortBy = root.getElementById("type").options.selectedIndex;

    songs.sort(compare[sortOrder][sortBy]);

    let songCol = root.getElementById("song_column");
    songCol.innerHTML = "";

    for (let i = 0; i < songs.length; i++) {
        songCol.innerHTML +=
            "<song-frame song=\"" + songs[i].song +
            "\" cover=\"src/cover/" + songs[i].id + ".jpg" +
            "\" href=\"https://wiki.arcaea.cn/index.php/" + songs[i].song +
            "\" diff=\"" + songs[i].diff +
            "\" rating=\"" + songs[i].rating +
            "\" ptt=\"" + songs[i].ptt +
            "\" tap=\"" + songs[i].tap +
            "\" move=\"" + songs[i].move +
            "\" arc=\"" + songs[i].arc +
            "\" tech=\"" + songs[i].tech + "\"></song-frame>";
    }
}

class songRatingTable extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({ mode: "open" });

        let style = document.createElement("style");
        style.textContent = `
        #diff_table {
            width: 80%;
            background-color: rgba(255, 255, 255, 0.6);
        }
        .title-row {
            font-size: 2.5em;
        }
        #sorting_row {
            text-align: center;
        }
        .select-box {
            font-family: "FOT-Skip";
            font-size: 1em;
            height: 2.5em;
        }
        `;

        let root = document.createElement("table");
        root.setAttribute("id", "diff_table");

        let title = document.createElement("tr");
        title.setAttribute("class", "title-row");
        title.setAttribute("id", "title_row");
        let titleContent = document.createElement("th");
        titleContent.setAttribute("class", "table-title");
        titleContent.setAttribute("id", "table_title");
        titleContent.setAttribute("colspan", "2");
        titleContent.textContent = "Difficulty Rating Table";

        let choise = document.createElement("tr");
        choise.setAttribute("class", "content-row");
        choise.setAttribute("id", "sorting_row");

        let choiseCol = document.createElement("td");
        choiseCol.setAttribute("class", "table-content");
        choiseCol.setAttribute("id", "sorting_method");
        choiseCol.setAttribute("colspan", "2");

        let orderName = document.createElement("span");
        orderName.setAttribute("class", "small-title");
        orderName.textContent = "Sort order: ";

        let order = document.createElement("select");
        order.setAttribute("class", "select-box");
        order.setAttribute("id", "order");
        order.setAttribute("onchange", "resort()");
        order.innerHTML = `
        <option value="0" selected="selected">From big to small</option>
        <option value="1">From small to big</option>
        `;

        let typeName = document.createElement("span");
        typeName.setAttribute("class", "small-title");
        typeName.textContent = " Sort by: ";

        let type = document.createElement("select");
        type.setAttribute("class", "select-box");
        type.setAttribute("id", "type");
        type.setAttribute("onchange", "resort()");
        type.innerHTML = `
        <option value="0" selected="selected">Average Difficulty Rating</option>
        <option value="1">Tap Difficulty Rating</option>
        <option value="2">Movement Difficulty Rating</option>
        <option value="3">Arc Difficulty Rating</option>
        <option value="4">Technique Difficulty Rating</option>
        `;

        shadow.appendChild(style);
        shadow.appendChild(root);
        root.appendChild(title);
        title.appendChild(titleContent);
        root.appendChild(choise);
        choise.appendChild(choiseCol);
        choiseCol.appendChild(orderName);
        choiseCol.appendChild(order);
        choiseCol.appendChild(typeName);
        choiseCol.appendChild(type);
        songs.sort(compare[sortOrder][sortBy]);

        let songRow = document.createElement("tr");
        songRow.setAttribute("class", "diff-row");
        songRow.setAttribute("id", "song_row");

        let songTitle = document.createElement("td");
        songTitle.setAttribute("class", "table-content");
        songTitle.setAttribute("id", "song_title");
        songTitle.textContent = "Songs";

        let songCol = document.createElement("td");
        songCol.setAttribute("class", "table-content");
        songCol.setAttribute("id", "song_column");

        root.appendChild(songRow);
        songRow.appendChild(songTitle);
        songRow.appendChild(songCol);

        for (let i = 0; i < songs.length; i++) {
            songCol.innerHTML +=
                "<song-frame song=\"" + songs[i].song +
                "\" cover=\"src/cover/" + songs[i].id + ".jpg" +
                "\" href=\"https://wiki.arcaea.cn/index.php/" + songs[i].song +
                "\" diff=\"" + songs[i].diff +
                "\" rating=\"" + songs[i].rating +
                "\" ptt=\"" + songs[i].ptt +
                "\" tap=\"" + songs[i].tap +
                "\" move=\"" + songs[i].move +
                "\" arc=\"" + songs[i].arc +
                "\" tech=\"" + songs[i].tech + "\"></song-frame>";
        }
    }

}

{
    songlist = JSON.parse(songlistText);
    let i = 0;
    for (i = 0; i < songlist.length; i++) {
        let single = songlist[i];
        let var1 = {
            tap: (diffString.indexOf(single.tap) < 0) ? "?" : single.tap,
            move: (diffString.indexOf(single.move) < 0) ? "?" : single.move,
            arc: (diffString.indexOf(single.arc) < 0) ? "?" : single.arc,
            tech: (diffString.indexOf(single.tech) < 0) ? "?" : single.tech
        };
        let var2 = {
            tapNum: diffNumber[diffString.indexOf(var1.tap)],
            moveNum: diffNumber[diffString.indexOf(var1.move)],
            arcNum: diffNumber[diffString.indexOf(var1.arc)],
            techNum: diffNumber[diffString.indexOf(var1.tech)]
        };
        let var3 = {
            avr: Math.sqrt(
                0.26 * (var2.tapNum ** 2) +
                0.26 * (var2.moveNum ** 2) +
                0.22 * (var2.arcNum ** 2) +
                0.26 * (var2.techNum ** 2))
        };
        songs.push({
            id: single.id,
            song: single.song,
            diff: single.diff,
            ptt: single.ptt,
            rating: (difficulty.indexOf(single.rating) < 0) ? "?" : single.rating,
            tap: var1.tap,
            move: var1.move,
            arc: var1.arc,
            tech: var1.tech,
            tapNum: var2.tapNum,
            moveNum: var2.moveNum,
            arcNum: var2.arcNum,
            techNum: var2.techNum,
            avr: var3.avr
        });
        console.log("Song loaded, id = \"" + single.id + "\"");
    }
    songs.sort(compare[0][0]);
    customElements.define("song-rating-table", songRatingTable);
}