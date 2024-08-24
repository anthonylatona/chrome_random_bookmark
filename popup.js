document.addEventListener('DOMContentLoaded', function () {
    const bookmarkFoldersDropdown = document.getElementById('bookmarkFolders');
    const openRandomButton = document.getElementById('openRandomBookmark');
  
    // Fetch all bookmark folders and populate the dropdown
    chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
      populateBookmarkFolders(bookmarkTreeNodes, bookmarkFoldersDropdown);
    });
  
    openRandomButton.addEventListener('click', function () {
      const selectedFolderId = bookmarkFoldersDropdown.value;
      if (selectedFolderId) {
        chrome.bookmarks.getChildren(selectedFolderId, function (bookmarks) {
          const randomBookmark = bookmarks[Math.floor(Math.random() * bookmarks.length)];
          if (randomBookmark && randomBookmark.url) {
            chrome.tabs.create({ url: randomBookmark.url });
          }
        });
      }
    });
  });
  
  function populateBookmarkFolders(bookmarkTreeNodes, dropdown) {
    for (let node of bookmarkTreeNodes) {
      if (node.children && node.children.length > 0) {
        for (let childNode of node.children) {
          if (childNode.children && childNode.children.length > 0) {
            const option = document.createElement('option');
            option.value = childNode.id;
            option.textContent = childNode.title;
            dropdown.appendChild(option);
          }
        }
      }
    }
  }
  