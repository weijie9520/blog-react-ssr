import fetch from "isomorphic-fetch";

import map from "lodash/map";
import merge from "lodash/merge";
import forEach from "lodash/forEach";
import split from "lodash/split";
import get from "lodash/get";
import size from "lodash/size";
import first from "lodash/first";
import slice from "lodash/slice";
import noop from "lodash/noop";

import { prefix, apis, defaultOptions } from "./constant";
import { uuidName, globalServerRenderCtxDataName } from "../utils/index";

function parseJSON(response) {
    return response.json();
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

const parseCookie = (str) => {
    const cookie = [];
    const options = {};
    if (!size(str)) return cookie;

    const strList = split(str, "; ");

    const [name, value = ""] = split(first(strList), "=");
    cookie.push(name, value);
    forEach(slice(strList, 1), (item, index) => {
        if (!item) return;
        if (!item.includes("=")) {
            options[item] = true;
        } else {
            const [name, value] = split(item, "=");
            options[name] = value;
        }
    });
    cookie.push(options);
    return cookie;
};

const createAbort = () => {
    if (__isBrowser__ ? window.AbortController : global.AbortController) {
        const controller = new AbortController();
        const signal = controller.signal;
        return controller;
    }
    return {};
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
// export default

export default Object.keys(apis)
    .map((key) => {
        let { url = "", method = "GET", ...other } = apis[key];
        method = method.toUpperCase();
        return {
            key,
            handle: (params, config = {}) => {
                const { ctx, ...otherConfig } = config;

                const configList = [{}, defaultOptions, other, otherConfig];

                if (!__isBrowser__ && ctx) {
                    let cookies = get(ctx, "req.headers.cookie");
                    configList.push({
                        headers: {
                            Cookie: cookies,
                        },
                    });
                    // headers: { 'Content-Type': 'application/json' },
                }

                /**   服务端请求添加Cookie   */

                config = merge(...configList);

                let prefixUrl = `${prefix.basicsUrl}${url}`;

                if (method === "GET") {
                    const getParams = size(params)
                        ? map(Object.keys(params), (key) => {
                              return params[key]
                                  ? `${key}=${params[key]}`
                                  : undefined;
                          })
                              .filter(Boolean)
                              .join("&")
                        : "";
                    prefixUrl = prefixUrl + "?" + getParams;
                } else {
                    config["method"] = method;
                    try {
                        if (params) {
                            const isUpload =
                                get(config, "headers.Content-Type") ===
                                    "multipart/form-data" &&
                                params instanceof FormData;
                            config["body"] = isUpload
                                ? params
                                : JSON.stringify(params);
                            if (isUpload) {
                                delete config.headers["Content-Type"];
                            }
                        }
                    } catch (err) {
                        console.log(err);
                    }
                }
                const { signal, abort } = createAbort();

                return (
                    fetch(prefixUrl, { signal, ...config })
                        .then(checkStatus)
                        // .then((response) => {
                        //   console.log(response.headers["_headers"]["set-cookie"]);
                        //   /**   服务端请求 Set-Cookie   */
                        //   if (!__isBrowser__) {
                        //     let setCookie = get(response, "headers._headers.set-cookie", []);
                        //     const path = `${globalServerRenderCtxDataName}.${get(
                        //       params,
                        //       uuidName
                        //     )}.setCookies`;

                        //     if (isEmpty(setCookie) || !isArray(setCookie)) {
                        //       setCookie = [];
                        //     }
                        //     const setCookies = get(global, path);

                        //     const list = map(setCookie, (item) => {
                        //       return parseCookie(item);
                        //     });
                        //     setCookies.push(...list);
                        //   }
                        //   return response;
                        // })
                        .then(parseJSON)
                        .catch((err) => {
                            console.log(err);
                            throw err;
                        })
                );
            },
        };
    })
    .reduce((a, b) => {
        a[b.key] = b.handle;
        return a;
    }, {});
