import React from "react";
import "antd/lib/style/css";
import "../style/basics.less";
import isEmpty from "lodash/isEmpty";
import serialize from "serialize-javascript";
import { __INITIAL_DATA__ } from "../createStore";
import packageJson from "../../package.json";

const { version } = packageJson;

const commonNode = (props) => {
    return props.children ? props.children : "";
};
// 为了同时兼容ssr/csr请保留此判断，如果你的layout没有内容请使用 props.children ? { props.children } : ''
// props.children ? <div className='normal'><h1 className='title'><Link to='/'>Egg + React + SSR</Link><div className='author'>by ykfe</div></h1>{props.children}</div>
//   : ''

const Layout = (props) => {
    if (__isBrowser__) {
        return commonNode(props);
    } else {
        const { serverData, req } = props.layoutData;
        const { injectCss, injectScript } = props.layoutData.app.config;

        const chunkName = req ? req.url.split("/")[1] : "";
        return (
            <html lang="en">
                <head>
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, shrink-to-fit=no"
                    />
                    <meta
                        name="baidu-site-verification"
                        content="code-dqfGE8zrOx"
                    />
                    <meta charSet="utf-8" />
                    <meta name="theme-color" content="#000000" />
                    <script>var _hmt = _hmt || [];</script>
                    <script src="https://hm.baidu.com/hm.js?49bf4a5a5df8f68eb21f8ae03221e371"></script>
                    <title>iweijie</title>
                    {injectCss &&
                        injectCss.map((item) => (
                            <link rel="stylesheet" href={item} key={item} />
                        ))}
                    {chunkName && chunkName ? (
                        <link
                            rel="stylesheet"
                            href={`/static/css/${chunkName}_${version}.chunk.css`}
                        />
                    ) : (
                        ""
                    )}
                </head>
                <body>
                    <div id="app">{commonNode(props)}</div>
                    {!isEmpty(serverData) && (
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `window.__USE_SSR__=true; window.${__INITIAL_DATA__} =${serialize(
                                    serverData
                                )}`,
                            }}
                        />
                    )}
                    <div
                        dangerouslySetInnerHTML={{
                            __html: injectScript && injectScript.join(""),
                        }}
                    />
                </body>
            </html>
        );
    }
};

export default Layout;
