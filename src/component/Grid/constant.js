export default {
    Loading: {
        type: 'Loading',
        lib: 'jmtd',
        path: '0',
        props: {
            size: 'large',
            tip: '我是一个loading',
            loading: true
        }
    },
    Title: {
        type: 'Title',
        lib: 'jmtd',
        path: '0',
        props: {
            level: 1
        },
        children: '一级标题【H1. Heading】'
    },
    Form: {
        type: 'Form',
        lib: 'jmtd',
        path: '0',
        items: [
            {
                type: 'FormItem',
                lib: 'jmtd',
                props: {
                    label: '标题'
                },
                path: '0-0',
                items: [
                    {
                        type: 'Input',
                        path: '0-0-0',
                        lib: 'jmtd'
                    }
                ]
            },
            {
                type: 'FormItem',
                lib: 'jmtd',
                props: {
                    label: '姓名',
                    required: true
                },
                path: '0-1',
                items: [
                    {
                        type: 'Input',
                        path: '0-1-0',
                        lib: 'jmtd'
                    }
                ]
            },
            {
                type: 'FormButtons',
                lib: 'jmtd',
                path: '0-2',
                items: [
                    {
                        type: 'Button',
                        lib: 'jmtd',
                        props: {
                            outline: true
                        },
                        path: '0-2-0',
                        children: '取消'
                    },
                    {
                        type: 'Button',
                        lib: 'jmtd',
                        props: {
                            semantic: 'primary'
                        },
                        path: '0-2-1',
                        children: '确定'
                    }
                ]
            }
        ]
    }
    // Table: {
    //     type: 'Table',
    //     lib: 'jmtd',
    //     path: '0-2-2',
    //     props: {
    //         columns: [
    //             {
    //                 dataIndex: 'ShopName',
    //                 title: '店铺名称'
    //             },
    //
    //             {
    //                 dataIndex: 'ShopDealNum',
    //                 title: '成交单量',
    //                 align: 'right'
    //             },
    //
    //             {
    //                 dataIndex: 'DealNum',
    //                 title: '成交子单量',
    //                 align: 'right'
    //             }
    //         ],
    //         dataSource: [
    //             {
    //                 ShopName: '格力京东自营旗舰店',
    //                 ShopDealNum: 164193,
    //                 DealNum: 162957
    //             },
    //
    //             {
    //                 ShopName: '戴森京东自营官方旗舰店',
    //                 ShopDealNum: 26883,
    //                 DealNum: 26793
    //             },
    //
    //             {
    //                 ShopName: 'Apple产品京东自营旗舰店',
    //                 ShopDealNum: 51199,
    //                 DealNum: 50959
    //             },
    //
    //             {
    //                 ShopName: '美的京东自营官方旗舰店',
    //                 ShopDealNum: 348637,
    //                 DealNum: 345482
    //             },
    //
    //             {
    //                 ShopName: '飞利浦官方旗舰店',
    //                 ShopDealNum: 127810,
    //                 DealNum: 127123
    //             }
    //         ],
    //         size: 'small',
    //         bordered: true
    //     }
    // }
};
