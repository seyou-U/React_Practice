export function SampleButton() {
  const handleClick = () => {
    alert('ボタンがクリックされました。');
  };

  return <button onClick={handleClick}>クリックしてください</button>;
}
