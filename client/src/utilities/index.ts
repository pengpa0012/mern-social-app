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