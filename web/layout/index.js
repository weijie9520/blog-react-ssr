import React from 'react';
import '../style/basics.less';
import { Link } from 'react-router-dom';
import serialize from 'serialize-javascript';
import config from '../../config/config.ssr';

const { version, jsPrefix, cssPrefix } = config;

const commonNode = (props) =>
  // 为了同时兼容ssr/csr请保留此判断，如果你的layout没有内容请使用 props.children ? <div>{ props.children }</div> : ''
  // props.children ? <div className='normal'><h1 className='title'><Link to='/'>Egg + React + SSR</Link><div className='author'>by ykfe</div></h1>{props.children}</div>
  //   : ''
  props.children ? <div>{props.children}</div> : '';

const Layout = (props) => {
  if (__isBrowser__) {
    return commonNode(props);
  } else {
    const { serverData, req } = props.layoutData;
    const { injectCss, injectScript } = props.layoutData.app.config;
    let chunkName = req ? req.url.split('/')[1] : '';
    if (!chunkName) {
      chunkName = 'tags';
    }

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="theme-color" content="#000000" />
          <link rel="shortcut icon" href="/favicon.ico"></link>
          <title>weijie ❤ feng</title>
          {injectCss && injectCss.map((item) => <link rel="stylesheet" href={item} key={item} />)}
          {chunkName ? <link rel="stylesheet" href={`${cssPrefix}/${chunkName}.chunk.css`} /> : ''}
        </head>
        <body>
          <div id="app">{commonNode(props)}</div>
          {serverData && (
            <script
              dangerouslySetInnerHTML={{
                __html: `window.__USE_SSR__=true; window.__INITIAL_DATA__ =${serialize(serverData)}`,
              }}
            />
          )}
          <div
            dangerouslySetInnerHTML={{
              __html: injectScript && injectScript.join(''),
            }}
          />
        </body>
        {/* {chunkName ? <script type="text/javascript" src={`${jsPrefix}/${chunkName}.chunk.js`}></script> : ''} */}
      </html>
    );
  }
};

export default Layout;
