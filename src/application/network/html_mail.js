export const styles = `
  img {
    border: none;
    -ms-interpolation-mode: bicubic;
    max-width: 100%;
  }
  body {
    background-color: #f6f6f6;
    font-family: sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 14px;
    line-height: 1.4;
    margin: 0;
    padding: 0;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  table {
    border-collapse: separate;
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt;
    width: 100%; }
    table td {
      font-family: sans-serif;
      font-size: 14px;
      vertical-align: top;
  }
  /* -------------------------------------
      BODY & CONTAINER
  ------------------------------------- */
  .body {
    background-color: #f6f6f6;
    width: 100%;
  }
  /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
  .container {
    display: block;
    margin: 0 auto !important;
    /* makes it centered */
    max-width: 580px;
    padding: 10px;
    width: 580px;
  }
  /* This should also be a block element, so that it will fill 100% of the .container */
  .content {
    box-sizing: border-box;
    display: block;
    margin: 0 auto;
    max-width: 580px;
    padding: 10px;
  }
  /* -------------------------------------
      HEADER, FOOTER, MAIN
  ------------------------------------- */
  .main {
    background: #ffffff;
    border-radius: 3px;
    width: 100%;
  }
  .wrapper {
    box-sizing: border-box;
    padding: 20px;
  }
  .content-block {
    padding-bottom: 10px;
    padding-top: 10px;
  }
  .footer {
    clear: both;
    margin-top: 10px;
    text-align: center;
    width: 100%;
  }
    .footer td,
    .footer p,
    .footer span,
    .footer a {
      color: #999999;
      font-size: 12px;
      text-align: center;
  }
  /* -------------------------------------
      TYPOGRAPHY
  ------------------------------------- */
  h1,
  h2,
  h3,
  h4 {
    color: #000000;
    font-family: sans-serif;
    font-weight: 400;
    line-height: 1.4;
    margin: 0;
    margin-bottom: 30px;
  }
  h1 {
    font-size: 35px;
    font-weight: 300;
    text-align: center;
    text-transform: capitalize;
  }
  p,
  ul,
  ol {
    font-family: sans-serif;
    font-size: 14px;
    font-weight: normal;
    margin: 0;
    margin-bottom: 15px;
  }
    p li,
    ul li,
    ol li {
      list-style-position: inside;
      margin-left: 5px;
  }
  a {
    color: #3498db;
    text-decoration: underline;
  }
  /* -------------------------------------
      BUTTONS
  ------------------------------------- */
  .btn {
    box-sizing: border-box;
    width: 100%;
    margin: 0 auto;
  }
    .btn > tbody > tr > td {
      padding-bottom: 15px; }
    .btn table {
      width: auto;
  }
    .btn table td {
      background-color: #ffffff;
      border-radius: 5px;
      text-align: center;
  }
    .btn a {
      background-color: #ffffff;
      border: solid 1px #3498db;
      border-radius: 5px;
      box-sizing: border-box;
      color: #3498db;
      cursor: pointer;
      display: inline-block;
      font-size: 14px;
      font-weight: bold;
      margin: 0;
      padding: 12px 25px;
      text-decoration: none;
      text-transform: capitalize;
  }
  .btn-primary table td {
    transition: all 0.3s ease-in-out;
    /*background-color: #3498db;*/
  }
  .btn-primary a {
    transition: all 0.3s ease-in-out;
    background-color: #3498db;
    border-color: #3498db;
    color: #ffffff;
  }
  /* -------------------------------------
      OTHER STYLES THAT MIGHT BE USEFUL
  ------------------------------------- */
  .last {
    margin-bottom: 0;
  }
  .first {
    margin-top: 0;
  }
  .align-center {
    text-align: center;
  }
  .align-right {
    text-align: right;
  }
  .align-left {
    text-align: left;
  }
  .clear {
    clear: both;
  }
  .mt0 {
    margin-top: 0;
  }
  .mb0 {
    margin-bottom: 0;
  }
  .preheader {
    color: transparent;
    display: none;
    height: 0;
    max-height: 0;
    max-width: 0;
    opacity: 0;
    overflow: hidden;
    mso-hide: all;
    visibility: hidden;
    width: 0;
  }
  .powered-by a {
    text-decoration: none;
  }
  hr {
    border: 0;
    border-bottom: 1px solid #f6f6f6;
    margin: 20px 0;
  }
  /* -------------------------------------
      RESPONSIVE AND MOBILE FRIENDLY STYLES
  ------------------------------------- */
  @media only screen and (max-width: 620px) {
    table[class=body] h1 {
      font-size: 28px !important;
      margin-bottom: 10px !important;
    }
    table[class=body] p,
    table[class=body] ul,
    table[class=body] ol,
    table[class=body] td,
    table[class=body] span,
    table[class=body] a {
      font-size: 16px !important;
    }
    table[class=body] .wrapper,
    table[class=body] .article {
      padding: 10px !important;
    }
    table[class=body] .content {
      padding: 0 !important;
    }
    table[class=body] .container {
      padding: 0 !important;
      width: 100% !important;
    }
    table[class=body] .main {
      border-left-width: 0 !important;
      border-radius: 0 !important;
      border-right-width: 0 !important;
    }
    table[class=body] .btn table {
      width: 100% !important;
    }
    table[class=body] .btn a {
      width: 100% !important;
    }
    table[class=body] .img-responsive {
      height: auto !important;
      max-width: 100% !important;
      width: auto !important;
    }
  }
  /* -------------------------------------
      PRESERVE THESE STYLES IN THE HEAD
  ------------------------------------- */
  @media all {
    .ExternalClass {
      width: 100%;
    }
    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
      line-height: 100%;
    }
    .apple-link a {
      color: inherit !important;
      font-family: inherit !important;
      font-size: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
      text-decoration: none !important;
    }
    #MessageViewBody a {
      color: inherit;
      text-decoration: none;
      font-size: inherit;
      font-family: inherit;
      font-weight: inherit;
      line-height: inherit;
    }
    .logo {
      display: block;
      transition: all 0.3s ease-in-out;
      width: 246px;
      height: 80px;
      margin: 16px auto;
    }
    .btn-primary table td:hover {
      transition: all 0.3s ease-in-out;
      /*background-color: #34495e !important;*/
    }
    .btn-primary a:hover {
      transition: all 0.3s ease-in-out;
      background-color: #34495e !important;
      border-color: #34495e !important;
    }
  }
  .home-item {
    margin: 8px auto;
    border-radius: 15px;
    border: 1px solid #d0d0d0;
    width: 270px;
    height: 100%;
    background: #ffffff;
    padding: 15px;
  }
  .home-item__title {
    word-wrap: break-word;
    min-height: 44px;
    text-align: center;
    width: 280px;
    margin: 0 auto;
    font-size: 18px;
    line-height: 28px;
    font-weight: 600;
    margin-bottom: 10px;
  }
`;

export const base_template = `
  <!doctype html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>{subject}</title>
      <style>
        ${styles}
      </style>
    </head>
    <body class="">
      <span class="preheader">{text}</span>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
        <tr>
          <td>&nbsp;</td>
          <td class="container">
            <div class="content">

              <!-- START CENTERED WHITE CONTAINER -->
              <table role="presentation" class="main">

                <!-- START MAIN CONTENT AREA -->
                <tr>
                  <td class="wrapper">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <img class="logo" src="https://selfinity.me/images/selfinity-logo.png" />
                          <h3>{title}</h3>
                          <p>{text}</p>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                            <tbody>
                              <tr>
                                <td align="left">
                                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                      <tr>
                                        <td> <a href="{button_url}" target="_blank">{button_text}</a> </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <p>{foot_text}</p>
                          <p>{end_text}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              <!-- END MAIN CONTENT AREA -->
              </table>
              <!-- END CENTERED WHITE CONTAINER -->

              <!-- START FOOTER -->
              <div class="footer">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td class="content-block">
                      <span class="apple-link">{inc_name}</span>
                      <br> {unsubscribe_text} <a href="{unsubscribe_url}">{unsubscribe}</a>
                      <br><a href="https://selfinity.me/contact">{contact}</a>.
                    </td>
                  </tr>
                </table>
              </div>
              <!-- END FOOTER -->

            </div>
          </td>
          <td>&nbsp;</td>
        </tr>
      </table>
    </body>
  </html>
`;

export const summary_template = `
<!doctype html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>{subject}</title>
      <style>
        ${styles}
      </style>
    </head>
    <body class="">
      <span class="preheader">{text}</span>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
        <tr>
          <td>&nbsp;</td>
          <td class="container">
            <div class="content">

              <!-- START CENTERED WHITE CONTAINER -->
              <table role="presentation" class="main">

                <!-- START MAIN CONTENT AREA -->
                <tr>
                  <td class="wrapper">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <img class="logo" src="https://selfinity.me/images/selfinity-logo.png" />
                          <center><h2><strong>{title}</strong></h2></center>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                            <tbody>
                              <tr>
                                <td align="center">
                                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                      <tr>
                                        <td>
                                          <div class="home-item">
                                            <div class="home-item__title">
                                              {item1}
                                            </div>
                                            <div class="home-item__link">
                                              <a href="{button_url1}" target="_blank">{button_text}</a>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <div class="home-item">
                                            <div class="home-item__title">
                                              {item2}
                                            </div>
                                            <div class="home-item__link">
                                              <a href="{button_url2}" target="_blank">{button_text}</a>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <div class="home-item">
                                            <div class="home-item__title">
                                              {item3}
                                            </div>
                                            <div class="home-item__link">
                                              <a href="{button_url3}" target="_blank">{button_text}</a>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <div class="home-item">
                                            <div class="home-item__title">
                                              {item4}
                                            </div>
                                            <div class="home-item__link">
                                              <a href="{button_url4}" target="_blank">{button_text}</a>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <div class="home-item">
                                            <div class="home-item__title">
                                              {item5}
                                            </div>
                                            <div class="home-item__link">
                                              <a href="{button_url5}" target="_blank">{button_text}</a>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td align="left">
                                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                            <tbody>
                                              <tr>
                                                <td> <a style="margin-top: 44px;" href="{more_url}" target="_blank">{more_text}</a> </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              <!-- END MAIN CONTENT AREA -->
              </table>
              <!-- END CENTERED WHITE CONTAINER -->

              <!-- START FOOTER -->
              <div class="footer">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td class="content-block">
                      <span class="apple-link">{inc_name}</span>
                      <br> {unsubscribe_text} <a href="{unsubscribe_url}">{unsubscribe}</a>
                      <br><a href="https://selfinity/contact">{contact}</a>.
                    </td>
                  </tr>
                </table>
              </div>
              <!-- END FOOTER -->

            </div>
          </td>
          <td>&nbsp;</td>
        </tr>
      </table>
    </body>
  </html>
`;

const open_campaign_template = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" /><!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" /><!--<![endif]-->
    <!--[if (gte mso 9)|(IE)]>
    <xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <!--[if (gte mso 9)|(IE)]>
    <style type="text/css">
      body {width: 600px;margin: 0 auto;}
      table {border-collapse: collapse;}
      table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
      img {-ms-interpolation-mode: bicubic;}
    </style>
    <![endif]-->

    <style type="text/css">
      body, p, div {
        font-family: helvetica,arial,sans-serif;
        font-size: 14px;
      }
      body {
        color: #103e68;
      }
      body a {
        color: #ffb100;
        text-decoration: none;
      }
      p { margin: 0; padding: 0; }
      table.wrapper {
        width:100% !important;
        table-layout: fixed;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      img.max-width {
        max-width: 100% !important;
      }
      .column.of-2 {
        width: 50%;
      }
      .column.of-3 {
        width: 33.333%;
      }
      .column.of-4 {
        width: 25%;
      }
      @media screen and (max-width:480px) {
        .preheader .rightColumnContent,
        .footer .rightColumnContent {
            text-align: left !important;
        }
        .preheader .rightColumnContent div,
        .preheader .rightColumnContent span,
        .footer .rightColumnContent div,
        .footer .rightColumnContent span {
          text-align: left !important;
        }
        .preheader .rightColumnContent,
        .preheader .leftColumnContent {
          font-size: 80% !important;
          padding: 5px 0;
        }
        table.wrapper-mobile {
          width: 100% !important;
          table-layout: fixed;
        }
        img.max-width {
          height: auto !important;
          max-width: 480px !important;
        }
        a.bulletproof-button {
          display: block !important;
          width: auto !important;
          font-size: 80%;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .columns {
          width: 100% !important;
        }
        .column {
          display: block !important;
          width: 100% !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
      }
    </style>
    <!--user entered Head Start-->

     <!--End Head user entered-->
  </head>
  <body>
    <center class="wrapper" data-link-color="#ffb100" data-body-style="font-size: 14px; font-family: helvetica,arial,sans-serif; color: #103e68; background-color: #ffffff;">
      <div class="webkit">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#ffffff">
          <tr>
            <td valign="top" bgcolor="#ffffff" width="100%">
              <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="100%">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <!--[if mso]>
                          <center>
                          <table><tr><td width="600">
                          <![endif]-->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width:600px;" align="center">
                            <tr>
                              <td role="modules-container" style="padding: 0px 10px 0px 10px; color: #103e68; text-align: left;" bgcolor="#FFFFFF" width="100%" align="left">

    <table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%"
           style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
      <tr>
        <td role="module-content">
          <p></p>
        </td>
      </tr>
    </table>

    <table class="module"
           role="module"
           data-type="spacer"
           border="0"
           cellpadding="0"
           cellspacing="0"
           width="100%"
           style="table-layout: fixed;">
      <tr>
        <td style="padding:0px 0px 50px 0px;"
            role="module-content"
            bgcolor="">
        </td>
      </tr>
    </table>

    <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="font-size:6px;line-height:10px;padding:0px 0px 0px 0px;" valign="top" align="center">
          <img class="max-width" border="0" style="display:block;color:#000000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:40% !important;width:40%;height:auto !important;" src="https://selfinity.me/images/selfinity-logo.png" alt="" width="232">
        </td>
      </tr>
    </table>

    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="background-color:#ffffff;padding:50px 0px 20px 0px;line-height:35px;text-align:justify;"
            height="100%"
            valign="top"
            bgcolor="#ffffff">
            <div style="text-align: center;"><strong><span style="font-size:28px;">Selfinityのこれから</span></strong></div>
        </td>
      </tr>
    </table>

    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="background-color:#ffffff;padding:0px 0px 40px 0px;line-height:35px;text-align:justify;"
            height="100%"
            valign="top"
            bgcolor="#ffffff">
            <div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104); text-align: center;padding:0px40px0px40px">
<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104); text-align: center;"><span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 600; font-family: helvetica, arial, sans-serif; font-size: 15px; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;">最後に重大発表があるのでお急ぎの場合は最終セクション部分を御覧ください</span></div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104); text-align: center;">&nbsp;</div>
</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104);">Selfinityをご利用の皆さん。こんにちは。株式会社Selfinityの代表取締役を務めさせて頂いてる宮崎翔太です。</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104);">このメールはサイレントローンチ段階で一度でもSelfinityをご利用頂いた人にお届けさせていただいてます。</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104);">&nbsp;</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104);">今までSelfinityは最低限実装したい機能を実装して、皆さんに限定公開していました。</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104);">当時にご利用頂いた方は、バグや未熟なUX等で不快な気持ちにさせてしまったかもしれません。申し訳ございませんでした。</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104);">しかし、皆さんのフィードバックは僕がすべて把握し、僕が責任をもって改善に努めさせて頂いてます。</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104);">皆さんのご利用は決して無駄ではなく日進月歩で成果に変わってます。</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104);">&nbsp;</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104);">今日は皆さんに2つの報告をするためにご連絡を差し上げています。</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104);"><span style="font-weight: 600; background: transparent; font-size: inherit; color: #FFB100;">1. Selfinityは最終的にどういうサービスになったのか</span></div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104);"><span style="font-weight: 600; background: transparent; font-size: inherit; color: #FFB100;">2. Selfinityはこれからのどうなっていくのか</span></div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104);">&nbsp;</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104);">最後に重大な報告があるのでお急ぎの人は<span style="color: #FFB100; font-family: helvetica, arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 600;">「2. Selfinityはこれからのどうなっていくのか」</span><span style="color: rgb(16, 62, 104); font-family: helvetica, arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400;">をお読みください。</span></div>
        </td>
      </tr>
    </table>

    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="padding:18px 0px 18px 0px;line-height:22px;text-align:inherit;background-color:#ffffff;"
            height="100%"
            valign="top"
            bgcolor="#ffffff">
            <div style="text-align: center;"><span style="font-size:18px;"><strong style="color:#FFB100;">1.Selfinityはどういうサービスになったのか</strong></span></div>
        </td>
      </tr>
    </table>

    <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="font-size:6px;line-height:10px;padding:10px 0px 10px 0px;" valign="top" align="center">
          <img class="max-width" border="0" style="display:block;color:#000000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:90% !important;width:90%;height:auto !important;" src="https://selfinity.me/images/brands/summary.png" alt="" width="522">
        </td>
      </tr>
    </table>

    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="background-color:#ffffff;padding:0px 0px 20px 0px;line-height:35px;text-align:justify;"
            height="100%"
            valign="top"
            bgcolor="#ffffff">
            <div>Selfinityはblockchainによる新時代の掲示板です。</div>

<div>
<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87); text-align: left;">Selfinityは&nbsp;<strong>聞き手に「ササる」メッセージを出した人が頼られていく感動で動く掲示板&nbsp;</strong>です。</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87); text-align: left;">万人受けではなく<strong>｢1人の信頼できる人｣の心を動かすメッセージ</strong>が重要となります。</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87); text-align: left;"><span style="color: rgb(5, 50, 87); font-family: helvetica, arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; text-align: left;">Selfinityで人の心を動かしたユーザーは、活躍ぶりに応じて</span><span style="font-weight: 600; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87); text-align: left;">ポイント</span><span style="color: rgb(5, 50, 87); font-family: helvetica, arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; text-align: left;">がもらえ、Selfinityで頼られるような存在になります。</span></div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87); text-align: left;"><span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 600; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87); text-align: left; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;">ポイント</span><span style="color: rgb(5, 50, 87); font-family: helvetica, arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; text-align: left;">が高いとあなたに認められるために、よりレベルの高いメッセージが自分に届きやすくなり、想像もしない良い考え方などと出会いやすくなります。</span></div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87); text-align: left;">
<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(255, 177, 0); text-align: center;"><span style="font-weight: 600; background: transparent; font-size: inherit; color: inherit;">流れ</span></div>

<ol style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104);">
  <li style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; text-align: left; color: rgb(5, 50, 87);"><span style="font-weight: 600; background: transparent; font-size: inherit; color: inherit;">ポイントが高い人にメッセージを出して他者貢献</span></li>
  <li style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; text-align: left; color: rgb(5, 50, 87);"><span style="font-weight: 600; background: transparent; font-size: inherit; color: inherit;">聞き手の心にササると聞き手のポイント分、ポイントが上がる</span></li>
  <li style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; text-align: left; color: rgb(5, 50, 87);"><span style="font-weight: 600; background: transparent; font-size: inherit; color: inherit;">ポイントが上がると、逆に周りがあなたにメッセージで他者貢献してくれる</span></li>
</ol>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87); text-align: left;">一言で言うと&nbsp;<span style="font-weight: 600; background: transparent; font-size: inherit; color: inherit;">「凄い人を助けると凄い人に助けられます」&nbsp;</span></div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87); text-align: left;">&nbsp;</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87); text-align: left;"><strong>2の聞き手の心にササるというのはメッセージを出してスーパーグッドを貰うということです。</strong></div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87); text-align: left;">スーパーグッドを貰うことがポイント獲得の最短の道です。</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87); text-align: left;"><span style="color: rgb(5, 50, 87); font-family: helvetica, arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; text-align: left;">また、視聴者も心を動かされた場合、<strong>いいね</strong>や<strong>応援</strong>を与えてくれるので、ポイントを更に獲得できます。</span></div>
</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87); text-align: left;"><span style="font-size:12px;"><span style="color: rgb(5, 50, 87); font-family: helvetica, arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; text-align: left;">( ポイントの概要・メリットはアプリのマイペー</span><span style="color: rgb(5, 50, 87); font-family: helvetica, arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; text-align: left;">ジのウォレットページをご覧になってください )</span></span></div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: #FFB100; text-align: center;">&nbsp;</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87); text-align: left;"><span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87); text-align: left;">またポイントを獲得すると他者貢献者の証となる独自通貨<span style="font-weight: 600; background: transparent; font-size: inherit; color: inherit;">「Self」</span></span><span style="color: rgb(5, 50, 87); font-family: helvetica, arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; text-align: left;">も獲得できます。</span><span style="font-size:12px;">(Selfの詳細はまた後日告知します。お楽しみに...)</span></div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87); text-align: left;">&nbsp;</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87); text-align: left;"><strong>Selfinityは小さな他者貢献の積み重ねで世界を動かすことをミッションにしています。</strong></div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87); text-align: left;"><span style="color: rgb(5, 50, 87); font-family: helvetica, arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; text-align: left;">あなたのメッセージを求めている人はSelfinityにはいます。</span></div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87); text-align: left;">是非あなたのメッセージでSelfinityにいる人、一人一人を感動させていってください。</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87); text-align: left;">その分、自分一人では思いつかなかった考え方と出会える未来が広がります。</div>
</div>

        </td>
      </tr>
    </table>

    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="padding:50px 0px 18px 0px;line-height:22px;text-align:inherit;background-color:#ffffff;"
            height="100%"
            valign="top"
            bgcolor="#ffffff">
            <div style="text-align: center;"><span style="font-size:18px;"><strong style="color: #FFB100;">2. Selfinityはこれからどうなっていくのか</strong></span></div>
        </td>
      </tr>
    </table>

    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="background-color:#ffffff;padding:0px 0px 0px 0px;line-height:35px;text-align:justify;"
            height="100%"
            valign="top"
            bgcolor="#ffffff">
            <div>Selfinityは6月から約2ヶ月のサイレントローンチ期間を経て、現在に至っています。</div>

<div>そして重大な発表があります...</div>
        </td>
      </tr>
    </table>

    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="padding:24px 24px 18px 24px;line-height:32px;text-align:inherit;background-color:#ffffff;"
            height="100%"
            valign="top"
            bgcolor="#ffffff">
            <div style="text-align: center;"><span style="font-weight: 600; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104); text-align: center;"><span style="font-size: 22px;">🎉 Selfinityは8/19に日本でリリースします 🎉</span></span></div>

<div style="text-align: center;"><span style="color: rgb(16, 62, 104); font-family: helvetica, arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; text-align: center;">----------------------------------------------------------------------------------------------------------</span></div>

<div style="text-align: center;"><span style="font-size:18px;"><strong>8/19の15時にTwitter・Facebookでリリースを告知します</strong></span></div>

<div style="text-align: center;"><span style="font-size:18px;"><strong>是非みなさん拡散・いいねのご協力をお願いします！</strong></span></div>

<div style="text-align: center;">&nbsp;</div>

<div style="text-align: center;"><span style="font-size:18px;"><strong>Facebook:</strong></span><strong><span style="color: rgb(5, 50, 87); font-family: helvetica, arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; text-align: center;">&nbsp;</span><a href="https://www.facebook.com/profile.php?id=100021830537085" style="background-color: rgb(255, 255, 255); font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; text-align: center;">https://www.facebook.com/profile.php?id=100021830537085</a></strong></div>

<div style="text-align: center;"><span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 18px; color: rgb(5, 50, 87); text-align: center;"><span style="font-weight: 600; background: transparent; font-size: inherit; color: inherit;">Twitter:</span></span><span style="font-weight: 600; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87); text-align: center;"><span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px;">&nbsp;</span></span><a href="https://twitter.com/Zakk227056">https://twitter.com/Zakk227056</a></div>

<div style="text-align: center;">&nbsp;</div>

<div style="text-align: center;"><span style="font-weight: 600; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: helvetica, arial, sans-serif; font-size: 18px; color: rgb(5, 50, 87); text-align: center;">みなさんのいいねと拡散がスタートダッシュの鍵です！</span></div>

<div style="text-align: center;"><span style="font-weight: 600; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: helvetica, arial, sans-serif; font-size: 18px; color: rgb(5, 50, 87); text-align: center;">ご協力をお願いします！</span></div>

<div style="text-align: center;"><span style="color: rgb(16, 62, 104); font-family: helvetica, arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; text-align: center;">----------------------------------------------------------------------------------------------------------</span></div>
        </td>
      </tr>
    </table>

    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="background-color:#ffffff;padding:0px 0px 20px 0px;line-height:35px;text-align:justify;"
            height="100%"
            valign="top"
            bgcolor="#ffffff">
            <div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87);">本当に大変お待たせいたしました。</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87);">少なくとも皆さんのメッセージがなくてはここまでプランやサービスを仕上げることはできませんでした。本当にありがとうございます。</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87);">この御礼はしっかりサービスで返したいと思います。</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87);">&nbsp;</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87);">サイレントローンチ期間では約100人の方々に、しっかり僕や関係者が足を動かし、できる限り口で直接説明し、気持ちを込めてSelfinityのご利用を促してきました。</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87);">あなたを含めるこの100人は僕にとって貴重な理解者であり人生の宝物だと思っています。</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87);">僕の成長を知り、僕の活動を知り、僕のこれからを知る人は世界に100人だけです。</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87);">僕は今まで人とのつながりに助けられました。</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87);">そしてこれからも皆さんと一緒に成長していきたいと思います。</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87);">&nbsp;</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87);"><span style="color: rgb(5, 50, 87); font-family: helvetica, arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400;">Selfinityはまだまだ拙い部分はあると思いますが、改善に努めさせていただきます。</span></div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87);">是非皆さんにはこれからもSelfinityをご利用いただきたいと思います。</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87);">&nbsp;</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87);">１つでもいいので、他のコンテンツにメッセージを出してみたり、新たに議論を開いてみたり、好きな人にリクエストで<span style="color: rgb(5, 50, 87); font-family: helvetica, arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400;">聞きたいこと聞いてみたり</span>。</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87);"><strong>まずは聞き手の心にササるメッセージを出してスーパーグッドを一つ貰うことを目標にするといいかもしれません。</strong></div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87);">&nbsp;</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87);">是非、このサービスであなたの優しさや考えを形にして、また新たな人生の歩み方を見つけていってください。</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87);">今まで本当にありがとうございました。</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87);">そしてこれからもよろしくお願いします。</div>
        </td>
      </tr>
    </table>
  <table border="0" cellPadding="0" cellSpacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed" width="100%"><tbody><tr><td align="center" bgcolor="#ffffff" class="outer-td" style="padding:10px 0px 50px 0px;background-color:#ffffff"><table border="0" cellPadding="0" cellSpacing="0" class="button-css__deep-table___2OZyb wrapper-mobile" style="text-align:center"><tbody><tr><td align="center" bgcolor="#FFB100" class="inner-td" style="border-radius:6px;font-size:16px;text-align:center;background-color:inherit"><a style="background-color:#FFB100;border:1px solid #FFB100;border-color:#FFB100;border-radius:2px;border-width:1px;color:#FFFFFF;display:inline-block;font-family:verdana,geneva,sans-serif;font-size:16px;font-weight:bold;letter-spacing:0px;line-height:40px;padding:05px 30px 05px 30px;text-align:center;text-decoration:none" href="https://selfinity.me" target="_blank">アプリを確認</a></td></tr></tbody></table></td></tr></tbody></table>
    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="background-color:#ffffff;padding:0px 0px 20px 0px;line-height:35px;text-align:justify;"
            height="100%"
            valign="top"
            bgcolor="#ffffff">
            <div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400;"><span style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; text-align: start;">==============================</span><wbr style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small; text-align: start;"><span style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; text-align: start;">==============</span>

<div style="text-align: start;"><span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400;"><font color="#222222" face="Arial, Helvetica, sans-serif" size="2">株式会社Selfinity</font></span></div>

<div style="text-align: start;"><font color="#222222" face="Arial, Helvetica, sans-serif" size="2">メールの通知を解除したい場合:&nbsp;</font><a href="{unsubscribe_url}">こちらをクリック</a></div>

<div style="text-align: start;"><span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400;"><font color="#222222" face="Arial, Helvetica, sans-serif" size="2">お問い合わせ・会社住所:&nbsp;</font></span><a href="https://selfinity.me/contact">https://selfinity.me/contact</a></div>

<div style="text-align: start;"><font color="#222222" face="Arial, Helvetica, sans-serif" size="2">利用規約:&nbsp;</font><a href="https://selfinity.me/term">https://selfinity.me/term</a></div>

<div style="text-align: start;"><span style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; text-align: start;">プライバシーポリシー:</span>&nbsp;<a href="https://selfinity.me/privacy">https://selfinity.me/privacy</a></div>

<div style="text-align: start;"><strong>このメールはサービスの変更に関わる重要な通知なのでSelfinityのユーザー全員にお送りしています。ご了承ください。</strong></div>
<span style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; text-align: start;">==============================</span><wbr style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small; text-align: start;"><span style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; text-align: start;">==============</span></div>
        </td>
      </tr>
    </table>

                              </td>
                            </tr>
                          </table>
                          <!--[if mso]>
                          </td></tr></table>
                          </center>
                          <![endif]-->
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </center>
  </body>
</html>
`;

const open_call_template = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" /><!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" /><!--<![endif]-->
    <!--[if (gte mso 9)|(IE)]>
    <xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <!--[if (gte mso 9)|(IE)]>
    <style type="text/css">
      body {width: 600px;margin: 0 auto;}
      table {border-collapse: collapse;}
      table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
      img {-ms-interpolation-mode: bicubic;}
    </style>
    <![endif]-->

    <style type="text/css">
      body, p, div {
        font-family: helvetica,arial,sans-serif;
        font-size: 14px;
      }
      body {
        color: #103e68;
      }
      body a {
        color: #ffb100;
        text-decoration: none;
      }
      p { margin: 0; padding: 0; }
      table.wrapper {
        width:100% !important;
        table-layout: fixed;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      img.max-width {
        max-width: 100% !important;
      }
      .column.of-2 {
        width: 50%;
      }
      .column.of-3 {
        width: 33.333%;
      }
      .column.of-4 {
        width: 25%;
      }
      @media screen and (max-width:480px) {
        .preheader .rightColumnContent,
        .footer .rightColumnContent {
            text-align: left !important;
        }
        .preheader .rightColumnContent div,
        .preheader .rightColumnContent span,
        .footer .rightColumnContent div,
        .footer .rightColumnContent span {
          text-align: left !important;
        }
        .preheader .rightColumnContent,
        .preheader .leftColumnContent {
          font-size: 80% !important;
          padding: 5px 0;
        }
        table.wrapper-mobile {
          width: 100% !important;
          table-layout: fixed;
        }
        img.max-width {
          height: auto !important;
          max-width: 480px !important;
        }
        a.bulletproof-button {
          display: block !important;
          width: auto !important;
          font-size: 80%;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .columns {
          width: 100% !important;
        }
        .column {
          display: block !important;
          width: 100% !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
      }
    </style>
    <!--user entered Head Start-->

     <!--End Head user entered-->
  </head>
  <body>
    <center class="wrapper" data-link-color="#ffb100" data-body-style="font-size: 14px; font-family: helvetica,arial,sans-serif; color: #103e68; background-color: #ffffff;">
      <div class="webkit">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#ffffff">
          <tr>
            <td valign="top" bgcolor="#ffffff" width="100%">
              <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="100%">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <!--[if mso]>
                          <center>
                          <table><tr><td width="600">
                          <![endif]-->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width:600px;" align="center">
                            <tr>
                              <td role="modules-container" style="padding: 0px 10px 0px 10px; color: #103e68; text-align: left;" bgcolor="#FFFFFF" width="100%" align="left">

    <table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%"
           style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
      <tr>
        <td role="module-content">
          <p></p>
        </td>
      </tr>
    </table>

    <table class="module"
           role="module"
           data-type="spacer"
           border="0"
           cellpadding="0"
           cellspacing="0"
           width="100%"
           style="table-layout: fixed;">
      <tr>
        <td style="padding:0px 0px 50px 0px;"
            role="module-content"
            bgcolor="">
        </td>
      </tr>
    </table>

    <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="font-size:6px;line-height:10px;padding:0px 0px 0px 0px;" valign="top" align="center">
          <img class="max-width" border="0" style="display:block;color:#000000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:40% !important;width:40%;height:auto !important;" src="https://selfinity.me/images/selfinity-logo.png" alt="" width="232">
        </td>
      </tr>
    </table>

    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="background-color:#ffffff;padding:50px 0px 20px 0px;line-height:35px;text-align:justify;"
            height="100%"
            valign="top"
            bgcolor="#ffffff">
            <div style="text-align: center;"><strong><span style="font-size:28px;">Selfinityの公開の通知</span></strong></div>

        </td>
      </tr>
    </table>

    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="padding:24px 24px 18px 24px;line-height:32px;text-align:inherit;background-color:#ffffff;"
            height="100%"
            valign="top"
            bgcolor="#ffffff">
            <div style="text-align: center;"><span style="font-weight: 600; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104); text-align: center;"><span style="font-size: 22px;">🎉 Selfinityは8/19に日本でリリースします 🎉</span></span></div>

<div style="text-align: center;"><span style="color: rgb(16, 62, 104); font-family: helvetica, arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; text-align: center;">----------------------------------------------------------------------------------------------------------</span></div>

<div style="text-align: center;"><span style="font-size:18px;"><strong>8/19の15時にTwitter・Facebookでリリースを告知します</strong></span></div>

<div style="text-align: center;"><span style="font-size:18px;"><strong>是非みなさん拡散・いいねのご協力をお願いします！</strong></span></div>

<div style="text-align: center;">&nbsp;</div>

<div style="text-align: center;"><span style="font-size:18px;"><strong>Facebook:</strong></span><strong><span style="color: rgb(5, 50, 87); font-family: helvetica, arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; text-align: center;">&nbsp;</span><a href="https://www.facebook.com/profile.php?id=100021830537085" style="background-color: rgb(255, 255, 255); font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; text-align: center;">https://www.facebook.com/profile.php?id=100021830537085</a></strong></div>

<div style="text-align: center;"><span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 18px; color: rgb(5, 50, 87); text-align: center;"><span style="font-weight: 600; background: transparent; font-size: inherit; color: inherit;">Twitter:</span></span><span style="font-weight: 600; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87); text-align: center;"><span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px;">&nbsp;</span></span><a href="https://twitter.com/Zakk227056">https://twitter.com/Zakk227056</a></div>

<div style="text-align: center;">&nbsp;</div>

<div style="text-align: center;"><span style="font-weight: 600; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: helvetica, arial, sans-serif; font-size: 18px; color: rgb(5, 50, 87); text-align: center;">みなさんのいいねと拡散がスタートダッシュの鍵です！</span></div>

<div style="text-align: center;"><span style="font-weight: 600; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: helvetica, arial, sans-serif; font-size: 18px; color: rgb(5, 50, 87); text-align: center;">ご協力をお願いします！</span></div>

<div style="text-align: center;"><span style="color: rgb(16, 62, 104); font-family: helvetica, arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; text-align: center;">----------------------------------------------------------------------------------------------------------</span></div>

        </td>
      </tr>
    </table>

    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="background-color:#ffffff;padding:0px 0px 20px 0px;line-height:35px;text-align:justify;"
            height="100%"
            valign="top"
            bgcolor="#ffffff">
            <div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87);">ぜひ協力お願いします！</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87);">また今日からユーザーの増加が見込めるので、是非Selfinityで色々なユーザーとか関わってみてください！</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87);">皆さんも一緒にSelfinityを盛り上げていきましょう！</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(5, 50, 87);">これからもSelfinityを宜しくおねがいします！</div>

        </td>
      </tr>
    </table>
  <table border="0" cellPadding="0" cellSpacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed" width="100%"><tbody><tr><td align="center" bgcolor="#ffffff" class="outer-td" style="padding:10px 0px 50px 0px;background-color:#ffffff"><table border="0" cellPadding="0" cellSpacing="0" class="button-css__deep-table___2OZyb wrapper-mobile" style="text-align:center"><tbody><tr><td align="center" bgcolor="#FFB100" class="inner-td" style="border-radius:6px;font-size:16px;text-align:center;background-color:inherit"><a style="background-color:#FFB100;border:1px solid #FFB100;border-color:#FFB100;border-radius:2px;border-width:1px;color:#FFFFFF;display:inline-block;font-family:verdana,geneva,sans-serif;font-size:16px;font-weight:bold;letter-spacing:0px;line-height:40px;padding:05px 30px 05px 30px;text-align:center;text-decoration:none" href="https://selfinity.me" target="_blank">アプリを確認</a></td></tr></tbody></table></td></tr></tbody></table>
    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="background-color:#ffffff;padding:0px 0px 20px 0px;line-height:35px;text-align:justify;"
            height="100%"
            valign="top"
            bgcolor="#ffffff">
            <div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400;"><span style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; text-align: start;">==============================</span><wbr style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small; text-align: start;"><span style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; text-align: start;">==============</span>

<div style="text-align: start;"><span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400;"><font color="#222222" face="Arial, Helvetica, sans-serif" size="2">株式会社Selfinity</font></span></div>

<div style="text-align: start;"><span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400;"><font color="#222222" face="Arial, Helvetica, sans-serif" size="2">お問い合わせ・会社住所:&nbsp;</font></span><a href="https://selfinity.me/contact">https://selfinity.me/contact</a></div>

<div style="text-align: start;"><font color="#222222" face="Arial, Helvetica, sans-serif" size="2">メールの通知を解除したい場合:&nbsp;</font><a href="{unsubscribe_url}">こちらをクリック</a></div>

<div style="text-align: start;"><font color="#222222" face="Arial, Helvetica, sans-serif" size="2">利用規約:&nbsp;</font><a href="https://selfinity.me/term">https://selfinity.me/term</a></div>


<div style="text-align: start;"><span style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; text-align: start;">プライバシーポリシー:</span>&nbsp;<a href="https://selfinity.me/privacy">https://selfinity.me/privacy</a></div>

<div style="text-align: start;"><strong>このメールはサービスの変更に関わる重要な通知なのでSelfinityのユーザー全員にお送りしています。ご了承ください。</strong></div>
<span style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; text-align: start;">==============================</span><wbr style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small; text-align: start;"><span style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; text-align: start;">==============</span></div>
        </td>
      </tr>
    </table>

                              </td>
                            </tr>
                          </table>
                          <!--[if mso]>
                          </td></tr></table>
                          </center>
                          <![endif]-->
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </center>
  </body>
</html>
`;

const fix_for_talk_template = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" /><!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" /><!--<![endif]-->
    <!--[if (gte mso 9)|(IE)]>
    <xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <!--[if (gte mso 9)|(IE)]>
    <style type="text/css">
      body {width: 600px;margin: 0 auto;}
      table {border-collapse: collapse;}
      table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
      img {-ms-interpolation-mode: bicubic;}
    </style>
    <![endif]-->

    <style type="text/css">
      body, p, div {
        font-family: helvetica,arial,sans-serif;
        font-size: 14px;
      }
      body {
        color: #103e68;
      }
      body a {
        color: #ffb100;
        text-decoration: none;
      }
      p { margin: 0; padding: 0; }
      table.wrapper {
        width:100% !important;
        table-layout: fixed;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      img.max-width {
        max-width: 100% !important;
      }
      .column.of-2 {
        width: 50%;
      }
      .column.of-3 {
        width: 33.333%;
      }
      .column.of-4 {
        width: 25%;
      }
      @media screen and (max-width:480px) {
        .preheader .rightColumnContent,
        .footer .rightColumnContent {
            text-align: left !important;
        }
        .preheader .rightColumnContent div,
        .preheader .rightColumnContent span,
        .footer .rightColumnContent div,
        .footer .rightColumnContent span {
          text-align: left !important;
        }
        .preheader .rightColumnContent,
        .preheader .leftColumnContent {
          font-size: 80% !important;
          padding: 5px 0;
        }
        table.wrapper-mobile {
          width: 100% !important;
          table-layout: fixed;
        }
        img.max-width {
          height: auto !important;
          max-width: 480px !important;
        }
        a.bulletproof-button {
          display: block !important;
          width: auto !important;
          font-size: 80%;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .columns {
          width: 100% !important;
        }
        .column {
          display: block !important;
          width: 100% !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
      }
    </style>
    <!--user entered Head Start-->

     <!--End Head user entered-->
  </head>
  <body>
    <center class="wrapper" data-link-color="#ffb100" data-body-style="font-size: 14px; font-family: helvetica,arial,sans-serif; color: #103e68; background-color: #ffffff;">
      <div class="webkit">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#ffffff">
          <tr>
            <td valign="top" bgcolor="#ffffff" width="100%">
              <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="100%">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <!--[if mso]>
                          <center>
                          <table><tr><td width="600">
                          <![endif]-->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width:600px;" align="center">
                            <tr>
                              <td role="modules-container" style="padding: 0px 10px 0px 10px; color: #103e68; text-align: left;" bgcolor="#FFFFFF" width="100%" align="left">

    <table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%"
           style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
      <tr>
        <td role="module-content">
          <p></p>
        </td>
      </tr>
    </table>

    <table class="module"
           role="module"
           data-type="spacer"
           border="0"
           cellpadding="0"
           cellspacing="0"
           width="100%"
           style="table-layout: fixed;">
      <tr>
        <td style="padding:0px 0px 50px 0px;"
            role="module-content"
            bgcolor="">
        </td>
      </tr>
    </table>

    <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="font-size:6px;line-height:10px;padding:0px 0px 0px 0px;" valign="top" align="center">
          <img class="max-width" border="0" style="display:block;color:#000000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:40% !important;width:40%;height:auto !important;" src="https://selfinity.me/images/selfinity-logo.png" alt="" width="232">
        </td>
      </tr>
    </table>

    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="background-color:#ffffff;padding:50px 0px 20px 0px;line-height:35px;text-align:justify;"
            height="100%"
            valign="top"
            bgcolor="#ffffff">
            <div style="text-align: center;"><strong><span style="font-size:28px;">Selfinityのサービス改善・変更の御報告</span></strong></div>
        </td>
      </tr>
    </table>

    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="background-color:#ffffff;padding:0px 0px 40px 0px;line-height:35px;text-align:justify;"
            height="100%"
            valign="top"
            bgcolor="#ffffff">
            <div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104); text-align: center;padding:0px40px0px40px">
<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104); text-align: left;">Selfinityをご利用の皆さん。こんにちは。株式会社Selfinityの代表取締役を務めさせて頂いている宮崎翔太です。</div>
</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104);">Selfinityは一般公開して3週間も経ってないですが目まぐるしいスピードで進化しています。</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104);">というのも、自分自身が今までのSelfinityに全く満足ができていなかったこともありながら</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104);">、今回皆さんにご利用頂いたことで自分の目指すビジョンというものがさらに鮮明になりました。</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104);">今回はユーザーの反応を見て大幅にサービスの方向性も変更しましたので、是非御理解いただけると幸いです。</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104);"><span style="color: rgb(16, 62, 104); font-family: helvetica, arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; text-align: left;">これも皆さんのご利用のお陰です。皆さんがSelfinityを利用して得た楽しさから不満な点まで自分がすべて責任を持って把握し、日々改善しています。決して皆さんのご利用は無駄ではなく進歩に変わっています。ですので、これからも進化していくSelfinityのご利用をお願いします。</span></div>

        </td>
      </tr>
    </table>

    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="padding:18px 0px 18px 0px;line-height:22px;text-align:inherit;background-color:#ffffff;"
            height="100%"
            valign="top"
            bgcolor="#ffffff">
            <div style="text-align: center;"><span style="font-size:18px;"><strong style="color:#FFB100;">Selfinityは会話の売買を行うオープンチャットSNSに進化</strong></span></div>
        </td>
      </tr>
    </table>

    <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="font-size:6px;line-height:10px;padding:10px 0px 10px 0px;" valign="top" align="center">
          <img class="max-width" border="0" style="display:block;color:#000000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:90% !important;width:90%;height:auto !important;" src="https://selfinity.me/images/brands/ja/priceless-payment-lighting.png" alt="" width="522">
        </td>
      </tr>
    </table>

    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="background-color:#ffffff;padding:0px 0px 40px 0px;line-height:35px;text-align:justify;"
            height="100%"
            valign="top"
            bgcolor="#ffffff">
            <div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104); text-align: center;padding:0px40px0px40px">
<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104); text-align: left;">Selfinityは会話の価値とお金の価値を結びつけるという理念のもと、会話の売買ができるオープンチャットSNSに進化しました。</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104); text-align: left;">チャットは主に掲示板形式で行います。</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104); text-align: left;">方向性をはっきりさせ、実は機能自体は大幅に減らしており、できる限り機能を統合し、皆さんの慣れ親しんだ名前に変え、よりシンプルになっております。</div>

<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104); text-align: left;">また機能横には？マークがついており、その？マークを押すと機能の説明が出てくるようになっています。日進月歩でUX改善を行っておりますので、安心してご利用ください。</div>
</div>
        </td>
      </tr>
    </table>

    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="padding:18px 0px 0px 0px;line-height:22px;text-align:inherit;background-color:#ffffff;"
            height="100%"
            valign="top"
            bgcolor="#ffffff">
            <div style="text-align: center;"><span style="font-size:18px;"><strong style="color:#FFB100;">使用方法</strong></span></div>

<div style="text-align: center;"><span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104);"><font color="#222222" face="Arial, Helvetica, sans-serif" size="2">使用方法はこちらにも記しております:&nbsp;</font></span><a href="https://selfinity.me/welcome" style="background-color: rgb(255, 255, 255); font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px;">https://selfinity.me/welcome/</a></div>

<div>&nbsp;</div>

<ol>
  <li style="text-align: center;">ユーザーと会話でいいねをあげる・もらうとSelfinity上の独自通貨Selfが貰えます</li>
  <li style="text-align: center;">Selfを使って好きな人と好きな話題で喋られるチケットを購入できます。</li>
</ol>

<div style="text-align: center;">&nbsp;</div>

<div style="text-align: left;">以上です。機能と無駄な数字を減らしシンプルにしました。</div>

<div style="text-align: left;">2のチケット購入は自分以外のユーザー画面の横にある青いボタンを押すと行えます。オークション形式ですので高い額を入札するほどリクエストに答えてくれやすくなります。</div>

<div>&nbsp;</div>
        </td>
      </tr>
    </table>

    <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="font-size:6px;line-height:10px;padding:10px 0px 0px 0px;" valign="top" align="center">
          <img class="max-width" border="0" style="margin-bottom:44px;display:block;color:#000000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;" src="https://selfinity.me/images/brands/bid-function.png" alt="" width="200" height="420">
        </td>
      </tr>
    </table>

    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="background-color:#ffffff;padding:0px 0px 40px 0px;line-height:35px;text-align:justify;"
            height="100%"
            valign="top"
            bgcolor="#ffffff">
            <div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104); text-align: center;padding:0px40px0px40px">
<div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: helvetica, arial, sans-serif; font-size: 14px; color: rgb(16, 62, 104); text-align: left;">やっとSelfinityが目指すものへの方針を形にでき、いよいよ本格的にマネジメントしていく予定です。サービスの運営自体は未熟な点が御座いますが、これからも破竹の勢いで進化してまいりますので、是非ご協力とご理解の程宜しくお願いします。</div>
</div>
        </td>
      </tr>
    </table>
  <table border="0" cellPadding="0" cellSpacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed" width="100%"><tbody><tr><td align="center" bgcolor="#ffffff" class="outer-td" style="padding:10px 0px 50px 0px;background-color:#ffffff"><table border="0" cellPadding="0" cellSpacing="0" class="button-css__deep-table___2OZyb wrapper-mobile" style="text-align:center"><tbody><tr><td align="center" bgcolor="#FFB100" class="inner-td" style="border-radius:6px;font-size:16px;text-align:center;background-color:inherit"><a style="background-color:#FFB100;border:1px solid #FFB100;border-color:#FFB100;border-radius:2px;border-width:1px;color:#FFFFFF;display:inline-block;font-family:verdana,geneva,sans-serif;font-size:16px;font-weight:bold;letter-spacing:0px;line-height:40px;padding:05px 30px 05px 30px;text-align:center;text-decoration:none" href="https://selfinity.me" target="_blank">アプリを確認</a></td></tr></tbody></table></td></tr></tbody></table>
    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="background-color:#ffffff;padding:0px 0px 20px 0px;line-height:35px;text-align:justify;"
            height="100%"
            valign="top"
            bgcolor="#ffffff">
            <div style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400;"><span style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; text-align: start;">==============================</span><wbr style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small; text-align: start;"><span style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; text-align: start;">==============</span>

<div style="text-align: start;"><span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400;"><font color="#222222" face="Arial, Helvetica, sans-serif" size="2">株式会社Selfinity</font></span></div>

<div style="text-align: start;"><span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400;"><font color="#222222" face="Arial, Helvetica, sans-serif" size="2">お問い合わせ・会社住所:&nbsp;</font></span><a href="https://selfinity.me/contact">https://selfinity.me/contact</a></div>

<div style="text-align: start;"><font color="#222222" face="Arial, Helvetica, sans-serif" size="2">メールの通知を解除したい場合:&nbsp;</font><a href="{unsubscribe_url}">こちらをクリック</a></div>

<div style="text-align: start;"><font color="#222222" face="Arial, Helvetica, sans-serif" size="2">利用規約:&nbsp;</font><a href="https://selfinity.me/term">https://selfinity.me/term</a></div>

<div style="text-align: start;"><span style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; text-align: start;">プライバシーポリシー:</span>&nbsp;<a href="https://selfinity.me/privacy">https://selfinity.me/privacy</a></div>

<div style="text-align: start;"><strong>このメールはサービスの変更に関わる重要な通知なのでSelfinityのユーザー全員にお送りしています。ご了承ください。</strong></div>
<span style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; text-align: start;">==============================</span><wbr style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small; text-align: start;"><span style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; text-align: start;">==============</span></div>
        </td>
      </tr>
    </table>

                              </td>
                            </tr>
                          </table>
                          <!--[if mso]>
                          </td></tr></table>
                          </center>
                          <![endif]-->
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </center>
  </body>
</html>
`;

export const templates = {
    content_notification: base_template,
    content_call_notification: base_template,
    opinion_notification: base_template,
    answer_notification: base_template,
    request_notification: base_template,
    good_notification: base_template,
    good_opinion_notification: base_template,
    good_answer_notification: base_template,
    cheering_notification: base_template,
    token_notification: base_template,
    open_campaign: open_campaign_template,
    open_call: open_call_template,
    fix_for_talk: fix_for_talk_template,
    daily_summary_notification: summary_template,
    daily_opinion_notification: summary_template,
};

/*<tr>
  <td class="content-block powered-by">
    Powered by <a href="http://htmlemail.io">HTMLemail</a>.
  </td>
</tr>*/

module.exports = {
    templates,
};
