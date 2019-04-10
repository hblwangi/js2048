let data = {
    map: [
        0 ,0 ,0 ,0,
        0 ,0 ,0 ,0,
        0 ,0 ,0 ,0,
        0 ,0 ,0 ,0,
    ],

    // 生成 min —— max 的随机数公式 (包含min和max) :
    // parseInt(Math.random()*(max-min+1)+min,10);
    getRandom: function(min, max){
        return parseInt(Math.random()*(max-min+1)+min,10);
    },
    //生成2个不重复随机数
    Random2: function(min, max){
        let k1 = this.getRandom(min, max)
        let k2 = this.getRandom(min, max)
        if ( k1 != k2 ) {
            return [k1, k2]
        } else {
            return this.Random2(min, max)
        }
    },

    init: function(){
        let initRan = this.Random2(0, 15)
        this.map[initRan[0]] = this.getRandom(1,2) * 2
        this.map[initRan[1]] = this.getRandom(1,2) * 2
        this.render()

        this.operating()
    },

    // 渲染样式
    render: function(){
        for (let i = 0; i < this.map.length; i++) {
            if (this.map[i] != 0) {
                $("#container ul li:eq(" + i + ")").attr("class", "num"+this.map[i]).html(this.map[i])
            } else if (this.map[i] == 0) {
                $("#container ul li:eq(" + i + ")").attr("class", "").html("")
            }
        }
    },

    //随机2位置生成
    generateRandom: function(){
        let map0 = []
        for (let i = 0; i < this.map.length; i++) {
            if (this.map[i] == 0) {
                map0.push(i)
            }
        }

        let map0L = map0.length
        let mapRan = this.getRandom(0, map0L-1)
        
        this.map[ map0[ mapRan ] ] = this.getRandom(1,2) * 2
    },

    //操作
    operating: function(){
        let _this = this
        let pArr = []
        let maps = _this.map
        let pArrChange = []
        let ks = []
        $(document).keydown(function (event) {
            switch (event.keyCode) {
                case 37:
                    console.log("左")
                    for (let i = 0; i < 4; i++) {
                        pArr[i] = [ maps[0 + i*4], maps[1 + i*4], maps[2 + i*4], maps[3 + i*4] ]
                        ks[i] = [ maps[0 + i*4], maps[1 + i*4], maps[2 + i*4], maps[3 + i*4] ]
                    }
                    
                    for (let j = 0; j < pArr.length; j++) {
                        pArrChange[j] = _this.calculation(pArr[j])
                    }
                    for (let k = 0; k < _this.map.length; k++) {
                        _this.map[k] = pArrChange[parseInt(k/4)][k%4]
                    }
                   
                    if (ks.toString() != pArrChange.toString()) {
                        _this.generateRandom()
                    }
                    _this.render()
                    break;
                case 38:
                    console.log("上")
                    for (let i = 0; i < 4; i++) {
                        pArr[i] = [ maps[i], maps[i + 4], maps[i + 8], maps[i + 12] ]
                        ks[i] = [ maps[i], maps[i + 4], maps[i + 8], maps[i + 12] ]
                    }
                    for (let j = 0; j < pArr.length; j++) {
                        pArrChange[j] = _this.calculation(pArr[j])
                    }
                    for (let k = 0; k < _this.map.length; k++) {
                        _this.map[k] = pArrChange[k%4][parseInt(k/4)]
                    }
                    if (ks.toString() != pArrChange.toString()) {
                        _this.generateRandom()
                    }
                    _this.render()
                    break;
                case 39:
                    console.log("右")
                    for (let i = 0; i < 4; i++) {
                        pArr[i] = [ maps[0 + i*4], maps[1 + i*4], maps[2 + i*4], maps[3 + i*4] ].reverse()
                        ks[i] = [ maps[0 + i*4], maps[1 + i*4], maps[2 + i*4], maps[3 + i*4] ]
                        
                    }
                    for (let j = 0; j < pArr.length; j++) {
                        pArrChange[j] = _this.calculation(pArr[j]).reverse()
                    }
                    for (let k = 0; k < _this.map.length; k++) {
                        _this.map[k] = pArrChange[parseInt(k/4)][k%4]
                    }
                    if (ks.toString() != pArrChange.toString()) {
                        _this.generateRandom()
                    }
                    _this.render()
                    break;
                case 40:
                    console.log("下")
                    for (let i = 0; i < 4; i++) {
                        pArr[i] = [ maps[i], maps[i + 4], maps[i + 8], maps[i + 12] ].reverse()
                        ks[i] = [ maps[i], maps[i + 4], maps[i + 8], maps[i + 12] ]
                    }
                    for (let j = 0; j < pArr.length; j++) {
                        pArrChange[j] = _this.calculation(pArr[j]).reverse()
                    }
                    for (let k = 0; k < _this.map.length; k++) {
                        _this.map[k] = pArrChange[k%4][parseInt(k/4)]
                    }
                    if (ks.toString() != pArrChange.toString()) {
                        _this.generateRandom()
                    }
                    _this.render()
                    break;
            
                default:
                    break;
            }
            
        })
    },

    //计算
    calculation: function(ds) {
        for (let j = 0; j < 4; j++) {
            for (let i = 0; i < 4; i++) {
                //判断是否移动
                if (ds[i-1] == 0) {
                    ds[i-1] = ds[i]
                    ds[i] = 0
                }
            }
            
        }

        for (let i = 0; i < 4; i++) {
            //判断是否相加
            if (ds[i] == ds[i+1] && ds[i] != 0) {
                ds[i] *= 2
                ds[i+1] *= 0
            }
        }

        for (let j = 0; j < 4; j++) {
            for (let i = 0; i < 4; i++) {
                //判断是否移动
                if (ds[i-1] == 0) {
                    ds[i-1] = ds[i]
                    ds[i] = 0
                }
            }
            
        }
        
        return ds
    }
    
}

data.init()