import React from 'react';
import config from '@constants/config';
import env from '@env/env.json';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import tt from 'counterpart';
import { getPageImage } from '@infrastructure/RouteInitialize';

export default class ServerHTML extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'ServerHTML');
    }

    render() {
        const { body, assets, locale, title, meta, pathname } = this.props;

        //let page_title = title;

        return (
            <html lang="ja">
                <head>
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                    />
                    {meta &&
                        meta.map(m => {
                            /*
                            if (m.title) {
                                page_title = m.title;
                                return null;
                            }
                            */
                            if (m.canonical)
                                return (
                                    <link
                                        key="canonical"
                                        rel="canonical"
                                        href={m.canonical}
                                    />
                                );
                            if (m.name && m.content)
                                return (
                                    <meta
                                        key={m.name}
                                        name={m.name}
                                        content={m.content}
                                    />
                                );
                            if (m.property && m.content)
                                return (
                                    <meta
                                        key={m.property}
                                        property={m.property}
                                        content={m.content}
                                    />
                                );
                            return null;
                        })}
                    <link rel="manifest" href="/manifest.json" />
                    <meta name="application-name" content="Selfinity" />
                    <meta name="msapplication-TileColor" content="#FFFFFF" />
                    <meta
                        name="msapplication-TileImage"
                        content="/images/favicons/mstile-144x144.png"
                    />
                    <meta
                        name="msapplication-square70x70logo"
                        content="/images/favicons/mstile-70x70.png"
                    />
                    <meta
                        name="msapplication-square150x150logo"
                        content="/images/favicons/mstile-150x150.png"
                    />
                    <meta
                        name="msapplication-wide310x150logo"
                        content="/images/favicons/mstile-310x150.png"
                    />
                    <meta
                        name="msapplication-square310x310logo"
                        content="/images/favicons/mstile-310x310.png"
                    />
                    <meta
                        httpEquiv="Content-Security-Policy"
                        content={`default-src * ${config.img_proxy_prefix} ${
                            config.img_host
                        } blob: file: filesystem:;img-src * 'self' data: https: blob: file: filesystem:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com/pagead/js/r20190807/r20190131/show_ads_impl.js https://pagead2.googlesyndication.com/* https://cdn.onesignal.com https://adservice.google.com/adsid/integrator.js https://pagead2.googlesyndication.com/pagead/js/r20190729/r20190131/show_ads_impl.js https://www.googletagservices.com/activeview/js/current/osd.js https://www.googletagservices.com/* https://pagead2.googlesyndication.com/pagead/js/* https://googleads.g.doubleclick.net/ https://pagead2.googlesyndication.com/pub-config/r20160913/ca-pub-7470746906401651.js https://pagead2.googlesyndication.com/pub-config/* https://www.googletagmanager.com/gtag/js https://cdn.onesignal.com/sdks/OneSignalSDK.js https://cdn.onesignal.com/sdks/* https://onesignal.com https://onesignal.com/* https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js https://adservice.google.co.jp https://onesignal.com/api/v1/players https://onesignal.com/api/v1/notifications https://pagead2.googlesyndication.com https://pagead2.googlesyndication.com/pagead/js/r20190805/r20190131/show_ads_impl.js https://pagead2.googlesyndication.com/pagead/js/* https://onesignal.com/api/v1/* https://i.ytimg.com/ https://www.youtube.com/ *;style-src 'self' 'unsafe-inline' *`}
                    />
                    <link
                        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600"
                        rel="stylesheet"
                        type="text/css"
                    />
                    <link
                        href="https://fonts.googleapis.com/css?family=Source+Serif+Pro:400,600"
                        rel="stylesheet"
                        type="text/css"
                    />
                    {assets.style.map((href, idx) => (
                        <link
                            href={href}
                            key={idx}
                            rel="stylesheet"
                            type="text/css"
                        />
                    ))}
                    <script
                        async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
                    />
                    <script
                        data-ad-client={`${env.GOOGLE.AD_CLIENT}`}
                        async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
                    />
                    <script
                        src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
                        async
                    />
                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${
                            env.GOOGLE.ANALYSTICS_CLIENT
                        }`}
                    />

                    <title>{tt('pages.Home') + ' | ' + config.APP_NAME}</title>
                    <meta
                        name="description"
                        content={tt('descriptions.Home')}
                    />

                    <meta name="og:title" content={tt('pages.Home')} />
                    <meta
                        name="og:description"
                        content={tt('descriptions.Home')}
                    />
                    <meta name="og:image" content={getPageImage(pathname)} />
                    <meta property="og:url" content={config.CURRENT_APP_URL} />

                    <meta name="twitter:title" content={tt('pages.Home')} />
                    <meta
                        name="twitter:description"
                        content={tt('descriptions.Home')}
                    />
                    <meta
                        name="twitter:image"
                        content={getPageImage(pathname)}
                    />
                    <meta name="twitter:card" content={'summary_large_image'} />
                </head>
                <body>
                    <div
                        id="content"
                        dangerouslySetInnerHTML={{ __html: body }}
                    />
                    {assets.script.map((href, idx) => (
                        <script key={idx} src={href} />
                    ))}
                </body>
            </html>
        );
    }
}

/*

<meta name="twitter:card" content={'summary_large_image'} />
                    <meta
                        name="twitter:title"
                        content={tt('pages.Home') + ' | ' + config.APP_NAME}
                    />
                    <meta
                        name="twitter:description"
                        content={tt('descriptions.Home')}
                    />
                    <meta
                        name="twitter:image"
                        content={`${
                            config.CURRENT_APP_URL
                        }/images/brands/who-are-you_logo.png`}
                    />

*/
