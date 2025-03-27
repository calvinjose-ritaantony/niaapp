export const formateChatHeadText = (str) => {
    return str?.split('_')?.map((word) =>                  // Capitalize the first letter of each word
        word?.charAt(0)?.toUpperCase() + word?.slice(1)?.toLowerCase()
      )?.join(' ');                    // Join the words with spaces
  };


export const findDifferences = (arr1, arr2) => {
    console.log(arr1, arr2);
    // Find objects in arr1 that are not in arr2
    const extraInArr1 = arr1.filter(obj1 => !arr2.some(obj2 => JSON.stringify(obj1) === JSON.stringify(obj2)));

    // Find objects in arr2 that are not in arr1
    const extraInArr2 = arr2.filter(obj2 => !arr1.some(obj1 => JSON.stringify(obj2) === JSON.stringify(obj1)));

    return  extraInArr1.length > 0 || extraInArr2.length > 0 ;
};