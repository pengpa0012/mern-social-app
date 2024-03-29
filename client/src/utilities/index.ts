export const onShowComment = (id: number, setter: React.Dispatch<React.SetStateAction<{
  id: number;
  isDisplayed: boolean;
}[]>>) => {
  setter(prevItems => {
    const index = prevItems.findIndex(item => item.id === id);
    if (index === -1) {
      // item with given id doesn't exist, so add a new one
      return [...prevItems.filter(e => e?.id !== id && Object.keys(e).length !== 0), { id, isDisplayed: true }];
    } else {
      // item with given id exists, so update its isDisplayed property
      return [
        ...prevItems.slice(0, index),
        { ...prevItems[index], isDisplayed: !prevItems[index]?.isDisplayed },
        ...prevItems.slice(index + 1),
      ];
    }
  });
}


export const bytesToSize = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return 'n/a'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString(), 10)
  if (i === 0) return `${bytes} ${sizes[i]})`
  return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
}

export const calculateAge = (dateString: string) => {
   // Parse the date string into year, month, and day values
   const [year, month, day] = dateString.split('-').map(Number);

   // Create a Date object for the birthdate
   const birthDate = new Date(year, month - 1, day);
 
   // Check if the birthdate is in the future
   if (birthDate.getTime() > Date.now()) {
     return '0';
   }
 
   // Calculate the age difference in milliseconds
   const ageDiff = Date.now() - birthDate.getTime();
 
   // Convert the age difference to a Date object and return the year component
   const ageDate = new Date(ageDiff);
   return Math.abs(ageDate.getUTCFullYear() - 1970)
}