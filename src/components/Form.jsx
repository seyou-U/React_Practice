import { useEffect, useImperativeHandle, useRef } from "react";

function MyInput({ref}) {
    // useRef()で作った入れ物
    const realInputRef = useRef(null);

    // 子コンポーネントのレンダリング
    console.log('子コンポーネントのレンダリング');

    // DOM が割り当てられたか確認
    useEffect(() => {
        console.log("[子] 描画後に発生:realInputRef.current =", realInputRef.current);
    });

    useImperativeHandle(ref, () => {
        console.log('[子] useImperativeHandle上でオブジェクト作成');
        return {
            focus() {
                console.log('[子] focus前に発生: realInputRef.current =', realInputRef.current);
                // DOMを直接操作している
                //.current：実態(DOM要素)が入る .focus()：DOM要素のメソッドで、フォーカスする
                realInputRef.current.focus();
                console.log('[子] focus後に発生: realInputRef.current =', realInputRef.current);
            },
        };
    }, []);

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

        inputRef.current?.focus();

        console.log("[親] focus後に発生:: document.activeElement =", document.activeElement);
    };

    return (
        <>
            <MyInput ref={inputRef} />
            <button onClick={handleClick}>Focus the input</button>
        </>
    )
}
