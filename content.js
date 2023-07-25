console.log("Chrome extension go")



function wrapFirstLettersInSpan(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    const words = node.textContent.split(/\b/);
    const modifiedWords = words.map(word => {
      if (word.length >= 1 && word.length <= 2) {
        return `<span class="bionic-reading">${word.charAt(0)}</span>${word.slice(1)}`;
      } else if (word.length === 3) {
        return `<span class="bionic-reading">${word.slice(0, 2)}</span>${word.slice(2)}`;
      } else if (word.length > 3) {
        const charsToBold = Math.min(Math.max(2, Math.floor(word.length * 0.5)), word.length);
        return `<span class="bionic-reading">${word.slice(0, charsToBold)}</span>${word.slice(charsToBold)}`;
      } else {
        return word;
      }
    }).join('');

    const tempElement = document.createElement('span');
    tempElement.innerHTML = modifiedWords;
    return tempElement;
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    if (node.tagName === "A") {
      // For links, clone the element and handle its children recursively
      const tempElement = node.cloneNode(false); // Clone the element without its children

      for (const childNode of node.childNodes) {
        const tempChild = wrapFirstLettersInSpan(childNode);
        tempElement.appendChild(tempChild);
      }
      return tempElement;
    } else {
      const tempElement = node.cloneNode(false); // Clone the element without its children

      for (const childNode of node.childNodes) {
        const tempChild = wrapFirstLettersInSpan(childNode);
        tempElement.appendChild(tempChild);
      }
      return tempElement;
    }
  }
  return node.cloneNode(false);
}

// Create a new body element with the modified content
const modifiedBody = wrapFirstLettersInSpan(document.body);

// Replace the existing body with the modified version
document.body.innerHTML = modifiedBody.innerHTML;











