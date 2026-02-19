import { useEffect } from "react"

/**
 * どの画面でも表示された時にログを出力するHOC
 */
export function withLogger(WrappedComponent) {
    return function EnhancedComponent(props) {
        useEffect(() => {
          console.log(`[Logger] mounted: ${WrappedComponent.name || "Component"} `);
        }, []);

        return <WrappedComponent {...props} />;
    };
}

/**
 * 通常のコンポーネント
 * 名前を受け取って文字を返却
 */
function Profile({name}) {
    return <div>こんにちは、{name}さん</div>
}

export const ProfileWithLogger = withLogger(Profile);
