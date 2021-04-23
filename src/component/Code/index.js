import { Controlled as CodeMirror } from 'react-codemirror2';
import { Row, Col } from '@jd/jmtd';
import ReactDOMServer from 'react-dom/server';
// import * as Babel from '@babel/standalone';
import { useEffect, useState } from 'react';
import { baseScriptCode } from './baseCode';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/mode/javascript/javascript.js');
require('codemirror/mode/jsx/jsx.js');
require('codemirror/mode/css/css.js');
import './index.scss';
import { baseJsxCode, getJsxCode } from './utils';
// baseJsxCode({ output: getJsxCode(page) })

const Code = ({ page }) => {
    if (!page) {
        return null;
    }
    // 绑定 input
    const [jsxCode, setJsxCode] = useState(baseJsxCode({ output: getJsxCode(page) }));
    const [initTransFormCode, setIfromCode] = useState();

    useEffect(() => {
        setJsxCode(baseJsxCode({ output: getJsxCode(page) }));
    }, [page]);
    const jsxCodeTransform = input => {
        // const afterCode = Babel.transform(input, { presets: ['react', 'es2015'] }).code;
        const afterCode = ReactDOMServer.renderToString(input);
        debugger;
        return afterCode;
    };

    const transFormJsxCode = input => {
        console.log(input);
        try {
            const outputCode = jsxCodeTransform(input);
            return outputCode;
        } catch (e) {
            console.log(e);
            return null;
        }
    };
    useEffect(() => {
        const initCodeContent = transFormJsxCode(jsxCode);
        const initCode = `
        ${baseScriptCode}
        <script>${initCodeContent}</script>
      `;
        setIfromCode(initCode);
    }, []);

    const handleInputCode = (value, type) => {
        console.log('jsxCode', value);
        setJsxCode(value);
    };

    const postCodeToIframe = type => {
        const code = transFormJsxCode(jsxCode);
        if (type === 'jsxCode') {
            document.getElementById('preview').contentWindow.postMessage(
                {
                    type: 'jsxCode',
                    content: code
                },
                '*'
            );
        }
        // else if (type === 'cssCode') {
        // document.getElementById('preview').contentWindow.postMessage(
        //     {
        //         type: 'cssCode',
        //         content: cssCode
        //     },
        //     '*'
        // );
        // }
    };

    // 保存代码：1. 传入到iframe；2.保存到OSS
    const handleSaveCode = (e, type) => {
        if (e.keyCode === 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
            e.preventDefault();
            postCodeToIframe(type);
            // uploadOriginCodeToOss();
            // this.setState({
            //     [`${type}Saved`]: true
            // });
        }
    };

    return (
        <Row>
            <Col span={12}>
                <CodeMirror
                    value={jsxCode}
                    className="code-container"
                    options={{
                        mode: 'jsx',
                        theme: 'material',
                        lineNumbers: true
                    }}
                    onBeforeChange={(editor, data, value) => {
                        handleInputCode(value, 'jsxCode');
                    }}
                    onKeyDown={(editor, event) => {
                        handleSaveCode(event, 'jsxCode');
                    }}
                />
            </Col>
            <Col span={12}>
                <iframe className="preview-browser" title="online" id="preview" srcDoc={initTransFormCode} />
            </Col>
        </Row>
    );
};

export default Code;
