// import moment from "moment"

// 定制缩放比例及缩放的宽度
let zoomTree = window.__zoomTree__
for (let z = 1; z < zoomTree.length; z++) {
    let zl = zoomTree[z];
    let sec = 0;
    switch (zl.unit) {
        case "d":
            sec = 86400;
            break;
        case "M":
            sec = 2419200;
            break; // assumes only 28 days per
        case "y":
            sec = 31536000;
            break;
        case "de":
            sec = 315360000;
            break;
        case "ce":
            sec = 3153600000;
            break;
        case "thou":
            sec = 31536000000;
            break;
        case "tenthou":
            sec = 315360000000;
            break;
        case "hundredthou":
            sec = 3153600000000;
            break;
        case "mill":
            sec = 31536000000000;
            break;
        case "tenmill":
            sec = 315360000000000;
            break;
        case "hundredmill":
            sec = 3153600000000000;
            break;
        case "bill":
            sec = 31536000000000000;
            break;
    }
    // generate hash for seconds per pixel
    zl.spp = Math.round(sec / parseInt(zl.width));
}
//月份缩写
let monthNamesAbbr = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月", ""]
// let monthNamesLet = ["", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]
let monthNamesLet = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月", ""]

/**
 * 画出均匀的y轴坐标 返回[坐标最大值,坐标最小值,刻度个数]
 * @param {*} cormax 数据最大值 
 * @param {*} cormin 数据最小值
 * @param {*} cornumber 刻度个数
 */
function standard(cormax, cormin, cornumber) {
    let tmpmax, tmpmin, corstep, tmpstep, tmpnumber, temp, extranumber;
    if (cormax <= cormin)
        cormax = cormax + 1
    corstep = (cormax - cormin) / cornumber;
    if (Math.pow(10, parseInt(Math.log(corstep) / Math.log(10))) == corstep) {
        temp = Math.pow(10, parseInt(Math.log(corstep) / Math.log(10)));
    } else {
        temp = Math.pow(10, (parseInt(Math.log(corstep) / Math.log(10)) + 1));
    }
    tmpstep = (corstep / temp).toFixed(6);
    //选取规范步长
    if (tmpstep >= 0 && tmpstep <= 0.1) {
        tmpstep = 0.1;
    } else if (tmpstep >= 0.100001 && tmpstep <= 0.2) {
        tmpstep = 0.2;
    } else if (tmpstep >= 0.200001 && tmpstep <= 0.25) {
        tmpstep = 0.25;
    } else if (tmpstep >= 0.250001 && tmpstep <= 0.5) {
        tmpstep = 0.5
    } else {
        tmpstep = 1;
    }
    tmpstep = tmpstep * temp;
    if (parseInt(cormin / tmpstep) != (cormin / tmpstep)) {
        if (cormin < 0) {
            cormin = (-1) * Math.ceil(Math.abs(cormin / tmpstep)) * tmpstep;
        } else {
            cormin = parseInt(Math.abs(cormin / tmpstep)) * tmpstep;
        }

    }
    if (parseInt(cormax / tmpstep) != (cormax / tmpstep)) {
        cormax = parseInt(cormax / tmpstep + 1) * tmpstep;
    }
    tmpnumber = (cormax - cormin) / tmpstep;
    if (tmpnumber < cornumber) {
        extranumber = cornumber - tmpnumber;
        tmpnumber = cornumber;
        if (extranumber % 2 == 0) {
            cormax = cormax + tmpstep * parseInt(extranumber / 2);
        } else {
            cormax = cormax + tmpstep * parseInt(extranumber / 2 + 1);
        }
        cormin = cormin - tmpstep * parseInt(extranumber / 2);
    }
    cornumber = tmpnumber;
    return [cormax, cormin, cornumber];
}



/**
 * 获取事件中的最大最小值
 * @param {*} eventArr 事件arr 
 */
function getMinAndMax(eventArr) {
    let min = null,
        max = null;
    eventArr.forEach(obj => {
        if (min === null) {
            min = obj.data
        }
        if (max === null) {
            max = obj.data
        }
        if (obj.data > max) {
            max = obj.data
        }
        if (obj.data < min) {
            min = obj.data
        }
    })
    return {
        max,
        min
    }
}


/**
 * 碰撞检测
 * @param {*} original 被检测物体的信息 
 * @param {*} event 鼠标事件信息
 */
function collisionDetection(original, event) {
    let dx = event.x - original.x;
    let dy = event.y - original.y;
    if (dx > 0 && dx < original.w && dy > 0 && dy < original.h) {
        return true
    } else {
        return false
    }
}

class TimeLine {
    constructor(opt, event) {
        let _opt = {
            // canvas:{},
            minZoom: 6,
            maxZoom: 40,
            xAxisH: 40,
            borderRight: 40,
            borderTop: 40,
            borderleft: 40,
            zoom: 24,
            time: new Date().getTime()
        };
        this.opt = Object.assign({}, _opt, opt);
        //画图参数
        this.canvas = this.opt.canvas;
        this.canvasW = this.canvas.getBoundingClientRect().width;
        this.canvasH = this.canvas.getBoundingClientRect().height;
        this.ctx = this.canvas.getContext("2d");
        //event 参数
        this.event = Object.assign([], event)
        //y轴坐标信息
        this.scaleY = [5, 0, 5]

        this.listener = [] //钩子函数
        this.isMousedown = false; //拖动mousedown标记
        this.isMousemove = false; //拖动mousemove标记
        this.mousedownCursor = null; //拖动mousedown的位置

        this.mouseHoverX = null; //滑过事件
        this.mouseHoverY = null;
        this.mouseTrigger = false;


        this.render();
        this.canvas.addEventListener('mousewheel', this.mousewheelFunc.bind(this));
        this.canvas.addEventListener('mousedown', this.mousedownFunc.bind(this));
        this.canvas.addEventListener('mousemove', this.mousemoveFunc.bind(this));
        this.canvas.addEventListener('mouseup', this.mouseupFunc.bind(this));
        this.canvas.addEventListener('mouseout', this.mouseoutFunc.bind(this));
        this.canvas.addEventListener("click", this.mouseClickFunc.bind(this))
    }

    /**
     * 鼠标滚轮缩放
     * @param {*} event 
     */
    mousewheelFunc(event) {
        if (event && event.preventDefault) {
            event.preventDefault()
        } else {
            window.event.returnValue = false;
            return false;
        }

        let e = window.event || event;
        let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        if (delta < 0) {
            this.opt.zoom++;
            if (this.opt.zoom >= this.opt.maxZoom) {
                this.opt.zoom = this.opt.maxZoom;
            }
        } else if (delta > 0) {
            this.opt.zoom--;
            if (this.opt.zoom <= this.opt.minZoom) {
                this.opt.zoom = this.opt.minZoom;
            }
        }
        this.trigger("zoomChange", this.opt.zoom)
        this.refresh()
    }

    /**
     * 拖动/点击 mousedown事件
     */
    mousedownFunc(e) {
        this.isMousedown = true;
        this.mousedownCursor = this.getMousePos(e).x; //记住mousedown的位置
    }
    /**
     * 拖动/鼠标hover显示 mousemove事件
     */
    mousemoveFunc(e) {

        let {
            x: posX,
            y: posY
        } = this.getMousePos(e)
        this.mouseHoverX = posX;
        this.mouseHoverY = posY;
        this.clearCanvas();
        if (this.isMousedown) { //拖动

            let diff_x = posX - this.mousedownCursor;
            this.opt.time = moment(this.opt.time).subtract(diff_x * zoomTree[this.opt.zoom]["spp"], "s").valueOf()
            this.render()
            this.isMousemove = true;
            this.mousedownCursor = posX;
        } else { //画虚线
            this.render()
        }
    }
    /**
     * 拖动/点击 mouseup事件
     */
    mouseupFunc(e) {
        this.isMousemove = false;
        this.isMousedown = false;
    }
    /**
     * 鼠标移出隐藏时间 mouseout事件
     * @param {*} e 
     */
    mouseoutFunc(e) {
        this.refresh()
    }
    /**
     * 点击事件
     * @param {*} e 
     */
    mouseClickFunc(e) {
        let {
            x,
            y
        } = this.getMousePos(e)
        this.clickX = x;
        this.clickY = y;
        this.refresh()
        this.clickX = null;
        this.clickY = null
    }

    /**
     * 获取鼠标坐标
     * @param {*} e  
     */
    getMousePos(e) {
        let rect = this.canvas.getBoundingClientRect();
        let x = e.clientX - rect.left * (this.canvas.width / rect.width);
        let y = e.clientY - rect.top * (this.canvas.height / rect.height);
        return {
            x,
            y
        }
    }



    /**
     * 渲染函数
     */
    render() {

        this.eventFormat()
        this.clearCanvas()
        this.drawEvent()
        this.drawGraduation()
        // this.drawEvent()
    }
    /**
     * 画刻度
     */
    drawGraduation() {
        //时间轴刻度
        let totalChunk = parseInt(this.canvasW / zoomTree[this.opt.zoom]["width"]) + 3, //总片数
            height = this.canvasH - this.opt.xAxisH, //xAxis的的起始高度
            chunkWidth = zoomTree[this.opt.zoom]["width"],
            chunkUnit = zoomTree[this.opt.zoom]["unit"],
            centerX = (this.canvasW - this.opt.borderleft) / 2 + this.opt.borderleft, //中间点
            lastLeftX = 0, //上一次左边x
            lastRightX = 0; //上一次右边x
        for (let index = 0; index < totalChunk; index++) {
            let width = chunkWidth, //当前大刻度宽度
                label, //大刻度的label
                _day, //当前大刻度的时间
                graduationX; //刻度的x坐标

            //每个大刻度时间
            if (index == 0) {
                _day = moment(this.opt.time)
            } else if (index % 2 == 0) {
                _day = moment(this.opt.time).subtract((parseInt((index + 1) / 2)), chunkUnit)
            } else {
                _day = moment(this.opt.time).add((parseInt((index + 1) / 2)), chunkUnit)
            }

            if (chunkUnit == "M") { //月份特殊处理 每月天数不一样 所以宽度不一样
                switch (_day.daysInMonth()) {
                    // 31 days
                    case 31:
                        width = Math.floor(chunkWidth + ((chunkWidth / 28) * 3));
                        break;
                    case 29: // Blasted February!
                        width = Math.floor(chunkWidth + (chunkWidth / 28));
                        break;
                    case 28:
                        width = Math.floor(chunkWidth);
                    default: // 30 days
                        width = Math.floor(chunkWidth + ((chunkWidth / 28) * 2));
                }
            }
            //开始画大刻度
            if (index == 0) { //中间偏左的刻度位置
                let reduce
                switch (chunkUnit) {
                    case "d":
                        // @4:30        4/24                30 / 1440
                        //              .1666                .0201
                        reduce = ((_day.get('hour')) / 24) + ((_day.get('minute')) / 1440)
                        graduationX = Math.ceil(centerX - reduce * width)
                        break;
                    case "M":
                        let mdn = _day.daysInMonth()
                        reduce = ((_day.get("date") - 1) / mdn) + (_day.get('hour') / (24 * mdn)) + (_day.get('minute') / (1440 * mdn))
                        graduationX = Math.ceil(centerX - reduce * width)
                        break;
                    case "y":
                        reduce = ((_day.get('month') * 30) + _day.get('date')) / 365
                        graduationX = Math.ceil(centerX - reduce * width)
                        break;
                }
                lastLeftX = graduationX;
                lastRightX = graduationX + width;
            } else if (index % 2 == 0) { //右边的刻度位置
                graduationX = Math.floor(lastLeftX - width)
                lastLeftX = graduationX;
            } else { //左边的刻度的位置
                graduationX = lastRightX
                lastRightX = Math.floor(lastRightX + width)
            }
            //拿大刻度label
            switch (chunkUnit) {
                case "y":
                    label = _day.year().toString();
                    break;
                case "M":
                    if (width < 120) {
                        label = monthNamesAbbr[_day.month()] + " " + _day.year();
                    } else {
                        label = monthNamesLet[_day.month()] + " " + _day.year();
                    }
                    break;
                case "d":
                    // COSTLY: test performance here on dragging
                    if (width < 120) {
                        label = monthNamesAbbr[_day.month()] + " " + _day.date() + ", " + _day.year();
                    } else {
                        label = monthNamesLet[_day.month()] + " " + _day.date() + ", " + _day.year();
                    }
                    break;
            }
            this.drawTxt(graduationX, (height + 25), label, "rgba(194, 202, 215,0.8)")
            this.drawLine(graduationX, height, graduationX, (height + 25), "rgb(194, 202, 215)", 1);

            //画小刻度
            let tperu, //小刻度的数量
                dist; //小刻度宽度
            switch (chunkUnit) {
                case "d":
                    tperu = 24;
                    break;
                case "M":
                    tperu = _day.daysInMonth();
                    break;
                case "y":
                    tperu = 12;
                    break;
                default:
                    tperu = 10;
            }
            dist = width / tperu;
            if (dist > 8) {
                for (let i = 0; i < tperu; i++) {
                    let subLabel = "";
                    if (dist > 16) {
                        switch (chunkUnit) {
                            case "d":
                                let htxt = i,
                                    ampm = '',
                                    bagels = '';
                                if (dist < 16) {
                                    return "";
                                } else {
                                    if (dist > 30) {
                                        ampm = (i > 11) ? " pm" : " am";
                                        if (i > 12) {
                                            htxt = i - 12;
                                        } else if (i == 0) {
                                            htxt = 12;
                                        }
                                    } else {
                                        htxt = i
                                    }
                                }
                                bagels = (dist > 60) ? ":00" : "";
                                subLabel = htxt + bagels + ampm;
                                break;
                            case "M":
                                subLabel = i + 1;
                                break;
                            case "y":
                                if (dist > 30) {
                                    subLabel = monthNamesAbbr[i];
                                } else {
                                    subLabel = monthNamesLet[i];
                                }
                                break;
                        }
                    }
                    if (subLabel != "") {
                        this.drawTxt((graduationX + dist * i + 2), height, subLabel, "rgba(194, 202, 215,0.8)")
                    }
                    if (i != 0) {
                        this.drawLine((graduationX + dist * i), height, (graduationX + dist * i), (height + 10), "rgb(194, 202, 215)", 1);
                    }
                }
            }
        }
        //画刻度横线
        this.drawLine(this.opt.borderleft, height, this.canvasW, height, "rgb(64, 196, 255)", 2)
        //覆盖左边
        this.ctx.clearRect(0, 0, this.opt.borderleft, this.canvasH);

        //画y轴刻度
        let dis = (this.canvasH - this.opt.xAxisH - this.opt.borderTop) / this.scaleY[2]
        for (let index = 0; index <= this.scaleY[2]; index++) {
            this.drawLine(this.opt.borderleft - 10, this.canvasH - this.opt.xAxisH - index * dis, this.opt.borderleft, this.canvasH - this.opt.xAxisH - index * dis, "rgb(194, 202, 215)", 1)
            this.drawTxt(this.opt.borderleft - 12, this.canvasH - this.opt.xAxisH - index * dis, index * (this.scaleY[0] - this.scaleY[1]) / this.scaleY[2], "rgb(194, 202, 215)", "right", "middle")
        }
        //画竖度竖线
        this.drawLine(this.opt.borderleft, this.opt.borderTop, this.opt.borderleft, this.canvasH - this.opt.xAxisH, "rgb(64, 196, 255)", 2)
    }
    /**
     * 画事件
     */
    drawEvent() {
        let hasClick = false; //标记点击事件已经触发
        let hasMove = false; //标记鼠标滑过事件
        this.eventFormatData.forEach(event => {
            let _x = event.x,
                _y = this.canvasH - this.opt.xAxisH - (event.data / this.scaleY[0] * (this.canvasH - this.opt.xAxisH - this.opt.borderTop));

            event.children.forEach(val => {
                let _h = (val.data / this.scaleY[0] * (this.canvasH - this.opt.xAxisH - this.opt.borderTop))
                this.drawRect(_x - 8, _y + val.data, 16, _h, val.color);
                this.drawLine(_x - 8, _y + val.data + _h - 1, _x + 8, _y + _h + val.data - 1, "rgb(194, 202, 215)", 1)

                //点击碰撞检测
                if (hasClick == false) {
                    let isCollision = collisionDetection({
                        x: _x - 8,
                        y: _y,
                        w: 16,
                        h: _h
                    }, {
                            x: this.clickX,
                            y: this.clickY
                        })
                    if (isCollision) {
                        // this.drawTxt(this.clickX, this.clickY, `数值:${val.info[0]}`, "rgb(194, 202, 215)")
                        // this.drawTxt(this.clickX, this.clickY + 16, `日期:${moment(parseInt(val.time)).format("YYYY-MM-DD hh:mm:ss")}`, "rgb(194, 202, 215)")
                        this.trigger("clickEvent", val)
                        hasClick = true
                    }
                }
                //滑过碰撞检测
                if (hasMove == false) {
                    let isCollision = collisionDetection({
                        x: _x - 8,
                        y: _y,
                        w: 16,
                        h: _h
                    }, {
                            x: this.mouseHoverX,
                            y: this.mouseHoverY
                        })
                    if (isCollision) {
                        this.drawTxt(this.mouseHoverX, this.mouseHoverY, `数值:${val.info[0]}`, "rgb(194, 202, 215)")
                        this.drawTxt(this.mouseHoverX, this.mouseHoverY + 16, `日期:${moment(parseInt(val.time)).format("YYYY-MM-DD hh:mm:ss")}`, "rgb(194, 202, 215)")
                        // this.trigger("mouseEvent", val)
                        hasMove = true
                    }
                }
                //把上层加上去 
                _y += _h;
            })


        })
    }
    /**
     *数据处理 相同x放一起
     */
    eventFormat() {
        //事件处理
        let _event = [];
        this.event.forEach(event => {
            event.x = (this.canvasW - this.opt.borderleft) / 2 + this.opt.borderleft - Math.floor((this.opt.time - event.time) / 1000 / zoomTree[this.opt.zoom]["spp"])
        })
        this.event.forEach(val => {
            let isExist = false;
            for (let index = 0; index < _event.length; index++) {
                if (_event[index].x == val.x) {
                    _event[index].children.push(val)
                    _event[index].data += val.data;
                    isExist = true
                }
            }
            if (!isExist) {
                _event.push({
                    x: val.x,
                    data: val.data,
                    children: [val]
                })
            }
        })

        if (_event.length > 0) {
            let {
                min,
                max
            } = getMinAndMax(_event)
            this.scaleY = standard(max, min, 5)
        }
        this.eventFormatData = _event
    }


    /**
     * 绘制文字
     * @param {*} x  必须 文字位置x
     * @param {*} y  必须 文字位置y
     * @param {*} txt  必须 文字内容
     * @param {*} rgba 必须 文字颜色
     * @param {*} textAlign 对齐方式
     * @param {*} baseline 基线
     */
    drawTxt(x, y, txt, rgba, textAlign, baseline) {
        this.ctx.save()
        this.ctx.fillStyle = rgba;
        if (textAlign) {
            this.ctx.textAlign = textAlign
        } else {
            this.ctx.textAlign = "start"
        }
        if (baseline) {
            this.ctx.textBaseline = baseline
        } else {
            this.ctx.textBaseline = 'hanging'
        }
        this.ctx.fillText(txt, x, y);
        this.ctx.restore()
    }
    /**
     * 绘制线
     * @param {*} beginX 
     * @param {*} beginY 
     * @param {*} endX 
     * @param {*} endY 
     * @param {*} color 
     * @param {*} width 
     */
    drawLine(beginX, beginY, endX, endY, color, width) {
        this.ctx.save()
        this.ctx.beginPath();
        this.ctx.moveTo(beginX, beginY);
        this.ctx.lineTo(endX, endY);
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = width;
        this.ctx.stroke();
        this.ctx.restore()
    }
    /**
     * 画点
     * @param {*} x x坐标
     * @param {*} y y坐标
     * @param {*} radius 半径
     * @param {*} rgba 颜色
     */
    drawPoint(x, y, radius, rgba) {
        this.ctx.save()
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = rgba;
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore()
    }
    /**
     *  画矩形
     * @param {*} x 起点x坐标 矩形左上角的顶点
     * @param {*} y 起点y
     * @param {*} width 宽度
     * @param {*} height 高度
     */
    drawRect(x, y, width, height, color) {
        this.ctx.save()
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
        this.ctx.restore()
    }


    /**
     * 清除canvas 每次重新绘制需要先清除
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);
    }
    /**
     * 重绘canvas
     */
    refresh() {
        this.clearCanvas();
        this.render()
    }
    /**
     * 重绘canvas
     */
    resize(width, height) {
        this.canvasW = width;
        this.canvasH = height;
        console.log("resize")
        this.refresh()
    }
    /**
     * 事件注册器
     * @param {*} eventName 事件名称
     * @param {*} callback 回调
     */
    on(eventName, callback) {
        let functions = this.listener[eventName] || [];
        functions.push(callback);
        this.listener[eventName] = functions;
    }
    /**
     * 事件触发器
     * @param {*} eventName 事件名称
     */
    trigger(eventName) {
        //args为获得除了eventName后面的参数(注册事件的参数)
        let args = Array.prototype.slice.apply(arguments).slice(1);
        let functions = this.listener[eventName];

        if (!Array.isArray(functions)) return; //自定义事件名不存在

        functions.forEach(function (callback) {
            try {
                callback.apply(this, args);
            } catch (e) {
                console.error(e);
            }
        })
    }
}

// export default TimeLine