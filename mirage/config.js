export default function() {
    //You Code

    this.post('upload/cpa', (schema, request) => {
        
    });
    this.post('upload/gycx', (schema, request) => {

    });

    this.post('/query/sample/hospital-numbers',(schema, request) => {
        window.console.info(request.requestBody);
        return {
            'currentYear': [0, 0, 0, 0, 0, 0, 1080, 0, 0, 0, 0, 0],
            'lastYear': [1026, 602, 962, 632, 1002, 1008, 123, 520, 142, 112, 335, 509]
        }
    });

    this.post('/query/sample/product-numbers',(schema, request) => {
        window.console.info(request.requestBody);
        return {
            'currentYear': [0, 0, 0, 0, 0, 0, 520, 0, 0, 0, 0, 0],
            'lastYear': [350, 602, 620, 632, 1002, 852, 500, 520, 142, 112, 335, 509]
        }
    });

    this.post('/query/sample/sales-numbers',(schema, request) => {
        window.console.info(request.requestBody);
        return {
            'currentYear': [0, 0, 0, 0, 0, 0, 320, 0, 0, 0, 0, 0],
            'lastYear': [965, 602, 620, 632, 203, 852, 652, 123, 852, 112, 335, 509]
        }
    });

    this.post('/query/result/trend', (schema, request) => {
        window.console.info(request.requestBody);
        return {
            'date': ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011'],
            'marketSales': [209, 236, 325, 439, 507, 576, 722, 879, 938, 1364, 1806, 1851],
            'percent': [1, 13, 37, 35, 15, 13, 25, 21, 6, 45, 32, 2]
        }
    });

    this.post('/query/result/mirror', (schema, request) => {
        window.console.info(request.requestBody);
        return {
            'areaData': ["北京","上海","深圳","广州","南京","湖南", "河北", "白城", "泰州", "武汉"],
            'lastYear': [102, 201, 301, 40, 502, 153, 70, 85, 90, 100],
            'currentYear': [320, 50, 32, 402, 506, 321, 750, 80, 625, 103]
        }
    });

    this.post('/query/result/map', (schema, request) => {
        window.console.info(request.requestBody);
        function randomData() {
            return Math.round(Math.random()*10000);
        }
        return {
            'areaData': [
                {name: '北京',value: randomData() },
                {name: '天津',value: randomData() },
                {name: '上海',value: randomData() },
                {name: '重庆',value: randomData() },
                {name: '河北',value: randomData() },
                {name: '河南',value: randomData() },
                {name: '云南',value: randomData() },
                {name: '辽宁',value: randomData() },
                {name: '黑龙江',value: randomData() },
                {name: '湖南',value: randomData() },
                {name: '安徽',value: randomData() },
                {name: '山东',value: randomData() },
                {name: '新疆',value: randomData() },
                {name: '江苏',value: randomData() },
                {name: '浙江',value: randomData() },
                {name: '江西',value: randomData() },
                {name: '湖北',value: randomData() },
                {name: '广西',value: randomData() },
                {name: '甘肃',value: randomData() },
                {name: '山西',value: randomData() },
                {name: '内蒙古',value: randomData() },
                {name: '陕西',value: randomData() },
                {name: '吉林',value: randomData() },
                {name: '福建',value: randomData() },
                {name: '贵州',value: randomData() },
                {name: '广东',value: randomData() },
                {name: '青海',value: randomData() },
                {name: '西藏',value: randomData() },
                {name: '四川',value: randomData() },
                {name: '宁夏',value: randomData() },
                {name: '海南',value: randomData() },
                {name: '台湾',value: randomData() },
                {name: '香港',value: randomData() },
                {name: '澳门',value: randomData() }
            ]
        }
    });


}
