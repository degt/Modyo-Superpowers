var $button = $('<button id="foldCodeMirror" class="btn btn-default margin-r-xs"><i class="mdi mdi-unfold-less"></i></button>');
setTimeout(function() {
    $('.page-actions').prepend($button);
}, 2000);

$button.click(function(evt) {
    var cm = $('.CodeMirror')[0].CodeMirror;
    foldByLevel(cm, 1);
});

foldByLevel = function(cm, level) {
    foldByNodeOrder(cm, 0);
    // initialize vars
    var cursor = cm.getCursor();
    cursor.ch = 0;
    cursor.line = 0;
    var range = cm.getViewport();
    foldByLevelRec(cm, cursor, range, level);
};

foldByLevelRec = function(cm, cursor, range, level) {

    if (level > 0) {
        var searcher = cm.getSearchCursor("<", cursor, false);
        while (searcher.findNext() && searcher.pos.from.line < range.to) {
            // unfold the tag
            cm.foldCode(searcher.pos.from, null, "unfold");
            // move the cursor into the tag
            cursor = searcher.pos.from;
            cursor.ch = searcher.pos.from.ch + 1;
            // find the closing tag
            var match = CodeMirror.findMatchingTag(cm, cursor, range);
            if (match) {
                if (match.close) {
                    // create the inner-range and jump the searcher after the ending tag
                    var innerrange = { from: range.from, to: range.to };
                    innerrange.from = cursor.line + 1;
                    innerrange.to = match.close.to.line;
                    // the recursive call
                    foldByLevelRec(cm, cursor, innerrange, level - 1);
                }
                // move to the next element in the same tag of this function scope
                var nextcursor = { line: cursor.line, to: cursor.ch };
                if (match.close) {
                    nextcursor.line = match.close.to.line;
                }
                nextcursor.ch = 0;
                nextcursor.line = nextcursor.line + 1;
                searcher = cm.getSearchCursor("<", nextcursor, false);
            }
        }
    }
}

foldByNodeOrder = function(cm, node) {

    // 0 - fold all
    unfoldAll(cm);
    node++;
    for (var l = cm.firstLine(); l <= cm.lastLine(); ++l)
        if (node == 0)
            cm.foldCode({ line: l, ch: 0 }, null, "fold");
        else node--;
}

unfoldAll = function(cm) {
    for (var i = 0; i < cm.lineCount(); i++) {
        cm.foldCode({ line: i, ch: 0 }, null, "unfold");
    }
}