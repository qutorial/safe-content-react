
function allowedTags(): string[] {
    return ['p', 'i', 'em', 'table', 'tr', 'td', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'ul', 'li', 'ol', 'b'];
}

function startTag(child: HTMLElement | null) {
    if (child == null) {
        return "";
    }
    var tagName = child.tagName.toLowerCase();
    if (allowedTags().indexOf(tagName) > -1) {
        return "<" + tagName + ">";
    }
    return "";
}

function endTag(child: HTMLElement | null) {
    if (child == null) {
        return "";
    }
    var tagName = child.tagName.toLowerCase();
    if (allowedTags().indexOf(tagName) > -1) {
        return "</" + tagName + ">";
    }
    return "";
}


function textOf(child: ChildNode) {
    return child.textContent;
}


function textExtractor(child: HTMLElement | null, depth: number) {
    if (child == null) {
        return "";
    }

    console.log("Text extractor for ", child);

    var textSoFar = startTag(child);

    var gc = child.firstChild;
    while (gc) {
        if (gc.nodeType == 3) {
            console.log("Type 3, taking text", gc);
            textSoFar += gc.textContent;
            console.log("Text so far:", textSoFar);
        } else if (gc.nodeType == 1) {
            console.log("Descending to type 1", gc)
            textSoFar += textExtractor(gc as HTMLElement, depth - 1);
            console.log("Back from type 1", textSoFar);
        }
        gc = gc.nextSibling;
    }

    console.log("End tag for ", child, " is ", endTag(child));

    return textSoFar + endTag(child);

}

export function safeContent(s: string | undefined): string {
    try {
        var parser = new DOMParser();
        var htmlDoc: HTMLDocument = parser.parseFromString(s || "", "text/html");
        return textExtractor(htmlDoc.documentElement.querySelector("body"), 5);
    } catch {
        return "";
    }
}
