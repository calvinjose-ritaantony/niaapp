export const formateChatHeadText = (str) => {
    if(str !== undefined){
      return str
      .split('_')                    // Split by underscores
      .map((word) =>                  // Capitalize the first letter of each word
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(' ');                    // Join the words with spaces
    }
    else{
      return "";
    }
    
  };