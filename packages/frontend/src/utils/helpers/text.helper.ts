export function cutText(text: string) {
  if(text.split(' ').length < 6) {
    return text;
  }

  const slicedText = text.slice(0, 50).split(' ');
  const newText = slicedText.slice(0, slicedText.length - 1).join(' ');

  return newText + '...';
}