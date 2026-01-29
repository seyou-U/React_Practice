import { useEffect, useImperativeHandle, useRef } from "react";

function MyInput({ref}) {
    // useRef()で作った入れ物 (実際のDOMが入る)
    const realInputRef = useRef(null);

    // 子コンポーネントのレンダリング
    console.log('子コンポーネントのレンダリング');

    // DOM が割り当てられたか確認
    useEffect(() => {
        console.log("[子] 描画後に発生:realInputRef.current =", realInputRef.current);
    });

    // 子が親に後悔するメソッドを定義する
    useImperativeHandle(ref, () => ({
        focus() {
            // DOMを直接操作している
            //.current：実態(DOM要素)が入る .focus()：DOM要素のメソッドで、フォーカスする
            realInputRef.current?.focus();
        },
        clear() {
            if (realInputRef.current) realInputRef.current.value = '';
        }
    }), []);

    return <textarea ref={realInputRef} />;
}

export default function Form() {
    // 子コンポーネントを操作するために持つRef
    const inputRef = useRef(null);

    console.log('親のレンダリング');

    useEffect(() => {
        console.log("[親] useEffect: inputRef.current =", inputRef.current);
        console.log(
            "[親] inputRef.current.focus type =",
            typeof inputRef.current?.focus
        );
    });

    const handleClick = () => {
        console.log("[親] ボタンをクリックしました");
        console.log("[親] focus前に発生:: inputRef.current =", inputRef.current);

        // 該当のinputを今の入力先にするイベント
        inputRef.current?.focus();

        console.log("[親] focus後に発生:: document.activeElement =", document.activeElement);
    };

    return (
        <>
            <MyInput ref={inputRef} />
            <button onClick={handleClick}>Focus</button>
            <button onClick={() => inputRef.current?.clear()}>Clear</button>
        </>
    )
}
