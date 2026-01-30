// TSではprops型の定義を行う
type Props = {
  name: string;
};

export function Hello(props: Props) {
  return <p>こんにちは{props.name}さん</p>;
}
