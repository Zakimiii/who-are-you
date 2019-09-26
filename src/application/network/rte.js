import React, { Component } from 'react';
import Remarkable from 'remarkable';

const remarkable = new Remarkable({ html: true, linkify: false, breaks: true });

export const richTextEditor = process.env.BROWSER ? (
    require('react-rte-image').default
) : (
    <div />
);

export function stateFromHtml(RichTextEditor, html = null) {
    if (html == '') return RichTextEditor.createEmptyValue();
    if (!RichTextEditor) return null;
    if (html) html = stripHtmlWrapper(html);
    if (html && html.trim() == '') html = null;
    return html
        ? RichTextEditor.createValueFromString(html, 'html')
        : RichTextEditor.createEmptyValue();
}

export function stateToHtml(state) {
    let html = state.toString('html');
    if (html === '<p></p>') html = '';
    if (html === '<p><br></p>') html = '';
    if (html == '') return '';
    return `<html>\n${html}\n</html>`;
}

export function stripHtmlWrapper(text) {
    const m = text.match(/<html>\n*([\S\s]+?)?\n*<\/html>/m);
    return m && m.length === 2 ? m[1] : text;
}

export let saveEditorTimeout;

// removes <html></html> wrapper if exists

// See also MarkdownViewer render
export const isHtmlTest = text => /^<html>/.test(text);

// export function stateFromMarkdown(RichTextEditor, markdown) {
//     let html;
//     if (markdown && markdown.trim() !== '') {
//         html = remarkable.render(markdown);
//         html = HtmlReady(html).html; // TODO: option to disable youtube conversion, @-links, img proxy
//         //html = htmlclean(html) // normalize whitespace
//         console.log('markdown converted to:', html);
//     }
//     return stateFromHtml(RichTextEditor, html);
// }

module.exports = {
    richTextEditor,
    stateFromHtml,
    stateToHtml,
    //stateFromMarkdown,
    isHtmlTest,
    saveEditorTimeout,
};
