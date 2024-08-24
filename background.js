chrome.action.onClicked.addListener(() => {
    chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
      let allBookmarks = collectAllBookmarks(bookmarkTreeNodes);
      if (allBookmarks.length > 0) {
        const randomBookmark = allBookmarks[Math.floor(Math.random() * allBookmarks.length)];
        if (randomBookmark && randomBookmark.url) {
          chrome.tabs.create({ url: randomBookmark.url });
        }
      }
    });
  });
  
  function collectAllBookmarks(bookmarkNodes) {
    let bookmarks = [];
    for (let node of bookmarkNodes) {
      if (node.url) {
        bookmarks.push(node);
      } else if (node.children && node.children.length > 0) {
        bookmarks = bookmarks.concat(collectAllBookmarks(node.children));
      }
    }
    return bookmarks;
  }
  