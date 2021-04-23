export default {
    id: 'model1',
    name: '模板1号',
    description: '这是模板1号的样例数据',
    status: 'DRAFT',
    page: {
        type: 'Card',
        lib: 'jmtd',
        path: '0',
        style: {
            margin: '40px'
        },
        items: [
            // {
            //     type: 'Row',
            //     lib: 'jmtd',
            //     props: {
            //         align: 'middle',
            //         justify: 'space-between'
            //     },
            //     style: {
            //         padding: '40px',
            //         margin: '40px',
            //         border: '1px solid pink'
            //     },
            //     items: [
            //         {
            //             type: 'Col',
            //             lib: 'jmtd',
            //             props: {
            //                 span: 6
            //                 // offset: 2
            //             },
            //             style: {
            //                 border: '1px solid #cccccc'
            //             },
            //             items: [
            //                 {
            //                     type: 'Empty',
            //                     lib: 'jmtd',
            //                     props: {
            //                         description: '我是1号'
            //                     }
            //                 }
            //             ]
            //         },
            //         {
            //             type: 'Col',
            //             lib: 'jmtd',
            //             props: {
            //                 span: 6
            //                 // offset: 2
            //             },
            //             style: {
            //                 border: '1px solid #cccccc'
            //             },
            //             items: [
            //                 {
            //                     type: 'Empty',
            //                     lib: 'jmtd',
            //                     props: {
            //                         description: '我是2号'
            //                     }
            //                 }
            //             ]
            //         },
            //         {
            //             type: 'Col',
            //             lib: 'jmtd',
            //             props: {
            //                 span: 6
            //                 // offset: 2
            //             },
            //             style: {
            //                 border: '1px solid #cccccc'
            //             },
            //             items: [
            //                 {
            //                     type: 'Empty',
            //                     lib: 'jmtd',
            //                     props: {
            //                         description: '我是3号'
            //                     }
            //                 }
            //             ]
            //         },
            //         {
            //             type: 'Col',
            //             lib: 'jmtd',
            //             props: {
            //                 span: 6
            //                 // offset: 2
            //             },
            //             style: {
            //                 border: '1px solid #cccccc'
            //             },
            //             items: [
            //                 {
            //                     type: 'Empty',
            //                     lib: 'jmtd',
            //                     props: {
            //                         description: '放到这里来'
            //                     }
            //                 }
            //             ]
            //         }
            //     ]
            // },
            {
                type: 'Row',
                lib: 'jmtd',
                path: '0-0',
                props: {
                    align: 'middle',
                    justify: 'center'
                },
                className: 'rowMain',
                style: {
                    padding: '10px'
                },
                items: [
                    {
                        type: 'Col',
                        lib: 'jmtd',
                        path: '0-0-0',
                        props: {
                            span: 4
                        },
                        className: 'col1',
                        style: {
                            border: '1px solid #cccccc'
                        },
                        items: [
                            {
                                type: 'Empty',
                                lib: 'jmtd',
                                path: '0-0-0-1',
                                props: {
                                    description: '我是1号'
                                }
                            }
                        ]
                    },
                    {
                        type: 'Col',
                        lib: 'jmtd',
                        path: '0-0-0-2',
                        props: {
                            span: 4,
                            offset: 2
                        },
                        className: 'col2',
                        style: {
                            border: '1px solid #cccccc'
                        },
                        items: [
                            {
                                type: 'Empty',
                                lib: 'jmtd',
                                path: '0-0-0-2-0',
                                props: {
                                    description: '我是2号'
                                }
                            }
                        ]
                    },
                    {
                        type: 'Col',
                        path: '0-0-0-3',
                        lib: 'jmtd',
                        props: {
                            span: 4,
                            offset: 2
                        },
                        className: 'col3',
                        style: {
                            border: '1px solid #cccccc'
                        },
                        items: [
                            {
                                type: 'Empty',
                                lib: 'jmtd',
                                path: '0-0-0-3-0',
                                props: {
                                    description: '我是3号'
                                }
                            }
                        ]
                    },
                    {
                        type: 'Col',
                        path: '0-0-0-4',
                        lib: 'jmtd',
                        props: {
                            span: 4,
                            offset: 2
                        },
                        className: 'col4',
                        style: {
                            border: '1px solid #cccccc'
                        },
                        items: [
                            {
                                type: 'Empty',
                                lib: 'jmtd',
                                path: '0-0-0-4-0',
                                props: {
                                    description: '放到这里来'
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
};
